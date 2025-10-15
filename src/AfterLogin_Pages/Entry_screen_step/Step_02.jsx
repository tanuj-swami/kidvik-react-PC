import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Form_input from "../../Helper/Form_Input";
import FilterableSelect from "../../Helper/FilterableSelect";
import { BASE_URL } from "../../Helper/Base_Url";
import { showToast } from "../../Helper/toastService";
import fetchSelectOptions from "./MasterTableData/Master_Institude_2nd_step";
// import FilterableMultiSelect from "../../Helper/FilterableMultiSelect";
import { usePartnerLogin } from "../../Contaxt/PartnarLogin_context";
import { useParams } from "react-router-dom";


function Step_02({ next, setloading, finish, activeStep, steps , setCompletedSteps }) {
  const { partner_id } = usePartnerLogin();
  const [categories, setcategories] = useState([]);
  const [ownerships, setownerships] = useState([]);
  const [formats, setformats] = useState([]);
  const [coedOptions, setcoedOptions] = useState([])
  const [languages, setlanguages] = useState([]);
  const [campusTypes, setcampusTypes] = useState([])
  const [uomOptions, setuomOptions] = useState([])
  const [board , setbpard ] = useState([]);
  const { slug } = useParams();
  const dataset = {
    Institute_Category_id: null,
    Ownership_id: null,
    Institute_Format_id: null,
    Co_Ed_Status_id: null,
    Campus_Size_UOM_id: null,
    Campus_Type_id: null,
    Language_of_Instruction_id: null,
    Year_of_Establishment: "",
    Campus_Size: "",
    Academic_Session_Detail: "",
    No_Of_Academic_Staf: "",
    Faculty_Ratio: "",
    Student_Ratio: "",
    Total_Faculty: "",
    Total_Student: "",
    Board_id:null,
  }

  const [formData, setFormData] = useState(dataset);
  
  useEffect(() => {
    fetchSelectOptions(`${BASE_URL}/institute_category_mst/`, "InstituteCategory_name")
      .then(setcategories);

    // fetchSelectOptions(`${BASE_URL}/ownership_mst/`, "Ownership_name")
    //   .then(setownerships);
      
    fetchSelectOptions(`${BASE_URL}/ownership_mst/`, "Ownership_name")
      .then(setownerships);

    fetchSelectOptions(`${BASE_URL}/board_mst/`, "board_name")
      .then(setbpard);

  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/institute_format_mst/`)
      .then((res) => res.json())
      .then((data) => {
        const options = data.data.map((item) => ({
          value: item.id,
          label: item.Institute_Format_name,
        }));
        setformats(options);
      })
      .catch((err) => console.error("Error fetching cities:", err));
  }, []);


  useEffect(() => {
    fetch(`${BASE_URL}/co_ed_status_mst/`)
      .then((res) => res.json())
      .then((data) => {
        const options = data.data.map((item) => ({
          value: item.id,
          label: item.Co_Ed_Status_name,
        }));
        setcoedOptions(options);
      })
      .catch((err) => console.error("Error fetching cities:", err));
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/loi_mst/`)
      .then((res) => res.json())
      .then((data) => {
        const options = data.data.map((item) => ({
          value: item.id,
          label: item.LOI_name,
        }));
        setlanguages(options);
      })
      .catch((err) => console.error("Error fetching cities:", err));
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/campus_type_mst/`)
      .then((res) => res.json())
      .then((data) => {
        const options = data.data.map((item) => ({
          value: item.id,
          label: item.Campus_Type_name,
        }));
        setcampusTypes(options);
      })
      .catch((err) => console.error("Error fetching cities:", err));
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/campus_size_uom_mst/`)
      .then((res) => res.json())
      .then((data) => {
        const options = data.data.map((item) => ({
          value: item.id,
          label: item.Campus_Size_UOM_name,
        }));
        setuomOptions(options);
      })
      .catch((err) => console.error("Error fetching cities:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setloading(true);

    try {
      const payload = {
        partner_id: partner_id,
        institute_detail: [
          {
            ...formData,
            
          },
        ],
         institute_board: [
        {
          Board_id: formData.Board_id, 
        },
      ],                  
      };
      const response = await fetch(`${BASE_URL}/partner_all/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // JSON request, not FormData
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // console.log("✅ Success:", data);
        showToast(data.message, "success")
         setCompletedSteps((prev) => [...prev, activeStep]);
         
        activeStep === steps.length - 1 ? finish() : next();
      } 
      
      else {
       if (data.institute_detail) {
                   data.institute_detail.forEach((errorObj, index) => {
                     if (errorObj && Object.keys(errorObj).length > 0) {
                       Object.entries(errorObj).forEach(([field, messages]) => {
                         messages.forEach((msg) => {
                           showToast(`Event Detail ${index + 1} - ${field}: ${msg}`, "error");
                         });
                       });
                     }
                   });
                 }
                 else{
                   showToast(data.message , "Submission failed", "error");
                 }
      }
    } catch (error) {
      console.error("❌ Network error:", error);
    }
    finally {
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
        const institute_detail = data.institute_detail?.[0] || [];
        const institute_board = data.institute_board?.[0] || {};
       setFormData((prev) => ({
        ...prev,
        partner_id: partner_id,
        Institute_Category_id: institute_detail.Institute_Category_id || null,
        Ownership_id: institute_detail.Ownership_id || null,
        Institute_Format_id: institute_detail.Institute_Format_id || null,
        Co_Ed_Status_id: institute_detail.Co_Ed_Status_id || null,
        Campus_Size_UOM_id: institute_detail.Campus_Size_UOM_id || null,
        Campus_Type_id: institute_detail.Campus_Type_id || null,
        Language_of_Instruction_id: institute_detail.Language_of_Instruction_id || null,
        Year_of_Establishment: institute_detail.Year_of_Establishment || "",
        Campus_Size: institute_detail.Campus_Size || "",
        Academic_Session_Detail: institute_detail.Academic_Session_Detail || "",
        No_Of_Academic_Staf: institute_detail.No_Of_Academic_Staf || "",
        Faculty_Ratio: institute_detail.Faculty_Ratio || "",
        Student_Ratio: institute_detail.Student_Ratio || "",
        Total_Faculty: institute_detail.Total_Faculty || "",
        Total_Student: institute_detail.Total_Student || "",
        Classes_Offered : institute_detail.Classes_Offered || "",
        Board_id: institute_board.Board_id || null,
      }));
      }
    } catch (error) {
      console.error("Error fetching Listing data:", error);
    }
  };

  return (
    <>
      <Form id="listingForm" onSubmit={handleSubmit}>
        <Row className="border border-2 border-primary rounded p-3 mb-4">
          <h4 className="text-primary">Education Details</h4>
          <hr className="m-0 p-0 mb-4 text-primary" />

          {/* Dropdowns */}


          <Col md={4}>
            <FilterableSelect
              label="Board"
              name="Board_id"
              value={formData.Board_id}
              onChange={handleChange}
              required
              options={board}
            />
          </Col>

          <Col md={4}>
            <FilterableSelect
              label="Institute Category"
              name="Institute_Category_id"
              value={formData.Institute_Category_id}
              onChange={handleChange}
              required
              options={categories}
            />
          </Col>

          <Col md={4}>
            <FilterableSelect
              label="Ownership"
              name="Ownership_id"
              value={formData.Ownership_id}
              onChange={handleChange}
              required
              options={ownerships}
            />
          </Col>

          {/* Text Inputs */}
          <Col md={4}>
            <Form_input
              type="number"
              label="Year of Establishment"
              name="Year_of_Establishment"
              value={formData.Year_of_Establishment}
              onChange={handleChange}
              maxLength={4}
            />
          </Col>

          <Col md={4}>
            <FilterableSelect
              label="Co-Ed Status"
              name="Co_Ed_Status_id"
              value={formData.Co_Ed_Status_id}
              onChange={handleChange}
              options={coedOptions}
              required
            />
          </Col>
          <Col md={4}>
            <FilterableSelect
              label="Institute Format"
              name="Institute_Format_id"
              value={formData.Institute_Format_id}
              onChange={handleChange}
              options={formats}
            />
          </Col>

          <Col md={4}>
            <Form_input
              type="text"
              label="Classes Offered"
              name="Classes_Offered"
              value={formData.Classes_Offered}
              onChange={handleChange}
            />
          </Col>

          <Col md={4}>
            <FilterableSelect
              label="Language of Instruction"
              name="Language_of_Instruction_id"
              value={formData.Language_of_Instruction_id}
              onChange={handleChange}
              options={languages}
            />
          </Col>

          {/* <Col md={3}>
            <FilterableSelect
              label="Campus Type"
              name="Campus_Type_id"
              value={formData.Campus_Type_id}
              onChange={handleChange}
              options={campusTypes}
            />
          </Col> */}

          <Col md={3}>
            <Form_input
              type="Campus Size"
              label="Campus Size"
              name="Campus_Size"
              value={formData.Campus_Size}
              onChange={handleChange}
              required
            />
          </Col>

          <Col md={2} >
            <FilterableSelect
              label={<span style={{ visibility: "hidden" }}>g</span>}
              name="Campus_Size_UOM_id"
              value={formData.Campus_Size_UOM_id}
              onChange={handleChange}
              options={uomOptions}
              placeholder="Select Campus Size UOM"
              
            />
          </Col>


          {/* <Col md={4}>
    <FilterableMultiSelect
      label="Board"
      name="board"
      value={formData.board}   
      onChange={handleChange}
      required
      options={board}          
    />
  </Col> */}


        </Row>
        <Row className="border border-2 border-primary rounded p-3 mb-4 ">
          {/* <h4 className="text-primary ">Address Detail</h4> */}
          <hr className="m-0 p-0 mb-4 text-primary"></hr>
          <Col md={4}>
            <Form_input
              type="number"
              label="No of Academic Staff"
              name="No_Of_Academic_Staf"
              value={formData.No_Of_Academic_Staf}
              onChange={handleChange}
            />
          </Col>

          <Col md={4}>
            <Form_input
              type="text"
              label="Student & Faculty Ratio"
              name="Faculty_Ratio"
              value={formData.Faculty_Ratio}
              onChange={handleChange}
            />
          </Col>

          <Col md={4}>
            <Form_input
              type="number"
              label="Total Faculty"
              name="Total_Faculty"
              value={formData.Total_Faculty}
              onChange={handleChange}
            />
          </Col>

          {/* <Col md={4}>
            <Form_input
              type="text"
              label="Student Ratio"
              name="Student_Ratio"
              value={formData.Student_Ratio}
              onChange={handleChange}
            />
          </Col> */}

          <Col md={4}>
            <Form_input
              type="number"
              label="Total Students"
              name="Total_Student"
              value={formData.Total_Student}
              onChange={handleChange}
            />
          </Col>

          <Col md={4}>
            <Form_input
              type="text"
              label="Academic Session Detail"
              name="Academic_Session_Detail"
              value={formData.Academic_Session_Detail}
              onChange={handleChange}
            />
          </Col>


        </Row>
      </Form>


    </>
  );
}

export default Step_02;
