import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table , Modal} from "react-bootstrap";
import FilterableSelect from "../../Helper/FilterableSelect";
import { showToast } from "../../Helper/toastService";
import Form_input from "../../Helper/Form_Input";
import { BASE_URL } from "../../Helper/Base_Url";
import  fetchSelectOptions  from "./MasterTableData/Master_Institude_2nd_step";
import FileUploadWithPreview from "../../Helper/File_Uploade_previwe";
import { usePartnerLogin } from "../../Contaxt/PartnarLogin_context";
import { useParams } from "react-router-dom";
import CustomTable from "../../Helper/GlobelTable";
import ButtonLoading from "../../Helper/ButtonLoading";


function Step_04({ next, setloading , setCompletedSteps , activeStep}) {
  const [designation, setdesignation] = useState([]);
  const [specialization, setspecialization] = useState([]);
  const { partner_id } = usePartnerLogin();
  const { slug } = useParams();
  const [editIndex, setEditIndex] = useState(null);
  const category_id = localStorage.getItem("selectedCategory")
    const [showModal, setShowModal] = useState(false);
  const [newDesignation, setNewDesignation] = useState("");
  const [designationloading , setdesignationloading] = useState(false);

  useEffect(() => {
    fetchdatabyid(slug);
  }, [slug])



  const [formData, setFormData] = useState({
    staff_details: [],
    partner_id: partner_id
  });
  const [staffForm, setStaffForm] = useState({
    name: "",
    designation_id: "",
    specialization_id:  [3, 5, 6].includes(Number(category_id)) ? "" : null ,
    qualification: "",
    experience_years: "",
    phone: "",
    email: "",
    available_days: null,
    available_time: null,
    available_status: null,
    profile_image: null,
  });

  // useEffect(() => {
  //   fetchSelectOptions(`${BASE_URL}/designation_master/`, "position")
  //     .then(setdesignation);

  //   fetchSelectOptions(`${BASE_URL}/specialization_mst/`, "Specialization_name")
  //     .then(setspecialization);
  // }, []);


  useEffect(() => {
    fetch(`${BASE_URL}/designation_master/?category_id=${category_id}`)
      .then((res) => res.json())
      .then((data) => {

        const options = data.data.map((item) => ({
          value: item.id,
          label: item.position,
        }));

        // setdesignation(options);
                setdesignation([...options, { value: "other", label: "Other" }]);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, [category_id]);


  console.log("desination", designation)

  useEffect(() => {
    fetch(`${BASE_URL}/specialization_mst/?category_id=${category_id}`)
      .then((res) => res.json())
      .then((data) => {

        const options = data.data.map((item) => ({
          value: item.id,
          label: item.Specialization_name,
        }));
        setspecialization(options);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, [category_id]);



const handleStaffChange = (e) => {
  const { name, value, type, files } = e.target;

  if (value === "other" && name === "designation_id") {
    setShowModal(true);
  } else {
    setStaffForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  }
};



  const handleAddStaff = () => {
    if (editIndex !== null) {
      // Update existing staff
      setFormData((prev) => {
        const updated = [...prev.staff_details];
        updated[editIndex] = {
          ...staffForm,
          designation_id: Number(staffForm.designation_id), // id ensure number
        }
        return { ...prev, staff_details: updated };
      });
      setEditIndex(null); // exit edit mode
    }
    else {
      setFormData((prev) => ({
        ...prev,
        staff_details: [...prev.staff_details, staffForm],
      }));
    }

    // reset after adding
    setStaffForm({
      name: "",
      designation_id: "",
      specialization_id: "",
      qualification: "",
      experience_years: "",
      phone: "",
      email: "",
      available_days: "",
      available_time: "",
      profile_image: null,
      available_status:null
    });
  };

const handleSave = async () => {
  if (!newDesignation.trim()) return;
     setdesignationloading(true);
  try {
    const res = await fetch(`${BASE_URL}/designation_master/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        position: newDesignation,   
        category_id: category_id,   
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to save designation");
    }
    const data = await res.json();
    console.log("data",data);

    // ✅ Update options immediately
    setdesignation((prev) => [
      ...prev,
      { value: data.data.id, label: data.data.position },
    ]);

    // ✅ Update form with newly added designation
    setStaffForm((prev) => ({
      ...prev,
       designation_id: data.data.id,
    }));

   
    setNewDesignation("");
    setShowModal(false);
  } catch (err) {
    console.error("Error saving designation:", err);
  }
  finally{
    setdesignationloading(false);
  }
};


  const handleRemoveStaff = (index) => {
    setFormData((prev) => ({
      ...prev,
      staff_details: prev.staff_details.filter((_, i) => i !== index),
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const buttonClicked = e.nativeEvent.submitter.name;
    console.log("buttonClicked:", buttonClicked);
    if (buttonClicked == "addstaff") {
      handleAddStaff();
    }
    else {
      setloading(true);
      try {
        const formDataToSend = new FormData();
        console.log("formDataToSend", formData.staff_details)

        const response = await fetch(`${BASE_URL}/partner_all/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",  // ✅ Important
          },
          body: JSON.stringify({
            partner_staff_detail: formData.staff_details,
            partner_id: formData.partner_id
          }),

        });
        const data = await response.json();
        if (response.ok) {
          showToast(data.message, "success");
        setCompletedSteps((prev) => [...prev, activeStep]);

          next();
        } else {
          
           data.partner_staff_detail.forEach((staffError, index) => {
    if (staffError && Object.keys(staffError).length > 0) {
      Object.entries(staffError).forEach(([field, messages]) => {
        messages.forEach((msg) => {
          showToast(`Staff ${index + 1} - ${field}: ${msg}`, "error");
        });
      });
    }
  });
          // showToast(data.message , "error");

        }
      } catch (error) {
        console.error("❌ Network error:", error);
      } finally {
        setloading(false);
      }
    }
  };

  const resetStaffForm = () => {
    setStaffForm({
      name: "",
      designation_id: "",
      specialization_id: "",
      qualification: "",
      experience_years: "",
      phone: "",
      email: "",
      available_days: "",
      available_time: "",
      profile_image: null,
      available_status:null
    });
    setEditIndex(null);
  };
  const fetchdatabyid = async (slug) => {
    try {
      const res = await fetch(`${BASE_URL}/partner_all/${slug}/`);
      const data = await res.json();


      if (res.ok && data) {
        const staffArray = data.partner_staff_detail || [];
        setFormData((prev) => ({
          ...prev,
          partner_id: partner_id,
          staff_details: staffArray,
        }));
      }


    } catch (error) {
      console.error("Error fetching Listing data:", error);
    }
  };

  const staffColumns = [
    { label: "Name", key: "name" },
    {
      label: "Designation",
      accessor: (row) => {
        const found = designation.find(d => d.value === row.designation_id);
        console.log("found", found)
        return found ? found.label : "-";

      }
    },

    ...([3, 5, 6].includes(Number(category_id))
      ? [{
        label: "Specialization",
        accessor: (row) => {
          const found = specialization.find(d => d.value === row.specialization_id);
          return found ? found.label : "-";
        },
      }]
      : []),

    { label: "Qualification", key: "qualification" },
    { label: "Experience (Years)", key: "experience_years" },
    { label: "Phone", key: "phone" },
    { label: "Email", key: "email" },
    { label: "Available Days", key: "available_days" },
    { label: "Available Time", key: "available_time" },
    { label: "Availability Status", key: "available_status" },
  ];



  const handleEditStaff = (index) => {
    setStaffForm(formData.staff_details[index]);
    setEditIndex(index);
  };


  
  return (
    <>
      <Form id="listingForm" onSubmit={handleSubmit}>
        <Row className="border border-2 border-primary rounded p-3 mb-4">
          <h4 className="text-primary mb-3 fw-bold">Partner Staff Detail</h4>
          <hr className="m-0 p-0 mb-4 text-primary" />

          <Col md={3}>
            <Form_input
              type="text"
              label="Name"
              name="name"
              value={staffForm.name}
              onChange={handleStaffChange}
              maxLength={255}
            />
          </Col>

          <Col md={3}>
            <FilterableSelect
              label="Designation"
              name="designation_id"
              value={staffForm.designation_id}
              onChange={handleStaffChange}
              options={designation}
              required
            />

             <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Designation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Designation Name</Form.Label>
            <Form.Control
              type="text"
              value={newDesignation}
              onChange={(e) => setNewDesignation(e.target.value)}
              placeholder="Enter designation name"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
               {
                designationloading ? (<> Add New Designation... <ButtonLoading/></>): 'Add New Designation'
               } 
          </Button>
        </Modal.Footer>
      </Modal>

          </Col>

          {[3, 5, 6].includes(Number(category_id)) && (
            <Col md={3}>
              <FilterableSelect
                label="Specialization"
                name="specialization_id"
                value={staffForm.specialization_id}
                onChange={handleStaffChange}
                options={specialization}
                required
              />
            </Col>
          )}


          <Col md={3}>
            <Form_input
              type="text"
              label="Qualification"
              name="qualification"
              value={staffForm.qualification}
              onChange={handleStaffChange}
            />
          </Col>

          <Col md={3}>
            <Form_input
              type="text"
              label="Experience Years"
              name="experience_years"
              value={staffForm.experience_years}
              onChange={handleStaffChange}
            />
          </Col>

         <Col md={3}>
  <Form_input
    type="tel"   
    label="Phone"
    name="phone"
    value={staffForm.phone}
    maxLength={10}
    minLength={10}
    pattern="\d{10}"   
    onChange={handleStaffChange}
  />
</Col>
          <Col md={3}>
            <Form_input
              type="text"
              label="Email"
              name="email"
              value={staffForm.email}
              onChange={handleStaffChange}
              required
            />
          </Col>

          <Col md={3}>
            <Form_input
              type="text"
              label="Working Days"
              name="available_days"
              value={staffForm.available_days}
              onChange={handleStaffChange}

            />
          </Col>

          <Col md={3}>
            <Form_input
              type="text"
              label="Available Timings"
              name="available_time"
              value={staffForm.available_time}
              placeholder={'e.g. 9:00 AM - 6:00 PM'}
              onChange={handleStaffChange}
            />
          </Col>

<Col md={3}>
  <Form.Group controlId="availabilityStatus">
    <Form.Label className="text-black fw-bold fs-5">Availability Status </Form.Label>
    <Form.Select
      name="available_status"
      value={staffForm.available_status}
      onChange={handleStaffChange}
    >
      <option value="">-- Select Status --</option>
      <option value="Available">Available</option>
      <option value="On Leave">On Leave</option>
      <option value="On Duty Off">On Duty Off</option>
      <option value="Not Available Today">Not Available Today</option>
    </Form.Select>
  </Form.Group>
</Col>


          {/* <Col md={6}>
            <FileUploadWithPreview
              label="Profile Image"
              name="profile_image"
              value={staffForm.profile_image}
              onChange={handleStaffChange}
            />
          </Col> */}


          <Col md={12} className="mt-3">

            {/* <Button variant="primary" type="button" onClick={handleAddStaff}>
              {editIndex !== null ? "Update Staff" : "Add Staff"}
            </Button> */}
            <Button
              variant="primary"
              type="submit"
              name="addstaff"
            >
              {editIndex !== null ? "Update Staff" : "Add Staff"}
            </Button>

            {editIndex !== null && (
              <Button variant="primary" className="m-2" type="button" onClick={resetStaffForm}>
                Cancel
              </Button>
            )}
          </Col>
        </Row>
        <CustomTable
          columns={staffColumns}
          data={formData.staff_details}
          onEdit={(index, staff) => handleEditStaff(index)}
          onDelete={(index) => handleRemoveStaff(index)}
        />
      </Form>

    </>
  );
}

export default Step_04;
