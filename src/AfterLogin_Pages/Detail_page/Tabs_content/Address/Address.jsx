import React from "react";
import { FaMapMarkerAlt, FaCity, FaMap, FaEnvelope, FaPhone, FaGlobe , FaDirections} from "react-icons/fa";

function Address({ singledetail }) {
  if (!singledetail) return null;

  const { address_1, address_2, pincode, geo_location, city, area, state } = singledetail;

  return (
    <div className="address-section ">
          <h2 className="text-primary mb-3 d-flex align-items-center">
            <FaMapMarkerAlt className="me-2" /> Address Details
          </h2>
        <hr className="mb-3 p-0" />
        
      <div className="card shadow-sm rounded mb-4 address-card">
        <div className="card-body">

          <div className="row mb-2">
            <div className="col-md-3 text-primary fw-bold d-flex align-items-center">
              <FaMapMarkerAlt className="me-2" /> Address
            </div>
            <div className="col-md-9 ">
              {address_1}, {address_2}
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-3 text-primary fw-bold d-flex align-items-center">
              <FaCity className="me-2" /> City
            </div>
            <div className="col-md-9 ">
              {city?.City_name || "-"}
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-3 text-primary fw-bold d-flex align-items-center">
              <FaMap className="me-2" /> Area / Location
            </div>
            <div className="col-md-9 ">
              {area?.Location_name || "-"}
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-3 text-primary fw-bold d-flex align-items-center">
              <FaMapMarkerAlt className="me-2" /> State
            </div>
            <div className="col-md-9 ">
              {state?.State_name || "-"}
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-3 text-primary fw-bold d-flex align-items-center">
              <FaMapMarkerAlt className="me-2" /> Pincode
            </div>
            <div className="col-md-9 ">
              {pincode || "-"}
            </div>
          </div>

     {geo_location && (
  <div className="row mb-2">
    <div className="col-md-3 text-primary fw-bold d-flex align-items-center">
     <FaGlobe className="me-2" />Get Directions
    </div>
    <div className="col-md-9">
      <a
        href={geo_location}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary"
      >
        <FaDirections className="me-2" /> View on Map
      </a>
    </div>
  </div>
)}


{/* {geo_location && (
  <div className="row mb-2">
    <div className="col-md-3 text-primary fw-bold d-flex align-items-center">
      <FaGlobe className="me-2" /> Location
    </div>
    <div className="col-md-9">
      <div style={{ width: "100%", height: "300px" }}>
        <iframe
          src={geo_location} // Make sure this is a proper Google Maps embed link
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Map Location"
        ></iframe>
      </div>
    </div>
  </div>
)} */}

        </div>
      </div>

      <style jsx>{`
        .address-card {
          transition: transform 0.3s, box-shadow 0.3s;
          border-radius: 0.75rem;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }
        .address-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        }
        .col-md-3 {
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
}

export default Address;
