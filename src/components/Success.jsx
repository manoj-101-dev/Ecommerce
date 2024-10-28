import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/products"); // Adjust path to your products page
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase. Your order is being processed.</p>
      <button
        onClick={handleGoBack}
        style={{ padding: "10px 20px", marginTop: "20px" }}
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default Success;
