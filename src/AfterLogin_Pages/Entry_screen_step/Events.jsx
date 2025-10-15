import React, { useState , useEffect } from "react";
import { BASE_URL } from "../../Helper/Base_Url";
import { Row, Col, Button, Table } from "react-bootstrap";
// import FilterableSelect from "./FilterableSelect";
// import Form_input from "./Form_input";
import FilterableSelect from "../../Helper/FilterableSelect";
import Form_input from "../../Helper/Form_Input";
import  fetchSelectOptions  from "./MasterTableData/Master_Institude_2nd_step";
import { showToast } from "../../Helper/toastService";
import { usePartnerLogin } from "../../Contaxt/PartnarLogin_context";
import FileUploadWithPreview from "../../Helper/File_Uploade_previwe";
import { useParams } from "react-router-dom";
import CustomTable from "../../Helper/GlobelTable";
function Events({next , setloading , finish , activeStep , steps , setCompletedSteps }) {
    const [ticketTypeOptions , setticketTypeOptions] = useState([])
    const [audience , setaudience] = useState([])
    // For tickets
const [editingTicketIndex , setEditingTicketIndex] = useState(null);

// For schedule
const [editingScheduleIndex, setEditingScheduleIndex] = useState(null);

   const {partner_id } = usePartnerLogin();
   const {slug} = useParams();
  const [ticketInput, setTicketInput] = useState({
    ticket_type: "",
    price: "",
    quantity_available: "",
    quantity_sold: "",
  });
  const [ticketList, setTicketList] = useState([]);


   const [formData , setFormData] = useState({
    Primary_Image:null,
    title: "",
    tag_line: "",
    about_event: "",
    venue: "",
    city: "",
    address: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    audience_agegroup: "",
    is_online: 0,
    registration_required: 0,
    expected_audience: "",
    is_primary: 0,
  });

  
    const handledetailChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

    const handleToggle = (name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name] === 1 ? 0 : 1,
    }));
  };


  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketInput({ ...ticketInput, [name]: value });
  };

  // add ticket
