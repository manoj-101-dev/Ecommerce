import ProductList from "./components/ProductList";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div>
      <h1 className="text-center my-4">Product Store</h1>
      <ProductList />
    </div>
  );
};

export default App;
