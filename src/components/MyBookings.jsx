import { useState } from "react";
import { Container, Card, Button, Alert, Row, Col } from "react-bootstrap";

const MyBookings = () => {
  // Retrieve bookings from localStorage
  const [bookings, setBookings] = useState(
    JSON.parse(localStorage.getItem("bookings")) || []
  );
  const [message, setMessage] = useState("");

  const handleCancel = (bookingToCancel) => {
    // Filter out the canceled booking
    const updatedBookings = bookings.filter(
      (booking) => booking.productId !== bookingToCancel.productId
    );

    // Update localStorage
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    // Update state
    setBookings(updatedBookings);

    // Set success message
    setMessage(`Booking for ${bookingToCancel.productName} has been canceled.`);
  };

  return (
    <Container className="py-5">
      <h2>Your Bookings</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {bookings.map((booking) => (
            <Col key={booking.productId}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{booking.productName}</Card.Title>
                  <Card.Text>
                    <strong>Quantity:</strong> {booking.quantity}
                  </Card.Text>
                  <Card.Text>
                    <strong>Address:</strong> {booking.address}
                  </Card.Text>
                  <Card.Text>
                    <strong>Total Price:</strong> $
                    {booking.price * booking.quantity}
                  </Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => handleCancel(booking)}
                    className="mt-2"
                  >
                    Cancel Booking
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MyBookings;
