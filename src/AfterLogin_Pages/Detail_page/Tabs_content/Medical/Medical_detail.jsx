import React from "react";
import { 
  FaUserMd, FaHospital, FaCalendarAlt, FaClock, FaMoneyBillWave, 
  FaPhoneAlt, FaStethoscope, FaNotesMedical, FaRupeeSign, FaHourglassHalf ,
} from "react-icons/fa";
import "../Medical/Medical_Detail.css";

function Medical_detail({ singledetail }) {
  const medical_detail = singledetail?.medical_detail || [];
  const medical_service = singledetail?.medical_service || [];

  if (!medical_detail.length && !medical_service.length) {
    return <p className="text-center text-muted mt-3">No medical details available.</p>;
  }

  return (
    <div className="row g-4">
        <h4 className="text-primary mb-2">
            <FaStethoscope className="me-2" />
            Medical Detail
          </h4>
      {/* Medical Specialization Details */}
      {medical_detail.map((med) => (
        <div key={med.id} className="col-lg-12 col-md-12">
              
          <div className="med-card p-4 shadow-sm border rounded hover-card h-100">
            <h5 className="med-card-title mb-3 text-primary d-flex align-items-center">
              <FaNotesMedical className="me-2" />
              {med.specialization?.Specialization_name || "Specialization Detail"}
            </h5>

            <div className="row mb-3">
              <div className="col-6 mb-2 d-flex align-items-center">
                <FaHospital className="me-2 text-info" />
                <span><strong>License Number:</strong> {med.license_number || "N/A"}</span>
              </div>
              <div className="col-6 mb-2 d-flex align-items-center">
                <FaUserMd className="me-2 text-success" />
                <span><strong>No. of Doctors:</strong> {med.No_of_doctors || "N/A"}</span>
              </div>
              <div className="col-6 mb-2 d-flex align-items-center">
                <FaCalendarAlt className="me-2 text-secondary" />
                <span><strong>Established Date:</strong> {med.established_date || "N/A"}</span>
              </div>
              <div className="col-6 mb-2 d-flex align-items-center">
                <FaClock className="me-2 text-warning" />
                <span><strong>Years of Operation:</strong> {med.Years_of_operation || "N/A"}</span>
              </div>
              <div className="col-6 mb-2 d-flex align-items-center">
                <FaMoneyBillWave className="me-2 text-danger" />
                <span><strong>Fees Range:</strong> ₹{med.Fees_range || "0"}</span>
              </div>
              <div className="col-6 mb-2 d-flex align-items-center">
                <FaPhoneAlt className="me-2 text-primary" />
                <span><strong>Mode of Appointment:</strong> {med.Mode_of_appointment || "N/A"}</span>
              </div>
              <div className="col-12 mb-2 d-flex align-items-center">
                <FaClock className="me-2 text-info" />
                <span><strong>Doctor Availability:</strong> {med.Availability_of_doctors || "N/A"}</span>
              </div>
              <div className="col-12 mb-2 d-flex align-items-center">
                <FaClock className="me-2 text-success" />
                <span><strong>Online Service:</strong> {med.Online_service || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Medical Services */}
      {medical_service.length > 0 && (
        <div className="col-12">
          <h4 className="text-primary mb-3 mt-4">
            <FaNotesMedical className="me-2" />
            Medical Services
          </h4>

          <div className="row g-3">
            {medical_service.map((service) => (
              <div key={service.id} className="col-md-12">
                <div className="med-card p-3 shadow-sm border rounded hover-card h-100">
                  <h6 className="text-secondary d-flex align-items-center mb-2">
                    <FaStethoscope className="me-2 text-primary" />
                    {service.service_name?.name || "Service"}
                  </h6>

                  <div className="d-flex justify-content-between mb-1">
                    <FaRupeeSign className="me-1 text-success" />
                    <span><strong>Price Range:</strong> {service.price_range || "N/A"}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-1">
                    <FaHourglassHalf className="me-1 text-warning" />
                    <span><strong>Duration:</strong> {service.duration || "N/A"}</span>
                  </div>
                  <div className="mb-1">
                    <strong>Description:</strong> {service.description || "N/A"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default Medical_detail;
