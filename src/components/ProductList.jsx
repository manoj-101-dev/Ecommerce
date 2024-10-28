/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import BookingForm from "./BookingForm";
import { fetchProducts } from "../api";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState(() => {
    // Load cart items from localStorage on initial state
    return JSON.parse(localStorage.getItem("cartItems")) || [];
  });
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = products
      .filter((product) => product.name.toLowerCase().includes(lowercasedQuery))
      .filter(
        (product) => !selectedCategory || product.category === selectedCategory
      );
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  const categories = [...new Set(products.map((product) => product.category))];

  const handleCartChange = (product) => {
    setCartItems((prevItems) => {
      const isInCart = prevItems.find((item) => item._id === product._id);
      let updatedItems;

      if (isInCart) {
        updatedItems = prevItems.filter((item) => item._id !== product._id);
      } else {
        updatedItems = [...prevItems, product];
      }

      // Update localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleShopNow = (product) => {
    setCurrentProduct(product);
    setShowBookingForm(true);
  };

  const handleBookingSuccess = () => {
    setShowBookingForm(false);
    window.location.href = "/";
  };

  const handleNavigateToCart = () => {
    navigate("/cart", { state: { cartItems } });
  };

  return (
    <Container
      fluid
      className="py-5"
      style={{ backgroundColor: "#f7f7f7", minHeight: "100vh" }}
    >
      <Container>
        <Row className="mb-4 justify-content-between align-items-center">
          <Col md={6}>
            <SearchBar query={searchQuery} onChange={setSearchQuery} />
          </Col>
          <Col md={6} className="d-flex justify-content-end align-items-center">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onChange={setSelectedCategory}
              className="me-3"
            />
            <Link
              to="/my-bookings"
              className="btn btn-warning me-2"
              style={{ minWidth: "120px" }}
            >
              My Bookings
            </Link>
            <Button
              variant="info"
              style={{ minWidth: "120px" }}
              onClick={handleNavigateToCart}
            >
              Cart ({cartItems.length})
            </Button>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
            <p>Loading products...</p>
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <Row>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Col xs={12} sm={6} md={4} lg={3} key={product._id}>
                  <ProductCard
                    product={product}
                    onClick={(product) => setSelectedProduct(product)}
                    onCartChange={handleCartChange}
                    isInCart={cartItems.some(
                      (item) => item._id === product._id
                    )}
                    onShopNow={handleShopNow}
                  />
                </Col>
              ))
            ) : (
              <Col className="text-center">
                <p>No products found matching your criteria.</p>
              </Col>
            )}
          </Row>
        )}
      </Container>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <BookingForm
        product={currentProduct}
        onClose={() => setShowBookingForm(false)}
        onSuccess={handleBookingSuccess}
        show={showBookingForm}
      />
    </Container>
  );
};

export default ProductList;
