import React from "react";
import {
  FaWpforms,
  FaChild,
  FaPercentage,
  FaUsers,
  FaPencilAlt,
  FaComments,
  FaUserFriends,
  FaRupeeSign,
} from "react-icons/fa";
import "../Education Admission Criteria/Education_criteria.css"

function Education_admission_criteria({ singledetail }) {
  const admissionCriteria = singledetail?.institute_admission_criteria || [];

  if (!admissionCriteria.length) {
    return <p>No admission criteria available.</p>;
  }

  return (
    <div className="admission-criteria">
      {admissionCriteria.map((criteria) => (
        <div
          key={criteria.id}
          className="admission-card p-4 mb-4 shadow-sm rounded"
        >
          <h4 className="mb-3 text-primary">Admission Criteria</h4>

          <div className="row">
            {/* Left Column */}
            <div className="col-md-6">
              <div className="admission-item">
                <FaWpforms className="admission-icon text-info me-2" />
                <strong>Form Availability:</strong>{" "}
                {criteria.Form_Availability?.Availability_name || "N/A"}
              </div>

              <div className="admission-item">
                <FaChild className="admission-icon text-warning me-2" />
                <strong>Age Criteria:</strong> {criteria.Age_Criteria || "N/A"}
              </div>

              <div className="admission-item">
                <FaPercentage className="admission-icon text-success me-2" />
                <strong>Eligibility Marks:</strong>{" "}
                {criteria.Eligibility_Marks || "N/A"}%
              </div>

              <div className="admission-item">
                <FaUsers className="admission-icon text-secondary me-2" />
                <strong>Total Seats:</strong> {criteria.Total_Seats || "N/A"}
              </div>
            </div>

            {/* Right Column */}
            <div className="col-md-6">
              <div className="admission-item">
                <FaPencilAlt className="admission-icon text-danger me-2" />
                <strong>Written Test:</strong>{" "}
                {criteria.Written_Test || "N/A"}
              </div>

              <div className="admission-item">
                <FaComments className="admission-icon text-primary me-2" />
                <strong>Student Interaction:</strong>{" "}
                {criteria.Student_Interaction || "N/A"}
              </div>

              <div className="admission-item">
                <FaUserFriends className="admission-icon text-dark me-2" />
                <strong>Parents Interaction:</strong>{" "}
                {criteria.Parents_Interaction || "N/A"}
              </div>

              <div className="admission-item">
                <FaRupeeSign className="admission-icon text-success me-2" />
                <strong>Form Fee:</strong> ₹{criteria.Form_fee || "N/A"}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Education_admission_criteria;
