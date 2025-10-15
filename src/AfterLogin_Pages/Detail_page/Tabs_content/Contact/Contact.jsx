import React from "react";
import { 
  FaPhone, 
  FaEnvelope, 
  FaGlobe, 
  FaWhatsapp, 
  FaUserTie ,
   FaPhoneAlt
} from "react-icons/fa";

function Contact({ singledetail }) {
  if (!singledetail) return null;

  return (
    <div className="contact-section ">
          <h2 className="text-primary mb-3 d-flex align-items-center">
             < FaPhoneAlt className="me-2" aria-label="Phone" /> Contact Information
          </h2>
                  <hr className="mb-3 p-0" />

      <div className="card shadow-sm rounded contact-card">
        <div className="card-body">

          <div className="row mb-2">
            <div className="col-md-3 text-primary fw-bold d-flex align-items-center">
              < FaPhoneAlt className="me-2" aria-label="Phone" /> Mobile
            </div>
            <div className="col-md-9 ">
              {singledetail?.list_mobno || singledetail?.list_mobno || "-"}
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-3 text-primary fw-bold d-flex align-items-center">
              <FaEnvelope className="me-2" /> Email
            </div>
            <div className="col-md-9 ">
              {singledetail?.list_email || singledetail?.list_email || "-"}
            </div>
          </div>

          {singledetail.whats_up && (
            <div className="row mb-2">
              <div className="col-md-3 text-primary fw-bold d-flex align-items-center">
                <FaWhatsapp className="me-2" /> WhatsApp
              </div>
              <div className="col-md-9 ">{singledetail?.whats_up}</div>
            </div>
          )}

          {singledetail?.website && (
            <div className="row mb-2">
              <div className="col-md-3 text-primary fw-bold d-flex align-items-center">
                <FaGlobe className="me-2" /> Website
              </div>
              <div className="col-md-9 ">
                <a href={singledetail?.website} target="_blank" rel="noopener noreferrer" className="text-primary">
                  {singledetail?.website}
                </a>
              </div>
            </div>
          )}
         

          {/* Optional additional fields */}
          {/* <div className="row mb-2">
            <div className="col-md-3 text-primary fw-bold d-flex align-items-center">
              GSTIN
            </div>
            <div className="col-md-9 ">
              {singledetail.gstin || "-"}
            </div>
          </div> */}
{/* 
          <div className="row mb-2">
            <div className="col-md-3 text-primary fw-bold d-flex align-items-center">
              Bank
            </div>
            <div className="col-md-9 ">
              {singledetail.bank || "-"} | A/C: {singledetail.account_number || "-"} | IFSC: {singledetail.ifsc_code || "-"}
            </div>
          </div> */}
           <hr></hr>
            <h4 className="text-primary mb-3 d-flex align-items-center">
             <FaUserTie className="me-2" />  Person Contact
          </h4>
          <div className="row mb-2">
  <div className="col-md-3 text-primary fw-bold d-flex align-items-center">
    <FaUserTie className="me-2" aria-label="Phone" />
    Person Name
  </div>
  <div className="col-md-9">
    {singledetail?.person_name || "-"}{" "}
    {singledetail?.person_designation?.position && (
      <span>({singledetail.person_designation.position})</span>
    )}
  </div>
</div>

           {/* <div className="row mb-2">
            <div className="col-md-3 text-primary fw-bold d-flex align-items-center">
              < FaPhoneAlt className="me-2" aria-label="Phone" />Person Name
            </div>
            <div className="col-md-9 ">
              {singledetail?.person_name || singledetail?.person_name || "-"}
            </div>
          </div> */}
           <div className="row mb-2">
            <div className="col-md-3 text-primary fw-bold d-flex align-items-center">
              < FaPhoneAlt className="me-2" aria-label="Phone" /> Mobile
            </div>
            <div className="col-md-9 ">
              {singledetail?.person_mobile_number || singledetail?.person_mobile_number || "-"}
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-3 text-primary fw-bold d-flex align-items-center">
              <FaEnvelope className="me-2" /> Email
            </div>
            <div className="col-md-9 ">
              {singledetail?.person_email || singledetail?.person_email|| "-"}
            </div>
          </div>

           
        </div>
      </div>

      <style jsx>{`
        .contact-card {
          border-radius: 0.75rem;
          transition: transform 0.3s, box-shadow 0.3s;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        .contact-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  );
}

export default Contact;
