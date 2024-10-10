/* eslint-disable react/prop-types */
import { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const BookingForm = ({ product, onClose, show }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!product) {
      console.error("Product is not available.");
      return;
    }

    // Create booking data
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

    setSuccess(true);

    // Navigate to the My Bookings page after a successful booking
    navigate("/my-bookings");
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
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formQuantity" className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
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
          <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit" disabled={!product}>
              Confirm Booking
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BookingForm;
