import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate("/products");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Payment Canceled</h1>
      <p>
        It seems like you canceled the payment process. You can try again or
        continue shopping.
      </p>
      <button
        onClick={handleRetry}
        style={{ padding: "10px 20px", marginTop: "20px" }}
      >
        Back to Products
      </button>
    </div>
  );
};

export default Cancel;
