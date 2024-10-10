/* eslint-disable react/prop-types */
import { Form } from "react-bootstrap";

const CategoryFilter = ({ categories, selectedCategory, onChange }) => {
  return (
    <Form.Group className="w-auto">
      {" "}
      <Form.Select
        value={selectedCategory}
        onChange={(e) => onChange(e.target.value)}
        className="shadow-sm form-select-sm"
        style={{ maxWidth: "200px", marginRight: "100px" }}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default CategoryFilter;
