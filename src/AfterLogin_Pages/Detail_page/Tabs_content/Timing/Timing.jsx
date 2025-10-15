import React from "react";
import { FaClock, FaSchool, FaUsers } from "react-icons/fa";

function Timing({ instituteTiming }) {
  const timings = instituteTiming?.institute_timing || [];

  if (timings.length === 0) {
    return (
      <div className="container py-4">
        <h4 className="text-primary mb-3 d-flex align-items-center">
          <FaClock className="me-2" /> Institute Timing
        </h4>
        <p>No timing information available.</p>
      </div>
    );
  }

  return (
    <div className="content-section">
      <h2 className="text-primary mb-2 d-flex align-items-center">
        <FaClock className="me-2" />Timing
      </h2>
            <hr className="mb-2" />


      <div className="row g-4">
        {timings.map((timing) => (
          <div key={timing.id} className="col-12 col-md-6 col-lg-4">
            <div className="timing-card shadow-sm border p-3 rounded h-100">
              {/* Shift */}
              <div className="mb-2 d-flex align-items-center">
                <FaSchool className="me-2 text-primary" />
                <span>
                  <strong>Shift:</strong> {timing.Shift?.Shift_name || "N/A"}
                </span>
              </div>

              {/* Class Group */}
              <div className="mb-2 d-flex align-items-center">
                <FaUsers className="me-2 text-success" />
                <span>
                  <strong>Class Group:</strong> {timing.class_Group?.Class_Group_Name || "N/A"}
                </span>
              </div>

              {/* Institute Time */}
              <div className="mb-1">
                <strong>Institute Time:</strong> {timing.Institute_Time_From} - {timing.Institute_Time_To}
              </div>

              {/* Office Time */}
              <div className="mb-1">
                <strong>Office Time:</strong> {timing.Institute_Office_From} - {timing.Institute_Office_To}
              </div>

              {/* Remarks */}
              {timing.remarks && (
                <div className="mt-2 text-secondary">
                  <strong>Remarks:</strong> {timing.remarks}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .timing-card {
          border-radius: 1rem;
          background: #fff;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .timing-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
        }
        @media (max-width: 576px) {
          .timing-card {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}

export default Timing;
