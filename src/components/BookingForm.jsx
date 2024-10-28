/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";

const BookingForm = ({ product, onClose, show }) => {
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleBooking = () => {
    console.log("Product:", product);
    const bookingData = {
      productId: product._id,
      productName: product.name,
      quantity,
      address,
      price: product.price,
    };

    // Save booking to localStorage
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push(bookingData);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // Prepare the items for checkout
    const items = [{ id: product._id, quantity }];

    console.log("Items for checkout session:", items);

    fetch(
      "https://ecommerce-backend-cg72.onrender.com/api/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      }
    )
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url; // Redirect to Stripe checkout
      })
      .catch((e) => {
        console.error(e.error);
        setError("Failed to create checkout session. Please try again.");
      });
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Booking Details for {product ? product.name : "Product"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {success && (
          <Alert variant="success" className="mb-3">
            Booking confirmed! Redirecting to My Bookings...
          </Alert>
        )}
        {error && (
          <Alert variant="danger" className="mb-3">
            {error}
          </Alert>
        )}
        {!success && (
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Group controlId="formQuantity" className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min={1}
                required
              />
            </Form.Group>
            <Form.Group controlId="formAddress" className="mb-4">
              <Form.Label>Delivery Address</Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="Enter your delivery address"
              />
            </Form.Group>
            <Button variant="primary" onClick={handleBooking}>
              Book
            </Button>
            <Button variant="secondary" onClick={onClose} className="ms-2">
              Cancel
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default BookingForm;
