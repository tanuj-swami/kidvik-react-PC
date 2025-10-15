import React, { useState  , useEffect} from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
// import FilterableSelect from "./FilterableSelect";
// import Form_input from "./Form_input";
import Form_input from "../../Helper/Form_Input";
import FilterableSelect from "../../Helper/FilterableSelect";
import { BASE_URL } from "../../Helper/Base_Url";
import  fetchSelectOptions  from "./MasterTableData/Master_Institude_2nd_step";
import { usePartnerLogin } from "../../Contaxt/PartnarLogin_context";
import { showToast } from "../../Helper/toastService";
import { useParams } from "react-router-dom";
import CustomTable from "../../Helper/GlobelTable";


function Community({next ,setloading , finish , activeStep , steps , setCompletedSteps }) {
  const {partner_id} = usePartnerLogin();
  const {slug} = useParams();
  const [editingCommunityIndex, setEditingCommunityIndex] = useState(null);

  const [communityInput, setCommunityInput] = useState({
    year_of_establishment: "",
    ownership: "",
    co_ed_status: "",
    member_capacity: "",
    volunteer_opportunities: 0,
    is_registered: 0,
    tag_line: "",
    about_us: "",
    primary_image: null,
    is_primary: 0,
  });

  const handleEditcummunity = (index) => {
  setCommunityInput(communityList[index]); // load data into form
  setEditingCommunityIndex(index);         // set edit mode
};


 const [ownershipOptions, setownershipOptions] = useState([]);
 const [coedStatusOptions, setcoedStatusOptions] = useState([]);
  const [communityList, setCommunityList] = useState([]);

  // Handle change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setCommunityInput({ ...communityInput, [name]: files[0] });
    } else {
      setCommunityInput({ ...communityInput, [name]: value });
    }
  };

     useEffect(() => {
      fetchSelectOptions(`${BASE_URL}/co_ed_status_mst/`, "Co_Ed_Status_name")
        .then(setcoedStatusOptions);
  
      fetchSelectOptions(`${BASE_URL}/ownership_mst/`, "Ownership_name")
        .then(setownershipOptions);
  
    }, []);


  // Add entry
const addCommunity = () => {
  if (communityInput.year_of_establishment && communityInput.ownership) {
    if (editingCommunityIndex !== null) {
      // update existing row
      const updated = [...communityList];
      updated[editingCommunityIndex] = communityInput;
      setCommunityList(updated);
      setEditingCommunityIndex(null); // exit edit mode
    } else {
      // add new row
      setCommunityList([...communityList, communityInput]);
    }

    // reset form
    setCommunityInput({
      year_of_establishment: "",
      ownership: "",
      co_ed_status: "",
      member_capacity: "",
      volunteer_opportunities: "",
      is_registered: "",
      tag_line: "",
      about_us: "",
      primary_image: null,
      is_primary: 0,
    });
  } else {
    showToast("Please fill required fields!", "error");
  }
};



  // Delete
  const deleteCommunity = (index) => {
    const updated = [...communityList];
    updated.splice(index, 1);
    setCommunityList(updated);
  };

const prepareCommunityPayload = (list) => {
  return list.map((item) => ({
    Year_of_Establishment: item.year_of_establishment,
    Ownership_id: item.ownership,
    Co_Ed_Status_id: item.co_ed_status,
    Member_Capacity: item.member_capacity,
    Volunteer_Opportunities: item.volunteer_opportunities,
    Is_Registered: item.is_registered,
    Tag_Line: item.tag_line,
    AboutUs: item.about_us,
    Primary_Image: item.primary_image, // if backend needs file, use FormData
    Is_primary: item.is_primary,
  }));
};


