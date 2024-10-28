const PaymentPage = () => {
  const initiatePayment = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/payments/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: 1000 }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data); // Log client secret for further processing
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <button onClick={initiatePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentPage;
