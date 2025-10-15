import React, { useState } from "react";
import { Form, Button, Row, Col, Card, Container } from "react-bootstrap";
import Top_Heading from "../Helper/Top_Heading";
import Form_input from "../Helper/Form_Input";
function Medical() {
  const [formData, setFormData] = useState({
    listing_name: "",
    slug: "",
    logo: null,
    banner_img: null,
    medical_category: "",
    medical_specialization: "",
    doctor_name: "",
    doctor_email: "",
    AboutUs: "",
    established_date: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  const medicalCategories = ["Hospital", "Clinic", "Pharmacy"];
  const medicalSpecializations = ["Cardiology", "Dermatology", "Orthopedics"];

  return (
    <Container className="py-2">
      <Card className="shadow-lg p-4 rounded-4">
        <Top_Heading subtitile="Medical" titile="Medical Registration" />

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form_input
                label="Listing Name"
                name="listing_name"
                value={formData.listing_name}
                onChange={handleChange}
                placeholder="Enter medical listing name"
              />
            </Col>
            <Col md={6}>
              <Form_input
                label="Slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="Enter slug"
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form_input
                label="Logo"
                name="logo"
                type="file"
                onChange={handleChange}
              />
            </Col>
            <Col md={6}>
              <Form_input
                label="Banner Image"
                name="banner_img"
                type="file"
                onChange={handleChange}
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form_input
                label="Medical Category"
                name="medical_category"
                type="select"
                value={formData.medical_category}
                onChange={handleChange}
                options={medicalCategories}
              />
            </Col>
            <Col md={6}>
              <Form_input
                label="Specialization"
                name="medical_specialization"
                type="select"
                value={formData.medical_specialization}
                onChange={handleChange}
                options={medicalSpecializations}
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form_input
                label="Doctor Name"
                name="doctor_name"
                value={formData.doctor_name}
                onChange={handleChange}
                placeholder="Enter doctor name"
              />
            </Col>
            <Col md={6}>
              <Form_input
                label="Doctor Email"
                name="doctor_email"
                type="email"
                value={formData.doctor_email}
                onChange={handleChange}
                placeholder="Enter doctor email"
              />
            </Col>
          </Row>

          <Form_input
            label="About Us"
            name="AboutUs"
            type="textarea"
            value={formData.AboutUs}
            onChange={handleChange}
            placeholder="Write about the medical facility"
          />

          <Form_input
            label="Established Date"
            name="established_date"
            type="date"
            value={formData.established_date}
            onChange={handleChange}
          />

          <div className="text-center">
            <Button variant="primary" type="submit" className="px-5">
              Submit
            </Button>
          </div>
        </Form>


        
      </Card>
    </Container>
  );
}

export default Medical;
