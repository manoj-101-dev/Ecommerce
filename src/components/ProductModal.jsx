/* eslint-disable react/prop-types */

import { Modal, Button } from "react-bootstrap";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <Modal show={!!product} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="img-fluid mb-3"
        />
        <p>{product.description}</p>
        <p>
          <strong>Price:</strong> ${product.price}
        </p>
        <p>
          <strong>Available Quantity:</strong> {product.quantity}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
