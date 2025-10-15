import { useEffect, useState } from "react";
import { FaCheck , FaTimes ,  FaEye } from "react-icons/fa";
import Step_01 from "./Entry_screen_step/Step_01";
import Top_Heading from "../Helper/Top_Heading";
import ButtonLoading from "../Helper/ButtonLoading";
import Step_02 from "./Entry_screen_step/Step_02";
import Steo_03 from "./Entry_screen_step/Steo_03";
import Step_04 from "./Entry_screen_step/Step_04";
import Step_05 from "./Entry_screen_step/Step_05";
import Step_06 from "./Entry_screen_step/Step_06";
import Step_07 from "./Entry_screen_step/Step_07";
import Whats_poppin from "./Entry_screen_step/Whats_poppin";
import Recreational_Activities from "./Entry_screen_step/Recreational_Activities";
import Community from "./Entry_screen_step/Community";
import Kids_Essential from "./Entry_screen_step/Kids_Essential";
import Institude_Timing from "./Entry_screen_step/Institude_Timing";
import Recreational_Detail from "./Entry_screen_step/Recreational_Detail";
import Recreation_timing_betch from "./Entry_screen_step/Recreation_timing_betch";
import Events from "./Entry_screen_step/Events";
import SchoolFeesForm from "./Entry_screen_step/School_Fess_Form";
import { Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Previwe from "./Detail_page/Previwe";
import Image_Galary from "./Entry_screen_step/Image_Galary";
import { showToast } from "../Helper/toastService";
const steps = [

  { title: "Basic Details" },
  { title: "Education Key State" },
  { title: "Animities" },
  { title: "Partner Staff Detail" },
  { title: "Social Media & reviwe" },
  { title: "Institute Admission" },
  
  { title: "Medical Details" },
  { title: "Event screen" },
  { title: "Institute Admission" },
  { title: "Institute Admission" },
];

export default function BootstrapWizard() {
  const [activeStep , setActiveStep] = useState(0);
  const [loading, setloading] = useState(false);
    const navigate = useNavigate();
  const [selectedCategory , setSelectedCategory] = useState(Number(localStorage.getItem("selectedCategory")) || 0);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const {slug} = useParams();
  const [formData, setFormData] = useState({});
  const [showPreviewModal, setShowPreviewModal] = useState(false);
   const [completedSteps, setCompletedSteps] = useState([]);

  const handlePreview = () => {
  setShowPreviewModal(true);
};
  const commonSteps = [
    { title: "Basic Details", component: Step_01 },
    // { title: "Upload Your Gallery", component: Image_Galary},
    { title: "Partner Staff Detail", component: Step_04 },
    { title: "Partner_Facility", component: Steo_03 },
    { title: "Partner Timing & FAQ", component: Institude_Timing },
  ];
  const Laststeps = [
    // {title: "Preview", component: Previwe},
    { title: "Social Media & review", component: Step_05 },
  ]

    const categorySteps = {
    3: [ // Category ID 1
      { title: "Medical Detail", component: Step_07 },
    ],
    
    4: [ // Category ID 2
      { title: "Education Admission Criteria", component: Step_06 },
      { title: "Education Key State", component: Step_02 },
      { title: "Education Fess", component: SchoolFeesForm },
    ],

    5: [ // Category ID 3
      { title: "What's Poppin", component: Events },
    ],
    
    6: [ // Category ID 3
      // { title: "Recreational_Activities", component: Recreational_Activities },
      { title: "Recreational Detail", component: Recreational_Detail },
      { title: "Recreational Time ,Fee , Batch", component: Recreation_timing_betch },
    ],

    7: [ // Category ID 3
      { title: "Community", component: Community },
    ],
    8: [ // Category ID 3
      { title: "Kids Essential", component: Kids_Essential },
    ],
  };
 

    useEffect(() => {
    localStorage.setItem("activeStep", activeStep);
  }, [activeStep]);

  useEffect(() => {
    localStorage.setItem("selectedCategory", selectedCategory);
  }, [selectedCategory]);

const steps = selectedCategory
  ? [...commonSteps, ...(categorySteps[selectedCategory] || []), ...Laststeps]
  : [...commonSteps, ...Laststeps];


  const StepComponent = steps[activeStep].component;

  const next = () => setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prev = () => setActiveStep((prev) => Math.max(prev - 1, 0));

  const finish = () => {
    localStorage.removeItem("activeStep");
    localStorage.removeItem("selectedCategory");
    localStorage.removeItem("partner_id")
   
    
      setShowFinishModal(true); 

        setTimeout(() => {
      navigate("/park_listing");
    }, 1000);
  };

  const isStepClickable = (index) => {
  if (slug) {
    return true;
  } else {
    return index <= activeStep;
  }
};

 console.log("formData",formData);

  useEffect(() => {
    if (!slug) {
      localStorage.removeItem("activeStep");
      localStorage.removeItem("selectedCategory");
      localStorage.removeItem("partner_id");
      setActiveStep(0);
      setSelectedCategory(0);
      setFormData({});
    }
  }, []);
console.log("completedSteps",completedSteps)
  return (
    <>
    
     <div className="container-fluid py-2 p-1">
<Top_Heading 
  subtitile="KYC" 
  titile="Listing Partner KYC" 
  slug={slug} 
  formData={formData} 
/>

  <div className="d-flex justify-content-end gap-3 mb-3">
        {activeStep > 0 && (
          <button className="btn btn-primary" onClick={prev}>
            ← Previous
          </button>
        )}

        {activeStep < steps.length - 1 ? (
     ["Partner Staff Detail", "Partner Timing & FAQ", "Recreational Time ,Fee , Batch","Social Media & review"].includes(steps[activeStep].title) ? (
          <button
      type="submit"
      className="btn btn-primary"
      formNoValidate 
      form="listingForm"
    >
      {loading ? (
        <> Saving Staff <ButtonLoading /> </>
      ) : (
        "Save & Next →"
      )}
    </button>

           ):(
          <button type="submit" form="listingForm" className="btn btn-primary">
            {loading ? ( <> Saving Listing <ButtonLoading />  </>  ) : "Save & Next →"}
          </button>
           )
        ) : (


    <button
  type="button"
  className="btn btn-warning d-flex align-items-center gap-2"
  onClick={handlePreview}
>
  <FaEye /> Preview & Save
</button>

        )}
      </div>

   
     <ul className="nav nav-pills nav-justified mb-4">
  {steps.map((step, index) => (
    <li key={index} className="nav-item">
      <button
        className={`nav-link ${index === activeStep ? "active" : ""}`}
onClick={() => {
  if (index > 0 && !selectedCategory) {
    showToast("⚠️ Please fill the Basic Detail","error");
    return;
  }
  setActiveStep(index);
}}

        // disabled={!isStepClickable(index)}  
      >
        <h5 className="mb-1 text-dark">{index + 1}.</h5>
              {step.title}

        {/* {index < activeStep && (
          <span className="ms-2" style={{ color: "blue" }}>
                 <FaCheck />
          </span>
        )} */}

        {completedSteps.includes(index) && (
  <span className="ms-2" style={{ color: "blue" }}>
    <FaCheck />
  </span>
)}


      </button>
    </li>
  ))}
</ul>

      <hr />
      

      {/* Render step */}
      <div className="p-4 border rounded bg-light">
        <StepComponent
          next={next}
          setloading={setloading}
          setSelectedCategory={setSelectedCategory} 
          finish = {finish}
          activeStep={activeStep}
          steps={steps}
          data={formData} 
          setdata={setFormData} 
          setCompletedSteps={setCompletedSteps}
        />
      </div>

      {/* Controls */}


      <div className="d-flex justify-content-end gap-3 mt-2">
        {activeStep > 0 && (
          <button className="btn btn-primary" onClick={prev}>
            ← Previous
          </button>
        )}

        {activeStep < steps.length - 1 ? (
          ["Partner Staff Detail", "Partner Timing & FAQ", "Recreational Time ,Fee , Batch","Social Media & review"].includes(steps[activeStep].title) ? (
          <button
      type="submit"
      className="btn btn-primary"
      formNoValidate 
      form="listingForm"
    >
      {loading ? (
        <> Saving Staff <ButtonLoading /> </>
      ) : (
        "Save & Next →"
      )}
    </button>

           ):(
          <button type="submit" form="listingForm" className="btn btn-primary">
            {loading ? ( <> Saving Listin... <ButtonLoading />  </>  ) : "Save & Next →"}
          </button>
           )
        ) : (


    <button
  type="button"
  className="btn btn-warning d-flex align-items-center gap-2"
  onClick={handlePreview}
>
  <FaEye /> Preview & Save
</button>

        )}
      </div>


    </div>




<Modal
  show={showPreviewModal}
  onHide={() => setShowPreviewModal(false)}
  size="xl"
  centered
  backdrop="static"
>

  <div className="p-3 position-relative">
     <button
      type="button"
      className="btn position-absolute top-0 end-0 m-2 p-0 border-0 bg-transparent"
      onClick={() => setShowPreviewModal(false)}
      style={{ fontSize: "1.5rem", color: "#333" }}
    >
      <FaTimes />
    </button>

    {/* Finish button Top */}
    <div className="d-flex justify-content-center mb-3 gap-3">
      <button
  className="btn btn-primary"
  onClick={() => {
    prev();                 // pehle prev call hoga
    setShowPreviewModal(false);  // fir modal open hoga
  }}
>
  ← Previous
</button>

      <button
      type="submit"
      className="btn btn-primary"
      formNoValidate 
      form="listingForm"
        onClick={() => {
          setShowPreviewModal(false);
              // finish();
        }}
      >
        Finish  Listing ✔
      </button>

    </div>

    {/* Preview Screen */}
        <Previwe />

    {/* Finish button Bottom */}
    <div className="text-center mt-3 d-flex justify-content-center gap-3">

<button
  className="btn btn-primary"
  onClick={() => {
    prev();                 
    setShowPreviewModal(false);  
  }}
>
  ← Previous
</button>

      <button
        type="submit"
      className="btn btn-primary"
      formNoValidate 
      form="listingForm"
        
        onClick={() => {
          setShowPreviewModal(false);
         
        }}
      >
        Finish Listing ✔
      </button>
    </div>

  </div>
</Modal>

    <Modal
  show={showFinishModal}
  onHide={() => setShowFinishModal(false)}
  centered
  backdrop="static"
  keyboard={false}
>
    <Modal.Header closeButton>
       <h2> Thank you For listing</h2>
  </Modal.Header>

  <div className="text-center p-4">
    <img
      src="/img/logo/Kidvik_Final_logo01.jpg.png"
      alt="Kidvik"
      className="mb-3"
      style={{ width: "100px" }}
    />
    <h3 className="fw-bold text-success">🎉 Congratulations!</h3>
    <p className="text-muted mt-2">
      You have successfully completed your listing on <strong>Kidvik</strong>.
    </p>

    <div className="d-flex justify-content-center gap-2 mt-3">
      <button
        className="btn btn-success "
        onClick={() => setShowFinishModal(false)}
      >
        
        <Link to="/" style={{color:'white'}} >Go to Home</Link>  

      </button>
      <button
        className="btn btn-success "
        onClick={() => window.location.reload()}
      >
           <Link  to="/park_listing" style={{color:'white'}}>
             Add Another Listing
        
            </Link>  
      </button>
    </div>
  </div>


  </Modal>

    </>

    

  );
}
