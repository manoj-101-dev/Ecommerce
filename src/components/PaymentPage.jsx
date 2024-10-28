/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe("YOUR_STRIPE_PUBLISHABLE_KEY");

const PaymentPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Retrieve booking data from localStorage
  const bookingData = JSON.parse(localStorage.getItem("bookings"));
  const latestBooking = bookingData
    ? bookingData[bookingData.length - 1]
    : null;

  useEffect(() => {
    if (!latestBooking) {
      setError("No booking found. Please book a product first.");
      return;
    }

    const initiatePayment = async () => {
      try {
        const stripe = await stripePromise;
        const response = await fetch("/api/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productName: latestBooking.productName,
            quantity: latestBooking.quantity,
            price: latestBooking.price,
          }),
        });

        const session = await response.json();

        if (response.ok) {
          // Redirect to Stripe Checkout
          const result = await stripe.redirectToCheckout({
            sessionId: session.id,
          });
          if (result.error) {
            setError(result.error.message);
          }
        } else {
          setError(session.error);
        }
      } catch (error) {
        setError("An unexpected error occurred. Please try again.");
      }
    };

    initiatePayment();
  }, [latestBooking]);

  return (
    <div className="text-center">
      <h2>Payment Page</h2>
      {success && <Alert variant="success">Payment successful!</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Button variant="primary" onClick={() => navigate("/")}>
        Return to Home
      </Button>
    </div>
  );
};

export default PaymentPage;
