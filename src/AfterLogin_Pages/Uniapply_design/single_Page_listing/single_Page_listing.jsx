import React from "react";
import { FaMapMarkerAlt, FaDownload, FaPhoneAlt, FaHeart } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

function Single_Page_listing() {
  return (
    <div className="container mt-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb small">
          <li className="breadcrumb-item"><a href="/">Home</a></li>
          <li className="breadcrumb-item"><a href="#">Gurugram</a></li>
          <li className="breadcrumb-item active" aria-current="page">
            Manav Rachna International School (MRIS), Sector 51, Gurugram
          </li>
        </ol>
      </nav>

      {/* Header Section */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            {/* Logo */}
            <div className="col-md-2 text-center">
              <img
                src="/img/logo/Kidvik_Final_logo01.jpg.png"
                alt="School Logo"
                className="img-fluid rounded"
                style={{ maxHeight: "80px" }}
              />
            </div>

            {/* School Info */}
            <div className="col-md-7">
              <h4 className="mb-1">
                Manav Rachna International School (MRIS), Sector 51, Gurugram{" "}
                <MdVerified className="text-primary" title="Verified by School" />
              </h4>
              <p className="mb-1 text-muted">
                <FaMapMarkerAlt className="me-2" />
                Block C, Mayfield Gardens, Sector 51, Gurugram, Haryana 122018
              </p>
              <span className="badge bg-light text-dark">11360 Views</span>
            </div>

            {/* Action Buttons */}
            <div className="col-md-3 d-flex flex-column gap-2">
              <button className="btn btn-success btn-sm">Request a Call Back</button>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-primary btn-sm">Compare</button>
                <button className="btn btn-outline-secondary btn-sm">Notify Me</button>
                <button className="btn btn-outline-danger btn-sm">
                  <FaHeart className="me-1" /> Shortlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key School Stats */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Key School Stats</h5>
            <button className="btn btn-outline-primary btn-sm">
              <FaDownload className="me-1" /> Download Brochure
            </button>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <strong>Ownership:</strong> <br /> Private
            </div>
            <div className="col-md-4 mb-3">
              <strong>Board:</strong> <br /> CBSE
            </div>
            <div className="col-md-4 mb-3">
              <strong>Year of Establishment:</strong> <br /> 2010
            </div>
            <div className="col-md-4 mb-3">
              <strong>Campus Size:</strong> <br /> 2 Acres
            </div>
            <div className="col-md-4 mb-3">
              <strong>Co-Ed Status:</strong> <br /> Co-Education
            </div>
            <div className="col-md-4 mb-3">
              <strong>Campus Type:</strong> <br /> Urban
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Single_Page_listing;
