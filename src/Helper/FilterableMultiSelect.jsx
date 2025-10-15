// src/components/common/FilterableMultiSelect.js
import React from "react";
import Select from "react-select";
import { Form } from "react-bootstrap";

function FilterableMultiSelect({
  label,
  name,
  value = [],       // array of selected values
  onChange,
  options,
  required = false,
  disabled = false,
}) {
  const handleChange = (selectedOptions) => {
    onChange({
      target: {
        name,
        value: selectedOptions ? selectedOptions.map((opt) => opt.value) : [],
      },
    });
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label className="text-black fw-bold fs-5">
        {label} {required && <span className="text-danger">*</span>}
      </Form.Label>

      <Select
        options={options}
        value={options.filter((opt) => value.includes(opt.value))}
        onChange={handleChange}
        isMulti
        isClearable
        placeholder={`Select or search ${label}...`}
        isDisabled={disabled}
        styles={{
          control: (base, state) => ({
            ...base,
            borderColor: state.isFocused ? "#42B682" : base.borderColor,
            boxShadow: state.isFocused
              ? "0 0 0 .25rem rgba(113, 184, 118, 0.10)"
              : base.boxShadow,
            "&:hover": { borderColor: "green" },
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? "#42B682"
              : state.isFocused
              ? "#42B68222"
              : "white",
            color: state.isSelected ? "white" : "black",
            cursor: "pointer",
          }),
        }}
      />

      {/* ✅ Hidden input for validation */}
      {required && (
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          style={{ opacity: 0, height: 0, position: "absolute" }}
          value={value.length ? "selected" : ""}
          onChange={() => {}}
          required
        />
      )}
    </Form.Group>
  );
}

export default FilterableMultiSelect;
