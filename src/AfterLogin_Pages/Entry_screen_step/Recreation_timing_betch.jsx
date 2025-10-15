import React, { useState, useEffect } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
// import Form_input from "../common/Form_input"; 
// import FilterableSelect from "../common/FilterableSelect"; 
import Form_input from "../../Helper/Form_Input";
import FilterableSelect from "../../Helper/FilterableSelect";
import { BASE_URL } from "../../Helper/Base_Url";
import  fetchSelectOptions  from "./MasterTableData/Master_Institude_2nd_step";
import { showToast } from "../../Helper/toastService";
import { usePartnerLogin } from "../../Contaxt/PartnarLogin_context";
import { useParams } from "react-router-dom";
import CustomTable from "../../Helper/GlobelTable";

function Recreation_timing_betch({ next, setloading, finish, activeStep, steps , setCompletedSteps }) {
  const { partner_id } = usePartnerLogin();
  const [activityOptions, setActivityOptions] = useState([]);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [batchTypeOptions, setTypeOptions] = useState([]);
  const [ageGroupOptions, setAgeGroupOptions] = useState([]);
  const [editingFeeIndex, setEditingFeeIndex] = useState(null);

  const [skillLevelOptions, setSkillLevelOptions] = useState([]);
  const [feesTypeOptions, setFeesTypeOptions] = useState([]);
  const [feesFrequencyOptions, setFeesFrequencyOptions] = useState([]);
  const {slug} = useParams();
  const [batchInput, setBatchInput] = useState({
    activity: "",
    batch_type: "",
    age_group: "",
    skill_level: "",
    batch_name: "",
    start_date: "",
    end_date: "",
    capacity: "",
    enrol_open: "",
  });

  const [batchList, setBatchList] = useState([]);


  const handleBatchChange = (e) => {
    const { name, value } = e.target;
    setBatchInput({ ...batchInput, [name]: value });
  };


const [editingBatchIndex, setEditingBatchIndex] = useState(null);

const handleBatchEdit = (index) => {
  setBatchInput(batchList[index]);   
  setEditingBatchIndex(index);
};

const addOrUpdateBatch = () => {

  // if (!batchInput.activity || !batchInput.batch_type) {
  //   showToast("Please fill all required fields", "error");
  //   return;
  // }

  if (editingBatchIndex !== null) {
    const updated = [...batchList];
    updated[editingBatchIndex] = batchInput;
    setBatchList(updated);
    setEditingBatchIndex(null);
  } else {
    setBatchList([...batchList, batchInput]);
  }

  setBatchInput({
    activity: "",
    batch_type: "",
    age_group: "",
    skill_level: "",
    batch_name: "",
    start_date: "",
    end_date: "",
    capacity: "",
    enrol_open: "",
  });
};



  const deleteBatch = (index) => {
    const updated = [...batchList];
    updated.splice(index, 1);
    setBatchList(updated);
  };


  const [feeInput, setFeeInput] = useState({

    skill_level: "",
    batch_type: "",
    fees_type: "",
    fees_amount: "",
    fees_frequency: "",
    annual_fee: "",
    monthly_fee: "",
  });

  const [feeList, setFeeList] = useState([]);

  const [timingInput, setTimingInput] = useState({

    activity: "",
    shift: "",
    batch_type: "",
    age_group: "",
    days: "",
    time_from: "",
    time_to: "",
    office_from: "",
    office_to: "",
  });

  const handleFeeChange = (e) => {
    const { name, value } = e.target;
    setFeeInput({ ...feeInput, [name]: value });
  };

const addOrUpdateFee = () => {
  // if (!feeInput.skill_level || !feeInput.fees_type) {
  //   showToast("Please fill all required fields", "error");
  //   return;
  // }

  if (editingFeeIndex !== null) {
    // update existing
    const updated = [...feeList];
    updated[editingFeeIndex] = feeInput;
    setFeeList(updated);
    setEditingFeeIndex(null);
  } else {
    // add new
    setFeeList([...feeList, feeInput]);
  }

  // reset input
  setFeeInput({
    skill_level: "",
    batch_type: "",
    fees_type: "",
    fees_amount: "",
    fees_frequency: "",
    annual_fee: "",
    monthly_fee: "",
  });
};


  const deleteFee = (index) => {
    const newList = [...feeList];
    newList.splice(index, 1);
    setFeeList(newList);
  };
  const [timingList, setTimingList] = useState([]);
const [isEditing, setIsEditing] = useState(false);
const [editIndex, setEditIndex] = useState(null);

  const handleTimingChange = (e) => {
    const { name, value } = e.target;
    setTimingInput((prev) => ({ ...prev, [name]: value }));
  };

const addTiming = () => {
  if (!timingInput.activity || !timingInput.shift) {
    showToast("Please fill all required fields", "error");
    return;
  }

  if (isEditing && editIndex !== null) {
    // update existing row
    setTimingList((prev) =>
      prev.map((item, idx) => (idx === editIndex ? timingInput : item))
    );
    setIsEditing(false);
    setEditIndex(null);
  } else {
    // add new row
    setTimingList((prev) => [...prev, timingInput]);
  }

  // reset after add / update
  setTimingInput({
    activity: "",
    shift: "",
    batch_type: null,
    age_group: null,
    days: "",
    time_from: "",
    time_to: "",
    office_from: "",
    office_to: "",
  });
};

const handleEditTiming = (index) => {
  setTimingInput(timingList[index]);
  setIsEditing(true);
  setEditIndex(index);
};


  useEffect(() => {
    fetchSelectOptions(`${BASE_URL}/batch_type/`, "name", "batchtype_id").then(
      setTypeOptions
    );

    fetchSelectOptions(`${BASE_URL}/shift_mst/`, "Shift_name").then(
      setShiftOptions
    );
    fetchSelectOptions(`${BASE_URL}/recreational_activity/`, "name").then(
      setActivityOptions
    );

    fetchSelectOptions(`${BASE_URL}/age_group/`, "name", "agegroup_id").then(
      setAgeGroupOptions
    );


    fetchSelectOptions(`${BASE_URL}/skill_level/`, "name", "level_id").then(
      setSkillLevelOptions
    );
    fetchSelectOptions(`${BASE_URL}/feetype_mst/`, "FeeType_name").then(
      setFeesTypeOptions
    );

    fetchSelectOptions(`${BASE_URL}/feefrequency_mst/`, "FeeFrequency_name").then(
      setFeesFrequencyOptions
    );


  }, []);

  const deleteTiming = (index) => {
    setTimingList((prev) => prev.filter((_, i) => i !== index));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  const buttonClicked = e.nativeEvent.submitter.name;

    if (buttonClicked == "reactionting") {
           addTiming();
           return;
    }
    if (buttonClicked == "RecreationalFees") {
            addOrUpdateFee();
           return;
    }
    if (buttonClicked == "addbetch") {
            addOrUpdateBatch();
           return;
    }

    else {


    setloading(true);
    const payload = {
    partner_id: partner_id, 

      // TIMINGS
      recreational_timing: timingList.map(t => ({
        Activity_id: t.activity,
        shift_id: t.shift,
        Batch_Type_id: t.batch_type,
        Age_Group_id: t.age_group,
        Days: t.days,
        Time_From: t.time_from,
        Time_To: t.time_to,
        Office_From: t.office_from,
        Office_To: t.office_to,
      })),

      // FEES
      recreational_fee: feeList.map(f => ({
        Skill_Level_id: f.skill_level,
        Batch_Type_id: f.batch_type,
        Fees_Type_id: f.fees_type,
        Fees_Amount: f.fees_amount,
        Fees_Frequency_id: f.fees_frequency,
        Annual_Fee: f.annual_fee,
        Monthly_Fee: f.monthly_fee,
        remarks: f.remarks || ""
      })),

      // BATCHES
      recreational_batch: batchList.map(b => ({
        Activity_id: b.activity,
        Batch_Type_id: b.batch_type,
        Age_Group_id: b.age_group,
        Skill_Level_id: b.skill_level,
        Batch_Name: b.batch_name,
        Start_Date: b.start_date,
        End_Date: b.end_date,
        Capacity: b.capacity,
        Enrol_Open: b.enrol_open,
        remarks: b.remarks || ""
      }))
    };

    try {

      console.log("payload", payload)
      const res = await fetch(`${BASE_URL}/partner_all/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        console.log("Saved:", data);
        showToast(data.message, "success");
        setCompletedSteps((prev) => [...prev, activeStep]);

        activeStep === steps.length - 1 ? finish() : next();

        setTimingInput({
          activity: "",
          shift: "",
          batch_type: null,
          age_group: null,
          days: "",
          time_from: "",
          time_to: "",
          office_from: "",
          office_to: "",
        });

        setFeeInput({
          skill_level: "",
          batch_type: "",
          fees_type: "",
          fees_amount: "",
          fees_frequency: "",
          annual_fee: "",
          monthly_fee: "",
        });

        setBatchInput({
          activity: "",
          batch_type: "",
          age_group: "",
          skill_level: "",
          batch_name: "",
          start_date: "",
          end_date: "",
          capacity: "",
          enrol_open: "",
        });

        // 🚀 Clear tables
        setTimingList([]);
        setFeeList([]);
        setBatchList([]);
      }

      else {

        //  data.recreational_batch.forEach((staffError, index) => {
        //            if (staffError && Object.keys(staffError).length > 0) {
        //              Object.entries(staffError).forEach(([field, messages]) => {
        //                messages.forEach((msg) => {
        //                  showToast(`Staff ${index + 1} - ${field}: ${msg}`, "error");
        //                });
        //              });
        //            }
        //       });
          Object.entries(data).forEach(([section, errors]) => {
    if (Array.isArray(errors)) {
      errors.forEach((rowError, rowIndex) => {
        if (rowError && Object.keys(rowError).length > 0) {
          Object.entries(rowError).forEach(([field, messages]) => {
            messages.forEach((msg) => {
              showToast(
                `${section.replace("recreational_", "")} ${rowIndex + 1} - ${field}: ${msg}`,
                "error"
              );
            });
          });
        }
      });
    }
  });
           }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setloading(false);
    }
  }
  }
  
useEffect(() => {
  if (slug) {
    fetchdatabyid(slug);
  }
}, [slug]);

const fetchdatabyid = async (slug) => {
  try {
    const res = await fetch(`${BASE_URL}/partner_all/${slug}/`);
    const data = await res.json();

    if (res.ok && data) {
      // 🎯 Timings
      setTimingList(
        data.recreational_timing?.map(t => ({
          activity: t.Activity_id,
          shift: t.shift_id,
          batch_type: t.Batch_Type_id,
          age_group: t.Age_Group_id,
          days: t.Days,
          time_from: t.Time_From,
          time_to: t.Time_To,
          office_from: t.Office_From,
          office_to: t.Office_To,
        })) || []
      );

      // 🎯 Fees
      setFeeList(
        data.recreational_fee?.map(f => ({
          skill_level: f.Skill_Level_id,
          batch_type: f.Batch_Type_id,
          fees_type: f.Fees_Type_id,
          fees_amount: f.Fees_Amount,
          fees_frequency: f.Fees_Frequency_id,
          annual_fee: f.Annual_Fee,
          monthly_fee: f.Monthly_Fee,
          remarks: f.remarks || "",
        })) || []
      );

      // 🎯 Batches
      setBatchList(
        data.recreational_batch?.map(b => ({
          activity: b.Activity_id,
          batch_type: b.Batch_Type_id,
          age_group: b.Age_Group_id,
          skill_level: b.Skill_Level_id,
          batch_name: b.Batch_Name,
          start_date: b.Start_Date,
          end_date: b.End_Date,
          capacity: b.Capacity,
          enrol_open: b.Enrol_Open,
          remarks: b.remarks || "",
        })) || []
      );
    }
  } catch (error) {
    console.error("Error fetching Listing data:", error);
  }
};


const timingColumns = [
  // { key: "activity", label: "Activity" },
   { label: "Activity", key: "activity", accessor: (row) => activityOptions.find((c) => c.value === row.activity)?.label || "-" },
   { label: "Shift", key: "shift", accessor: (row) => shiftOptions.find((c) => c.value === row.shift)?.label || "-" },
   { label: "Batch Type", key: "batch_type", accessor: (row) => batchTypeOptions.find((c) => c.value === row.batch_type)?.label || "-" },

   { label: "Age Group", key: "age_group", accessor: (row) => ageGroupOptions.find((c) => c.value === row.age_group)?.label || "-" },

  { key: "days", label: "Days" },
  { key: "time_from", label: "Time From" },
  { key: "time_to", label: "Time To" },
]

const handleCancelEdit = () => {
  setIsEditing(false);
  setEditIndex(null);
  setTimingInput({
    activity: "",
    shift: "",
    batch_type: null,
    age_group: null,
    days: "",
    time_from: "",
    time_to: "",
    office_from: "",
    office_to: "",
  });
};

const feeColumns = [
   { label: "Skill Level", key: "skill_level", accessor: (row) =>skillLevelOptions.find((c) => c.value === row.skill_level)?.label || "-" },
   { label: "Batch Type", key: "batch_type", accessor: (row) => batchTypeOptions.find((c) => c.value === row.batch_type)?.label || "-" },
   { label: "Fees Type", key: "fees_type", accessor: (row) => feesTypeOptions.find((c) => c.value === row.fees_type)?.label || "-" },

   { label: "Frequency", key: "fees_frequency", accessor: (row) => feesFrequencyOptions.find((c) => c.value === row.fees_frequency)?.label || "-" },

  { key: "fees_amount", label: "Fees Amount" },
  { key: "annual_fee", label: "Annual Fee" },
  { key: "monthly_fee", label: "Monthly Fee" },
];

const handleFeeEdit = (index) => {
  setFeeInput(feeList[index]);
  setEditingFeeIndex(index);
};

const cancelFeeEdit = () => {
  setFeeInput({
    skill_level: "",
    batch_type: "",
    fees_type: "",
    fees_amount: "",
    fees_frequency: "",
    annual_fee: "",
    monthly_fee: "",
  });
  setEditingFeeIndex(null);
};
const batchColumns = [

  // { key: "activity", label: "Activity" },
  // { key: "batch_type", label: "Batch Type" },
  // { key: "age_group", label: "Age Group" },
  // { key: "skill_level", label: "Skill Level" },
  { label: "Activity", key: "activity", accessor: (row) => activityOptions.find((c) => c.value === row.activity)?.label || "-" },
   { label: "Batch Type", key: "batch_type", accessor: (row) => batchTypeOptions.find((c) => c.value === row.batch_type)?.label || "-" },

     { label: "Age Group", key: "age_group", accessor: (row) => ageGroupOptions.find((c) => c.value === row.age_group)?.label || "-" },
 { label: "Skill Level", key: "skill_level", accessor: (row) =>skillLevelOptions.find((c) => c.value === row.skill_level)?.label || "-" },
  

  { key: "batch_name", label: "Batch Name" },
  { key: "start_date", label: "Start Date" },
  { key: "end_date", label: "End Date" },
  { key: "capacity", label: "Capacity" },
  { key: "enrol_open", label: "Enrollment Open" },
];


  return (

    <>
  
   <form onSubmit={handleSubmit} id="reactionting" >
        <Row className="border border-2 border-info rounded p-3 mb-4">
          <h4 className="text-primary">Recreational Timings</h4>

          {/* Partner */}


          {/* Activity */}
          <Col md={4}>
            <FilterableSelect
              label="Activity"
              name="activity"
              value={timingInput.activity}
              onChange={handleTimingChange}
              options={activityOptions}
              required
            />
          </Col>


          {/* Shift */}
          <Col md={4}>
            <FilterableSelect
              label="Shift"
              name="shift"
              value={timingInput.shift}
              onChange={handleTimingChange}
              options={shiftOptions}
              required
            />
          </Col>

          {/* Batch Type */}
          <Col md={4}>
            <FilterableSelect
              label="Batch Type"
              name="batch_type"
              value={timingInput.batch_type}
              onChange={handleTimingChange}
              options={batchTypeOptions}
              required
            />
          </Col>

          {/* Age Group */}
          <Col md={4}>
            <FilterableSelect
              label="Age Group"
              name="age_group"
              value={timingInput.age_group}
              onChange={handleTimingChange}
              options={ageGroupOptions}
              required
            />
          </Col>

          {/* Days */}
          <Col md={4}>
            <Form_input
              type="text"
              label="Days"
              name="days"
              value={timingInput.days}
              onChange={handleTimingChange}
              placeholder="Mon, Wed, Fri"
            />
          </Col>

          {/* Time From */}
          <Col md={3}>
            <Form_input
              type="time"
              label="Time From"
              name="time_from"
              value={timingInput.time_from}
              onChange={handleTimingChange}
              required
            />
          </Col>

          {/* Time To */}
          <Col md={3}>
            <Form_input
              type="time"
              label="Time To"
              name="time_to"
              value={timingInput.time_to}
              onChange={handleTimingChange}
              required
            />
          </Col>

          {/* Office From */}
          <Col md={3}>
            <Form_input
              type="time"
              label="Office From"
              name="office_from"
              value={timingInput.office_from}
              onChange={handleTimingChange}
              required
            />
          </Col>

          {/* Office To */}
          <Col md={3}>
            <Form_input
              type="time"
              label="Office To"
              name="office_to"
              value={timingInput.office_to}
              onChange={handleTimingChange}
              required
            />
          </Col>

          {/* Add Button */}
         <Col md={12} className="d-flex justify-content-end mt-2">
  <Button variant={isEditing ? "primary" : "primary"} 
  type="submit"
  name="reactionting"
  >
    {isEditing ? "Update Batch" : "+ Add Recreation Timing"}
  </Button>
  
  {isEditing && (
    <Button variant="primary" className="ms-2" onClick={handleCancelEdit}>
      Cancel
    </Button>
  )}
</Col>
       <CustomTable
          columns={timingColumns}
          data={timingList}
          onEdit={(index) => handleEditTiming(index)}
          onDelete={(index) => deleteTiming(index)}
        />



        </Row>

   </form>

   <form onSubmit={handleSubmit} id="RecreationalFees">

        <Row className="border border-2 border-success rounded p-3 mb-4">
          <h4 className="text-success">Recreational Fees</h4>

          {/* Partner */}


          {/* Skill Level */}
          <Col md={4}>
            <FilterableSelect
              label="Skill Level"
              name="skill_level"
              value={feeInput.skill_level}
              onChange={handleFeeChange}
              options={skillLevelOptions}
              required
              
            />
          </Col>

          {/* Batch Type */}
          <Col md={4}>
            <FilterableSelect
              label="Batch Type"
              name="batch_type"
              value={feeInput.batch_type}
              onChange={handleFeeChange}
              options={batchTypeOptions}
              required
            />
          </Col>

          {/* Fees Type */}
          <Col md={4}>
            <FilterableSelect
              label="Fees Type"
              name="fees_type"
              value={feeInput.fees_type}
              onChange={handleFeeChange}
              options={feesTypeOptions}
              required
            />
          </Col>

          {/* Fees Amount */}
          <Col md={4}>
            <Form_input
              type="number"
              label="Fees Amount"
              name="fees_amount"
              value={feeInput.fees_amount}
              onChange={handleFeeChange}
            />
          </Col>

          {/* Fees Frequency */}
          <Col md={4}>
            <FilterableSelect
              label="Fees Frequency"
              name="fees_frequency"
              value={feeInput.fees_frequency}
              onChange={handleFeeChange}
              options={feesFrequencyOptions}
              required
            />
          </Col>

          {/* Annual Fee */}
          <Col md={6}>
            <Form_input
              type="number"
              label="Annual Fee"
              name="annual_fee"
              value={feeInput.annual_fee}
              onChange={handleFeeChange}
            />
          </Col>

          {/* Monthly Fee */}
          <Col md={6}>
            <Form_input
              type="number"
              label="Monthly Fee"
              name="monthly_fee"
              value={feeInput.monthly_fee}
              onChange={handleFeeChange}
            />
          </Col>

          {/* Add Button */}
        <Col md={12} className="d-flex justify-content-end mt-2">
  <Button 
    variant={editingFeeIndex !== null ? "primary" : "primary"} 
    type="submit"
    name="RecreationalFees"
  >
    {editingFeeIndex !== null ? "Update Fee" : "+ Add Fee"}
  </Button>

  {editingFeeIndex !== null && (
    <Button variant="primary" className="ms-2" onClick={cancelFeeEdit}>
      Cancel
    </Button>
  )}
</Col>
           <CustomTable
          columns={feeColumns}
          data={feeList}
          onEdit={(index) => handleFeeEdit(index)}
          onDelete={(index) => deleteFee(index)}
        />



        </Row>
   </form>

  <form onSubmit={handleSubmit} id="addbetch">

        <Row className="border border-2 border-info rounded p-3 mb-4">
          <h4 className="text-primary">Recreational Batches</h4>

          {/* Activity */}
          <Col md={4}>
            <FilterableSelect
              label="Activity"
              name="activity"
              value={batchInput.activity}
              onChange={handleBatchChange}
              options={activityOptions}
             
            />
          </Col>

          {/* Batch Type */}
          <Col md={4}>
            <FilterableSelect
              label="Batch Type"
              name="batch_type"
              value={batchInput.batch_type}
              onChange={handleBatchChange}
              options={batchTypeOptions}
              required
            />
          </Col>

          {/* Age Group */}
          <Col md={4}>
            <FilterableSelect
              label="Age Group"
              name="age_group"
              value={batchInput.age_group}
              onChange={handleBatchChange}
              options={ageGroupOptions}
              required
            />
          </Col>

          {/* Skill Level */}
          <Col md={4}>
            <FilterableSelect
              label="Skill Level"
              name="skill_level"
              value={batchInput.skill_level}
              onChange={handleBatchChange}
              options={skillLevelOptions}
              required
            />
          </Col>

          {/* Batch Name */}
          <Col md={4}>
            <Form_input
              type="text"
              label="Batch Name"
              name="batch_name"
              value={batchInput.batch_name}
              onChange={handleBatchChange}
            />
          </Col>

          {/* Start Date */}
          <Col md={4}>
            <Form_input
              type="date"
              label="Start Date"
              name="start_date"
              value={batchInput.start_date}
              onChange={handleBatchChange}
              required
            />
          </Col>

          {/* End Date */}
          <Col md={4}>
            <Form_input
              type="date"
              label="End Date"
              name="end_date"
              value={batchInput.end_date}
              onChange={handleBatchChange}
              required
            />
          </Col>

          {/* Capacity */}
          <Col md={4}>
            <Form_input
              type="number"
              label="Capacity"
              name="capacity"
              value={batchInput.capacity}
              onChange={handleBatchChange}
            />
          </Col>

          {/* Enrol Open */}
          <Col md={4}>
            <Form_input
              type="number"
              label="Enrollment Open"
              name="enrol_open"
              value={batchInput.enrol_open}
              onChange={handleBatchChange}
            />
          </Col>

          {/* Add Button */}
       <Col md={12} className="d-flex justify-content-end mt-2 gap-2">
      {editingBatchIndex !== null ? (
    <>
      {/* Update Button */}
      <Button variant="primary" type="submit" name="addbetch">
        Update Batch
      </Button>

      {/* Cancel Button */}
      <Button
        variant="primary"
        onClick={() => {
          setEditingBatchIndex(null);
          setBatchInput({
            activity: "",
            batch_type: "",
            age_group: "",
            skill_level: "",
            batch_name: "",
            start_date: "",
            end_date: "",
            capacity: "",
            enrol_open: "",
          });
        }}
      >
        Cancel
      </Button>
    </>
  ) : (
    <Button variant="primary" type="submit" name="addbetch">
      + Add Batch
    </Button>
  )}
</Col>




       <CustomTable
          columns={batchColumns}
          data={batchList}
          onEdit={(index) => handleBatchEdit(index)}
          onDelete={(index) => deleteBatch(index)}
        />


        </Row>
        
  </form >

            <form id="listingForm" onSubmit={handleSubmit}>

      </form>

    </>

  );
}

export default Recreation_timing_betch;