// add ticket
const addTicket = () => {
  if (ticketInput.ticket_type && ticketInput.price) {

    if (editingTicketIndex !== null) {
      // update existing ticket
      const updated = [...ticketList];
      updated[editingTicketIndex] = ticketInput;
      setTicketList(updated);
      setEditingTicketIndex(null); // reset editing
    } else {
      // add new ticket
      setTicketList([...ticketList, ticketInput]);
    }
    // reset form
    setTicketInput({
      ticket_type: "",
      price: "",
      quantity_available: "",
      quantity_sold: "",
    });
  } else {
    showToast("Please fill all  fields!","error");
  }
};



   useEffect(() => {
    
        fetchSelectOptions(`${BASE_URL}/ticket_type/`, "name")
          .then(setticketTypeOptions);
        fetchSelectOptions(`${BASE_URL}/audience_age_group/`, "name")
          .then(setaudience);
      }, []);
  

  // delete ticket
  const deleteTicket = (index) => {
    const updated = [...ticketList];
    updated.splice(index, 1);
    setTicketList(updated);
  };

   const [scheduleInput, setScheduleInput] = useState({
    title: "",
    description: "",
    date: "",
    time_from: "",
    time_to: "",
  });

  const [scheduleList, setScheduleList] = useState([]);

  // handle change
  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setScheduleInput({ ...scheduleInput, [name]: value });
  };

  // add schedule
 const addSchedule = () => {
    if (scheduleInput.title && scheduleInput.date && scheduleInput.time_from && scheduleInput.time_to) {
      if (editingScheduleIndex !== null) {
        const updated = [...scheduleList];
        updated[editingScheduleIndex] = scheduleInput;
        setScheduleList(updated);
        setEditingScheduleIndex(null);
      } else {
        setScheduleList([...scheduleList, scheduleInput]);
      }
      setScheduleInput({
        title: "",
        description: "",
        date: "",
        time_from: "",
        time_to: "",
      });
    } else {
      showToast("Please fill all  fields!","error");
    }
  };

  // delete schedule
  const deleteSchedule = (index) => {
    const updated = [...scheduleList];
    updated.splice(index, 1);
    setScheduleList(updated);
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  setloading(true);

  try {
    const payload = {
    partner_id: partner_id,
    event_detail: [{
    Audience_AgeGroup_id: formData.audience_agegroup,
    Title: formData.title,
    Tag_Line: formData.tag_line,
    About_Event: formData.about_event,
    Venue: formData.venue,
    Start_Date: formData.start_date,
    End_Date: formData.end_date,
    Start_Time: formData.start_time,
    End_Time: formData.end_time,
    Is_Online: formData.is_online,
    Registration_Required: formData.registration_required,
    Expected_Audience: formData.expected_audience,
    Primary_Image: null,
      }],
      
      event_ticket : ticketList.map((eq) => ({
        ticket_type_id: eq.ticket_type,
        Price: eq.price,
        Quantity_Available: eq.quantity_available ,
        Quantity_Sold: eq.quantity_sold
      })),

      event_schedule : scheduleList.map((eq) => ({
        Title: eq.title,
        Description: eq.description,
        Date: eq.date ,
        Time_From : eq.time_from,
        Time_To: eq.time_to
      })),
    };

 
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

          }else {
  if (data.event_detail) {
    data.event_detail.forEach((errorObj, index) => {
      if (errorObj && Object.keys(errorObj).length > 0) {
        Object.entries(errorObj).forEach(([field, messages]) => {
          messages.forEach((msg) => {
            showToast(`Event Detail ${index + 1} - ${field}: ${msg}`, "error");
          });
        });
      }
    });
  } else if (data.event_ticket) {
    data.event_ticket.forEach((errorObj, index) => {
      Object.entries(errorObj).forEach(([field, messages]) => {
        messages.forEach((msg) => {
          showToast(`Event Ticket ${index + 1} - ${field}: ${msg}`, "error");
        });
      });
    });
  } else if (data.event_schedule) {
    data.event_schedule.forEach((errorObj, index) => {
      Object.entries(errorObj).forEach(([field, messages]) => {
        messages.forEach((msg) => {
          showToast(`Event Schedule ${index + 1} - ${field}: ${msg}`, "error");
        });
      });
    });
  } else {
    showToast(data.message || "Submission failed", "error");
  }
}

  } catch (err) {
    console.error("Error:", err);
    showToast(err , "Something went wrong. Please try again.");
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
        const detail = data?.event_detail?.[0] || {};
        setFormData({
        Primary_Image: detail.Primary_Image || null,
        title: detail.Title || "",
        tag_line: detail.Tag_Line || "",
        about_event: detail.About_Event || "",
        venue: detail.Venue || "",
        city: detail.City || "",
        address: detail.Address || "",
        start_date: detail.Start_Date || "",
        end_date: detail.End_Date || "",
        start_time: detail.Start_Time || "",
        end_time: detail.End_Time || "",
        audience_agegroup: detail.Audience_AgeGroup_id || "",
        is_online: detail.Is_Online ?? 0,
        registration_required: detail.Registration_Required ?? 0,
        expected_audience: detail.Expected_Audience || "",
        is_primary: detail.Is_Primary ?? 0,
      });

 setTicketList(
          (data?.event_ticket || []).map((t) => ({
            ticket_type: t.ticket_type_id || "",
            price: t.Price || "",
            quantity_available: t.Quantity_Available || "",
            quantity_sold: t.Quantity_Sold || "",
          }))
        );     

         setScheduleList(
          (data?.event_schedule || []).map((s) => ({
            title: s.Title || "",
            description: s.Description || "",
            date: s.Date || "",
            time_from: s.Time_From || "",
            time_to: s.Time_To || "",
          }))
        );

        
      }
    } catch (error) {
      console.error("Error fetching Listing data:", error);
    }
  };
// Columns for schedule
 const scheduleColumns = [
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
    { key: "date", label: "Date" },
    { key: "time_from", label: "Time From" },
    { key: "time_to", label: "Time To" },
  ];


// Ticket edit
  const editTicket = (index) => {
    setTicketInput(ticketList[index]);
    setEditingTicketIndex(index);
  };



  const editSchedule = (index) => {
    setScheduleInput(scheduleList[index]);
    setEditingScheduleIndex(index);
  };

