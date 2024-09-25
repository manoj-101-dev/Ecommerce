/* eslint-disable react/prop-types */

import { Form } from "react-bootstrap";

const SearchBar = ({ query, onChange }) => {
  return (
    <Form.Group>
      <Form.Control
        type="text"
        placeholder="Search by name..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        className="shadow-sm"
      />
    </Form.Group>
  );
};

export default SearchBar;
