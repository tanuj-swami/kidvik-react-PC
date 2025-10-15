import React, { useState  , useEffect} from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import Form_input from "../../Helper/Form_Input";
import FilterableSelect from "../../Helper/FilterableSelect";
import { BASE_URL

 } from "../../Helper/Base_Url";
import  fetchSelectOptions  from "./MasterTableData/Master_Institude_2nd_step";
import { showToast } from "../../Helper/toastService";
import { usePartnerLogin } from "../../Contaxt/PartnarLogin_context";
import { useParams } from "react-router-dom";
import CustomTable from "../../Helper/GlobelTable";
function Recreational_Detail({next , setloading , setCompletedSteps , activeStep }) {

   const {partner_id} = usePartnerLogin();
  // Recreational detail state (single object)
  const [typeOptions, setTypeOptions] = useState([]);
  const [activityOptions, setActivityOptions] = useState([]);
  const [partnerOptions, setPartnerOptions] = useState([]);
  const [ownershipOptions, setOwnershipOptions] = useState([]);
  const [coEdOptions, setCoEdOptions] = useState([]);
  const [skillLevelOptions, setSkillLevelOptions] = useState([]);
  const [designationOptions, setDesignationOptions] = useState([]);
  const [equipmentOptions , setequipmentOptions] = useState([])
 const{ slug } = useParams();
  const [equipmentInput, setEquipmentInput] = useState({
  partner: "",
  equipment: "",
  qty_available: "",
});

const [equipmentList, setEquipmentList] = useState([]);
const [editingIndex, setEditingIndex] = useState(null);

const handleEquipmentChange = (e) => {
  const { name, value } = e.target;
  setEquipmentInput((prev) => ({ ...prev, [name]: value }));
};

const addOrUpdateEquipment = () => {
  // if (!equipmentInput.equipment || !equipmentInput.qty_available) {
  //   showToast("Please fill all equipment fields", "error");
  //   return;
  // }

  if (editingIndex !== null) {
    // ✅ Update existing equipment
    const updatedList = [...equipmentList];
    updatedList[editingIndex] = equipmentInput;
    setEquipmentList(updatedList);
    setEditingIndex(null); // reset
  } else {
    // ✅ Add new equipment
    setEquipmentList((prev) => [...prev, equipmentInput]);
  }

  setEquipmentInput({ equipment: "", qty_available: "" });
};

// Edit handler
const editEquipment = (index) => {
  setEquipmentInput(equipmentList[index]); // load into input fields
  setEditingIndex(index);
};

const deleteEquipment = (index) => {
  setEquipmentList((prev) => prev.filter((_, i) => i !== index));
};



  const [detail , setDetail] = useState({
    type: 2,
    activity_cat: 1,
    partner: "",
    ownership: "",
    year_of_establishment: "",
    co_ed_status: "",
    indoor_outdoor: "",
    batch_capacity: "",
    trial_class_available: "",
    equipment_provided: "",
    min_age_years: "",
    max_age_years: "",
    skill_level: null,
    annual_fee: "",
    avg_monthly_fee: "",
    tag_line: "",
    aboutus: "",
    primary_image: null,
    is_primary: 1,
    remarks: "",
  });


  useEffect(() => {
    fetchSelectOptions(`${BASE_URL}/url_link_type_mst/`, "URLLinkType_name").then(
      setTypeOptions
    );

    fetchSelectOptions(`${BASE_URL}/designation_master/`, "position").then(
      setDesignationOptions
    );

    fetchSelectOptions(`${BASE_URL}/url_link_type_mst/`, "URLLinkType_name").then(
       setActivityOptions
    );

    fetchSelectOptions(`${BASE_URL}/url_link_type_mst/`, "URLLinkType_name").then(
      setPartnerOptions
    );

    fetchSelectOptions(`${BASE_URL}/co_ed_status_mst/`, "Co_Ed_Status_name").then(
      setCoEdOptions
    );

    fetchSelectOptions(`${BASE_URL}/skill_level/`, "name" , "level_id").then(
      setSkillLevelOptions
    );
    // fetchSelectOptions(`${BASE_URL}/equipment/`, "name" , "equipment_id").then(
    //      setequipmentOptions
    // );

    fetchSelectOptions(`${BASE_URL}/equipment/`, "name" , "equipment_id").then(
      setequipmentOptions
    );

        fetchSelectOptions(`${BASE_URL}/ownership_mst/`, "Ownership_name")
          .then(setOwnershipOptions);
  }, []);



  const [coachList, setCoachList] = useState([]);
  const [coachInput, setCoachInput] = useState({
    partner: "",
    name: "",
    designation: "",
    skill_level: null,
    qualification: "",
    certifications: "",
    experience_years: "",
    phone: "",
    email: "",
    available_days: "",
    available_time: "",
    profile_image: null,
  });


  // Handle detail input
  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle coach input
  const handleCoachInputChange = (e) => {
    const { name, value } = e.target;
    setCoachInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add coach to list
  const addCoach = () => {
    if (!coachInput.name || !coachInput.qualification) {
      alert("Please fill all coach fields");
      return;
    }
    setCoachList([...coachList, coachInput]);
    setCoachInput({ name: "", qualification: "" }); // clear input
  };

  // Delete coach
  const deleteCoach = (index) => {
    setCoachList(coachList.filter((_, i) => i !== index));
  };


 console.log("detail" , detail)
  // Final Submit
const handleSubmit = async (e) => {
  e.preventDefault();
  setloading(true);

  try {
    const payload = {
      partner_id: partner_id,
      recreational_detail: [{
        partner_id: partner_id,
        type_id: detail.type,
        activity_cat_id: detail.activity_cat,
        Ownership_id: detail.ownership,
        Co_Ed_Status_id: detail.co_ed_status,
        Skill_Level_id: detail.skill_level,
        Year_of_Establishment: detail.year_of_establishment,
        Indoor_Outdoor: detail.indoor_outdoor,
        Batch_Capacity: detail.batch_capacity,
        Trial_Class_Available: detail.trial_class_available,
        Equipment_Provided: detail.equipment_provided === 1 ? true : false,
        Min_Age_Years: detail.min_age_years,
        Max_Age_Years: detail.max_age_years,
        Annual_Fee: detail.annual_fee,
        Avg_Monthly_Fee: detail.avg_monthly_fee,
        Tag_Line: detail.tag_line,
        AboutUs: detail.aboutus,
        Is_primary: detail.is_primary,
        remarks: detail.remarks,
        // primary_image: detail.primary_image,
      }],
      
      recreational_equipment_provided : equipmentList.map((eq) => ({
        equipment_id: eq.equipment,
        qty_available: eq.qty_available,
        remarks: eq.remarks || "",
        
      })),

      // recreational_coach_staff: coachList, // future use
    };
    console.log("Final Payload:", payload);

    const formDataToSend = new FormData();

   

    // API Call
    const res = await fetch(`${BASE_URL}/partner_all/`, {
       method: "POST",
       headers: {
    "Content-Type": "application/json",   // ✅ Add this
  },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
          if (res.ok) {
            console.log("Saved:", data);
            showToast(data.message, "success");
                    setCompletedSteps((prev) => [...prev, activeStep]);

            next();
          }else {
      // 🔥 Error handling
      let messages = [];

      if (typeof data === "object") {
        const extractErrors = (obj) => {
          for (const key in obj) {
            if (Array.isArray(obj[key])) {
              // agar array hai aur andar string errors hai
              obj[key].forEach((msg) => {
                if (typeof msg === "string") {
                  messages.push(`${key}: ${msg}`);
                } else if (typeof msg === "object") {
                  extractErrors(msg);
                }
              });
            } else if (typeof obj[key] === "object" && obj[key] !== null) {
              extractErrors(obj[key]);
            }
          }
        };

        extractErrors(data);
      }

      if (messages.length > 0) {
        showToast(messages.join("\n"), "error");
      } else {
        showToast(data.message || "Submission failed", "error");
      }
    }

  } catch (err) {
    console.error("Error:", err);
    showToast("Something went wrong. Please try again.");
  } finally {
    setloading(false); // ✅ हमेशा false करना
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
          const rd = data.recreational_detail?.[0] || {};
        
           setDetail({
        type: rd.type_id || 2,
        activity_cat: rd.activity_cat_id || 1,
        partner: rd.partner_id || "",
        ownership: rd.Ownership_id || "",
        year_of_establishment: rd.Year_of_Establishment || "",
        co_ed_status: rd.Co_Ed_Status_id || "",
        indoor_outdoor: rd.Indoor_Outdoor || "",
        batch_capacity: rd.Batch_Capacity || "",
        trial_class_available: rd.Trial_Class_Available ? 1 : 0,
        equipment_provided: rd.Equipment_Provided ? 1 : 0,
        min_age_years: rd.Min_Age_Years || "",
        max_age_years: rd.Max_Age_Years || "",
        skill_level: rd.Skill_Level_id || null,
        annual_fee: rd.Annual_Fee || "",
        avg_monthly_fee: rd.Avg_Monthly_Fee || "",
        tag_line: rd.Tag_Line || "",
        aboutus: rd.AboutUs || "",
        primary_image: null, // You can map file if API provides
        is_primary: rd.Is_primary || 1,
        remarks: rd.remarks || "",
      });

       setEquipmentList(
        data.recreational_equipment_provided?.map((eq) => ({
          equipment: eq.equipment_id,
          qty_available: eq.qty_available,
          remarks: eq.remarks || "",
        })) || []
      );

            // setCoachList(data.recreational_coach_staff || []);
        }
      } catch (error) {
        console.error("Error fetching Listing data:", error);
      }
    };
    const equipmentColumns = [
  { key: "id", label: "#" },
  // { key: "equipment", label: "Equipment" },
  {
      label: "Equipment",
      accessor: (row) => {
        const found = equipmentOptions.find(d => d.value === row.equipment);
        console.log("found", found)
        return found ? found.label : "-";
      } 
    },
  { key: "Quantity Available", label: "qty_available" },
];

  return (
    <form id="listingForm" onSubmit={handleSubmit}>
      {/* Recreational Details Section */}
  <Row className="border border-2 border-primary rounded p-3 mb-4">
  <h4 className="text-primary">Recreational Details</h4>
  <hr className="m-0 p-0 mb-4 text-primary" />

  
  {/* Ownership */}
  <Col md={4}>
    <FilterableSelect
      label="Ownership"
      name="ownership"
      value={detail.ownership}
      onChange={handleDetailChange}
      options={ownershipOptions}
      required
    />
  </Col>

  {/* Year of Establishment */}
  <Col md={4}>
    <Form_input
      type="number"
      label="Year of Establishment"
      name="year_of_establishment"
      value={detail.year_of_establishment}
      onChange={handleDetailChange}
    />
  </Col>

  {/* Co-Ed Status */}
  <Col md={4}>
    <FilterableSelect
      label="Co-Ed Status"
      name="co_ed_status"
      value={detail.co_ed_status}
      onChange={handleDetailChange}
      options={coEdOptions}
      required
    />
  </Col>

  {/* Indoor/Outdoor */}
  <Col md={4}>
    <Form_input
      label="Indoor/Outdoor"
      name="indoor_outdoor"
      value={detail.indoor_outdoor}
      onChange={handleDetailChange}
    />
  </Col>

  {/* Batch Capacity */}
  <Col md={4}>
    <Form_input
      type="number"
      label="Batch Capacity"
      name="batch_capacity"
      value={detail.batch_capacity}
      onChange={handleDetailChange}
      required
    />
  </Col>

  {/* Trial Class Available */}
  <Col md={4}>
    <FilterableSelect
      label="Trial Class Available"
      name="trial_class_available"
      value={detail.trial_class_available}
      onChange={handleDetailChange}
      required
      options={[
        { value: 1, label: "Yes" },
        { value: 0, label: "No" },
      ]}
    />
  </Col>

  {/* Equipment Provided */}
  <Col md={4}>
    <FilterableSelect
      label="Equipment Provided"
      name="equipment_provided"
      value={detail.equipment_provided}
      onChange={handleDetailChange}
      options={[
        { value: 1, label: "Yes" },
        { value: 0, label: "No" },
      ]}
    />
  </Col>

  {/* Min Age */}
  <Col md={4}>
    <Form_input
      type="number"
      label="Min Age (Years)"
      name="min_age_years"
      value={detail.min_age_years}
      onChange={handleDetailChange}
      required
    />
  </Col>

  {/* Max Age */}
  <Col md={4}>
    <Form_input
      type="number"
      label="Max Age (Years)"
      name="max_age_years"
      value={detail.max_age_years}
      onChange={handleDetailChange}
      required
    />
  </Col>

  {/* Skill Level */}
  <Col md={4}>
    <FilterableSelect
      label="Skill Level"
      name="skill_level"
      value={detail.skill_level}
      onChange={handleDetailChange}
      options={skillLevelOptions}
      required
      
    />
  </Col>

  {/* Annual Fee */}
  <Col md={4}>
    <Form_input
      type="number"
      label="Annual Fee"
      name="annual_fee"
      value={detail.annual_fee}
      onChange={handleDetailChange}
    />
  </Col>

  {/* Avg Monthly Fee */}
  <Col md={4}>
    <Form_input
      type="number"
      label="Avg Monthly Fee"
      name="avg_monthly_fee"
      value={detail.avg_monthly_fee}
      onChange={handleDetailChange}
    />
  </Col>

  {/* Tag Line */}


  {/* About Us */}


  {/* Primary Image */}
  {/* <Col md={6}>
    <Form_input
      type="file"
      label="Primary Image"
      name="primary_image"
      onChange={(e) =>
        setDetail((prev) => ({
          ...prev,
          primary_image: e.target.files[0],
        }))
      }
    />
  </Col> */}

  {/* Is Primary */}
  {/* <Col md={4}>
    <FilterableSelect
      label="Is Primary"
      name="is_primary"
      value={detail.is_primary}
      onChange={handleDetailChange}
      options={[
        { value: 1, label: "Yes" },
        { value: 0, label: "No" },
      ]}
    />
  </Col> */}
</Row>


{detail.equipment_provided === 1 && (
  <Row className="border border-2 border-success rounded p-3 mb-4">
    <h4 className="text-success">Equipment Provided</h4>

    {/* <Col md={4}>
      <FilterableSelect
        label="Partner"
        name="partner"
        value={equipmentInput.partner}
        onChange={handleEquipmentChange}
        options={partnerOptions}
      />
    </Col> */}

    <Col md={4}>
      <FilterableSelect
        label="Equipment"
        name="equipment"
        value={equipmentInput.equipment}
        onChange={handleEquipmentChange}
        options={equipmentOptions}
      />
    </Col>

    <Col md={4}>
      <Form_input
        type="number"
        label="Quantity Available"
        name="qty_available"
        value={equipmentInput.qty_available}
        onChange={handleEquipmentChange}
      />
    </Col>

<Col md={12} className="d-flex justify-content-end mt-2 gap-2">
  <Button
    variant={editingIndex !== null ? "primary" : "primary"}
    onClick={addOrUpdateEquipment}
  >
    {editingIndex !== null ? "Update Equipment" : "+ Add Equipment"}
  </Button>

  {editingIndex !== null && (
    <Button
      variant="primary"
      onClick={() => {
        setEquipmentInput({ equipment: "", qty_available: "" }); // clear fields
        setEditingIndex(null); // exit edit mode
      }}
    >
      Cancel
    </Button>
  )}
</Col>
    <CustomTable
          columns={equipmentColumns}
          data={equipmentList}
          onEdit={(index) => editEquipment(index)}
          onDelete={(index) => deleteEquipment(index)}
        />

  </Row>
)}




      {/* Coach/Staff Section */}
    {/* <Row className="border border-2 border-primary rounded p-3 mb-4">
      <h4 className="text-primary">Coach & Staff</h4>

      <Col md={4}>
        <Form_input
          type="text"
          label="Coach Name"
          name="name"
          value={coachInput.name}
          onChange={handleCoachInputChange}
        />
      </Col>

    
      <Col md={4}>
        <FilterableSelect
          label="Designation"
          name="designation"
          value={coachInput.designation}
          onChange={handleCoachInputChange}
          options={designationOptions}
        />
      </Col>

     
      <Col md={4}>
        <FilterableSelect
          label="Skill Level"
          name="skill_level"
          value={coachInput.skill_level}
          onChange={handleCoachInputChange}
          options={skillLevelOptions}
        />
      </Col>

  
      <Col md={4}>
        <Form_input
          type="text"
          label="Qualification"
          name="qualification"
          value={coachInput.qualification}
          onChange={handleCoachInputChange}
        />
      </Col>

  
      <Col md={4}>
        <Form_input
          type="text"
          label="Certifications"
          name="certifications"
          value={coachInput.certifications}
          onChange={handleCoachInputChange}
        />
      </Col>

     
      <Col md={4}>
        <Form_input
          type="text"
          label="Experience (Years)"
          name="experience_years"
          value={coachInput.experience_years}
          onChange={handleCoachInputChange}
        />
      </Col>

     
      <Col md={4}>
        <Form_input
          type="text"
          label="Phone"
          name="phone"
          value={coachInput.phone}
          onChange={handleCoachInputChange}
        />
      </Col>

    
      <Col md={4}>
        <Form_input
          type="email"
          label="Email"
          name="email"
          value={coachInput.email}
          onChange={handleCoachInputChange}
        />
      </Col>

     
      <Col md={4}>
        <Form_input
          type="text"
          label="Available Days"
          name="available_days"
          value={coachInput.available_days}
          onChange={handleCoachInputChange}
        />
      </Col>

     
      <Col md={4}>
        <Form_input
          type="text"
          label="Available Time"
          name="available_time"
          value={coachInput.available_time}
          onChange={handleCoachInputChange}
        />
      </Col>

    
      <Col md={4}>
        <Form_input
          type="file"
          label="Profile Image"
          name="profile_image"
          onChange={handleCoachInputChange}
        />
      </Col>

    
      <Col md={4} className="d-flex align-items-end">
        <Button variant="secondary" onClick={addCoach}>
          + Add Coach
        </Button>
      </Col>

      
      {coachList.length > 0 && (
        <Col md={12} className="mt-4">
          <Table bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Partner</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Skill Level</th>
                <th>Qualification</th>
                <th>Certifications</th>
                <th>Experience</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Available Days</th>
                <th>Available Time</th>
                <th>Profile Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {coachList.map((coach, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{coach.partner}</td>
                  <td>{coach.name}</td>
                  <td>{coach.designation}</td>
                  <td>{coach.skill_level}</td>
                  <td>{coach.qualification}</td>
                  <td>{coach.certifications}</td>
                  <td>{coach.experience_years}</td>
                  <td>{coach.phone}</td>
                  <td>{coach.email}</td>
                  <td>{coach.available_days}</td>
                  <td>{coach.available_time}</td>
                  <td>
                    {coach.profile_image ? (
                      <img
                        src={URL.createObjectURL(coach.profile_image)}
                        alt="Profile"
                        width="50"
                        height="50"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteCoach(i)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      )}

    </Row> */}



      {/* <Button type="submit" variant="primary">
        Save Recreational Detail
      </Button> */}

    </form>
  );
}

export default Recreational_Detail;
