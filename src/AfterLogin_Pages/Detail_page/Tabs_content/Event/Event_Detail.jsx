import React from "react";
import { 
  FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaInfoCircle, FaLaptop 
} from "react-icons/fa";
import "../Event/Event_Detail.css"

function Event_Detail({ singledetail }) {
  const event_detail = singledetail?.event_detail || [];

  if (!event_detail.length) {
    return <p className="text-center text-muted mt-3">No event details available.</p>;
  }

  return (

    <div className="row g-4">
      {event_detail.map((event) => (
        <div key={event.id} className="col-lg-12 col-md-12">
          <div className="event-card p-4 shadow-sm border rounded hover-card h-100">
            <h5 className="event-title mb-3 text-primary d-flex align-items-center">
              <FaInfoCircle className="me-2" />
              {event.Title || "Event Detail"}
            </h5>

            <div className="mb-2 d-flex align-items-center">
              <FaInfoCircle className="me-2 text-secondary" />
              <span><strong>Tag Line:</strong> {event.Tag_Line || "N/A"}</span>
            </div>

            <div className="mb-2">
                <span>
              <strong>About Event: </strong>
                 {event.About_Event || "N/A"}
                 </span>
            </div>

            <div className="row">
              <div className="col-6 mb-2 d-flex align-items-center">
                <FaMapMarkerAlt className="me-2 text-info" />
                <span><strong>Venue:</strong> {event.Venue || "N/A"}</span>
              </div>
              <div className="col-6 mb-2 d-flex align-items-center">
                <FaUsers className="me-2 text-success" />
                <span><strong>Audience Age:</strong> {event.Audience_AgeGroup?.name || "N/A"}</span>
              </div>
              <div className="col-6 mb-2 d-flex align-items-center">
                <FaCalendarAlt className="me-2 text-warning" />
                <span><strong>Start Date:</strong> {event.Start_Date || "N/A"}</span>
              </div>
              <div className="col-6 mb-2 d-flex align-items-center">
                <FaCalendarAlt className="me-2 text-danger" />
                <span><strong>End Date:</strong> {event.End_Date || "N/A"}</span>
              </div>
              <div className="col-6 mb-2 d-flex align-items-center">
                <FaClock className="me-2 text-secondary" />
                <span><strong>Start Time:</strong> {event.Start_Time || "N/A"}</span>
              </div>
              <div className="col-6 mb-2 d-flex align-items-center">
                <FaClock className="me-2 text-primary" />
                <span><strong>End Time:</strong> {event.End_Time || "N/A"}</span>
              </div>
              <div className="col-6 mb-2 d-flex align-items-center">
                <FaLaptop className="me-2 text-info" />
                <span><strong>Online Event:</strong> {event.Is_Online ? "Yes" : "No"}</span>
              </div>
              <div className="col-6 mb-2 d-flex align-items-center">
                <FaUsers className="me-2 text-warning" />
                <span><strong>Expected Audience:</strong> {event.Expected_Audience || "N/A"}</span>
              </div>
              <div className="col-12 mb-2 d-flex align-items-center">
                <FaLaptop className="me-2 text-success" />
                <span><strong>Registration Required:</strong> {event.Registration_Required ? "Yes" : "No"}</span>
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}

export default Event_Detail;
