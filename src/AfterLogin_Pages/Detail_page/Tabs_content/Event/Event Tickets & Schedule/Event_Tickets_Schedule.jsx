import React from "react";
import { 
  FaTicketAlt, FaCalendarAlt, FaClock, FaInfoCircle, FaUsers, FaMoneyBillWave 
} from "react-icons/fa";
import "../Event Tickets & Schedule/Event_Ticket.css";

function Event_Tickets_Schedule({ singledetail }) {
  const event_ticket = singledetail?.event_ticket || [];
  const event_schedule = singledetail?.event_schedule || [];

  if (!event_ticket.length && !event_schedule.length) {
    return <p className="text-center text-muted mt-3">No ticket or schedule details available.</p>;
  }

  return (
    <div className="row g-4">
      {/* Event Tickets */}
      {event_ticket.length > 0 && (
        <div className="col-12">
          <h4 className="text-primary mb-3 d-flex align-items-center">
            <FaTicketAlt className="me-2" />
            Event Tickets
          </h4>
          <div className="row g-3">
            {event_ticket.map((ticket) => (
              <div key={ticket.id} className="col-md-12">
                <div className="ticket-card p-3 shadow-sm border rounded hover-card h-100">
                  <h5 className="mb-2 d-flex align-items-center text-secondary">
                    <FaInfoCircle className="me-2 text-primary" />
                    {ticket.ticket_type?.name || "Ticket Type"}
                  </h5>
                  <div className="mb-1">
                    <FaMoneyBillWave className="me-1 text-success" />
                    <strong>Price:</strong> ₹{ticket.Price || "0"}
                  </div>
                  <div className="mb-1">
                    <FaUsers className="me-1 text-warning" />
                    <strong>Quantity Available:</strong> {ticket.Quantity_Available || 0}
                  </div>
                  <div className="mb-1">
                    <FaUsers className="me-1 text-danger" />
                    <strong>Quantity Sold:</strong> {ticket.Quantity_Sold || 0}
                  </div>
                  {ticket.remarks && (
                    <div className="text-muted"><strong>Remarks:</strong> {ticket.remarks}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Event Schedule */}
      {event_schedule.length > 0 && (
        <div className="col-12 mt-4">
          <h4 className="text-primary mb-3 d-flex align-items-center">
            <FaCalendarAlt className="me-2" />
            Event Schedule
          </h4>
          <div className="row g-3">
            {event_schedule.map((schedule) => (
              <div key={schedule.id} className="col-md-12">
                <div className="schedule-card p-3 shadow-sm border rounded hover-card h-100">
                  <h5 className="mb-2 d-flex align-items-center text-secondary">
                    <FaInfoCircle className="me-2 text-primary" />
                    {schedule.Title || "Schedule Title"}
                  </h5>
                  <div className="mb-1">
                    <FaCalendarAlt className="me-1 text-warning" />
                    <strong>Date:</strong> {schedule.Date || "N/A"}
                  </div>
                  <div className="mb-1">
                    <FaClock className="me-1 text-success" />
                    <strong>Time:</strong> {schedule.Time_From || "N/A"} - {schedule.Time_To || "N/A"}
                  </div>
                  <div className="mb-1">
                    <FaInfoCircle className="me-1 text-secondary" />
                    <strong>Description:</strong> {schedule.Description || "N/A"}
                  </div>
                  {schedule.remarks && (
                    <div className="text-muted"><strong>Remarks:</strong> {schedule.remarks}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Event_Tickets_Schedule;
