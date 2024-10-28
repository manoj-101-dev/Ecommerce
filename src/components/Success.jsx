import { useNavigate } from "react-router-dom";
import { Container, Button, Alert } from "react-bootstrap";

const Success = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/products");
  };

  return (
    <Container className="text-center" style={{ marginTop: "50px" }}>
      <Alert variant="success">
        <Alert.Heading>Payment Successful!</Alert.Heading>
        <p>Thank you for your purchase. Your order is being processed.</p>
      </Alert>
      <Button onClick={handleGoBack} variant="primary" size="lg">
        Continue Shopping
      </Button>
    </Container>
  );
};

export default Success;
