// src/components/Image_Gallery.jsx
import React, { useRef, useState, useEffect } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import DragDropFileInput from "../../Helper/Drapdrop";
import { FaEye, FaTrash } from "react-icons/fa";
import { showToast } from "../../Helper/toastService";
import { BASE_URL } from "../../Helper/Base_Url";

function Image_Gallery({next , setLoading }) {
  const [logofile , setLogofile] = useState([]); // { file, name, preview }
  const [previewIndex, setPreviewIndex] = useState(null);
  const createdPreviewsRef = useRef(new Set());

  // add files => create preview URLs and track them
  const handleFiles = (newFiles) => {
    const fileArray = Array.from(newFiles).map((file) => {
      const preview = URL.createObjectURL(file);
      createdPreviewsRef.current.add(preview);
      return { file, name: file.name, preview };
    });
    setLogofile((prev) => [...prev, ...fileArray]);
  };

  const handleDeleteFile = (index) => {
    setLogofile((prevFiles) => {
      const toDelete = prevFiles[index];
      if (toDelete) {
        // revoke URL immediately
        try {
          URL.revokeObjectURL(toDelete.preview);
          createdPreviewsRef.current.delete(toDelete.preview);
        } catch (e) {}
      }
      const newFiles = prevFiles.filter((_, i) => i !== index);
      return newFiles;
    });
    if (previewIndex === index) setPreviewIndex(null);
    if (typeof previewIndex === "number" && previewIndex > index) {
      // adjust selected preview index if necessary
      setPreviewIndex((p) => (p === null ? null : p - 1));
    }
  };

  const handleReplace = (index, newFile) => {
    const newPreview = URL.createObjectURL(newFile);
    createdPreviewsRef.current.add(newPreview);

    setLogofile((prev) => {
      const copy = [...prev];
      // revoke old preview
      try {
        URL.revokeObjectURL(copy[index].preview);
        createdPreviewsRef.current.delete(copy[index].preview);
      } catch (e) {}
      copy[index] = { file: newFile, name: newFile.name, preview: newPreview };
      return copy;
    });

    // open replaced file preview
    setPreviewIndex(index);
  };


  
  // cleanup on unmount: revoke any leftover previews
  useEffect(() => {
    return () => {
      createdPreviewsRef.current.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch (e) {}
      });
      createdPreviewsRef.current.clear();
    };
  }, []);

   const handleSubmit = async (e) => {
        e.preventDefault();

    if (logofile.length === 0) {
      showToast("Please upload at least one image.");
      return;
    }

const gallerymasterArray = logofile.map((fileObj, index) => {
  return {
    name: fileObj.name,
    remarks: "Not Yet",
    file_type: "Image",
    // If you need id, create_date etc., you can add here
  };
});

const formData = new FormData();
formData.append('partner_id', 22);
formData.append('gallerymaster', JSON.stringify(gallerymasterArray));

logofile.forEach((fileObj, index) => {
  formData.append('files', fileObj.file);
});
console.log("formData",formData)
    try {
      const res = await fetch(`${BASE_URL}/partner_all/`, {
        method: "POST",
        // headers: { "Content-Type": "multipart/form-data" },
        body:  formData
    });
       console.log(logofile)

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Upload success:", data);

      showToast(data.message , "success");

    //   setLogofile([]); 
      next()
    } catch (error) {
      console.error("Upload failed:", error);
      showToast("Upload failed, please try again.","error");
    } 
  };

      console.log("logofile",logofile)

  return (
    <>
    <Row>
      <Col md={4}>
        {logofile.length > 0 && (
          <div className="mb-2 fw-bold text-success">
            Total Images: <span className="fw-bold">{logofile.length}</span>
          </div>
        )}

        <div className="rounded border" style={{ maxHeight: "220px", overflowY: "auto" }}>
          <ul className="list-group list-group-flush">
            {logofile.map((file, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span className="text-truncate" style={{ maxWidth: "140px" }}>
                  {file.name}
                </span>

                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    title="Preview"
                    onClick={() => setPreviewIndex(index)}
                  >
                    <FaEye />
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    title="Delete"
                    onClick={() => handleDeleteFile(index)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
            {logofile.length === 0 && (
              <li className="list-group-item text-muted">No images uploaded</li>
            )}
          </ul>
        </div>

        {typeof previewIndex === "number" && logofile[previewIndex] && (
          <div className="mt-3">
            <img
              src={logofile[previewIndex].preview}
              alt="Preview"
              style={{ width: "100%", maxHeight: "300px", objectFit: "contain" }}
            />
            <div className="d-flex gap-2 mt-2">
              <Button size="sm" variant="danger" onClick={() => setPreviewIndex(null)}>
                Close Preview
              </Button>

              <label className="btn btn-sm btn-primary mb-0">
                Replace
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleReplace(previewIndex, e.target.files[0]);
                      e.target.value = "";
                    }
                  }}
                />
              </label>
            </div>
          </div>
        )}
      </Col>

      <Col md={8}>
        <Form.Group>
          <Form.Label>Products/Services Images (Multiple Upload)</Form.Label>
          <DragDropFileInput onFilesSelect={handleFiles} />

          <Row className="mt-3 g-3">
            {logofile.map((img, index) => (
              <Col md={4} key={index}>
                <div className="border rounded p-2 d-flex flex-column align-items-center">
                  <img
                    src={img.preview}
                    alt={img.name}
                    style={{ width: "100%", height: "150px", objectFit: "cover" }}
                  />
                  <small className="text-truncate w-100 mt-1">{img.name}</small>

                  <div className="d-flex justify-content-between w-100 mt-2">
                    <Button variant="outline-danger" size="sm" onClick={() => handleDeleteFile(index)}>
                      Delete
                    </Button>

                    <label className="btn btn-primary btn-sm mb-0">
                      Replace
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleReplace(index, e.target.files[0]);
                            e.target.value = "";
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Form.Group>
      </Col>
    </Row>

    <Form onSubmit={handleSubmit} id="listingForm">

    </Form>
    </>

  );
}

export default Image_Gallery;
