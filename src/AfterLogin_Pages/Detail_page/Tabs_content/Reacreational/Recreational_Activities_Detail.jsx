import React from "react";
import { Card } from "react-bootstrap";
import {
  FaBuilding,
  FaUsers,
  FaMedal,
  FaCalendarAlt,
  FaChild,
  FaRupeeSign,
  FaInfoCircle,
  FaCogs,
  FaDumbbell,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import "../Reacreational/Recreational_detail.css"

function Recreational_Activities_Detail({ singledetail }) {
  const recreational_detail = singledetail?.recreational_detail || [];
  const recreational_equipment_provided =
    singledetail?.recreational_equipment_provided || [];

  if (!recreational_detail.length) {
    return (
      <p className="text-center text-muted mt-3">
        No Recreational Activity details available.
      </p>
    );
  }

  const rec = recreational_detail[0]; // since it's only one

  return (
    <div className="row">
      {/* Main Detail Card */}
      <div className="col-lg-12 mb-4">
        <Card className="shadow-lg border-1 rounded h-100">
          <Card.Body>
            <h4 className="mb-3 text-primary d-flex align-items-center">
              <FaInfoCircle className="me-2" /> Recreational Activity Details
            </h4>

            <div className="row">
              <div className="col-md-6 mb-2">
                <FaBuilding className="me-2 text-secondary" />
                <strong>Ownership:</strong>{" "}
                {rec.Ownership?.Ownership_name || "N/A"}
              </div>
              <div className="col-md-6 mb-2">
                <FaUsers className="me-2 text-success" />
                <strong>Co-Ed Status:</strong>{" "}
                {rec.Co_Ed_Status?.Co_Ed_Status_name || "N/A"}
              </div>
              <div className="col-md-6 mb-2">
                <FaMedal className="me-2 text-warning" />
                <strong>Skill Level:</strong> {rec.Skill_Level?.name || "N/A"}
              </div>
              <div className="col-md-6 mb-2">
                <FaCalendarAlt className="me-2 text-info" />
                <strong>Year of Establishment:</strong>{" "}
                {rec.Year_of_Establishment || "N/A"}
              </div>
              <div className="col-md-6 mb-2">
                <FaCogs className="me-2 text-primary" />
                <strong>Type:</strong> {rec.Indoor_Outdoor || "N/A"}
              </div>
              <div className="col-md-6 mb-2">
                <FaUsers className="me-2 text-danger" />
                <strong>Batch Capacity:</strong> {rec.Batch_Capacity || "N/A"}
              </div>
              <div className="col-md-6 mb-2">
                <FaChild className="me-2 text-secondary" />
                <strong>Age Group:</strong> {rec.Min_Age_Years} -{" "}
                {rec.Max_Age_Years} years
              </div>
              <div className="col-md-6 mb-2">
                <FaRupeeSign className="me-2 text-success" />
                <strong>Annual Fee:</strong> ₹{rec.Annual_Fee || "N/A"}
              </div>
              <div className="col-md-6 mb-2">
                <FaRupeeSign className="me-2 text-warning" />
                <strong>Avg Monthly Fee:</strong> ₹
                {rec.Avg_Monthly_Fee || "N/A"}
              </div>
              <div className="col-md-6 mb-2">
                {rec.Trial_Class_Available ? (
                  <FaCheckCircle className="me-2 text-success" />
                ) : (
                  <FaTimesCircle className="me-2 text-danger" />
                )}
                <strong>Trial Class:</strong>{" "}
                {rec.Trial_Class_Available ? "Available" : "Not Available"}
              </div>
              <div className="col-md-6 mb-2">
                {rec.Equipment_Provided ? (
                  <FaCheckCircle className="me-2 text-success" />
                ) : (
                  <FaTimesCircle className="me-2 text-danger" />
                )}
                <strong>Equipment Provided:</strong>{" "}
                {rec.Equipment_Provided ? "Yes" : "No"}
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Equipment Section */}
      {rec.Equipment_Provided && recreational_equipment_provided.length > 0 && (
        <div className="col-lg-12">
          <Card className="shadow-lg border-1 rounded">
            <Card.Body>
              <h5 className="mb-3 text-primary d-flex align-items-center">
                <FaDumbbell className="me-2" /> Equipment Details
              </h5>
              <div className="row">
                {recreational_equipment_provided.map((eq) => (
                  <div className="col-md-4 mb-3" key={eq.id}>
                    <Card className="h-100 shadow-sm border rounded text-center p-3 hover-card">
                      <FaDumbbell className="mb-2 text-dark" size={30} />
                      <h6 className="fw-bold mb-1">
                        {eq.equipment?.name || "N/A"}
                      </h6>
                      <p className="text-muted mb-0">
                        Qty: {eq.qty_available || 0}
                      </p>
                    </Card>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
}

export default Recreational_Activities_Detail;
