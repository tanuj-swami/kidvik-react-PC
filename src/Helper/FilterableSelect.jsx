import React from "react";
import Select from "react-select";
import { Form } from "react-bootstrap";

function FilterableSelect({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
  placeholder,
  error = "",
  isLoading = false,
}) {
  const handleChange = (selectedOption) => {
    onChange({
      target: {
        name,
        value: selectedOption ? selectedOption.value : "",
      },
    });
  };

  // ✅ Validation state for styling
  const isValid = value && !error;
  const isInvalid = required && !value;

  return (
    <Form.Group className="mb-3">
      <Form.Label className="text-black fw-bold fs-5">
        {label} {required && <span className="text-danger">*</span>}
      </Form.Label>

      <Select
        options={options}
        value={options.find((opt) => opt.value === value) || null}
        onChange={handleChange}
        className="form-dropdowen-control"
        isClearable
        placeholder={
          placeholder
            ? placeholder
            : isLoading
            ? `Loading ${label}...`
            : `Select or search ${label}...`
        }
        isDisabled={disabled || isLoading}
        isLoading={isLoading}
        styles={{
          control: (base, state) => {
            let borderColor = base.borderColor;
            let boxShadow = base.boxShadow;
            let backgroundImage = "none";

            if (isInvalid) {
              borderColor = "#dd4a58c2"; // red
              boxShadow = "0 0 0 0.25rem rgba(220, 53, 69, 0.25)";
              backgroundImage =
                "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23dc3545' viewBox='0 0 16 16'%3e%3cpath d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e\")";
            } else if (isValid) {
              borderColor = "#198754"; // green
              boxShadow = "0 0 0 0.25rem rgba(25, 135, 84, 0.25)";
              backgroundImage =
                "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23198754' viewBox='0 0 16 16'%3e%3cpath d='M13.485 1.929a1.5 1.5 0 0 1 .042 2.121l-7.07 7.778-3.536-3.536a1.5 1.5 0 0 1 2.121-2.121l1.415 1.415 5.657-6.243a1.5 1.5 0 0 1 2.121-.042z'/%3e%3c/svg%3e\")";
            }

            return {
              ...base,
              borderColor,
              boxShadow: state.isFocused ? boxShadow : base.boxShadow,
              paddingRight: "2.25rem",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1rem 1rem",
              backgroundImage,
              "&:hover": { borderColor },
            };
          },
        }}
      />

      {/* ✅ Hidden input for real HTML5 validation */}
      {required && (
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          style={{ opacity: 0, height: 0, position: "absolute" }}
          value={value || ""}
          onChange={() => {}}
          required
        />
      )}

      {error && (
        <small className="text-danger d-block mt-1">
          {Array.isArray(error) ? error.join(", ") : error}
        </small>
      )}
    </Form.Group>
  );
}

export default FilterableSelect;
