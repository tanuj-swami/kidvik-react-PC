// src/components/common/Form_input.js
import React from "react";
import { Form } from "react-bootstrap";

function Form_input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  options = [],
  required = false,
  maxLength,
  minLength,
  error,
  readOnly = false,
  step,
  min,
  max,
}) {
  const showCounter = (type === "textarea" || type === "text") && maxLength;

  // ✅ Validation for URL
  const isUrlValid =
    type === "url" && value
      ? /^(https?:\/\/|www\.)[^\s/$.?#].[^\s]*$/i.test(value)
      : true;

  // ✅ Validation for Pincode
  const isPincodeValid =
    name === "pincode" && value ? /^\d{6}$/.test(value) : true;

  // ✅ Validation for Indian mobile number (starts with 6-9, 10 digits)
  const isMobileValid =
    type === "tel" && value ? /^[6-9]\d{9}$/.test(value) : true;

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    if (type === "url" && value && /^www\./i.test(value)) {
      value = `https://${value}`;
    }

    // ✅ Prevent non-numeric characters for mobile
    if (type === "tel") {
      value = value.replace(/\D/g, ""); // allow only digits
    }

    onChange({ target: { name, value } });
  };

  return (
    <Form.Group className="mb-3 d-flex flex-column" controlId={name}>
      {type === "checkbox" ? (
        // ✅ Checkbox input
        <Form.Check
          type="checkbox"
          id={name}
          label={<span className="fw-bold text-black fs-5">{label}</span>}
          name={name}
          checked={!!value}
          onChange={(e) =>
            onChange({
              target: { name, value: e.target.checked },
            })
          }
        />
      ) : type === "select" ? (
        // ✅ Select input
        <>
          <Form.Label className="text-black fw-bold fs-5">
            {label} {required && <span className="text-danger">*</span>}
          </Form.Label>

          <Form.Select name={name} value={value} onChange={onChange}>
            <option value="">Select {label}</option>
            {options.map((opt, idx) => (
              <option key={idx} value={opt}>
                {opt}
              </option>
            ))}
          </Form.Select>

          {error && <small className="text-danger">{error}</small>}
        </>
      ) : type === "textarea" ? (
        // ✅ Textarea
        <>
          <Form.Label className="text-black fw-bold fs-5">
            {label} {required && <span className="text-danger">*</span>}
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={`Enter ${label}...`}
            maxLength={maxLength}
            required={required}
            readOnly={readOnly}
          />
          {showCounter && (
            <div className="d-flex justify-content-between">
              <small className="text-muted">
                {value?.length || 0}/{maxLength}
              </small>
              {value?.length >= maxLength && (
                <small className="text-danger">
                  Max {maxLength} characters allowed
                </small>
              )}
            </div>
          )}
          {error && <small className="text-danger">{error}</small>}
        </>
      ) : (
        // ✅ All other inputs (text, url, number, tel, etc.)
        <>
          <Form.Label className="text-black fw-bold fs-5">
            {label} {required && <span className="text-danger">*</span>}
          </Form.Label>

          <Form.Control
            type={type}
            className={`text-dark form-control ${error ? "is-invalid" : ""}`}
            name={name}
            value={type === "file" ? undefined : value}
            onChange={handleInputChange}
            placeholder={
              placeholder ||
              (type === "url"
                ? "Enter website (e.g. https://example.com)"
                : `Enter ${label}...`)
            }
            accept={type === "file" ? "image/*" : undefined}
            minLength={minLength}
            maxLength={maxLength}
            required={required}
            readOnly={readOnly}
            min={min}
            max={max}
            step={step}
            pattern={
              name === "pincode"
                ? "\\d{6}"
                : type === "url"
                ? "(https?:\\/\\/|www\\.).*"
                : type === "tel"
                ? "^[6-9]\\d{9}$" // ✅ mobile pattern
                : undefined
            }
            onInvalid={(e) => {
              if (required && !value) {
                e.target.setCustomValidity(`${label} is required`);
              } else if (type === "url" && value && !isUrlValid) {
                e.target.setCustomValidity(
                  `${label} must start with https://, http://, or www.`
                );
              } else if (name === "pincode" && value && !isPincodeValid) {
                e.target.setCustomValidity("Please enter a valid 6-digit pincode");
              } else if (type === "tel" && value && !isMobileValid) {
                e.target.setCustomValidity(
                  "Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9"
                );
              }
            }}
            onInput={(e) => e.target.setCustomValidity("")}
          />

          {/* ✅ Validation messages */}
          {type === "url" && value && !isUrlValid && (
            <small className="text-danger">
              Please enter a valid URL starting with https:// or www.
            </small>
          )}
          {name === "pincode" && value && !isPincodeValid && (
            <small className="text-danger">Please enter a valid 6-digit pincode</small>
          )}
          {type === "tel" && value && !isMobileValid && (
            <small className="text-danger">
              Please enter a valid 10-digit Indian mobile number
            </small>
          )}

          {showCounter && (
            <div className="d-flex justify-content-between">
              <small className="text-muted">
                {value?.length || 0}/{maxLength}
              </small>
              {value?.length >= maxLength && (
                <small className="text-danger">
                  Max {maxLength} characters allowed
                </small>
              )}
            </div>
          )}
          {error && <small className="text-danger">{error}</small>}
        </>
      )}
    </Form.Group>
  );
}

export default Form_input;
