import React from "react";
import {
    FaUserTie,
    FaPhoneAlt,
    FaEnvelope,
    FaBriefcase,
    FaCalendarAlt,
    FaClock,
    FaUserGraduate
} from "react-icons/fa";

function PartnerStaff({ partnerStaff }) {
    const staffList = partnerStaff?.partner_staff_detail || [];

    if (staffList.length === 0) {
        return (
            <div className="container py-4">
                <h2 className="text-primary mb-3 d-flex align-items-center">
                    <FaUserTie className="me-2" />Team Detail
                </h2>
                <p>No Team Detail  available.</p>
            </div>
        );
    }

    return (
        <div className="">
            <h2 className="text-primary mb-4 d-flex align-items-center">
                <FaUserTie className="me-2" />Team Detail
            </h2>
              <hr cslassName="mb-3 p-0" />

            {staffList.map((staff) => (
                <div key={staff.id} className="staff-card shadow-sm p-3 mb-4">
                    <div className="row align-items-center">
                        {/* Left Column: Name, Designation, Specialization */}
                        <div className="col-md-6 mb-3 mb-md-0">
                            <div className="mb-2">
                                <strong>  <FaUserTie className="me-2 text-primary"  /> Name:</strong> {staff.name}
                            </div>
                            <div className="mb-2 d-flex align-items-center">
                                <FaBriefcase className="me-2 text-primary" />
                                <span>
                                    <strong>Designation:</strong> {staff.designation?.position}
                                </span>
                            </div>

                            {/* {staff.specialization?.Specialization_name && (
                                <div className="mb-2 d-flex align-items-center">
                                    <FaUserGraduate className="me-2 text-info" />
                                    <span>
                                        <strong>Specialization:</strong> {staff.specialization.Specialization_name}
                                    </span>
                                </div>
                            )} */}

                        </div>

                        {/* Right Column: Phone, Email, Availability */}
                        <div className="col-md-6">
                            <div className="row ">
                                <div className="col-sm-7 mb-2 d-flex align-items-center">
                                    <FaPhoneAlt className="me-2 text-success" />
                                    <span>
                                        <strong>Phone:</strong> {staff.phone}
                                    </span>
                                </div>
                               
                                <div className="col-sm-5 mb-2 d-flex align-items-center">
                                    <FaCalendarAlt className="me-2 text-warning" />
                                    <span>
                                        <strong>Available Days:</strong> {staff.available_days || "N/A"}
                                    </span>
                                </div>
                                 <div className="col-sm-7 mb-2 d-flex align-items-center">
                                    <FaEnvelope className="me-2 text-danger" />
                                    <span>
                                        <strong>Email:</strong>{" "}
                                        <a href={`mailto:${staff.email}`} className="text-decoration-none">
                                            {staff.email}
                                        </a>
                                    </span>
                                </div>
                                <div className="col-sm-5 mb-2 d-flex align-items-center">
                                    <FaClock className="me-2 text-secondary" />
                                    <span>
                                        <strong>Available Hours:</strong> {staff.available_time || "N/A"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <style jsx>{`
            .staff-card {
              border-radius: 1rem;
              background: #fff;
              border: 1px solid #e0e0e0;
              transition: transform 0.3s, box-shadow 0.3s;
            }
            .staff-card:hover {
              transform: translateY(-5px);
              box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
            }
          `}</style>
                </div>
            ))}
        </div>
    );
}

export default PartnerStaff;
