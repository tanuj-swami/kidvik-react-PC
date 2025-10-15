// src/components/common/FileUploadWithPreview.js
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function FileUploadWithPreview({ label, name, value, onChange, baseUrl  , error}) {
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleFileChange = (e) => {
    onChange(e); // parent ka handleChange trigger karega
  };

  // ✅ Preview source handle karega File ya URL dono
  const getPreviewSrc = () => {
    if (!value) return null;
    if (typeof value === "string"){
      return baseUrl ? `${baseUrl}${value}` : value; // API se aaya string
    }
    return URL.createObjectURL(value); // File object
  };

  return (
    <div className="mb-3">
      <label className="form-label fw-bold">{label}</label>
      <input
        type="file"
        name={name}
        className="form-control"
        onChange={handleFileChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
      {/* Show preview button only if file OR url available */}
      {value && (
        <Button
          variant="link"
          size="sm"
          className="p-0 mt-1"
          onClick={() => setPreviewOpen(true)}
        >
          👁 View Preview
        </Button>
      )}

      {/* Modal for Preview */}
      <Modal show={previewOpen} onHide={() => setPreviewOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{label} Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {getPreviewSrc() && (
            <img
              src={getPreviewSrc()}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "400px",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default FileUploadWithPreview;
