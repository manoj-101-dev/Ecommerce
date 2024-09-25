import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { fetchProducts } from "../api";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
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
          <Col md={4}>
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onChange={setSelectedCategory}
            />
          </Col>
        </Row>
        <Row>
          {filteredProducts.map((product) => (
            <Col xs={12} sm={6} md={4} lg={3} key={product._id}>
              <ProductCard
                product={product}
                onClick={(product) => setSelectedProduct(product)}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </Container>
  );
};

export default ProductList;
