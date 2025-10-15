import React,{useState} from "react";
import { Building2, Award, HandHeart, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";
import TopHeadingBar from "../../Helper/TopHeadingBar";
import styled from "styled-components";
import { Modal, Button } from "react-bootstrap";
import Contact_form from "../../Routers/Contact_us/Contact_form";
import Inquery from "../../Helper/Inquery";
import Step_01 from "../../AfterLogin_Pages/Entry_screen_step/Step_01";
import { NavLink } from "react-router-dom";
import { usePartnerLogin } from "../../Contaxt/PartnarLogin_context";



const Partners = () => {
  const {partnerAuth} = usePartnerLogin();
  return (
   
     <div className="text-center">
          <div className="p-5 bg-primary-light rounded-3 shadow-lg">
            <h4 className="fw-bold text-primary mb-3">Ready to Grow Your Business?</h4>
            <p className="text-primary mb-4">Join thousands of trusted service providers who are already connecting with families through Kidvik. It's free to get started!</p>
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <NavLink to={`${partnerAuth?.partnerAccess ? `park_listing` : 'partner-signup' }`}>
              <button className="btn btn-primary d-flex align-items-center gap-2" >
                <Building2 className="me-1" /> Become a Partner <ArrowRight className="ms-1" />
              </button>
              </NavLink>
              <button className="btn btn-primary">Learn More</button>
            </div>
          </div>
        </div>
  );
};


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
export default Partners;
