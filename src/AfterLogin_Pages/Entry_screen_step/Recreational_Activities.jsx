import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form, Table } from "react-bootstrap";
import Form_input from "../../Helper/Form_Input";
import FilterableSelect from "../../Helper/FilterableSelect";
import { BASE_URL } from "../../Helper/Base_Url";
import { showToast } from "../../Helper/toastService";

function Recreational_Activities({ next, setloading }) {
  const [formData, setFormData] = useState({
   
    name: "",
    description: "",
    skillLevel: "",
    ageGroup: "",
    age_from_years: "",
    age_to_years: "",
    batchType: "",
    equipment: "",
  });

  const [activities, setActivities] = useState([]);
 
  useEffect(() => {

  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add activity to list
  const addActivity = () => {
    if (!formData.name || !formData.category) {
      showToast("Please fill Category and Name", "error");
      return;
    }

    setActivities((prev) => [...prev, formData]);
    setFormData({
      category: "",
      name: "",
      description: "",
      skillLevel: "",
      ageGroup: "",
      age_from_years: "",
      age_to_years: "",
      batchType: "",
      equipment: "",
    });
  };

  // Final Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const payload = { recreational_activities: activities };

      const response = await fetch(`${BASE_URL}/partner_combine/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        showToast(data.message, "success");
        next();
      } else {
        showToast(data.message || "Submission failed", "error");
      }
    } catch (err) {
      console.error("❌ Error:", err);
    } finally {
      setloading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="border border-2 border-primary rounded p-3 mb-4 ">
        <h4 className="text-primary fw-bold">Recreational Activities</h4>
        <hr className="m-0 p-0 mb-4 text-primary"></hr>

        {/* <Col md={4}>
          <FilterableSelect
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={categoryOptions}
          />
        </Col> */}

        <Col md={4}>
          <Form_input
            type="text"
            label="Activity Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Col>

        <Col md={4}>
          <Form_input
            type="textarea"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            maxLength={255}
          />
        </Col>

        <Col md={4}>
          <Form_input
            type="text"
            label="Skill Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Col>
 </Row>

<Row className="border border-2 border-primary rounded p-3 mb-4 ">
        <h4 className="text-primary fw-bold">AgeGroup</h4>
        <hr className="m-0 p-0 mb-4 text-primary"></hr>

        <Col md={4}>
          <Form_input
          type="text"Recreational_Detail

            label="Age Group"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Col>

        <Col md={2}>
          <Form_input
            type="number"
            label="From Age (Years)"
            name="age_from_years"
            value={formData.age_from_years}
            onChange={handleChange}
          />
        </Col>
       


        <Col md={2}>
          <Form_input
            type="number"
            label="To Age (Years)"
            name="age_to_years"
            value={formData.age_to_years}
            onChange={handleChange}
          />
        </Col>

</Row>


<Row className="border border-2 border-primary rounded p-3 mb-4 ">
        <h4 className="text-primary fw-bold">Batch Type Mst</h4>
        <hr className="m-0 p-0 mb-4 text-primary"></hr>
  
        <Col md={4}>
          <Form_input
            label="Batch Type Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Col>

        <Col md={4}>
          <Form_input
            label="Equipment name"
            name="equipment"
            value={formData.equipment}
            onChange={handleChange}
          />
        </Col>

        <Col md={2} className="d-flex align-items-end">
          <Button variant="primary" onClick={addActivity}>
            Add
          </Button>
        </Col>

        {/* Table Preview */}
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
            
              <th>Name</th>
              <th>Description</th>
              <th>Skill</th>
              <th>Age Group</th>
              <th>Age From</th>
              <th>Age To</th>
              <th>Batch Type</th>
              <th>Equipment</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((item, idx) => (
              <tr key={idx}>
              
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.skillLevel}</td>
                <td>{item.ageGroup}</td>
                <td>{item.age_from_years}</td>
                <td>{item.age_to_years}</td>
                <td>{item.batchType}</td>
                <td>{item.equipment}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>

      <Button type="submit" variant="success">
        Submit
      </Button>
    </Form>
  );
}

export default Recreational_Activities;
