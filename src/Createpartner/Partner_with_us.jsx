import React from 'react'
import { Building2, Award, HandHeart, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";

import TopHeadingBar from '../Helper/TopHeadingBar';
import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";

function Partner_with_us({scrollToForm}) {

    const partnerBenefits = [
      {
        icon: Building2,
        title: "Increase Visibility",
        description: "Get discovered by thousands of parents actively looking for services like yours in your area.",
        color: "text-primary",
        bgColor: "bg-primary-light"
      },
      {
        icon: Award,
        title: "Build Trust",
        description: "Showcase your credentials, certifications, and positive reviews to build credibility with parents.",
        color: "text-purple",
        bgColor: "bg-purple-light"
      },
      {
        icon: HandHeart,
        title: "Connect with Families",
        description: "Directly engage with parents, answer their questions, and build lasting relationships with families.",
        color: "text-success",
        bgColor: "bg-success-light"
      },
      {
        icon: TrendingUp,
        title: "Grow Your Business",
        description: "Increase bookings, attract new customers, and grow your business with our targeted marketing tools.",
        color: "text-warning",
        bgColor: "bg-warning-light"
      }
    ];
    
    const partnerTypes = [
      "Schools & Educational Institutions",
      "Healthcare Providers & Clinics",
      "Daycare & Childcare Centers",
      "Activity Centers & Classes",
      "Retail & Kids Essential Stores",
      "Therapy & Development Centers"
    ];
  return (
    <>
       <section className="py-2 bg-light" id="become_a_partner">
      <div className="container">

       
        <TopHeadingBar icon={<HandHeart />} Topheading="Partner with Us" firstHeading="Join the Kidvik" secondHeading="Partner Network" description="Connect with thousands of parents in your area. Showcase your services, build trust, and grow your business with Kidvik's trusted platform." />
        {/* Benefits Grid */}
<Button 
  style={{ 
    display: "block",   
    margin: "0 auto 0.9rem auto",  // 0.5rem = roughly mb-2
    textAlign: "center" 
  }}
  onClick={scrollToForm}
>
  Partner Signup
</Button>



        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-5">
          {partnerBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
               <Card  key={index} > 
            <div className="col">
      <StyledCard className="card h-100 border-1 shadow-lg rounded-3 text-center p-3">
        <IconWrapper style={{ backgroundColor: benefit.bgColor }}>
          <Icon className={` fs-5  svg ${benefit.color}`} /> 
        </IconWrapper>

        <h5 className="fw-semibold mt-2">{benefit.title}</h5>
        <p className="text-black small mb-0">{benefit.description}</p>
      </StyledCard>
    </div>
              </Card>
            );
          })}
        </div>

        {/* Partner Types */}
        <div className="bg-white rounded-3 p-4 mb-5 shadow-sm">
          <h4 className="fw-bold text-center mb-4">Who Can Partner with Kidvik?</h4>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
            {partnerTypes.map((type, index) => (
              <Card  key={index} > 
              <div  className="col">
                <div className="d-flex align-items-center bg-light rounded-2 p-3 shadow-sm gap-2">
                  <div className="bg-primary rounded-circle me-2" style={{ width: '8px', height: '8px' }}></div>
                  <span className="fw-medium">{type}</span>
                </div>
              </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        {/* <div className="row text-center mb-5">
          <div className="col-md-4 mb-3 mb-md-0">
            <h3 className="fw-bold text-primary">2,000+</h3>
            <p className="text-secondary">Active Partners</p>
          </div>
          <div className="col-md-4 mb-3 mb-md-0">
            <h3 className="fw-bold text-warning">150%</h3>
            <p className="text-secondary">Average Growth</p>
          </div>
          <div className="col-md-4">
            <h3 className="fw-bold text-success">4.9/5</h3>
            <p className="text-secondary">Partner Satisfaction</p>
          </div>
        </div> */}

        {/* CTA */}
       

        
      </div>
    </section>
    </>
  )
}

const Card = styled.div`

  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    // box-shadow: 1px 8px 12px rgba(0, 0, 0, 0.2);
  }
`;    

const StyledCard = styled.div`
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
  }
    `;
const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  svg {
    font-size: 2.5rem; 
  }

  ${StyledCard}:hover & {
    transform: scale(1.1);
  }
`;


export default Partner_with_us
