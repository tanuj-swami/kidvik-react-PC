import React from "react";
import {
  FaUniversity,
  FaUserTie,
  FaVenusMars,
  FaExpandArrowsAlt,
  FaTree,
  FaLanguage,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaChalkboardTeacher,
  FaUsers,
  FaRupeeSign,

   FaBook, FaGlobe, 
} from "react-icons/fa";

function Education_Detail({ singledetail }) {
  const instituteDetails = singledetail?.institute_detail || [];
  const instituteboard = singledetail?.institute_board || [];

  if (!instituteDetails.length) {
    return <p>No education details available.</p>;
  }

  const boardIcons = {
  CBSE: <FaBook className="edu-icon text-primary me-2 " />,
  ICSE: <FaUniversity className="edu-icon text-success me-2 " />,
  IB: <FaGlobe className="edu-icon text-warning me-2 " />,
  IGCSE: <FaLanguage className="edu-icon text-info me-2 " />,
};


  return (
    <div className="education-detail">
      {instituteDetails.map((detail) => (
        <div
          key={detail.id}
          className="edu-card mb-4 p-4 border rounded shadow-lg bg-white"
        >
          <h3 className="mb-4 text-center text-primary border-bottom pb-2">
            {detail.Institute_Format?.Institute_Format_name ||
              "Institute Detail"}
          </h3>

          <div className="row">
            {/* LEFT COLUMN */}
            <div className="col-md-6">
              <h5 className="text-secondary mb-3">General Information</h5>
              <div className="edu-item mb-3">
                <FaUniversity className="edu-icon text-primary me-2" />
                <strong>Category:</strong>{" "}
                {detail.Institute_Category?.InstituteCategory_name || "N/A"}
              </div>

              
               {instituteboard?.map((board, index) => {
    const boardName = board?.Board?.board_name || "N/A";
    const icon = boardIcons[boardName] || <FaBook className="edu-icon text-secondary me-2 " />; // default

    return (
        <div className="edu-item mb-3">
            {icon}
            <strong>Board: </strong> 
            {boardName}
      </div>
    );
  })}
                

              <div className="edu-item mb-3">
                <FaUserTie className="edu-icon text-warning me-2" />
                <strong>Ownership:</strong>{" "}
                {detail.Ownership?.Ownership_name || "N/A"}
              </div>

              <div className="edu-item mb-3">
                <FaVenusMars className="edu-icon text-danger me-2" />
                <strong>Co-Ed Status:</strong>{" "}
                {detail.Co_Ed_Status?.Co_Ed_Status_name || "N/A"}
              </div>

              <div className="edu-item mb-3">
                <FaExpandArrowsAlt className="edu-icon text-success me-2" />
                <strong>Campus Size:</strong> {detail.Campus_Size}{" "}
                {detail.Campus_Size_UOM?.Campus_Size_UOM_name}
              </div>

              <div className="edu-item mb-3">
                <FaTree className="edu-icon text-success me-2" />
                <strong>Campus Type:</strong>{" "}
                {detail.Campus_Type?.Campus_Type_name || "N/A"}
              </div>

              <div className="edu-item mb-3">
                <FaLanguage className="edu-icon text-info me-2" />
                <strong>Language:</strong>{" "}
                {detail.Language_of_Instruction?.LOI_name || "N/A"}
              </div>
           

            </div>

            {/* RIGHT COLUMN */}
            <div className="col-md-6">
              <h5 className="text-secondary mb-3">Additional Details</h5>
              <div className="edu-item mb-3">
                <FaCalendarAlt className="edu-icon text-secondary me-2" />
                <strong>Year of Establishment:</strong>{" "}
                {detail.Year_of_Establishment || "N/A"}
              </div>

              <div className="edu-item mb-3">
                <FaMapMarkerAlt className="edu-icon text-danger me-2" />
                <strong>Geo Location:</strong>{" "}
                {detail.Institute_Format?.Geo_Location || "N/A"}
              </div>

              <div className="edu-item mb-3">
                <FaChalkboardTeacher className="edu-icon text-primary me-2" />
                <strong>Faculty Ratio:</strong>{" "}
                {detail.Faculty_Ratio || "N/A"}
              </div>

              <div className="edu-item mb-3">
                <FaUsers className="edu-icon text-success me-2" />
                <strong>Student Ratio:</strong>{" "}
                {detail.Student_Ratio || "N/A"}
              </div>

              <div className="edu-item mb-3">
                <FaUsers className="edu-icon text-dark me-2" />
                <strong>Total Students:</strong>{" "}
                {detail.Total_Student || "N/A"}
              </div>

              <div className="edu-item mb-3">
                <FaChalkboardTeacher className="edu-icon text-warning me-2" />
                <strong>Total Faculty:</strong>{" "}
                {detail.Total_Faculty || "N/A"}
              </div>

              <div className="edu-item mb-3">
                <FaRupeeSign className="edu-icon text-success me-2" />
                <strong>Annual Fee:</strong>{" "}
                {detail.Annual_Fee || "N/A"}
              </div>

              <div className="edu-item mb-3">
                <FaRupeeSign className="edu-icon text-primary me-2" />
                <strong>Avg. Monthly Fee:</strong>{" "}
                {detail.Avg_Monthly_Fee || "N/A"}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Education_Detail;
