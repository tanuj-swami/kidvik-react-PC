import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import FilterableSelect from "../../Helper/FilterableSelect";
import { showToast } from "../../Helper/toastService";
import Form_input from "../../Helper/Form_Input";
import { BASE_URL } from "../../Helper/Base_Url";
import  fetchSelectOptions  from "./MasterTableData/Master_Institude_2nd_step";
import { usePartnerLogin } from "../../Contaxt/PartnarLogin_context";
import { useParams } from "react-router-dom";
import CustomTable from "../../Helper/GlobelTable";

function Step_06({ next, setloading , setCompletedSteps , activeStep}) {
  const { partner_id } = usePartnerLogin();
  console.log(partner_id);
  const { slug } = useParams();

  // dropdown masters
  const [DocumentType, setDocumentType] = useState([]);
  const [AvailabilityOptions, setAvailabilityOptions] = useState([]);

  const [editIndex, setEditIndex] = useState(null);
  const [editIndex_2, setEditIndex_2] = useState(null);

  // state lists
  const [criteriaList, setCriteriaList] = useState([]);
  const [documentList, setDocumentList] = useState([]);

  // form data for criteria + document
  const [formData, setFormData] = useState({
    Age_Criteria: "",
    Eligibility_Marks: "",
    Total_Seats: "",
    Written_Test: "",
    Student_Interaction: "",
    Parents_Interaction: "",
    Form_Availability_id: null,
    Form_fee: "",
    Document_Type_id: null,
    online_link:"",
  });

  useEffect(() => {
    fetchSelectOptions(`${BASE_URL}/document_type_mst/`, "DocumentType_name").then(setDocumentType);
    fetchSelectOptions(`${BASE_URL}/availability_mst/`, "Availability_name").then(setAvailabilityOptions);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ---------------- add criteria ----------------
  const addCriteria = () => {
    if (!formData.Age_Criteria, !formData.Eligibility_Marks) {
      showToast("Please enter Age Criteria", "error");
      return;
    }

    const newEntry = {
      Age_Criteria: formData.Age_Criteria,
      Eligibility_Marks: formData.Eligibility_Marks,
      Total_Seats: formData.Total_Seats,
      Written_Test: formData.Written_Test,
      Student_Interaction: formData.Student_Interaction,
      Parents_Interaction: formData.Parents_Interaction,
      Form_Availability_id: formData.Form_Availability_id,
      Form_fee: formData.Form_fee,
      online_link: formData.online_link,

    };

    if (editIndex !== null) {
      // 🔹 Update existing row
      const updatedList = [...criteriaList];
      updatedList[editIndex] = newEntry;
      setCriteriaList(updatedList);
      setEditIndex(null); // reset edit mode
      showToast("Criteria updated successfully");
    } else {

      setCriteriaList([...criteriaList, newEntry]);
      showToast("Criteria added successfully");
    }

    // 🔹 Reset form
    setFormData({
      Age_Criteria: "",
      Eligibility_Marks: "",
      Total_Seats: "",
      Written_Test: "",
      Student_Interaction: "",
      Parents_Interaction: "",
      Form_Availability_id: null,
      Form_fee: "",
      Document_Type_id: null,
      online_link:""
    });
  };


  // ---------------- add document ----------------
  const addDocument = () => {
    if (!formData.Document_Type_id) {
      showToast("Please select document type", "error");
      return;
    }

    const newEntry = { Document_Type_id: formData.Document_Type_id };

    if (editIndex_2 !== null) {
      // 🔹 Update existing document
      const updatedDocs = [...documentList];
      updatedDocs[editIndex_2] = newEntry;
      setDocumentList(updatedDocs);
      setEditIndex_2(null);
      showToast("Document updated successfully");
    } else {
      // 🔹 Add new document
      setDocumentList([...documentList, newEntry]);
      showToast("Document added successfully");
    }

    // Reset form
    setFormData({ ...formData, Document_Type_id: null });
  };


  // ---------------- delete handlers ----------------
  const deleteCriteria = (i) => setCriteriaList(criteriaList.filter((_, idx) => idx !== i));
  const deleteDocument = (i) => setDocumentList(documentList.filter((_, idx) => idx !== i));

  // ---------------- submit ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const payload = {
        partner_id,
        institute_admission_criteria: criteriaList,
        institute_admission_document: documentList,
      };
      console.log("🚀 Final Payload:", payload);

      const response = await fetch(`${BASE_URL}/partner_all/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        showToast(data.message);
                setCompletedSteps((prev) => [...prev, activeStep]);

        next();
      } else {
        if (data.institute_admission_criteria) {
          data.institute_admission_criteria.forEach((errorObj, index) => {
            if (errorObj && Object.keys(errorObj).length > 0) {
              Object.entries(errorObj).forEach(([field, messages]) => {
                messages.forEach((msg) => {
                  showToast(`school Fee ${index + 1} - ${field}: ${msg}`, "error");
                });
              });
            }
          });
        } else {
          showToast(data.message, "error");

        }
      }
    } catch (error) {
      console.error("❌ Network error:", error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchdatabyid(slug);
  }, [slug])


  const fetchdatabyid = async (slug) => {
    try {
      const res = await fetch(`${BASE_URL}/partner_all/${slug}/`);
      const data = await res.json();
      if (res.ok && data) {
        setCriteriaList(data.institute_admission_criteria || []);
        setDocumentList(data.institute_admission_document || []);
      }
    } catch (error) {
      console.error("Error fetching Listing data:", error);
    }
  };

  const editTiming = (index) => {
    setFormData(criteriaList[index]);
    setEditIndex(index);
  };

  const editdocument = (index) => {
    setFormData(documentList[index]);
    setEditIndex_2(index);
  };

  const criteriaColumns = [
    { label: "Age Criteria", key: "Age_Criteria" },
    {
      label: "Form Availability",
      accessor: (row) => {
        const found = AvailabilityOptions.find(opt => Number(opt.value) === Number(row.Form_Availability_id));
        return found ? found.label : "-";
      }
    },

    { label: "Eligibility Marks", key: "Eligibility_Marks" },
    { label: "Total Seats", key: "Total_Seats" },
    { label: "Written Test", key: "Written_Test" },
    { label: "Student Interaction", key: "Student_Interaction" },
    { label: "Parents Interaction", key: "Parents_Interaction" },
    { label: "Form Fee", key: "Form_fee" },
  ];
  const documentColumns = [
    // { label: "Document Type", key: "Document_Type_id" },
    {
      label: "Document Type",
      accessor: (row) => {
        const found = DocumentType.find(opt => Number(opt.value) === Number(row.Document_Type_id));
        return found ? found.label : "-";
      }
    },
  ];



  return (
    <Form id="listingForm" onSubmit={handleSubmit}>
      {/* Criteria Section */}
      <Row className="border border-2 border-primary rounded p-3 mb-4">
        <h4 className="text-primary mb-3 fw-bold">Education Admission Criteria</h4>
        <Col md={4}><Form_input type="text" label="Age Criteria" name="Age_Criteria" value={formData.Age_Criteria} onChange={handleChange} /></Col>
        <Col md={4}><Form_input type="number" label="Eligibility Marks" name="Eligibility_Marks" value={formData.Eligibility_Marks} onChange={handleChange} /></Col>
        <Col md={4}><Form_input type="number" label="Total Seats" name="Total_Seats" value={formData.Total_Seats} onChange={handleChange} /></Col>
        <Col md={4}><Form_input type="text" label="Written Test" name="Written_Test" value={formData.Written_Test} onChange={handleChange} /></Col>
        <Col md={4}><Form_input type="text" label="Student Interaction" name="Student_Interaction" value={formData.Student_Interaction} onChange={handleChange} /></Col>
        <Col md={4}><Form_input type="text" label="Parents Interaction" name="Parents_Interaction" value={formData.Parents_Interaction} onChange={handleChange} /></Col>

        <Col md={4}><FilterableSelect label="Form Availability" name="Form_Availability_id" value={formData.Form_Availability_id} onChange={handleChange} options={AvailabilityOptions} /></Col>

         {
         formData.Form_Availability_id === 2 && (
           <Col md={3}><Form_input type="text" label="Online Form information" name="online_link" value={formData.online_link} onChange={handleChange} /></Col>
         )}
        <Col md={3}><Form_input type="number" label="Form Fee" name="Form_fee" value={formData.Form_fee} onChange={handleChange} /></Col>

        {/* <Col md={4} className="d-flex align-items-end"><Button variant="primary" onClick={addCriteria}>➕ Add Criteria</Button></Col> */}
        <Col md={4} className="d-flex align-items-end gap-2">
          <Button
            variant={editIndex !== null ? "primary" : "primary"}
            onClick={addCriteria}
          >
            {editIndex !== null ? "Update Criteria" : "➕ Add Criteria"}
          </Button>

          {editIndex !== null && (
            <Button
              variant="primary"
              onClick={() => {
                setEditIndex(null);
                setFormData({
                  Age_Criteria: "",
                  Eligibility_Marks: "",
                  Total_Seats: "",
                  Written_Test: "",
                  Student_Interaction: "",
                  Parents_Interaction: "",
                  Form_Availability_id: null,
                  Form_fee: "",
                  online_link:"",
                });
              }}
            >
              ❌ Cancel
            </Button>
          )}
        </Col>

      </Row>


      {/* Criteria Table */}
      {/* <Table bordered hover>
        <thead>
          <tr>
            <th>Age Criteria</th><th>Marks</th><th>Total Seats</th><th>Written Test</th><th>Student Interaction</th><th>Parents Interaction</th><th>Fee</th><th>Action</th>
          </tr>
        </thead>

        <tbody>
          {criteriaList.map((c, i) => (
            <tr key={i}>
              <td>{c.Age_Criteria}</td><td>{c.Eligibility_Marks}</td><td>{c.Total_Seats}</td>
              <td>{c.Written_Test}</td><td>{c.Student_Interaction}</td><td>{c.Parents_Interaction}</td>
              <td>{c.Form_fee}</td>

              <td><Button variant="danger" size="sm" onClick={() => deleteCriteria(i)}>🗑 Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </Table> */}
      <CustomTable
        columns={criteriaColumns}
        data={criteriaList}
        onEdit={(index) => editTiming(index)}
        onDelete={(index) => deleteCriteria(index)}
      />


      {/* Document Section */}
      <Row className="border border-2 border-primary rounded p-3 mb-4">
        <h4 className="text-primary">Education Admission Document</h4>
        <Col md={4}><FilterableSelect label="Document Type" name="Document_Type_id" value={formData.Document_Type_id} onChange={handleChange} options={DocumentType} /></Col>

        {/* <Col md={4} className="d-flex align-items-end"><Button variant="primary" onClick={addDocument}>➕ Add Document</Button></Col> */}

        <Col md={4} className="d-flex align-items-end gap-2">
          <Button
            variant={editIndex_2 !== null ? "primary" : "primary"}
            onClick={addDocument}
          >
            {editIndex_2 !== null ? "Update Document" : "➕ Add addDocument"}
          </Button>

          {editIndex_2 !== null && (
            <Button
              variant="primary"
              onClick={() => {
                setEditIndex_2(null);
                setFormData({
                  Document_Type_id: null,

                });
              }}
            >
              ❌ Cancel
            </Button>
          )}
        </Col>
      </Row>

      <CustomTable
        columns={documentColumns}
        data={documentList}
        onEdit={(index) => editdocument(index)}
        onDelete={(index) => deleteDocument(index)}
      />
    </Form>
  );
}

export default Step_06;
