import {
  FaUserTie,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGlobe,
  FaIdBadge,
   FaInfoCircle,
   FaPhoneAlt
} from "react-icons/fa";
import { BASE_URL } from "../../../../Helper/Base_Url";
import { Link } from "react-router-dom";

function Overview({ singledetail }) {
  const category = singledetail?.category;
  const subCategory = singledetail?.sub_category;
  const partnerExtra = singledetail?.partnerextravalues || [];

  return (
    <div className="overview-section">
      {/* Business Identity */}
<h2 className="text-primary mb-2 d-flex align-items-center">
  <FaInfoCircle className="me-2" /> Our Overview
</h2>    <hr className="mb-3- p-0"></hr>


     <div className="card mb-4 overview-card">
        <div className="card-body">
          <div className="row align-items-start">
            {/* Left column: Section title with icon */}
            <div className="col-md-3 text-primary fw-bold d-flex align-items-center section-title">
              <FaInfoCircle className="me-2" /> Business Info
            </div>

            {/* Right column: Content */}
            <div className="col-md-9 section-content">
              <h3 className="card-title mb-1">
                {singledetail?.listing_name}
              </h3>
              {singledetail?.Tag_Line && (
                <p className="card-subtitle text-muted fst-italic mb-1">
                  “{singledetail.Tag_Line}”
                </p>
              )}
              <p className="text-secondary">
                {category?.name} {subCategory && `• ${subCategory?.name}`}
              </p>
            </div>
          </div>
        </div>
      </div>


      {/* About */}
      <div className="card mb-4 overview-card">
        <div className="card-body">
          <div className="row align-items-start">
            <div className="col-md-3 text-primary fw-bold d-flex align-items-center section-title">
              <FaIdBadge className="me-2" /> About / description
            </div>
            <div className="col-md-9  section-content">
              {singledetail?.description || "No description available"}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="card mb-4 overview-card">
        <div className="card-body">
          <div className="row align-items-start">
            <div className="col-md-3 text-primary fw-bold d-flex align-items-center section-title">
              <FaMapMarkerAlt className="me-2" /> Contact Information
            </div>
            <div className="col-md-9  section-content">
              <p><FaMapMarkerAlt className="me-2 text-primary" /> {singledetail?.address_1}, {singledetail?.address_2}, {singledetail?.pincode}</p>
              <p><FaPhoneAlt className="me-2 text-success" /> {singledetail?.list_mobno || singledetail?.contact_number}</p>
              <p><FaEnvelope className="me-2 text-danger" /> {singledetail?.list_email || singledetail?.email_address}</p>
              {singledetail?.website && (
                <p><FaGlobe className="me-2 text-info" /> <Link to={singledetail.website} target="_blank" className="text-secondary">{singledetail.website}</Link></p>
              )}
            </div>
          </div>
        </div>
      </div>


      {/* Business Head */}
      {singledetail?.person_name && (
        <div className="card mb-4 overview-card">
          <div className="card-body">
            <div className="row align-items-start">
              <div className="col-md-3 text-primary fw-bold d-flex align-items-center section-title">
                <FaUserTie className="me-2" /> Business Head
              </div>
              <div className="col-md-9  section-content">
                <p><FaUserTie className="me-2 text-warning" /> {singledetail.person_name} ({singledetail.person_designation?.position})</p>
                <p><FaPhoneAlt className="me-2 text-success" /> {singledetail.person_mobile_number}</p>
                <p><FaEnvelope className="me-2 text-danger" /> {singledetail.person_email}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Additional Information */}
      {partnerExtra.length > 0 && (
        <div className="card mb-4 overview-card">
          <div className="card-body">
            <div className="row align-items-start">
              <div className="col-md-3 text-primary fw-bold d-flex align-items-center section-title">
                <FaIdBadge className="me-2" /> Additional Information
              </div>
              <div className="col-md-9  section-content">
                <ul className="list-unstyled mb-0">
                  {partnerExtra.map((item, i) => (
                    <li key={i} className="d-flex justify-content-between border-bottom py-1">
                      <span className="fw-bold">{item.label}:</span>
                      <span>{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS */}
      <style jsx>{`
        .overview-card {
          border-radius: 0.75rem;
          transition: transform 0.3s, box-shadow 0.3s;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .overview-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        }

        .section-title {
          font-size: 1.1rem;
        }

        .section-content p {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
}

export default Overview;
