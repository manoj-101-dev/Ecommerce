import { useState, useEffect } from "react";
import { Container, Button, Card, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Load cart items from localStorage on mount
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
  }, []);

  const handleRemoveFromCart = (productId) => {
    const updatedItems = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  const handleContinueShopping = () => {
    navigate("/products");
  };

  const handleShopNow = () => {
    navigate("/products");
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4">Your Cart</h2>

      {cartItems.length > 0 ? (
        <Row xs={1} md={2} lg={3} className="g-4">
          {cartItems.map((item) => (
            <Col key={item._id}>
              <Card
                className="mb-3 shadow-sm border-0"
                style={{ height: "250px", borderRadius: "0.5rem" }}
              >
                <Card.Body className="d-flex flex-column align-items-center text-center">
                  <Card.Img
                    variant="top"
                    src={item.imageUrl}
                    alt={item.name}
                    style={{
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "0.5rem",
                      marginBottom: "10px",
                    }}
                  />
                  <Card.Title className="mb-1">{item.name}</Card.Title>
                  <Card.Text className="mb-2">Price: ${item.price}</Card.Text>
                  <div className="d-flex justify-content-between w-100">
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveFromCart(item._id)}
                      size="sm"
                    >
                      Remove From Cart
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => handleShopNow(item)}
                      size="sm"
                    >
                      Shop Now
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info">Your cart is empty.</Alert>
      )}

      <div className="mt-4">
        <Button variant="primary" onClick={handleContinueShopping}>
          Continue Shopping
        </Button>
      </div>
    </Container>
  );
};

export default CartPage;
