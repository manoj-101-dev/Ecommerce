/* eslint-disable react/prop-types */

import { Card } from "react-bootstrap";

const ProductCard = ({ product, onClick }) => {
  return (
    <Card
      className="m-3 shadow-sm"
      style={{ cursor: "pointer" }}
      onClick={() => onClick(product)}
    >
      <Card.Img variant="top" src={product.imageUrl} alt={product.name} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
