// src/Helper/DragDropFileInput.jsx
import React, { useRef, useState } from "react";
import "./DragDropFileInput.css";

const DragDropFileInput = ({ onFilesSelect }) => {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFilesArray = (filesArray) => {
    // filter only images
    const imageFiles = filesArray.filter((f) => f.type && f.type.startsWith("image/"));
    if (imageFiles.length > 0) onFilesSelect(imageFiles);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files || []);
    handleFilesArray(files);
  };

  const handleChange = (e) => {
    const files = Array.from(e.target.files || []);
    handleFilesArray(files);

    // reset input so same file can be selected again later
    e.target.value = "";
  };

  return (
    <div
      className={`drop-zone ${dragOver ? "dragover" : ""}`}
      onClick={() => fileInputRef.current && fileInputRef.current.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && (fileInputRef.current.click())}
    >
      <div style={{ pointerEvents: "none" }}>
        <strong>Drag & Drop images here</strong>
        <div style={{ fontSize: 13 }}>or click to browse</div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        multiple
        accept="image/*"
        onChange={handleChange}
      />
    </div>
  );
};

export default DragDropFileInput;
