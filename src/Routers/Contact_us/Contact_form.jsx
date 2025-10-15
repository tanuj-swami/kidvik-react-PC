import React, { useState } from "react";
import { BASE_URL } from "../../Helper/Base_Url";
import { showToast } from "../../Helper/toastService";

function Contact_form() {
  const [formData, setFormData] = useState({
    ContectUs_name: "",
    ContectUs_email: "",
    ContectUs_cono: "",
    ContectUs_subject: "",
    ContectUs_message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // extra info (you can make these dynamic if needed)
    const payload = {
      ...formData,
      ContectUs_Submit_Latitude: "28.7041",
      ContectUs_Submit_Longitude: "77.1025",
      ContectUs_Submit_Device: "Chrome Browser",
      ContectUs_Submit_Device_ID: "ABC123XYZ456",
      ContectUs_Submit_IP: "192.168.1.101",
      ContectUs_Submit_Page: "/contact-us",
      ContectUs_Submit_OS: "Windows 11",
      status: 1,
    };

    try {
      const res = await fetch(`${BASE_URL}/contact_submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
      
      console.log("API Response:", data);
      showToast(data.message , "success");
      setFormData({
        ContectUs_name: "",
        ContectUs_email: "",
        ContectUs_cono: "",
        ContectUs_subject: "",
        ContectUs_message: "",
      });
      
    } catch (err) {
      showToast(err ,"Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-lg-6 wow fadeIn" data-wow-delay="0.3s">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="ContectUs_name"
          value={formData.ContectUs_name}
          onChange={handleChange}
          className="w-100 form-control py-3 mb-3 border-primary"
          placeholder="Your Name"
          required
        />

        <input
          type="email"
          name="ContectUs_email"
          value={formData.ContectUs_email}
          onChange={handleChange}
          className="w-100 form-control py-3 mb-3 border-primary"
          placeholder="Enter Your Email"
          required
        />

        <input
          type="text"
          name="ContectUs_cono"
          value={formData.ContectUs_cono}
          onChange={handleChange}
          className="w-100 form-control py-3 mb-3 border-primary"
          placeholder="Enter Your Phone"
        />

        <input
          type="text"
          name="ContectUs_subject"
          value={formData.ContectUs_subject}
          onChange={handleChange}
          className="w-100 form-control py-3 mb-3 border-primary"
          placeholder="Subject"
        />

        <textarea
          name="ContectUs_message"
          value={formData.ContectUs_message}
          onChange={handleChange}
          className="w-100 form-control mb-3 border-primary"
          rows={6}
          placeholder="Your Message"
          required
        />

        <button
          className="w-100 btn btn-primary form-control py-3 border-primary text-white bg-primary"
          type="submit"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {success && <p className="text-success mt-3">{success}</p>}
      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
}

export default Contact_form;
