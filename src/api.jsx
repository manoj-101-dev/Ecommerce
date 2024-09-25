const API_URL = "https://ecommerce-backend-cg72.onrender.com/api/products";

export const fetchProducts = async (category = "") => {
  try {
    const response = await fetch(
      `${API_URL}?category=${encodeURIComponent(category)}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
