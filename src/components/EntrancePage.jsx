import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

const EntrancePage = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/products"); // Navigate to the products page
  };

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f8ff",
        color: "#333",
      }}
    >
      <h1
        className="text-center"
        style={{ fontSize: "3rem", fontWeight: "bold" }}
      >
        Welcome to ShopSmart!
      </h1>
      <p className="lead text-center mb-4" style={{ fontSize: "1.25rem" }}>
        Your one-stop destination for all your shopping needs!
      </p>
      <Button
        variant="success"
        onClick={handleShopNow}
        size="lg"
        style={{ padding: "10px 30px", fontSize: "1.25rem" }}
      >
        Let’s Shop
      </Button>
    </Container>
  );
};

export default EntrancePage;
