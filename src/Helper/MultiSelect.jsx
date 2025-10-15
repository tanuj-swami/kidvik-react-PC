import React from "react";
import Select from "react-select";
import { Form } from "react-bootstrap";

const MultiSelect = ({ label, name, options, value, onChange }) => {
  const handleChange = (selected) => {
    const values = selected ? selected.map((s) => s.value) : [];
    onChange(name, values); // pass back with group name
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label className="fw-bold text-primary">{label}</Form.Label>
      <Select
        isMulti
        options={options}
        value={options.filter((opt) => value.includes(opt.value))}
        onChange={handleChange}
        placeholder={`Select ${label}`}
      />
    </Form.Group>
  );
};

export default MultiSelect;
