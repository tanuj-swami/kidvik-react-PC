import React, { useEffect, useState } from "react";
import { useLogin } from "../../Contaxt/Login_Contaxt";
import { usePartnerLogin } from "../../Contaxt/PartnarLogin_context";
import { BASE_URL } from "../../Helper/Base_Url";
import { Loading } from "../../Helper/Loader";
import { Row, Col } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import Form_input from "../../Helper/Form_Input";
import FilterableSelect from "../../Helper/FilterableSelect";
import Show_Listing from "./Show_Listing/Show_Listing";
import { showToast } from "../../Helper/toastService";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(true);
  const [cityOptions, setCityOptions] = useState([]);

  const { auth } = useLogin();
  const { partnerAuth } = usePartnerLogin();
  const username = auth?.username || partnerAuth?.partnerUsername;
  const token = auth?.accessToken || partnerAuth?.partnerAccess;
  
  const [formData, setFormData] = useState({
    id: null,
    Bio: "",
    Facebook: "",
    Instagram: "",
    Linkedin: "",
    address_line1: "",
    address_line2: "",
    address_line3: "",
    saluation: "",
    area: null,
    city: null,
    gender: "",
    mobile_number: "",
    occupation: "",
    work_address: "",
    reference: "",
    email: "",
    enrollment_date: null,
    start_date: null,
    end_date: null,
    pincode: "",
    user_Designation: "",
    user_Description: "",
    dob: null,
    profile_pic: null,
    create_date:null
  });

  // Fetch cities
  useEffect(() => {
    fetch(`${BASE_URL}/city/`)
      .then((res) => res.json())
      .then((data) => {
        const options = data.data.map((item) => ({
          value: item.id,
          label: item.City_name,
        }));
        setCityOptions(options);
      })
      .catch((err) => console.error("Error fetching cities:", err));
  }, []);

  // Fetch profile
