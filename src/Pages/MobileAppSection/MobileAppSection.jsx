import React from "react";
import styled from "styled-components";
import { FaStar, FaMobileAlt, FaBell, FaShieldAlt, FaApple, FaAndroid, FaDownload } from "react-icons/fa";
import { bgcolor } from "../../Helper/Base_Url";

const Container = styled.div`
  width: 100%;
  max-width: 1140px; /* Match Bootstrap container-lg width */
  margin: 0 auto;
  padding: 0 1rem; /* Bootstrap default padding */
  
`;

const Section = styled.section`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  padding: 4rem 1rem;
  background: #f9fafb;
  gap: 2rem;
  min-height: 500px;

  @media (max-width: 1024px) {
    flex-direction: column-reverse;
    padding: 3rem 1rem;
    min-height: unset;
  }

  @media (max-width: 600px) {
    padding: 2rem 0.5rem;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .badge {
    display: inline-block;
    background: #e6fbe6;
    // color: #22c55e;
    font-size: 0.85rem;
    font-weight: 700;
    border-radius: 1em;
    padding: 0.3em 1em;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;

    .blue {
      color: #0284c7;
    }
  }

  p {
    color: #6b7280;
    font-size: 1rem;
    margin-bottom: 1.5rem;
    max-width: 500px;
  }

  @media (max-width: 600px) {
    text-align: center;

    p {
      max-width: 100%;
      font-size: 0.95rem;
    }
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  li {
    display: flex;
    align-items: center;
    font-size: 1rem;
    gap: 0.5em;
    flex: 1 1 45%;
    min-width: 140px;

    .icon {
      font-size: 1.2rem;
      border-radius: 50%;
      padding: 0.3em;
      margin-right: 0.3em;
    }

    &:nth-child(1) .icon { background: #e0f2fe; color: #0284c7; }
    &:nth-child(2) .icon { background: #fff7e6; color: #f59e0b; }
    &:nth-child(3) .icon { background: #e6fbe6; color: #22c55e; }
    &:nth-child(4) .icon { background: #f3e8ff; color: #a855f7; }
  }

  @media (max-width: 600px) {
    justify-content: center;

    li {
      flex: 1 1 100%;
      justify-content: center;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.2rem;
  flex-wrap: wrap;
  justify-content: flex-start;

  button {
    display: flex;
    align-items: center;
    gap: 0.5em;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.7em 1.5em;
    border-radius: 0.5em;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
  }

  .ios {
    background: #0284c7;
    color: #fff;
    &:hover { background: #026aa1; }
  }

  .android {
    background: #fff;
    color: #222;
    border: 1px solid #e5e7eb;
    &:hover { background: #f3f4f6; }
  }

  @media (max-width: 600px) {
    justify-content: center;
  }
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 1rem;
  margin-top: 0.5rem;
  justify-content: flex-start;
  flex-wrap: wrap;

  .star {
    color: #fbbf24;
    font-size: 1.2rem;
    margin-right: 0.3em;
  }
  .rating {
    font-weight: 600;
    margin-right: 1em;
  }
  .downloads {
    color: #6b7280;
  }

  @media (max-width: 600px) {
    justify-content: center;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* Required for absolute icons */
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  max-height: 400px;
  overflow: hidden;
  object-fit: contain;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 1.2rem;
  border: 5px solid #0f0f0fff; /* Colored border for professional look */
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  position: relative;

  @media (max-width: 1024px) {
    max-width: 280px;
    max-height: 350px;
    object-fit: contain;
  }
  @media (max-width: 600px) {
    max-width: 200px;
    max-height: 300px;
    object-fit: contain;
    border-width: 2px;
    border-radius: 1rem;
  }

  .icon-top-right, .icon-bottom-left {
    position: absolute;
    background: #0284c7;
    color: white;
    border-radius: 50%;
    padding: 0.5rem;
    font-size: 1.2rem;
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-top-right {
    top: 10px;
    right: 10px;
  }

  .icon-bottom-left {
    bottom: 10px;
    left: 10px;
    background: #fbbf24; /* Yellow star */
    color: white;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;


function MobileAppSection() {
  return (
    <Container >
      <Section>
        <Left>
          <div className="badge f-bold fs-3 d-flex align-items-center gap-2 justify-content-center text-dark">  <FaMobileAlt className="text-dark"/>Mobile App Available</div>
          <h2>Take Kidvik <span className="blue">On The Go</span></h2>
          <p>
            Access all of Kidvik’s features right from your smartphone. Find services, read reviews, book appointments, and stay connected anywhere.
          </p>
          <FeatureList>
            <li>
              <span className="icon"><FaMobileAlt /></span>
              Location-based service discovery
            </li>
            <li>
              <span className="icon"><FaBell /></span>
              Instant notifications and updates
            </li>
            <li>
              <span className="icon"><FaShieldAlt /></span>
              Secure and verified providers
            </li>
            <li>
              <span className="icon"><FaStar /></span>
              Rate and review services
            </li>
          </FeatureList>
          <Buttons>
             <a
               href="#"
               className="d-flex align-items-center text-decoration-none justify-content-start p-2"
               style={{
                 color: "#000",
                 background: "#fff",
                 borderRadius: 8,
                 transition: "transform .2s ease",
               }}
               onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
               onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
             >
               <FaApple size={28} className="me-2" />
               <div style={{ lineHeight: 1 }}>
                 <div style={{ fontSize: 11 }}>Download on the</div>
                 <div style={{ fontSize: 17, fontWeight: "600" }}>App Store</div>
               </div>
             </a>
             <a
    href="#"
    className="d-flex align-items-center text-decoration-none justify-content-start p-2"
    style={{
      color: "#000",
      background: "#fff",
      borderRadius: 8,
      transition: "transform .2s ease",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
  >
    <img
      src="/img/logo/playstoreimg-removebg-preview.png"
      alt="Google Play"
      className="me-2"
      style={{
        width: "28px",
        height: "28px",
        objectFit: "contain",
      }}
    />
    <div style={{ lineHeight: 1 }}>
      <div style={{ fontSize: 11 }}>GET IT ON</div>
      <div style={{ fontSize: 17, fontWeight: "600" }}>Google Play</div>
    </div>
  </a>
          </Buttons>
          {/* <Stats>
            <span className="star"><FaStar /></span>
            <span className="rating">4.8/5 Rating</span>
            <span className="downloads">50,000+ Downloads</span>
          </Stats> */}
        </Left>
       <Right>
  <ImageWrapper>
    <Img src="/img/kidvik_app_ss/kidvik_app_ss.jpeg" alt="Kidvik App Screenshot" />
    
    {/* Top-right download icon */}
    <span className="icon-top-right">
      <FaDownload />
    </span>

    {/* Bottom-left star icon */}
    <span className="icon-bottom-left">
      <FaStar />
    </span>
  </ImageWrapper>
</Right>

      </Section>
    </Container>
  );
}

export default MobileAppSection;
