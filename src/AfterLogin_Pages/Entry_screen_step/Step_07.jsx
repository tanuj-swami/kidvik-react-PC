import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Form_input from "../../Helper/Form_Input";
import FilterableSelect from "../../Helper/FilterableSelect";
import { BASE_URL } from "../../Helper/Base_Url";
import { showToast } from "../../Helper/toastService";
import  fetchSelectOptions  from "./MasterTableData/Master_Institude_2nd_step";
import FilterableMultiSelect from "../../Helper/FilterableMultiSelect";
import { usePartnerLogin } from "../../Contaxt/PartnarLogin_context";
import { useParams } from "react-router-dom";


function Step_07({ next, setloading, finish, activeStep, steps , setCompletedSteps }) {
  const { partner_id, partnerAuth } = usePartnerLogin();
  const [Area, setArea] = useState([]);
  const [medicalCategoryOptions, setmedicalCategoryOptions] = useState([]);
  const [specialization, setspecialization] = useState([]);
  const [service_names, setservice_names] = useState([]);
  const [subCategoryOptions , setsubCategoryOptions] = useState([])

 const {slug} = useParams();
  console.log("Area", Area)
  const [formData, setFormData] = useState({});

  useEffect(() => {

    //  fetchSelectOptions(`${BASE_URL}/partner_master/`, "listing_name",  "PartnerMaster_id" ).then(
    //      setpartneroption
    //    );

    fetchSelectOptions(`${BASE_URL}/medical_category_mst/`, "MedicalCategory_name").then(
      setmedicalCategoryOptions
    );

    fetchSelectOptions(`${BASE_URL}/medical_category_mst/`, "listing_name", "MedicalCategory_name").then(
      setsubCategoryOptions
    );

    fetchSelectOptions(`${BASE_URL}/service_master/`, "name",).then(
      setservice_names
    );
    fetchSelectOptions(`${BASE_URL}/specialization_mst/`, "Specialization_name",).then(
      setspecialization
    );
  }, []);

  const generateSubmissionJSON = (formData) => {
    return {
      partner_id: partner_id,
      medical_service: [
        {
          service_name_id: formData.service_name_id || null,
          description: formData.description || "",
          price_range: formData.price_range || "",
          duration: formData.duration || "",
          remark: formData.remark || null,
          created_user: partnerAuth.user_id || null,
          updated_user: null
        }
      ],
      medical_detail: [
        {

          type_id: formData.type || null,
          medical_Category_id: formData.medical_Category || null,
          specialization_id: formData.specialization || null,
          medical_Name: formData.medical_Name || "",
          license_number: formData.license_number || "",
          Doctor_name: formData.Doctor_name || "",
          Doctor_specialization: formData.Doctor_specialization || "",
          Doctor_qualification: formData.Doctor_qualification || "",
          Doctor_experience_years: formData.Doctor_experience_years || "",
          Doctor_phone: formData.Doctor_phone || "",
          Doctor_email: formData.Doctor_email || "",
          Doctor_available_days: formData.Doctor_available_days || "",
          Doctor_available_time: formData.Doctor_available_time || "",
          geo_location_link: formData.geo_location_link || "",
          Tag_Line: formData.Tag_Line || "",
          AboutUs: formData.AboutUs || "",
          Day_care_opd: formData.Day_care_opd || "",
          Time_of_opd: formData.Time_of_opd || "",
          No_of_doctors: formData.No_of_doctors || "",
          doctor_patient_ratio: formData.doctor_patient_ratio || "",
          established_date: formData.established_date || "",
          Years_of_operation: formData.Years_of_operation || "",
          Availability_of_doctors: formData.Availability_of_doctors || "",
          Fees_range: formData.Fees_range || "",
          Availability_of_diagnostics_centre: formData.Availability_of_diagnostics_centre || "",
          Mode_of_appointment: formData.Mode_of_appointment || "",
            Online_service: formData.Online_service || "",
          medical_Detail_Img: formData.medical_Detail_Img || null,
          remark: formData.remark || null,
          created_user: partnerAuth.user_id || null,
          updated_user: null,
          waiting_time: formData.waiting_time || "",
        }
      ],
    }
  }
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
      const jsonToSend = generateSubmissionJSON(formData);
      console.log("jsonToSend", jsonToSend)
      const response = await fetch(`${BASE_URL}/partner_all/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonToSend)
      });

      const data = await response.json();
      if (response.ok) {
        showToast(data.message, "success");
                setCompletedSteps((prev) => [...prev, activeStep]);


if (activeStep === steps.length - 1) {
    // wait 1.5s then finish
    setTimeout(() => {
      finish();
    }, 2000);
    
  } else {
    next();
  }
      } else {
         data.medical_detail.forEach((errorObj, index) => {
    if (errorObj && Object.keys(errorObj).length > 0) {
      Object.entries(errorObj).forEach(([field, messages]) => {
        messages.forEach((msg) => {
          showToast(`Medical Detail ${index + 1} - ${field}: ${msg}`, "error");
        });
      });
    }
  });
        
      }
    } catch (error) {
      console.error("❌ Network error:", error);
      showToast("Network error", "error");
    } finally {
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
           const medical_service = data.medical_service?.[0] || {};
           const medical_detail = data.medical_detail?.[0] || {};


        setFormData({
        service_name_id: medical_service.service_name_id || "",
        description: medical_service.description || "",
        price_range: medical_service.price_range || "",
        duration: medical_service.duration || "",
        remark: medical_service.remark || "",

        medical_Name: medical_detail.medical_Name || "",
        medical_Category: medical_detail.medical_Category_id || "",
        specialization: medical_detail.specialization_id || "",
        license_number: medical_detail.license_number || "",
        Doctor_name: medical_detail.Doctor_name || "",
        Doctor_specialization: medical_detail.Doctor_specialization || "",
        Doctor_qualification: medical_detail.Doctor_qualification || "",
        Doctor_experience_years: medical_detail.Doctor_experience_years || "",
        Doctor_phone: medical_detail.Doctor_phone || "",
        Doctor_email: medical_detail.Doctor_email || "",
        Doctor_available_days: medical_detail.Doctor_available_days || "",
        Doctor_available_time: medical_detail.Doctor_available_time || "",
        geo_location_link: medical_detail.geo_location_link || "",
        Tag_Line: medical_detail.Tag_Line || "",
        AboutUs: medical_detail.AboutUs || "",
        Day_care_opd: medical_detail.Day_care_opd || "",
        Time_of_opd: medical_detail.Time_of_opd || "",
        No_of_doctors: medical_detail.No_of_doctors || "",
        doctor_patient_ratio: medical_detail.doctor_patient_ratio || "",
        established_date: medical_detail.established_date || "",
        Years_of_operation: medical_detail.Years_of_operation || "",
        Availability_of_doctors: medical_detail.Availability_of_doctors || "",
        Fees_range: medical_detail.Fees_range || "",
        Availability_of_diagnostics_centre: medical_detail.Availability_of_diagnostics_centre || "",
        Mode_of_appointment: medical_detail.Mode_of_appointment || "",
        Online_service: medical_detail.Online_service || "",
        waiting_time: medical_detail.waiting_time || "",
        medical_Detail_Img: null, // file handle manually
      });
            }
          } catch (error) {
            console.error("Error fetching Listing data:", error);
          }
        };


  return (
    <>
      <Form id="listingForm" onSubmit={handleSubmit}>
        <Row className="border border-2 border-primary rounded p-3 mb-4">
          <h4 className="text-primary"> Medical Service</h4>
          <hr className="m-0 p-0 mb-4 text-primary" />

          {/* <Col md={4} >
    <FilterableSelect 
      label="partner"
      name="partner_id"
      value={formData.partner_id}
      onChange={handleChange}
      options={partneroption}
    />
  </Col> */}

          <Col md={4} >
            <FilterableSelect
              label="Service Names"
              name="service_name_id"
              value={formData.service_name_id}
              onChange={handleChange}
              options={service_names}
              required
            />
          </Col>

          <Col md={4}>
            <Form_input
              type="text"
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />

          </Col>
          <Col md={4}>
            <Form_input
              type="text"
              label="Price_range"
              name="price_range"
              value={formData.price_range}
              onChange={handleChange}

            />
          </Col>
          <Col md={4}>
            <Form_input
              type="text"
              label="Service Timing"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
                  placeholder="e.g. 10:00 AM - 6:00 PM"  

            />
          </Col>
        </Row>


        <Row className="border border-2 border-primary rounded p-3 mb-4 ">
          <h4 className="text-primary">Medical_Detail</h4>
          <hr className="m-0 p-0 mb-4 text-primary"></hr>

          {/* <Col md={3}>
            <Form_input
              type="text"
              label="Medical Name"
              name="medical_Name"
              value={formData.medical_Name}
              onChange={handleChange}
            />
          </Col> */}

          {/* <Col md={3}>
            <FilterableSelect
              label="Medical Category"
              name="medical_Category"
              value={formData.medical_Category}
              onChange={handleChange}
              options={medicalCategoryOptions} // from API MedicalCategory_Mst
            />
          </Col> */}

          {/* <Col md={4}>
    <FilterableSelect
      label="Type"
      name="type"
      value={formData.type}
      onChange={handleChange}
      options={subCategoryOptions} 
    />
  </Col> */}

          <Col md={3}>
            <FilterableSelect
              label="Specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              options={specialization}
              required
            />
          </Col>
          <Col md={3}>
            <Form_input
              type="number"
              label="License Number"
              name="license_number"
              value={formData.license_number}
              onChange={handleChange}
            />
          </Col>

          {/* <Col md={3}>
            <Form_input
              type="text"
              label="Doctor Name"
              name="Doctor_name"
              value={formData.Doctor_name}
              onChange={handleChange}
            />
          </Col> */}


{/* 

          <Col md={3}>
            <Form_input
              type="text"
              label="Doctor Qualification"
              name="Doctor_qualification"
              value={formData.Doctor_qualification}
              onChange={handleChange}
            />
          </Col> */}

          {/* <Col md={3}>
            <Form_input
              type="number"
              label="Doctor Experience (Years)"
              name="Doctor_experience_years"
              value={formData.Doctor_experience_years}
              onChange={handleChange}
            />
          </Col>

          <Col md={3}>
            <Form_input
              type="number"
              label="Doctor_specialization"
              name="Doctor_specialization"
              value={formData.Doctor_specialization}
              onChange={handleChange}
            />
          </Col>

          <Col md={3}>
            <Form_input
              type="text"
              label="Doctor Phone"
              name="Doctor_phone"
              value={formData.Doctor_phone}
              onChange={handleChange}
            />
          </Col>

          <Col md={3}>
            <Form_input
              type="email"
              label="Doctor Email"
              name="Doctor_email"
              value={formData.Doctor_email}
              onChange={handleChange}
            />
          </Col>

          <Col md={3}>
            <Form_input
              type="text"
              label="Doctor Available Days"
              name="Doctor_available_days"
              value={formData.Doctor_available_days}
              onChange={handleChange}
            />
          </Col>

          <Col md={3}>
            <Form_input
              type="text"
              label="Doctor Available Time"
              name="Doctor_available_time"
              value={formData.Doctor_available_time}
              onChange={handleChange}
            />
          </Col> */}

          {/* <Col md={3}>
    <Form_input
      type="text"
      label="Geo Location Link"
      name="geo_location_link"
      value={formData.geo_location_link}
      onChange={handleChange}
    />
  </Col> */}

          {/* <Col md={6}>
    <Form_input
      type="text"
      label="Tag Line"
      name="Tag_Line"
      value={formData.Tag_Line}
      onChange={handleChange}
    />
  </Col> */}

          {/* <Col md={6}>
    <Form_input
      type="textarea"
      label="About Us"
      name="AboutUs"
      value={formData.AboutUs}
      onChange={handleChange}
    />
  </Col> */}

          {/* <Col md={3}>
            <Form_input
              type="text"
              label="Day Care OPD/IPD"
              name="Day_care_opd"
              value={formData.Day_care_opd}
              onChange={handleChange}
            />
          </Col> */}

          {/* <Col md={3}>
            <Form_input
              type="time"
              label="Time of OPD/IPD"
              name="Time_of_opd"
              value={formData.Time_of_opd}
              onChange={handleChange}
            />
          </Col> */}

          <Col md={3}>
            <Form_input
              type="number"
              label="No. of Doctors"
              name="No_of_doctors"
              value={formData.No_of_doctors}
              onChange={handleChange}
            />
          </Col>

          <Col md={3}>
            <Form_input
              type="text"
              label="Patient & Doctor  Ratio"
              name="doctor_patient_ratio"
              value={formData.doctor_patient_ratio}
              onChange={handleChange}
              placeholder="E.g. 20:5"

            />
          </Col>

          <Col md={3}>
            <Form_input
              type="date"
              label="Established Date"
              name="established_date"
              value={formData.established_date}
              onChange={handleChange}
              required
            />
          </Col>

          <Col md={3}>
            <Form_input
              type="date"
              label="Years of Operation"
              name="Years_of_operation"
              value={formData.Years_of_operation}
              onChange={handleChange}
              required
            />
          </Col>

          <Col md={3}>
            <Form_input
              type="text"
              label="Availability of Service"
              name="Availability_of_doctors"
              value={formData.Availability_of_doctors}
              onChange={handleChange}
              placeholder={'On Calls / Ofline / Online / Home Visit  '}
            />
          </Col>

          <Col md={3}>
            <Form_input
              type="text"
              label="Fees Range"
              name="Fees_range"
              value={formData.Fees_range}
              onChange={handleChange}
            />
          </Col>

          {/* <Col md={3}>
            <Form_input
              type="text"
              label="Availability of Diagnostics Centre"
              name="Availability_of_diagnostics_centre"
              value={formData.Availability_of_diagnostics_centre}
              onChange={handleChange}
            />
          </Col> */}

          <Col md={3}>
            <Form_input
              type="text"
              label="Mode of Appointment"
              name="Mode_of_appointment"
              value={formData.Mode_of_appointment}
              onChange={handleChange}
            />
          </Col>

          <Col md={3}>
            <Form_input
              type="text"
              label="Online Service"
              name="Online_service"
              value={formData.Online_service}
              onChange={handleChange}
            />
          </Col>
          <Col md={3}>
            <Form_input
              type="text"
              label="Waiting Time"
              name="waiting_time"
              value={formData.waiting_time}
              onChange={handleChange}
              placeholder={'Enter waiting time in minutes'}
            />
          </Col>

          {/* <Col md={3}>
            <Form_input
              type="file"
              label="Medical Detail Image"
              name="medical_Detail_Img"
              onChange={handleChange}
            />
          </Col> */}

          {/* <Col md={3}>
    <Form_input
      type="text"
      label="Remark"
      name="remark"
      value={formData.remark}
      onChange={handleChange}
    />
  </Col> */}
        </Row>
      </Form>


    </>
  );
}

export default Step_07;
