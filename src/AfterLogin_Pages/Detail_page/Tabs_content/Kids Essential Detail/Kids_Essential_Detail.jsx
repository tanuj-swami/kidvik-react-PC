import React from "react";
import { Card } from "react-bootstrap";
import { FaTag, FaChild, FaInfoCircle, FaDollarSign, FaBox } from "react-icons/fa";

function Kids_Essential_Detail({ singledetail }) {

const kidsessentials_detail = singledetail?.kidsessentials_detail || []

  if (!kidsessentials_detail) {
    return <p className="text-center text-muted mt-3">No event details available.</p>;
  }

  return (
    <div className="row">
      {kidsessentials_detail.length > 0 ? (
        kidsessentials_detail.map((item) => (
          <div className="col-md-6 mb-4" key={item.id}>
            <Card className="shadow-sm h-100">
              <Card.Body>
                {/* Item Name */}
                <h5 className="text-primary mb-3 d-flex align-items-center">
                  <FaBox className="me-2" />
                  {item.Item_Name || "N/A"}
                </h5>

                {/* Brand */}
                <p className="mb-2">
                  <FaTag className="me-2 text-success" />
                  <strong>Brand:</strong> {item.brand?.name || "N/A"}
                </p>

                {/* Age Group */}
                <p className="mb-2">
                  <FaChild className="me-2 text-warning" />
                  <strong>Age Group:</strong>{" "}
                  {item.AgeGroup?.name} (
                  {item.AgeGroup?.age_from_years} -{" "}
                  {item.AgeGroup?.age_to_years} years)
                </p>

                {/* Description */}
                <p className="mb-2">
                  <FaInfoCircle className="me-2 text-info" />
                  <strong>Description:</strong> {item.Description || "N/A"}
                </p>

                {/* Price */}
                <p className="mb-2">
                  <FaDollarSign className="me-2 text-danger" />
                  <strong>Price:</strong> ₹{item.Price}
                </p>

                {/* Item Type */}
                <p className="mb-0">
                  <FaBox className="me-2 text-secondary" />
                  <strong>Type:</strong> {item.Item_Type || "N/A"}
                </p>
              </Card.Body>
            </Card>
          </div>
        ))
      ) : (
        <p className="text-muted">No Kids Essentials available</p>
      )}
    </div>
  );
}

export default Kids_Essential_Detail;
