import React, { useState, useEffect } from "react";
import { Form, Button, Table, Row, Col } from "react-bootstrap";
import { BASE_URL } from "../../Helper/Base_Url";
import { showToast } from "../../Helper/toastService";
import fetchSelectOptions  from "./MasterTableData/Master_Institude_2nd_step";
import FilterableSelect from "../../Helper/FilterableSelect";
import Form_input from "../../Helper/Form_Input";
import { usePartnerLogin } from "../../Contaxt/PartnarLogin_context";
import { useParams } from "react-router-dom";
import CustomTable from "../../Helper/GlobelTable";
const SchoolFeesForm = ({ next, setloading , finish , activeStep , steps , setCompletedSteps }) => {
  const {partner_id} = usePartnerLogin();  
  const [classes, setClasses] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [feeTypes, setFeeTypes] = useState([]);
  const [frequencies, setFrequencies] = useState([]);
  const [fees, setFees] = useState([]); 
  const {slug} = useParams();
const [editIndex, setEditIndex] = useState(null); 

  const [formData , setFormData] = useState({
    Class_id: null,
    Shift_id: null,
    Fees_Type_id	: null,
    Fees_Frequency_id: null,
    Fees_Amount: "",
    Annual_Fee: "",
    Monthly_Fee: "",
    remarks: ""
  });


 
  useEffect(() => {
    fetchSelectOptions(`${BASE_URL}/class_mst/`, "class_name").then(setClasses);
    fetchSelectOptions(`${BASE_URL}/shift_mst/`, "Shift_name").then(setShifts);
    fetchSelectOptions(`${BASE_URL}/feetype_mst/`, "FeeType_name").then(setFeeTypes);
    fetchSelectOptions(`${BASE_URL}/feefrequency_mst/`, "FeeFrequency_name").then(setFrequencies);
  }, []);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // add fee row
const addFee = () => {
  if (!formData.Class_id || !formData.Shift_id || !formData.Fees_Type_id) {
    showToast("Please fill required fields", "error");
    return;
  }

  if (editIndex !== null) {
    // update existing
    setFees((prev) =>
      prev.map((fee, i) => (i === editIndex ? formData : fee))
    );
    setEditIndex(null);
    showToast("Fee updated", "success");
  } else {
    // add new
    setFees((prev) => [...prev, formData]);
    showToast("Fee added", "success");
  }

  // reset form
  setFormData({
    Class_id: null,
    Shift_id: null,
    Fees_Type_id: null,
    Fees_Frequency_id: null,
    Fees_Amount: "",
    Annual_Fee: "",
    Monthly_Fee: "",
    remarks: ""
  });
};

// edit handler
const handleEditfess = (index) => {
  setFormData(fees[index]);
  setEditIndex(index);
};

  // delete row
  const deleteFee = (index) => {
    setFees((prev) => prev.filter((_, i) => i !== index));
  };

  // submit all fees
  const handleSubmit = async (e) => {
     e.preventDefault();
       setloading(true);

    try {
      const payload = {
        partner_id:partner_id,
        school_fee_class: fees,
      };
    console.log("payload",payload)
      const res = await fetch(`${BASE_URL}/partner_all/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = res.json();
      if (res.ok) {
        showToast(data.message, "success");
                setCompletedSteps((prev) => [...prev, activeStep]);

        setFees([]);

         activeStep === steps.length - 1 ? finish() : next();

      } else {
        if (data.school_fee_class) {
                   data.school_fee_class.forEach((errorObj, index) => {
                     if (errorObj && Object.keys(errorObj).length > 0) {
                       Object.entries(errorObj).forEach(([field, messages]) => {
                         messages.forEach((msg) => {
                           showToast(`school Fee ${index + 1} - ${field}: ${msg}`, "error");
                         });
                       });
                     }
                   });
                 }else{
                   showToast(data.message , "error");
       
                 }
      }
    } catch (err) {
      console.error(err);
      showToast("Network error", "error");
    }
    finally{
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
          setFees(data.school_fee_class || [])
          // setFormData((prev) => ({
          //   ...prev,
          //   partner_id: partner_id,
          //   fees: staffArray,

          // }));
        }
  
  
      } catch (error) {
        console.error("Error fetching Listing data:", error);
      }
    };

    const feeColumns = [
  { label: "Class", key: "Class_id", accessor: (row) => classes.find((c) => c.value === row.Class_id)?.label || "-" },
  { label: "Shift", key: "Shift_id", accessor: (row) => shifts.find((s) => s.value === row.Shift_id)?.label || "-" },
  { label: "Fee Type", key: "Fees_Type_id", accessor: (row) => feeTypes.find((f) => f.value === row.Fees_Type_id)?.label || "-" },
  { label: "Frequency", key: "Fees_Frequency_id", accessor: (row) => frequencies.find((fr) => fr.value === row.Fees_Frequency_id)?.label || "-" },
  { label: "Amount", key: "Fees_Amount" },
  { label: "Annual", key: "Annual_Fee" },
  { label: "Monthly", key: "Monthly_Fee" },
];



const cancelEdit = () => {
  setFormData({
    Class_id: null,
    Shift_id: null,
    Fees_Type_id: null,
    Fees_Frequency_id: null,
    Fees_Amount: "",
    Annual_Fee: "",
    Monthly_Fee: "",
    remarks: ""
  });
  setEditIndex(null);
};


  return (
 <>

      <Form id="listingForm" onSubmit={handleSubmit}>
       <Row className="border border-2 border-primary rounded p-2 mb-4">
        <h4 className="text-primary">Education Fees Detail</h4>
        <hr className="m-0 p-0 mb-4 text-primary" />

        <Col md={3}>
          <FilterableSelect
            label="Class"
            name="Class_id"
            value={formData.Class_id}
            onChange={handleChange}
            options={classes}
            
          />
        </Col>

        <Col md={3}>
          <FilterableSelect
            label="Shift"
            name="Shift_id"
            value={formData.Shift_id}
            onChange={handleChange}
            options={shifts}
            
          />
        </Col>

        <Col md={3}>
          <FilterableSelect
            label="Fee Type"
            name="Fees_Type_id"
            value={formData.Fees_Type_id}
            onChange={handleChange}
            options={feeTypes}
           
          />
        </Col>

        <Col md={3}>
          <FilterableSelect
            label="Frequency"
            name="Fees_Frequency_id"
            value={formData.Fees_Frequency_id}
            onChange={handleChange}
            options={frequencies}
          />
        </Col>

        <Col md={3}>
          <Form_input
            type="number"
            label="Fees Amount"
            name="Fees_Amount"
            value={formData.Fees_Amount}
            onChange={handleChange}
          />
        </Col>

        <Col md={3}>
          <Form_input
            type="number"
            label="Annual Fee"
            name="Annual_Fee"
            value={formData.Annual_Fee}
            onChange={handleChange}
          />
        </Col>

        <Col md={3}>
          <Form_input
            type="number"
            label="Monthly Fee"
            name="Monthly_Fee"
            value={formData.Monthly_Fee}
            onChange={handleChange}
          />
        </Col>

        {/* <Col md={3}>
          <Form_input
            type="text"
            label="Remarks"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
          />
        </Col> */}

   <Col md={12} className="mt-3 d-flex gap-2">
  <Button variant="primary" onClick={addFee}>
    {editIndex !== null ? "Update Fees" : "Add Fees"}
  </Button>

  {editIndex !== null && (
    <Button variant="primary" onClick={cancelEdit}>
      Cancel
    </Button>
  )}
</Col>

      </Row>


      {/* Fees Table */}
      {/* <Table bordered hover className="mt-3">
        <thead className="table-primary">
          <tr>
            <th>Class</th>
            <th>Shift</th>
            <th>Fee Type</th>
            <th>Frequency</th>
            <th>Amount</th>
            <th>Annual</th>
            <th>Monthly</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((fee, index) => (
            <tr key={index}>
              <td>{classes.find((c) => c.value === fee.Class_id)?.label}</td>
              <td>{shifts.find((s) => s.value === fee.Shift_id)?.label}</td>
              <td>{feeTypes.find((f) => f.value === fee.Fees_Type_id)?.label}</td>
              <td>{frequencies.find((fr) => fr.value === fee.Fees_Frequency_id)?.label}</td>
              <td>{fee.Fees_Amount}</td>
              <td>{fee.Annual_Fee}</td>
              <td>{fee.Monthly_Fee}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteFee(index)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table> */}
       <CustomTable
          columns={feeColumns}
          data={fees}
          onEdit={(index) => handleEditfess(index)}
          onDelete={(index) => deleteFee(index)}
        />

     </Form>
     </>
  );
};

export default SchoolFeesForm;
