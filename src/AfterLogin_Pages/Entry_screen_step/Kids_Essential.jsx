import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import Form_input from "../../Helper/Form_Input";
import FilterableSelect from "../../Helper/FilterableSelect";
import FileUploadWithPreview from "../../Helper/File_Uploade_previwe";
import { BASE_URL } from "../../Helper/Base_Url";
import { showToast } from "../../Helper/toastService";
import { usePartnerLogin } from "../../Contaxt/PartnarLogin_context";
import { useParams } from "react-router-dom";

function Kids_Essential({ next , setloading  , finish , activeStep , steps , setCompletedSteps }) {
  const {partner_id} = usePartnerLogin();
  const {slug} = useParams();
  const [formData , setFormData] = useState({
    brand_id: "",
    Item_Name: "",
    Description: "",
    Price: "",
    Item_Type: "Product",
    Primary_Image: null,
    AgeGroup: null,
  });

  const [brands, setBrands] = useState([]);
  const [ageGroups, setAgeGroups] = useState([]);

  // ✅ Fetch brands
  useEffect(() => {
    fetch(`${BASE_URL}/kids_essentials_brnad/`)
      .then((res) => res.json())
      .then((data) => {
        setBrands(data.data.map((b) => ({ value: b.id, label: b.name })));
      })
      .catch((err) => console.error("Error fetching brands:", err));
  }, []);

  // ✅ Fetch Age Groups
  useEffect(() => {
    fetch(`${BASE_URL}/kids_essentials_age_group/`)
      .then((res) => res.json())
      .then((data) => {
        setAgeGroups(data.data.map((ag) => ({ value: ag.id, label: ag.name })));
      })
      .catch((err) => console.error("Error fetching age groups:", err));
  }, []);

  // ✅ Handle change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
if (!partner_id) {
  showToast("Partner ID missing. Please restart the process.", "error");
  return;
}

    try {
    const paylaod = {
        partner_id: partner_id,
        kidsessentials_detail : [{
        Item_Name: formData.Item_Name,
        Description: formData.Description,
        Price: formData.Price,
        Item_Type: formData.Item_Type,
        AgeGroup_id : formData.AgeGroup,
        brand_id : formData.brand_id
        }]
      } 
  


    console.log("payload",paylaod)

      const res = await fetch(`${BASE_URL}/partner_all/`, {
        method: "POST",
        headers: {
    "Content-Type": "application/json",   
      },
        body:  JSON.stringify(paylaod),
      });
      const data = await res.json();
      if (res.ok) {
        showToast(data.message, "success");
        console.log("Saved:", data);
                setCompletedSteps((prev) => [...prev, activeStep]);


         activeStep === steps.length - 1 ? finish() : next();

      }
      
      else {
          if (data.kidsessentials_detail) {
            data.kidsessentials_detail.forEach((errorObj, index) => {
              if (errorObj && Object.keys(errorObj).length > 0) {
                Object.entries(errorObj).forEach(([field, messages]) => {
                  messages.forEach((msg) => {
                    showToast(`Event Detail ${index + 1} - ${field}: ${msg}`, "error");
                  });
                });
              }
            });
          }else{
            showToast(data.message , "Submission failed", "error");

          }
      }
    } catch (err) {
      console.error("Error:", err);
      showToast("Something went wrong ❌", "error");
    }
    finally{
          setloading(false);
    }
  };


      useEffect(()=>{
        fetchdatabyid(slug);
      },[slug])
      
      
        const fetchdatabyid = async (slug) => {
          try {
            const res = await fetch(`${BASE_URL}/partner_all/${slug}/`);
            const data = await res.json();
      
            if (res.ok && data) {
                  const details = data.kidsessentials_detail?.[0]; 
  if (details) {
        setFormData({
          brand_id: details.brand_id || "",
          Item_Name: details.Item_Name || "",
          Description: details.Description || "",
          Price: details.Price || "",
          Item_Type: details.Item_Type || "Product",
          AgeGroup: details.AgeGroup_id || "",
          Primary_Image: details.Primary_Image || null,  // if backend gives image URL
        });
      }
            }
          } catch (error) {
            console.error("Error fetching Listing data:", error);
          }
        };

  return (
    <Form id="listingForm" onSubmit={handleSubmit}>
          <Row className="border border-2 border-primary rounded p-3 mb-4">
          <h4 className="text-primary">Kids Essential</h4>
          <hr className="m-0 p-0 mb-4 text-primary" />
        {/* Brand */}
        <Col md={4}>
          <FilterableSelect
            label="Brand"
            name="brand_id"
            value={formData.brand_id}
            onChange={handleChange}
            options={brands}
            required
          />
        </Col>

        {/* Item Name */}
        <Col md={4}>
          <Form_input
            type="text"
            label="Item Name"
            name="Item_Name"
            value={formData.Item_Name}
            onChange={handleChange}
            required
          />
        </Col>

        {/* Description */}
        <Col md={4}>
          <Form_input
            type="text"
            label="Description"
            name="Description"
            value={formData.Description}
            onChange={handleChange}
          />
        </Col>

        {/* Price */}
        <Col md={4}>
          <Form_input
            type="number"
            label="Price"
            name="Price"
            value={formData.Price}
            onChange={handleChange}
            required
          />
        </Col>

        {/* Item Type */}
     <Col md={4}>
  <FilterableSelect
    label="Item Type"
    name="Item_Type"
    value={formData.Item_Type}
    onChange={handleChange}
    options={[
      { value: "Product", label: "Product" },
      { value: "Service", label: "Service" },
    ]}
    required
  />
  
</Col>


        {/* Age Group */}
        <Col md={4}>
          <FilterableSelect
            label="Age Group"
            name="AgeGroup"
            value={formData.AgeGroup}
            onChange={handleChange}
            options={ageGroups}
           required
          />
        </Col>

        {/* Image Upload */}
        {/* <Col md={6}>
          <FileUploadWithPreview
            label="Primary Image"
            name="Primary_Image"
            onChange={handleChange}
          />
        </Col> */}

       
       
      </Row>

      {/* <Button type="submit" className="mt-3">
        Save
      </Button> */}
    </Form>
  );
}

export default Kids_Essential;
