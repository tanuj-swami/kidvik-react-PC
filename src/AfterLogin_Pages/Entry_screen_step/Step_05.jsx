// components/Step_05.js
import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import FilterableSelect from "../../Helper/FilterableSelect";
import { showToast } from "../../Helper/toastService";
import Form_input from "../../Helper/Form_Input";
import { BASE_URL } from "../../Helper/Base_Url";
import  fetchSelectOptions  from "./MasterTableData/Master_Institude_2nd_step";
import { usePartnerLogin } from "../../Contaxt/PartnarLogin_context";
import { useParams } from "react-router-dom";

function Step_05({ next, setloading , finish, activeStep, steps, setCompletedSteps  }) {
  const [LinkTypeoption, setLinkTypeoption] = useState([]);
  const { partnerAuth, partner_id } = usePartnerLogin();
   const { slug } = useParams();
  const [formData, setFormData] = useState({
    Link: "",
    LinkType_id: "",
    review: "",
    rating: "",
    label: "",
    value: "",
  });

  const [socialLinks , setSocialLinks] = useState([]);
  const [reviews, setReviews] = useState([]);
    const [extraValues, setExtraValues] = useState([]);

  // Track edit index
  const [editSocialIndex, setEditSocialIndex] = useState(null);
  const [editReviewIndex, setEditReviewIndex] = useState(null);
    const [editExtraIndex, setEditExtraIndex] = useState(null);

  useEffect(() => {
    fetchSelectOptions(`${BASE_URL}/url_link_type_mst/`, "URLLinkType_name").then(
      setLinkTypeoption
    );
  }, []);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ================== Social Links ===================
  const addOrUpdateSocialLink = () => {
    if (!formData.Link || !formData.LinkType_id) {
      showToast("Please fill Link and LinkType", "error");
      return;
    }

    if (editSocialIndex !== null) {
      // update
      const updated = [...socialLinks];
      updated[editSocialIndex] = {
        Link: formData.Link,
        LinkType_id: parseInt(formData.LinkType_id, 10),

      };
      setSocialLinks(updated);
      setEditSocialIndex(null);
      showToast("Social Link updated", "success");
    } else {
      // add new
      setSocialLinks((prev) => [
        ...prev,
        {
          Link: formData.Link,
          LinkType_id: parseInt(formData.LinkType_id, 10),
        },
      ]);
      showToast("Social Link added", "success");
    }

    // reset form fields
    setFormData((prev) => ({ ...prev, Link: "", LinkType_id: "" }));
  };

  const handleEditSocial = (index) => {
    setFormData((prev) => ({
      ...prev,
      Link: socialLinks[index].Link,
      LinkType_id: socialLinks[index].LinkType_id,
    }));
    setEditSocialIndex(index);
  };

  const handleDeleteSocial = (index) => {
    setSocialLinks((prev) => prev.filter((_, i) => i !== index));
    showToast("Social Link deleted", "success");
  };

  // ================== Reviews ===================
  const addOrUpdateReview = () => {
    if (!formData.review || !formData.rating) {
      showToast("Please fill Review and Rating", "error");
      return;
    }

    if (editReviewIndex !== null) {
      // update
      const updated = [...reviews];
      updated[editReviewIndex] = {
        review: formData.review,
        rating: parseFloat(formData.rating),
      };

      setReviews(updated);
      setEditReviewIndex(null);
      showToast("Review updated", "success");
    } else {
      // add new
      setReviews((prev) => [
        ...prev,
        { review: formData.review, rating: parseFloat(formData.rating) },
      ]);
      showToast("Review added", "success");
    }

    // reset form fields
    setFormData((prev) => ({ ...prev, review: "", rating: "" }));
  };

  const handleEditReview = (index) => {
    setFormData((prev) => ({
      ...prev,
      review: reviews[index].review,
      rating: reviews[index].rating,
    }));
    setEditReviewIndex(index);
  };

  const handleDeleteReview = (index) => {
    setReviews((prev) => prev.filter((_, i) => i !== index));
    showToast("Review deleted", "success");
  };
     // ================== Extra Values ===================
const addOrUpdateExtra = () => {
    if (!formData.label ) {
      showToast("Please fill Label and Value", "error");
      return;
    }if (editExtraIndex !== null) {
      const updated = [...extraValues];
      updated[editExtraIndex] = {
        label: formData.label,
        value: formData.value,
        remarks: formData.remarks,
      };
      setExtraValues(updated);
      setEditExtraIndex(null);
      showToast("Extra Value updated", "success");
    } else {
      setExtraValues((prev) => [
        ...prev,
        { label: formData.label, value: formData.value, remarks: formData.remarks },
      ]);
      showToast("Extra Value added", "success");
    }

    setFormData((prev) => ({ ...prev, label: "", value: "", remarks: "" }));
  };

  const handleEditExtra = (index) => {
    setFormData((prev) => ({
      ...prev,
      label: extraValues[index].label,
      value: extraValues[index].value,
      remarks: extraValues[index].remarks,
    }));
    setEditExtraIndex(index);
  };

  const handleDeleteExtra = (index) => {
    setExtraValues((prev) => prev.filter((_, i) => i !== index));
    showToast("Extra Value deleted", "success");
  };

  // ================== Final Submit ===================
  const handleSubmit = async (e) => {
    e.preventDefault();

     const buttonClicked = e.nativeEvent.submitter.name;

    if (buttonClicked == "addOrUpdateSocialLink") {
           addOrUpdateSocialLink();
           return;
    }
    if (buttonClicked == "addOrUpdateReview") {
            addOrUpdateReview();
           return;
    }
    if (buttonClicked == "addOrUpdateExtra") {
            addOrUpdateExtra();
           return;
    }

    else {

    setloading(true);

    try {
      const payload = {
        partner_id: partner_id,
        institute_social_links: socialLinks,
        partner_reviews_rating: reviews.map((item) => ({
          ...item,
          user_id: partnerAuth.user_id,
        })),
        partnerextravalues: extraValues,
      };

      console.log("🚀 Sending:", payload);

      const response = await fetch(`${BASE_URL}/partner_all/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        showToast(data.message, "success");
                setCompletedSteps((prev) => [...prev, activeStep]);

          if (activeStep === steps.length - 1) {
   
         setTimeout(() => {
           finish();
          }, 2000);
    
        } else {
               next();
         }
      } else {
        
        showToast(data.message || "Submission failed", "error");
      }
    } catch (error) {
      console.error("❌ Network error:", error);
      showToast("Network error", "error");
    } finally {
      setloading(false);
    }
  }
  };

useEffect(()=>{
  fetchdatabyid(slug);
},[slug])


  const fetchdatabyid = async (slug) => {
    try {
      const res = await fetch(`${BASE_URL}/partner_all/${slug}/`);
      const data = await res.json();

      if (res.ok && data) {
         setSocialLinks(data.institute_social_links || []);
         setReviews(data.partner_reviews_rating || []);
      }
    } catch (error) {
      console.error("Error fetching Listing data:", error);
    }
  };
  
  return (
<>

  <Form id="addOrUpdateSocialLink" onSubmit={handleSubmit} >
      <Row className="border border-2 border-primary rounded p-3 mb-4">
        <h4 className="text-primary mb-3 fw-bold">Partner Social Links</h4>
        <Col md={3}>
          <FilterableSelect
            label="Link Type"
            name="LinkType_id"
            value={formData.LinkType_id}
            onChange={handleChange}
            options={LinkTypeoption}
            required
          />
        </Col>
        <Col md={4}>
          <Form_input
            type="url"
            label="Link"
            name="Link"
            value={formData.Link}
            onChange={handleChange}
          />
        </Col>
        <Col md={3} className="d-flex align-items-end gap-2">

          <Button type="submit" variant="primary"
          name="addOrUpdateSocialLink"
          //  onClick={addOrUpdateSocialLink}
           >
            {editSocialIndex !== null ? "Update" : "Add"}
          </Button>


          {editSocialIndex !== null && (
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                setFormData((prev) => ({ ...prev, Link: "", LinkType_id: "" }));
                setEditSocialIndex(null);
              }}
            >
              Cancel
            </Button>
          )}
        </Col>

        {socialLinks.length > 0 && (
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Link</th>
                <th>Link Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {socialLinks.map((item, idx) => {
                const linkType = LinkTypeoption.find(
                  (opt) => opt.value === item.LinkType_id
                );
                return (
                  <tr key={idx}>
                    <td>{item.Link}</td>
                    <td>{linkType ? linkType.label : item.LinkType_id}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="info"
                        className="me-2"
                        onClick={() => handleEditSocial(idx)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDeleteSocial(idx)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
        
      </Row>
  </Form>

    <Form id="addOrUpdateReview" onSubmit={handleSubmit}>
      {/* Social Links */}

      {/* Reviews */}
      <Row className="border border-2 border-primary rounded p-3 mb-4">
        <h4 className="text-primary mb-3 fw-bold"> Partner Reviews Rating</h4>
        <Col md={4}>
          <Form_input
            type="text"
            label="Review"
            name="review"
            value={formData.review}
            onChange={handleChange}
          />
        </Col>
        <Col md={4}>
          <Form_input
            type="number"
            label="Rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
             min="1"
             max="5"
             step="0.1"
          />
        </Col>
        <Col md={3} className="d-flex align-items-end gap-2">
          <Button type="submit" variant="primary" name="addOrUpdateReview"
          //  onClick={addOrUpdateReview}
           >
            {editReviewIndex !== null ? "Update" : "Add"}
          </Button>
          {editReviewIndex !== null && (
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setFormData((prev) => ({ ...prev, review: "", rating: "" }));
                setEditReviewIndex(null);
              }}
            >
              Cancel
            </Button>
          )}
        </Col>

        {reviews.length > 0 && (
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Review</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.review}</td>
                  <td>{item.rating}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="info"
                      className="me-2"
                      onClick={() => handleEditReview(idx)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDeleteReview(idx)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        
      </Row>
    </Form>

    <Form onSubmit={handleSubmit}>
        <Row className="border border-2 border-primary rounded p-3 mb-4">
          <h4 className="text-primary mb-3 fw-bold">Partner Extra Values</h4>
          <Col md={6}>
            <Form_input
              type="textarea"
              label="Listing Description 1"
              name="label"
              value={formData.label}
              onChange={handleChange}
              maxLength={255}
            />
          </Col>
          <Col md={6}>
            <Form_input
              type="textarea"
              label=" Listing Description 2"
              name="value"
              value={formData.value}
              onChange={handleChange}
              maxLength={255}
            />
          </Col>
         
          <Col md={3} className="d-flex align-items-end gap-2">
            <Button type="submit" variant="primary" name="addOrUpdateExtra">
              {editExtraIndex !== null ? "Update" : "Add"}
            </Button>
            {editExtraIndex !== null && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    label: "",
                    value: "",
                    remarks: "",
                  }));
                  setEditExtraIndex(null);
                }}
              >
                Cancel
              </Button>
            )}
          </Col>

          {extraValues.length > 0 && (
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Label</th>
                  <th>Value</th>
                 
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {extraValues.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.label}</td>
                    <td>{item.value}</td>
                 
                    <td>
                      <Button
                        size="sm"
                        variant="info"
                        className="me-2"
                        onClick={() => handleEditExtra(idx)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDeleteExtra(idx)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Row>
      </Form>

    <Form id="listingForm" onSubmit={handleSubmit}>

    </Form>


</>



  );
}

export default Step_05;
