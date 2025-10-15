import { style } from "framer-motion/client";
import React from "react";
import { FaSearch, FaFilter, FaStar, FaCalendarCheck, FaCheckCircle } from "react-icons/fa";
// import "./HowItWorks.css"; 
import styled from "styled-components";
import TopHeadingBar from "../../Helper/TopHeadingBar";

const steps = [
  {
    icon: <FaSearch />,
    title: "Search & Discover",
    description: "Enter your location and find services near you. Browse categories or search for specific needs.",
    step: "01",
    color: "text-primary"
  },
  {
    icon: <FaFilter />,
    title: "Filter & Compare",
    description: "Use smart filters to find exactly what you need. Compare ratings, prices, and reviews from real parents.",
    step: "02",
    color: "text-info"
  },
  // {
  //   icon: <FaStar />,
  //   title: "Read Reviews",
  //   description: "Get insights from other parents' experiences. Read detailed reviews and see ratings for informed decisions.",
  //   step: "03",
  //   color: "text-warning"
  // },
  {
    icon: <FaCalendarCheck />,
    title: "Connect & Book",
    description: "Contact service providers directly, book appointments, or visit locations with confidence.",
    step: "03",
    color: "text-success"
  }
];

const Simple_Process = () => {
  return (
    <Wraaper>

    <section className="py-5" id="how-it-works">
      <div className="container">
        {/* Header */}
        <TopHeadingBar icon={<FaCheckCircle />} Topheading="simple process" firstHeading="How Kidvik" secondHeading="Makes Parenting Easier" description="Finding the right services for your child shouldn’t be stressful. Our simple 4-step process helps you discover, compare, and connect with trusted local services." />
      
        {/* Steps */}
        <div className="row g-4 position-relative">
          {/* Connector line for desktop */}
          <div className="d-none d-lg-block position-absolute top-50 start-0 end-0 translate-middle-y mx-5">
            <div className="w-100" style={{ height: "3px", background: "linear-gradient(to right, #0d6efd, #6610f2, #198754)" }}></div>
          </div>

          {steps.map((step, idx) => (
            <div className="col-12 col-md-6 col-lg-4 text-center " key={idx}>
              {/* Step number circle */}
              <div className="step-circle bg-primary text-white mx-auto">{step.step}</div>

              {/* Card */}
              <div className="card shadow-sm  h-100 mt-4 how-card ">
                <div className="card-body">
                  <div className={`icon-box mx-auto mb-4 ${step.color}`} style={{background: `${step.color === 'text-primary' ? '#e7f1ff' : step.color === 'text-info' ? '#e0f7fa' : step.color === 'text-warning' ? '#fff3cd' : '#e9fbe7'}`}}>
                       {step.icon}
                  </div>
                  <h5 className="fw-semibold mb-2">{step.title}</h5>
                  <p className="text-muted">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        {/* <div className="row mt-5 text-center g-4">
          <div className="col-md-4">
            <h2 className="fw-bold fs-1 text-primary ">10,000+</h2>
            <p className="text-muted">Happy Families</p>
          </div>
          <div className="col-md-4">
            <h2 className="fw-bold fs-1 text-info">5,000+</h2>
            <p className="text-muted">Verified Services</p>
          </div>
          <div className="col-md-4">
            <h2 className="fw-bold fs-1 text-success">50+</h2>
            <p className="text-muted">Cities Covered</p>
          </div>
        </div> */}
      </div>
    </section>
    </Wraaper>
  );
};

const Wraaper = styled.section`
  background: linear-gradient(135deg, #eaeef3ff, #eceef1ff); /* section ka halka gradient */

  .step-circle {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -20px;
    position: relative;
    z-index: 10;
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }

  .icon-box {
    width: 70px;
    height: 70px;
    border-radius: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    transition: 0.3s ease-in-out;
    box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  }

  /* Alag-alag color backgrounds */
  // .text-primary { background: #e7f1ff; color: #0d6efd; }
  // .text-info { background: #e0f7fa; color: #0dcaf0; }
  // .text-warning { background: #fff3cd; color: #ffc107; }
  // .text-success { background: #e9fbe7; color: #198754; }

  .how-card {
    background: #fff;
    border: 1px solid #d1cfcfff;
    border-radius: 1rem;
    box-shadow: 0 6px 15px rgba(0,0,0,0.09);
    transition: all 0.3s ease-in-out;
  }

  .how-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 25px rgba(0,0,0,0.12);
  }

  .how-card:hover .icon-box {
    transform: scale(1.15);
  }
`;

export default Simple_Process;
