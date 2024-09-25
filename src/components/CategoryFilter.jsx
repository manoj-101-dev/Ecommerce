/* eslint-disable react/prop-types */
import { Form } from "react-bootstrap";

const CategoryFilter = ({ categories, selectedCategory, onChange }) => {
  return (
    <Form.Group>
      <Form.Select
        value={selectedCategory}
        onChange={(e) => onChange(e.target.value)}
        className="shadow-sm"
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