//  console.log("${BASE_URL}/profile/?username=${username}",`${BASE_URL}/profile/?username=${username}`)
  const fetchProfile = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/profile/?username=${username}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();
      if (data?.data?.length > 0) {
        const user = data.data[0];
        console.log(" data.data[0]", data.data[0])
        setFormData((prev) => ({
          ...prev,
          id: user?.id,
          Bio: user?.Bio || "",
          Facebook: user?.Facebook || "",
          Instagram: user?.Instagram || "",
          Linkedin: user?.Linkedin || "",
          address_line1: user?.address_line1 || "",
          address_line2: user?.address_line2 || "",
          address_line3: user?.address_line3 || "",
          saluation: user?.saluation || "",
          area: user.area?.id || "",
          city: user.city?.id || "",
          gender: user?.gender || "",
          mobile_number: user?.mobile_number || "",
          occupation: user?.occupation || "",
          work_address: user?.work_address || "",
          reference: user?.reference || "",
          email: user?.user?.email || "",
          enrollment_date: user?.enrollment_date || null,
          start_date: user?.start_date || null,
          end_date: user?.end_date || null,
          pincode: user?.pincode || "",
          user_Designation: user?.user_Designation || "",
          user_Description: user?.user_Description || "",
          dob: user?.dob || "",
          profile_pic: user?.profile_pic || null,
        }));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [username, token]);


  const handleChange = (e, actionMeta) => {
    if (e?.target) {
      const { name, value, files } = e.target;
      if (files) {
        setFormData((prev) => ({ ...prev, [name]: files[0] })); // ✅ file
      } else {
        setFormData((prev) => ({ ...prev, [name]: value })); // ✅ text
      }
    } else if (actionMeta?.name) {
      setFormData((prev) => ({
        ...prev,
        [actionMeta.name]: e ? e.value : "",
      }));
    }
  };


  const handleSave = async (id) => {
    setSaving(true);
    try {
      const payload = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== undefined) {
          payload.append(key, formData[key]);
        }
      });

      console.log("payload", payload)

      const res = await fetch(`${BASE_URL}/profile/${id}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });

      const data = await res.json();

      if (res.ok) {
        setIsEditing(true);
        showToast(data.message, 'success');
        fetchProfile();
        console.log("Updated:", data);
      } else {
        showToast(data.message || "error");
      }
    } catch (err) {
      console.error("Error updating:", err);
      showToast(err, 'error');
    } finally {
      setSaving(false);
    }
  };




  if (loading) return <Loading />;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <>

      <div className="container py-2 rounded-sm shadow-lg">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className=" shadow border-0 rounded-4">
              <div className=" p-2">

                {/* Profile Form */}
                <div className="border rounded-4 p-4 bg-light">

                  {/* Profile Image Section */}
                  <Row className="mb-4 align-items-center ">
                    <Col md={2} className="text-center ">
                      <div className="position-relative d-inline-block ">
                        {/* Image Preview */}

                        <img
                          src={
                            formData.profile_pic instanceof File
                              ? URL.createObjectURL(formData.profile_pic) // ✅ show local preview
                              : formData.profile_pic
                                ? `${BASE_URL}${formData.profile_pic}` // ✅ show backend image
                                : "/img/kidvik_school_img/user_image.jpg" // ✅ default
                          }
                          alt="Profile"
                          className="rounded-circle border"
                          style={{ width: "120px", height: "120px", objectFit: "cover" }}
                        />
                        {/* Change Image Button */}
                        {!isEditing && (
                          <label
                            htmlFor="profileImage"
                            className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow"
                            style={{
                              width: "36px",
                              height: "36px",
                              cursor: "pointer",
                              border: "2px solid #fff",
                            }}
                          >
                            <i className="bi bi-camera-fill fs-5"></i>
                          </label>
                        )}

                        {/* <Form_input
                          type="file"
                          id="profileImage"
                          name="profile_pic"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={handleChange}
                          disabled={isEditing}
                        /> */}
                                             <input
                                             type="file"
                                             id="profileImage"
                                             name="profile_pic"
                                             className="d-none"
                                             accept="image/*"
                                             onChange={handleChange}
                                             disabled={isEditing}
                                             
                                           />

                      </div>

                    </Col>

                    {/* <Col md={4}>

</Col> */}
                    {/* <Col md={4}>
      <h5 className="text-primary fw-bold">Personal Details</h5>
    </Col> */}
                  </Row>

                  {/* Personal Details */}
                  <Row className="border border-2 border-primary rounded p-3 mb-4">
                    <h5 className="text-primary fw-bold">Personal Details</h5>
                    <Col md={6}>
                      <Form_input
                        type="text"
                        label="Bio"
                        name="Bio"
                        value={formData.Bio}
                        onChange={handleChange}
                        required
                        readOnly={isEditing}
                      />
                    </Col>
                    <Col md={6}>
                      <Form_input
                        type="text"
                        label="Gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        readOnly={isEditing}
                      />
                    </Col>

                    <Col md={6}>
                      <Form_input
                        type="date"
                        label="Date Of Birth"
                        name="dob"
                        value={formData.dob || ""}
                        onChange={handleChange}
                        required
                        readOnly={isEditing}

                      />
                    </Col>
                    <Col md={6}>
                      <Form_input
                        type="date"
                        label="Enrollment Date"
                        name="enrollment_date"
                        value={formData.enrollment_date || ""}
                        onChange={handleChange}
                        required
                        readOnly={isEditing}

                      />
                    </Col>

                    <Col md={6}>
                      <Form_input
                        type="text"
                        label="Facebook"
                        name="Facebook"
                        value={formData.Facebook}
                        onChange={handleChange}
                        readOnly={isEditing}
                      />
                    </Col>
                    <Col md={6}>
                      <Form_input
                        type="text"
                        label="Instagram"
                        name="Instagram"
                        value={formData.Instagram}
                        onChange={handleChange}
                        readOnly={isEditing}
                      />
                    </Col>
                    <Col md={6}>
                      <Form_input
                        type="text"
                        label="LinkedIn"
                        name="Linkedin"
                        value={formData.Linkedin}
                        onChange={handleChange}
                        readOnly={isEditing}
                      />
                    </Col>
                    <Col md={6}>
                      <FilterableSelect
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        options={cityOptions}
                        disabled={isEditing}
                      />
                    </Col>
                  </Row>

                  {/* Contact Details */}
                  <Row className="border border-2 border-primary rounded p-3 mb-4">
                    <h5 className="text-primary fw-bold">Contact Details</h5>
                    <Col md={6}>
                      <Form_input
                        type="email"
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        readOnly={isEditing}
                      />
                    </Col>
                    <Col md={6}>
                      <Form_input
                        type="tel"
                        label="Mobile"
                        name="mobile_number"
                        value={formData.mobile_number}
                        onChange={handleChange}
                        required
                        readOnly={isEditing}
                        maxLength={10}
                      />
                    </Col>
                    <Col md={12}>
                      <Form_input
                        type="text"
                        label="Work Address"
                        name="work_address"
                        value={formData.work_address}
                        onChange={handleChange}
                        readOnly={isEditing}
                      />
                    </Col>
                  </Row>

                  {/* Other Info */}
                  <Row className="border border-2 border-primary rounded p-3 mb-4">
                    <h5 className="text-primary fw-bold">Other Info</h5>
                    <Col md={6}>
                      <Form_input
                        type="text"
                        label="Designation"
                        name="user_Designation"
                        value={formData.user_Designation}
                        onChange={handleChange}
                        readOnly={isEditing}
                      />
                    </Col>
                    <Col md={6}>
                      <Form_input
                        type="text"
                        label="Occupation"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        readOnly={isEditing}
                      />
                    </Col>
                    <Col md={12}>
                      <Form_input
                        type="textarea"
                        label="Description"
                        name="user_Description"
                        value={formData.user_Description}
                        onChange={handleChange}
                        readOnly={isEditing}
                      />
                    </Col>
                  </Row>
                </div>

                
                <div className="d-flex justify-content-end mt-3 align-items-center mb-4">
                  {/* <h3 className="text-danger fw-bold">Profile</h3> */}
                  {isEditing ? (
                    <button
                      className="btn btn-success"
                      onClick={() => setIsEditing(false)}
                    >
                      <FaEdit className="me-2" />
                      Edit
                    </button>
                  ) : (
                    <div>
                      <button
                        className="btn btn-primary me-2"
                        disabled={saving}
                        onClick={() => handleSave(formData.id)}
                      >
                        {saving ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => setIsEditing(true)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Show_Listing />

    </>

  );
}

export default Profile;
