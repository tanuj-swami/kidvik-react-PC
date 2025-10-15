// components/Step_05.js
import React, { useState ,  useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { showToast } from "../../Helper/toastService";
import Form_input from "../../Helper/Form_Input";
import FilterableSelect from "../../Helper/FilterableSelect";
import { BASE_URL } from "../../Helper/Base_Url";
import  fetchSelectOptions  from "./MasterTableData/Master_Institude_2nd_step";
import { usePartnerLogin } from "../../Contaxt/PartnarLogin_context";
import { useParams } from "react-router-dom";
import CustomTable from "../../Helper/GlobelTable";

function Institude_Timing({ next, setloading , setCompletedSteps , activeStep}) {
  const [shifingoption , setshifingoption] = useState([]);
  const [class_group , setclass_group] = useState([]);
    const [ timings , setTimings] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editIndex_2, setEditIndex_2] = useState(null);
  const category_id = localStorage.getItem("selectedCategory")

  const [faqs , setFaqs] = useState([]); 
  const {partner_id} = usePartnerLogin();
  const {slug} = useParams();

  const dataset = {
    Shift_id: null,
    class_Group_id: [4, 6].includes(Number(category_id)) ? "" : 1,
    Institute_Time_From: "",
    Institute_Time_To: "",
    Institute_Office_From: "",
    Institute_Office_To: "",
    question:"",
    answer:"",
  }

  const [formData, setFormData] = useState(dataset);

     useEffect(() => {
      fetchSelectOptions(`${BASE_URL}/shift_mst/`, "Shift_name")
        .then(setshifingoption);
  
      fetchSelectOptions(`${BASE_URL}/class_group/`, "Class_Group_Name" , "Class_Group_id")
        .then(setclass_group);
    }, []);

    useEffect(()=>{
      fetchdatabyid(slug);
    },[slug])
    
    
      const fetchdatabyid = async (slug) => {
        try {
          const res = await fetch(`${BASE_URL}/partner_all/${slug}/`);
          const data = await res.json();
    
          if (res.ok && data) {
          setTimings(data.institute_timing || []);
          setFaqs(data.institute_frequently || []);
          }
        } catch (error) {
          console.error("Error fetching Listing data:", error);
        }
      };

  // handle change
   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // add institute timing
  const addTiming = () => {
    if (
      !formData.Shift_id ||
      !formData.class_Group_id
      
    ) {
      showToast("Please fill all fields", "error");
      return;
    }

   if (editIndex !== null) {
    setTimings((prev) =>
      prev.map((item, idx) => (idx === editIndex ? formData : item))
    );
    setEditIndex(null);
  } else {
    // add new
    setTimings((prev) => [...prev, formData]);
  }

    
    setFormData({
      shift_id: null,
      class_Group_id: null,
      Institute_Time_From: "",
      Institute_Time_To: "",
      Institute_Office_From: "",
      Institute_Office_To: "",
    });
  };

const deleteTiming = (index) => {
  setTimings((prev) => prev.filter((_, i) => i !== index));
};



  // add FAQ
const addFaq = () => {
  if (!formData.question || !formData.answer) {
    showToast("Please fill Question and Answer", "error");
    return;
  }

  if (editIndex_2 !== null) {
    // 🔄 Edit mode: replace existing FAQ
    setFaqs((prev) =>
      prev.map((item, idx) =>
        idx === editIndex_2
          ? {
              FAQ_Questions: formData.question,
              FAQ_Answer: formData.answer,
            }
          : item
      )
    );
    setEditIndex_2(null); 
  } else {
    // ➕ Add mode: push new FAQ
    setFaqs((prev) => [
      ...prev,
      {
        FAQ_Questions: formData.question,
        FAQ_Answer: formData.answer,
      },
    ]);
  }

  // Reset form fields
  setFormData((prev) => ({
    ...prev,
    question: "",
    answer: "",
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
     const buttonClicked = e.nativeEvent.submitter.name;

    if (buttonClicked == "addtiming") {
           addTiming();
           return;
    }
    if (buttonClicked == "addfaq") {
            addFaq();
           return;
    }

    else {

    setloading(true);

    try {
      const payload = {
        partner_id:partner_id,
        institute_timing: timings,
        institute_frequently: faqs,
      };

      const response = await fetch(`${BASE_URL}/partner_all/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("data",data);
      if (response.ok) {
        showToast(data.message, "success");
        setCompletedSteps((prev) => [...prev, activeStep]);

        next();
      } else {
                  data.institute_timing.forEach((staffError, index) => {
           if (staffError && Object.keys(staffError).length > 0) {
             Object.entries(staffError).forEach(([field, messages]) => {
               messages.forEach((msg) => {
                 showToast(`Staff ${index + 1} - ${field}: ${msg}`, "error");
               });
             });
           }
         });

      }
    } catch (error) {
      console.error(" Network error:", error);
    } finally {
      setloading(false);
    }
  }
  };

    const editTiming = (index) => {
    setFormData(timings[index]);
    setEditIndex(index);
  };

  
  // Define columns for timings
const timingColumns = [
  { 
    label: "Partner Shift", 
    accessor: (row) => {
      const found = shifingoption.find(s => Number(s.value) === Number(row.Shift_id));
      return found ? found.label : "-";
    }
  },
  ...([4, 6].includes(Number(category_id))
      ? [{
          label: "Class Group",
          accessor: (row) => {
            const found = class_group.find(
              (c) => Number(c.value) === Number(row.class_Group_id)
            );
            return found ? found.label : "-";
          },
        }]
      : []),
  { label: "Time From", key: "Institute_Time_From" },
  { label: "Time To", key: "Institute_Time_To" },
  { label: "Office From", key: "Institute_Office_From" },
  { label: "Office To", key: "Institute_Office_To" },
];


// Define columns for FAQs
const faqColumns = [
  { label: "Question", key: "FAQ_Questions" },
  { label: "Answer", key: "FAQ_Answer" },
  

];

const editFAQ = (index) => {
  const selected = faqs[index];
  setFormData((prev) => ({
    ...prev,
    question: selected.FAQ_Questions,
    answer: selected.FAQ_Answer,
  }));
  setEditIndex_2(index);
};


// delete FAQ
const deleteFAQ = (index) => {
  setFaqs((prev) => prev.filter((_, i) => i !== index));
};


  return (
    <>
    
   
  <Form onSubmit={handleSubmit} id="timingForm">
    <Row className="border border-2 border-primary rounded p-3 mb-4">
        <h4 className="text-primary mb-3 fw-bold">Partner Timing</h4>

        {/* Shift */}
        <Col md={3}>
          <FilterableSelect
            label="Partner Shift"
            name="Shift_id"
            value={formData.Shift_id}
            onChange={handleChange}
            options={shifingoption}
            required
          />
        </Col>

        {/* Class Group */}
 
    {[4, 6].includes(Number(category_id)) && (
        <Col md={3}>
          <FilterableSelect
            label="Partner Class Group"
            name="class_Group_id"
            value={formData.class_Group_id}
            onChange={handleChange}
            options={class_group}
            required
          />
        </Col>
         )
 }

        {/* Institute Time From */}
        <Col md={3}>
          <Form_input
            type="time"
            label="Partner Time From"
            name="Institute_Time_From"
            value={formData.Institute_Time_From}
            onChange={handleChange}
            required
            
          />
        </Col>


        {/* Institute Time To */}
        <Col md={3}>
          <Form_input
            type="time"
            label="Partner Time To"
            name="Institute_Time_To"
            value={formData.Institute_Time_To}
            onChange={handleChange}
            required
          />
        </Col>

        {/* Office Time From */}
        <Col md={3}>
          <Form_input
            type="time"
            label="Partner Office Time From"
            name="Institute_Office_From"
            value={formData.Institute_Office_From}
            onChange={handleChange}
            required
          />
        </Col>

        {/* Office Time To */}
        <Col md={4}>
          <Form_input
            type="time"
            label="Partner Office Time To"
            name="Institute_Office_To"
            value={formData.Institute_Office_To}
            onChange={handleChange}
            required  
          />
        </Col>

    

      <Col md={3} className="d-flex align-items-end gap-2">

  <Button 
    variant={editIndex !== null ? "primary" : "primary"} 
    type="submit"
    name="addtiming"
  >
    {editIndex !== null ? " Update Timing" : "➕ Add Timing"}
  </Button>


  {editIndex !== null && (
    <Button 
      variant="primary" 
      onClick={() => {
        setEditIndex(null);
        setFormData({
          Shift_id: null,
          class_Group_id: null,
          Institute_Time_From: "",
          Institute_Time_To: "",
          Institute_Office_From: "",
          Institute_Office_To: "",
          question: "",
          answer: "",
        });
      }}
    >
      ❌ Cancel
    </Button>
  )}
</Col>


      
       <CustomTable
          columns={timingColumns}
          data={timings}
          onEdit={(index, staff) => editTiming(index)}
          onDelete={(index) => deleteTiming(index)}
        />

        
      </Row>

  </Form>

 <Form onSubmit={handleSubmit} id="faqForm">
      <Row className="border border-2 border-primary rounded p-3 mb-4">
        <h4 className="text-primary mb-3 fw-bold">Partner FAQs</h4>
        <Col md={4}>
          <Form_input
            type="text"
            label="Question"
            name="question"
            value={formData.question}
            onChange={handleChange}
            required

          />
        </Col>
        <Col md={4}>
          <Form_input
            type="text"
            label="Answer"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            required
          />
        </Col>

       

     <Col md={3} className="d-flex align-items-end gap-2">
  <Button 
    variant={editIndex_2 !== null ? "primary" : "primary"} 
   name="addfaq"
   type="submit"
  >
    {editIndex_2 !== null ? " Update Timing" : "➕ Add Faq"}
  </Button>

  {editIndex_2 !== null && (
    <Button 
      variant="secondary" 
      onClick={() => {
        setEditIndex_2(null);
        setFormData({
          question:"",
          answer:"",
        });
      }}
    >
      ❌ Cancel
    </Button>
  )}
</Col>

        {/* <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              
            </tr>
          </thead>
          <tbody>
            {faqs.map((item, idx) => (
              <tr key={idx}>
                <td>{item.FAQ_Questions}</td>
                <td>{item.FAQ_Answer}</td>
               
              </tr>
            ))}
          </tbody>
        </Table> */}

         <CustomTable
          columns={faqColumns}
          data={faqs}
          onEdit={(index, staff) =>  editFAQ(index)}
          onDelete={(index) => deleteFAQ(index)}
        />


      </Row>
 </Form>

    <Form onSubmit={handleSubmit} id="listingForm" >
  
    </Form>
     </>
  );
}

export default Institude_Timing;
