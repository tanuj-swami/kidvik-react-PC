import React from "react";
import { FaSchool, FaClock, FaMoneyBillWave, FaCalendarAlt, FaRupeeSign } from "react-icons/fa";
import "../Education_fee/Education_fess.css"

function Education_fee({ singledetail }) {
  const school_fee_class = singledetail?.school_fee_class || [];

  if (!school_fee_class.length) {
    return <p className="text-center text-muted mt-3">No fee details available.</p>;
  }

  return (
    <div className="row g-4">
      {school_fee_class.map((fee) => (
        <div key={fee.id} className="col-lg-6 col-md-12">
          <div className="edu-card p-4 shadow-sm border rounded hover-card h-100">
            <h5 className="edu-card-title mb-3 text-primary d-flex align-items-center">
              <FaSchool className="me-2" />
              {fee.Class?.class_name || "Class Detail"}
            </h5>

            <div className="row mb-3">
              <div className="col-6 mb-2 d-flex align-items-center">
                <FaClock className="me-2 text-info" />
                <span><strong>Shift:</strong> {fee.Shift?.Shift_name || "N/A"}</span>
              </div>
              <div className="col-6 mb-2 d-flex align-items-center">
                <FaMoneyBillWave className="me-2 text-success" />
                <span><strong>Fee Type:</strong> {fee.Fees_Type?.FeeType_name || "N/A"}</span>
              </div>
              <div className="col-6 mb-2 d-flex align-items-center">
                <FaCalendarAlt className="me-2 text-secondary" />
                <span><strong>Fee Frequency:</strong> {fee.Fees_Frequency?.FeeFrequency_name || "N/A"}</span>
              </div>
              <div className="col-6 mb-2 d-flex align-items-center">
                <FaRupeeSign className="me-2 text-danger" />
                <span><strong>Fees Amount:</strong> ₹{fee.Fees_Amount || "0"}</span>
              </div>
              <div className="col-6 mb-2 d-flex align-items-center">
                <FaRupeeSign className="me-2 text-primary" />
                <span><strong>Annual Fee:</strong> ₹{fee.Annual_Fee || "0"}</span>
              </div>
              <div className="col-6 mb-2 d-flex align-items-center">
                <FaRupeeSign className="me-2 text-warning" />
                <span><strong>Monthly Fee:</strong> ₹{fee.Monthly_Fee || "0"}</span>
              </div>
            </div>

            {fee.remarks && (
              <div className="text-muted mt-2">
                <strong>Remarks:</strong> {fee.remarks}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
    
  );
}

export default Education_fee;
