import { useNavigate } from "react-router-dom";
import { Container, Button, Alert } from "react-bootstrap";

const Cancel = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/products");
  };

  return (
    <Container className="text-center" style={{ marginTop: "50px" }}>
      <Alert variant="danger">
        <Alert.Heading>Payment Canceled</Alert.Heading>
        <p>Your transaction was not completed. Please try again.</p>
      </Alert>
      <Button onClick={handleGoBack} variant="primary" size="lg">
        Return to Products
      </Button>
    </Container>
  );
};

export default Cancel;
