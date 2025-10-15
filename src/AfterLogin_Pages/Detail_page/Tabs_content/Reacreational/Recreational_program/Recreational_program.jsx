import React from "react";
import { Card, Table } from "react-bootstrap";
import {
  FaClock,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUsers,
  FaLayerGroup,
  FaChild,
} from "react-icons/fa";

function Recreational_program({ singledetail }) {
  const timings = singledetail?.recreational_timing || [];
  const fees = singledetail?.recreational_fee || [];
  const batches = singledetail?.recreational_batch || [];

  return (
    <div className="container mt-3">
      {/* Recreational Timings */}
      <Card className="mb-4 shadow-lg border-1 rounded">
        <Card.Body>
          <h5 className="mb-3 text-primary d-flex align-items-center">
            <FaClock className="me-2" /> Recreational Timings
          </h5>
          {timings.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Shift</th>
                  <th>Batch Type</th>
                  <th>Age Group</th>
                  <th>Days</th>
                  <th>Time</th>
                  <th>Office Hours</th>
                </tr>
              </thead>
              <tbody>
                {timings.map((t) => (
                  <tr key={t.id}>
                    <td>{t.Activity?.name || "N/A"}</td>
                    <td>{t.shift?.Shift_name || "N/A"}</td>
                    <td>{t.Batch_Type?.name || "N/A"}</td>
                    <td>
                      {t.Age_Group?.age_from_years} - {t.Age_Group?.age_to_years} yrs
                    </td>
                    <td>{t.Days || "N/A"}</td>
                    <td>
                      {t.Time_From} - {t.Time_To}
                    </td>
                    <td>
                      {t.Office_From} - {t.Office_To}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-muted">No timing details available.</p>
          )}
        </Card.Body>
      </Card>

      {/* Recreational Fees */}
      <Card className="mb-4 shadow-lg border-1 rounded">
        <Card.Body>
          <h5 className="mb-3 text-primary d-flex align-items-center">
            <FaMoneyBillWave className="me-2" /> Recreational Fees
          </h5>
          {fees.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Skill Level</th>
                  <th>Batch Type</th>
                  <th>Fee Type</th>
                  <th>Frequency</th>
                  <th>Amount</th>
                  <th>Monthly</th>
                  <th>Annual</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((f) => (
                  <tr key={f.id}>
                    <td>{f.Skill_Level?.name || "N/A"}</td>
                    <td>{f.Batch_Type?.name || "N/A"}</td>
                    <td>{f.Fees_Type?.FeeType_name || "N/A"}</td>
                    <td>{f.Fees_Frequency?.FeeFrequency_name || "N/A"}</td>
                    <td>₹{f.Fees_Amount || "-"}</td>
                    <td>₹{f.Monthly_Fee || "-"}</td>
                    <td>₹{f.Annual_Fee || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-muted">No fee details available.</p>
          )}
        </Card.Body>
      </Card>

      {/* Recreational Batches */}
      <Card className="mb-4 shadow-lg border-1 rounded">
        <Card.Body>
          <h5 className="mb-3 text-primary d-flex align-items-center">
            <FaUsers className="me-2" /> Recreational Batches
          </h5>
          {batches.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Batch Name</th>
                  <th>Activity</th>
                  <th>Batch Type</th>
                  <th>Skill Level</th>
                  <th>Age Group</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Capacity</th>
                  <th>Enrolment Open</th>
                </tr>
              </thead>
              <tbody>
                {batches.map((b) => (
                  <tr key={b.id}>
                    <td>{b.Batch_Name || "N/A"}</td>
                    <td>{b.Activity?.name || "N/A"}</td>
                    <td>{b.Batch_Type?.name || "N/A"}</td>
                    <td>{b.Skill_Level?.name || "N/A"}</td>
                    <td>
                      {b.Age_Group?.age_from_years} - {b.Age_Group?.age_to_years} yrs
                    </td>
                    <td>{b.Start_Date || "-"}</td>
                    <td>{b.End_Date || "-"}</td>
                    <td>{b.Capacity || "-"}</td>
                    <td>{b.Enrol_Open || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-muted">No batch details available.</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Recreational_program;