const handleSubmit = async (e) => {
 e.preventDefault();
  setloading(true);
  try {
    const payload = {
      community_detail: prepareCommunityPayload(communityList),
      partner_id : partner_id, 
    };

    const res = await fetch(`${BASE_URL}/partner_all/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if(res.ok) {
      console.log("Saved:", data);
      showToast(data.message , "success");
       setCompletedSteps((prev) => [...prev, activeStep]);
       activeStep === steps.length - 1 ? finish() : next();

    }
    else{
      showToast(data.message , "error")
    }
  } catch (err) {
    console.error("Error:", err);
  }
  finally{
     setloading(false);
  }
};



    useEffect(() => {
      fetchdatabyid(slug);
    }, [slug])
  
    const fetchdatabyid = async (slug) => {

  const mapApiToForm = (item) => ({
  year_of_establishment: item.Year_of_Establishment || "",
  ownership: item.Ownership_id || "",
  co_ed_status: item.Co_Ed_Status_id || "",
  member_capacity: item.Member_Capacity || "",
  volunteer_opportunities: item.Volunteer_Opportunities || 0,
  is_registered: item.Is_Registered || 0,
  tag_line: item.Tag_Line || "",
  about_us: item.AboutUs || "",
  primary_image: item.Primary_Image || null,
  is_primary: item.Is_primary || 0,
});
      try {
        const res = await fetch(`${BASE_URL}/partner_all/${slug}/`);
        const data = await res.json();
  
        if (res.ok && data) {
        const mapped = data.community_detail.map(mapApiToForm);
      setCommunityList(mapped);
          
        }
  
  
      } catch (error) {
        console.error("Error fetching Listing data:", error);
      }
    };


const communityColumns = [
  { key: "index", label: "#" },
  { key: "year_of_establishment", label: "Year" },
    { label: "Ownership", key: "ownership", accessor: (row) => ownershipOptions.find((c) => c.value === row.ownership)?.label || "-" },
    { label: "Co-Ed Status", key: "co_ed_status", accessor: (row) => coedStatusOptions.find((c) => c.value === row.co_ed_status)?.label || "-" },

  { key: "member_capacity", label: "Capacity" },
{
  key: "volunteer_opportunities",
  label: "Volunteer",
  accessor: (row) => {
    const options = [
      { value: 0, label: "No" },
      { value: 1, label: "Yes" }
    ];
    const found = options.find(opt => Number(opt.value) === Number(row.volunteer_opportunities));
    return found ? found.label : "-";
  }
},

{
  key: "is_registered",
  label: "Registered",
  accessor: (row) => {
    const options = [
      { value: 0, label: "No" },
      { value: 1, label: "Yes" }
    ];
    const found = options.find(opt => Number(opt.value) === Number(row.is_registered));
    return found ? found.label : "-";
  }
},

  { key: "is_registered", label: "Registered" },
  { key: "tag_line", label: "Tag Line" },
  { key: "about_us", label: "About Us" },
];



  return (
    <>
    <form  id="listingForm" onSubmit={handleSubmit}>

   
    <Row className="border border-2 border-success rounded p-3 mb-4">
      <h4 className="text-primary">Community Details</h4>

      {/* Year of Establishment */}
      <Col md={4}>
        <Form_input
          type="text"
          label="Year of Establishment"
          name="year_of_establishment"
          value={communityInput.year_of_establishment}
          onChange={handleChange}
          
        />
      </Col>

      {/* Ownership */}
      <Col md={4}>
        <FilterableSelect
          label="Ownership"
          name="ownership"
          value={communityInput.ownership}
          onChange={handleChange}
          options={ownershipOptions}
        />
      </Col>

      {/* Co-Ed Status */}
      <Col md={4}>
        <FilterableSelect
          label="Co-Ed Status"
          name="co_ed_status"
          value={communityInput.co_ed_status}
          onChange={handleChange}
          options={coedStatusOptions}
        />
      </Col>

      {/* Member Capacity */}
      <Col md={4}>
        <Form_input
          type="number"
          label="Member Capacity"
          name="member_capacity"
          value={communityInput.member_capacity}
          onChange={handleChange}
        />
      </Col>

      {/* Volunteer Opportunities */}
    <Col md={4}>
  <FilterableSelect
    label="Volunteer Opportunities"
    name="volunteer_opportunities"
    value={communityInput.volunteer_opportunities}
    onChange={handleChange}
    options={[
      { value: 0, label: "No" },
      { value: 1, label: "Yes" }
    ]}
  />
</Col>

      {/* Is Registered */}
   <Col md={4}>
  <FilterableSelect
    label="Is Registered"
    name="is_registered"
    value={communityInput.is_registered}
    onChange={handleChange}
    options={[
      { value: 0, label: "No" },
      { value: 1, label: "Yes" }
    ]}
  />
</Col>

      {/* Tag Line */}
      <Col md={6}>
        <Form_input
          type="text"
          label="Tag Line"
          name="tag_line"
          value={communityInput.tag_line}
          onChange={handleChange}
        />
      </Col>

      {/* About Us */}
      <Col md={6}>
        <Form_input
          type="textarea"
          label="About Us"
          name="about_us"
          value={communityInput.about_us}
          onChange={handleChange}
          maxLength={255}
        />
      </Col>

      {/* Primary Image */}
      {/* <Col md={6}>
        <Form_input
          type="file"
          label="Primary Image"
          name="primary_image"
          onChange={handleChange}
        />
      </Col> */}

      {/* Is Primary */}
     {/* <Col md={4}>
  <FilterableSelect
    label="Is Primary"
    name="is_primary"
    value={communityInput.is_primary}
    onChange={handleChange}
    options={[
      { value: 0, label: "No" },
      { value: 1, label: "Yes" }
    ]}
  />
</Col> */}

      {/* Add Button */}
     <Col md={12} className="d-flex justify-content-end mt-2 gap-2">
       <Button variant="primary" onClick={addCommunity}>
    {editingCommunityIndex !== null ? "Update Community" : "+ Add Community"}
  </Button>

  {editingCommunityIndex !== null && (
    <Button
      variant="primary"
      className="me-2"
      onClick={() => {
        setCommunityInput({
          year_of_establishment: "",
          ownership: "",
          co_ed_status: "",
          member_capacity: "",
          volunteer_opportunities: 0,
          is_registered: 0,
          tag_line: "",
          about_us: "",
          primary_image: null,
          is_primary: 0,
        });
        setEditingCommunityIndex(null);
      }}
    >
      Cancel
    </Button>
  )}


</Col>


      {/* Table */}
      {/* {communityList.length > 0 && (
        <Col md={12} className="mt-4">
          <Table bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Year</th>
                <th>Ownership</th>
                <th>Co-Ed</th>
                <th>Capacity</th>
                <th>Volunteer</th>
                <th>Registered</th>
                <th>Tag Line</th>
                <th>About Us</th>
                
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {communityList.map((row, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{row.year_of_establishment}</td>
                  <td>
                    {
                      ownershipOptions.find((o) => o.value === row.ownership)
                        ?.label
                    }
                  </td>
                  <td>
                    {
                      coedStatusOptions.find((c) => c.value === row.co_ed_status)
                        ?.label
                    }
                  </td>
                  <td>{row.member_capacity}</td>
                  <td>{row.volunteer_opportunities}</td>
                  <td>{row.is_registered}</td>
                  <td>{row.tag_line}</td>
                  <td>{row.about_us}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteCommunity(i)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      )} */}

     <CustomTable
          columns={communityColumns}
          data={communityList}
          onEdit={(index) => handleEditcummunity(index)}
          onDelete={(index) => deleteCommunity(index)}
        />
      
    </Row>
     </form>
    
    </>
  );
}

export default Community;
