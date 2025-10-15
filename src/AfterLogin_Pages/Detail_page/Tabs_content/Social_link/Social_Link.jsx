import React from "react";
import { FaLink, FaGlobe } from "react-icons/fa";

function SocialLink({ instituteSocialLinks }) {
  const links = instituteSocialLinks?.institute_social_links || [];

  if (links.length === 0) {
    return (
      <div className="container py-4">
        <h4 className="text-primary mb-3 d-flex align-items-center">
          <FaGlobe className="me-2" /> Social Links
        </h4>
        <p>No social links available.</p>
      </div>
    );
  }

  return (
    <div className="content-section">
      <h2 className="text-primary mb-2 d-flex align-items-center">
        <FaGlobe className="me-2" /> Social Links
      </h2>
      <hr className="mb-2" />

      <div className="row g-3">
        {links.map((link) => {
          const href = link.Link.startsWith("http") ? link.Link : `https://${link.Link}`;
          return (
            <div key={link.id} className="col-12 col-sm-6 col-md-4">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-card d-flex align-items-center p-3 shadow-sm border text-decoration-none"
              >
                <FaLink className="me-3 text-primary" size={24} />
                <div>
                  <p className="mb-1 fw-bold">{link.LinkType?.URLLinkType_name || "Link"}</p>
                  <small className="text-secondary">{link.remarks || link.Link}</small>
                </div>
              </a>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .social-card {
          border-radius: 1rem;
          transition: transform 0.3s, box-shadow 0.3s;
          background: #fff;
          border: 1px solid #e0e0e0;
        }
        .social-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.15);
        }
        @media (max-width: 576px) {
          .social-card {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}

export default SocialLink;