const ticketColumns = [
    { label: "Ticket Type", key: "ticket_type", accessor: (row) => ticketTypeOptions.find((c) => c.value === row.ticket_type)?.label || "-" },

    { key: "price", label: "Price" },
    { key: "quantity_available", label: "Available" },
    { key: "quantity_sold", label: "Sold" },
  ];


  return (
    <>
<form id="listingForm" onSubmit={handleSubmit}>


    <Row className="border border-2 border-primary rounded p-3 mb-4">
      <h4 className="text-primary">Event Detail</h4>

      <Col md={6}>
        <Form_input
          type="text"
          label="Title"
          name="title"
          value={formData.title}
          onChange={handledetailChange}
          
        />
      </Col>

      <Col md={6}>
        <Form_input
          type="text"
          label="Venue"
          name="venue"
          value={formData.venue}
          onChange={handledetailChange}
          required
        />
      </Col>

      {/* <Col md={6}>
        <Form_input
          type="text"
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </Col> */}

      <Col md={6}>
        <Form_input
          type="textarea"
          label="Tag Line"
          name="tag_line"
          value={formData.tag_line}
          onChange={handledetailChange}
          maxLength={255}
        />
      </Col>

      <Col md={6}>
        <Form_input
          type="textarea"
          label="About Event"
          name="about_event"
          value={formData.about_event}
          onChange={handledetailChange}
          maxLength={255}
        />
      </Col>

      <Col md={6}>
        <Form_input
          type="textarea"
          label="Address"
          name="address"
          value={formData.address}
          onChange={handledetailChange}
        />
      </Col>

      <Col md={3}>
        <Form_input
          type="date"
          label="Start Date"
          name="start_date"
          value={formData.start_date}
          onChange={handledetailChange}
          required
        />
      </Col>

      <Col md={3}>
        <Form_input
          type="date"
          label="End Date"
          name="end_date"
          value={formData.end_date}
          onChange={handledetailChange}
          required
        />
      </Col>

      <Col md={3}>
        <Form_input
          type="time"
          label="Start Time"
          name="start_time"
          value={formData.start_time}
          onChange={handledetailChange}
          required
        />
      </Col>

      <Col md={3}>
        <Form_input
          type="time"
          label="End Time"
          name="end_time"
          value={formData.end_time}
          onChange={handledetailChange}
          required
        />
      </Col>

      <Col md={4}>
        <Form_input
          type="number"
          label="Expected Audience"
          name="expected_audience"
          value={formData.expected_audience}
          onChange={handledetailChange}
        />
      </Col>

      <Col md={4}>
        <FilterableSelect
          type="select"
          label="Audience Age Group"
          name="audience_agegroup"
          value={formData.audience_agegroup}
          onChange={handledetailChange}
          options={audience}
          required
          
        />
      </Col>

      {/* <Col md={4}>
        <FileUploadWithPreview
          label="Primary_Image"
          name="Primary_Image"
          value={formData.Primary_Image}
          onChange={handledetailChange}
        />
      </Col> */}



      <Col md={4} className="mt-3">
        <label className="form-label me-2">Is Online</label>
        <Button
          variant={formData.is_online ? "success" : "secondary"}
          onClick={() => handleToggle("is_online")}
        >
          {formData.is_online ? "Yes" : "No"}
        </Button>
      </Col>

      <Col md={4} className="mt-3">
        <label className="form-label me-2">Registration Required</label>
        <Button
          variant={formData.registration_required ? "success" : "secondary"}
          onClick={() => handleToggle("registration_required")}
        >
          {formData.registration_required ? "Yes" : "No"}
        </Button>
      </Col>

      {/* <Col md={4} className="mt-3">
        <label className="form-label me-2">Is Primary</label>
        <Button
          variant={formData.is_primary ? "success" : "secondary"}
          onClick={() => handleToggle("is_primary")}
        >
          {formData.is_primary ? "Yes" : "No"}
        </Button>
      </Col> */}

      {/* <Col md={12} className="d-flex justify-content-end mt-4">
        <Button variant="primary" onClick={handleSubmit}>
          Save Event
        </Button>
      </Col> */}
    </Row>



    <Row className="border border-2 border-info rounded p-3 mb-4">
      <h4 className="text-primary">Event Tickets</h4>

      {/* Ticket Type */}
      <Col md={4}>
        <FilterableSelect
          label="Ticket Type"
          name="ticket_type"
          value={ticketInput.ticket_type}
          onChange={handleChange}
          options={ticketTypeOptions}
         
        />
      </Col>

      {/* Price */}
      <Col md={4}>
        <Form_input
          type="number"
          label="Price"
          name="price"
          value={ticketInput.price}
          onChange={handleChange}
          
        />
      </Col>

      {/* Quantity Available */}
      <Col md={4}>
        <Form_input
          type="number"
          label="Quantity Available"
          name="quantity_available"
          value={ticketInput.quantity_available}
          onChange={handleChange}
        />
      </Col>

      {/* Quantity Sold */}
      <Col md={4}>
        <Form_input
          type="number"
          label="Quantity Sold"
          name="quantity_sold"
          value={ticketInput.quantity_sold}
          onChange={handleChange}
        />
      </Col>

     {/* Buttons */}
<Col md={12} className="d-flex justify-content-end mt-2 gap-2">
  <Button variant="primary" onClick={addTicket}>
    {editingTicketIndex !== null ? "Update Ticket" : "+ Add Ticket"}
  </Button>


  {editingTicketIndex !== null && (
    <Button
      variant="primary"
      onClick={() => {
        setEditingTicketIndex(null);
        setTicketInput({
          ticket_type: "",
          price: "",
          quantity_available: "",
          quantity_sold: "",
        });
      }}
    >
      Cancel
    </Button>
  )}


</Col>


     

       <CustomTable
          columns={ticketColumns}
          data={ticketList}
          onEdit={(index) => editTicket(index)}
          onDelete={(index) => deleteTicket(index)}
        />
    </Row>


 <Row className="border border-2 border-info rounded p-3 mb-4">
      <h4 className="text-primary">Event Schedule</h4>

      {/* Title */}
      <Col md={4}>
        <Form_input
          type="text"
          label="Title"
          name="title"
          value={scheduleInput.title}
          onChange={handleScheduleChange}
          
          
        />
      </Col>

      {/* Description */}
      <Col md={8}>
        <Form_input
          type="textarea"
          label="Description"
          name="description"
          value={scheduleInput.description}
          onChange={handleScheduleChange}
          maxLength={255}
        />
      </Col>

      {/* Date */}
      <Col md={4}>
        <Form_input
          type="date"
          label="Date"
          name="date"
          value={scheduleInput.date}
          onChange={handleScheduleChange}
          
        />
      </Col>

      {/* Time From */}
      <Col md={4}>
        <Form_input
          type="time"
          label="Time From"
          name="time_from"
          value={scheduleInput.time_from}
          onChange={handleScheduleChange}
          
        />
      </Col>

      {/* Time To */}
      <Col md={4}>
        <Form_input
          type="time"
          label="Time To"
          name="time_to"
          value={scheduleInput.time_to}
          onChange={handleScheduleChange}
          
        />
      </Col>

      {/* Add Button */}
      <Col md={12} className="d-flex justify-content-end mt-2 gap-2">

        <Button variant="primary" onClick={addSchedule}>
          {editingScheduleIndex !== null ? "Update Schedule":"+ Add Schedule "}
        </Button>

  {editingScheduleIndex !== null && (
    <Button
      variant="primary"
      onClick={() => {
        setEditingScheduleIndex(null);
       setScheduleInput({
        title: "",
        description: "",
        date: "",
        time_from: "",
        time_to: "",
      });

      }}
    >
      Cancel
    </Button>
  )}
      </Col>

 

      {/* Table */}
      {/* {scheduleList.length > 0 && (
        <Col md={12} className="mt-4">
          <Table bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Date</th>
                <th>Time From</th>
                <th>Time To</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {scheduleList.map((row, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{row.title}</td>
                  <td>{row.description}</td>
                  <td>{row.date}</td>
                  <td>{row.time_from}</td>
                  <td>{row.time_to}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteSchedule(i)}
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
          columns={scheduleColumns}
          data={scheduleList}
          onEdit={(index) => editSchedule(index)}
          onDelete={(index) => deleteSchedule(index)}
        />


    </Row>

    </form>
    </>
  );
}

export default Events;
