// App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EntrancePage from "./components/EntrancePage";
import ProductList from "./components/ProductList";
import MyBookings from "./components/MyBookings";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <div>
        <header className="text-center py-4">
          <h1>Your Ultimate Shopping Destination!</h1>
        </header>
      </div>
      <Routes>
        <Route path="/" element={<EntrancePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </Router>
  );
};

export default App;
