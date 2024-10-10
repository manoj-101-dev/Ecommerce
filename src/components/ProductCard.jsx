/* eslint-disable react/prop-types */
import { Card, Button } from "react-bootstrap";

const ProductCard = ({
  product,
  onClick,
  onCartChange,
  isInCart,
  onShopNow,
}) => {
  const handleCartToggle = (event) => {
    event.stopPropagation();
    onCartChange(product);
  };

  const handleShopNow = (event) => {
    event.stopPropagation();
    onShopNow(product);
  };

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
        <div className="d-flex flex-column">
          <Button
            variant={isInCart ? "danger" : "primary"}
            onClick={handleCartToggle}
            className="mb-2"
          >
            {isInCart ? "Remove from Cart" : "Add to Cart"}
          </Button>
          <Button variant="success" onClick={handleShopNow}>
            Shop Now
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
