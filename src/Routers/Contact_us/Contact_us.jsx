import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../Helper/Base_Url";
import { Loading } from "../../Helper/Loader";
import Contact_form from "./Contact_form";

function Contact_us() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("data",data)
  // Fetch data on mount
  
  useEffect(() => {
    const fetchContactUs = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/ContactUs`);
        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
        const json = await res.json();
        setData(json.data?.[0] || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContactUs();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="container text-center py-5 text-danger">
        Error: {error}
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="container-fluid py-1 mb-5">
      <div className="container py-1">
        <div className="p-2 bg-light rounded">
          {/* Heading */}
          <div
            className="mx-auto text-center wow fadeIn"
            data-wow-delay="0.1s"
            style={{ maxWidth: 700 }}
          >
            <h4 className="text-primary mb-4 border-bottom border-primary border-2 d-inline-block p-2 title-border-radius">
              Contact Us
            </h4>
            <h4 >{data.ContactUs_heading}</h4>
            <p className="mb-5">{data.ContactUs_description}</p>
          </div>

          {/* Contact Info */}
          <div className="row g-5 mb-5">
            <div className="col-lg-4 wow fadeIn" data-wow-delay="0.1s">
              <div className="d-flex w-100 border border-primary p-4 rounded bg-white">
                <i className="fas fa-map-marker-alt fa-2x text-primary me-4" />
                <div>
                  <h4>{data.ContactUs_Address_head}</h4>
                  <p className="mb-2">{data.ContactUs_Address}</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 wow fadeIn" data-wow-delay="0.3s">
              <div className="d-flex w-100 border border-primary p-4 rounded bg-white">
                <i className="fas fa-envelope fa-2x text-primary me-4" />
                <div>
                  <h4>{data.ContactUs_Emailid_header}</h4>
                  <p className="mb-2">{data.ContactUs_EMAIL_ID}</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 wow fadeIn" data-wow-delay="0.5s">
              <div className="d-flex w-100 border border-primary p-4 rounded bg-white">
                <i className="fa fa-phone-alt fa-2x text-primary me-4" />
                <div>
                  <h4>{data.ContactUs_mobile_number_header}</h4>
                  <p className="mb-2">{data.ContactUs_Mobile_Number}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form and Map */}
          <div className="row g-5">
          <Contact_form/>

            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
              <div className="border border-primary h-100 rounded">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d220892.32979270825!2d72.7137837374298!3d19.082806398677118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e1!3m2!1sen!2sin!4v1754548980698!5m2!1sen!2sin"
                  className="w-100 h-100 rounded"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact_us;
