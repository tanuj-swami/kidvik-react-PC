import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../Helper/Base_Url';
import { Link, NavLink } from 'react-router-dom'
import { useLogin } from '../../Contaxt/Login_Contaxt';
import { FaApple, } from "react-icons/fa";
import { logUserAction } from '../../Helper/logUserAction';
import {  useHandleContactClick } from '../../Helper/handleContactClick';



function TopHeader() {
  const { topbarData } = useLogin();
const handleContactClick = useHandleContactClick();


  return (
    <div
      className="container-fluid topbar bg-primary d-none d-lg-block py-2"
      style={{ borderRadius: '0 40px' }}
    >
      <div className="d-flex justify-content-between">

        <div className="top-info d-flex align-items-center">
          {topbarData?.topbar_address && (
            <small className="me-3 d-flex col-md-5">
              <i className="fas fa-map-marker-alt me-2 text-white" />
              <a href="#" className="text-white">
                {topbarData?.topbar_address}
              </a>
            </small>
          )}

          {topbarData?.topbar_mail && (
            <small className="me-3 d-inline-flex align-items-center">
              <i className="fas fa-envelope me-2 text-white" />
              <NavLink
                to={`mailto:${topbarData?.topbar_mail}`}  
                className="text-white"
                onClick={(e)=>
                  handleContactClick(e, "email", topbarData?.topbar_mail, "Topbar Home Page")
                }
              >
                {topbarData?.topbar_mail}
              </NavLink>

            </small>
          )}

          {topbarData?.topbar_phoneno && (
            <small className="me-1 d-inline-flex align-items-center">
              <i className="fas fa-phone me-2 text-white" style={{ transform: 'scaleX(-1)', cursor:"pointer" }} />
              <Link
                to={`tel:${topbarData?.topbar_phoneno}`}
                className="text-white"
                onClick={(e) =>
                 handleContactClick(e, "call", topbarData?.topbar_phoneno, "Topbar Home Page")
              }
              >
                {topbarData?.topbar_phoneno}
              </Link>
            </small>
          )}
        </div>


        {topbarData?.topbar_text && (
          <div className="text-white text-center mx-auto d-flex align-items-center gap-2">
            <span className=''>{topbarData?.topbar_text}</span>

            {/* <a
                href={topbarData?.Button_link || '#'}
                className="btn btn-sm rounded-pill px-3"
              ><img
                  src="/img/logo/playstoreimg-removebg-preview.png"
                  alt="Google Play"
                  className="me-2"
                  style={{
                    width: "28px",
                    height: "20px",
                    objectFit: "contain",
                  }}
                /></a>

                <a
                href={topbarData?.Button_link || '#'}
                className="btn btn-sm rounded-pill px-3"
              ><FaApple size={28} className="me-2" /></a> */}
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
              <FaApple size={28} />
              {/* <div style={{ lineHeight: 1 }}>
                   <div style={{ fontSize: 11 }}>Download on the</div>
                   <div style={{ fontSize: 17, fontWeight: "600" }}>App Store</div>
                 </div> */}
            </a>

            {/* Google Play badge */}
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
                className=""
                style={{
                  width: "28px",
                  height: "28px",
                  objectFit: "contain",
                }}
              />
              {/* <div style={{ lineHeight: 1 }}>
                   <div style={{ fontSize: 11 }}>GET IT ON</div>
                   <div style={{ fontSize: 17, fontWeight: "600" }}>Google Play</div>
                 </div> */}
            </a>
          </div>
        )}

        <div className="top-link pe-2">
          {topbarData?.topbar_facebook && (
            <a
              href={topbarData?.topbar_facebook}
              className="btn btn-light btn-sm-square rounded-circle bg-danger"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-facebook-f text-white" />
            </a>
          )}

          {/* {topbarData?.topbar_twitter && (
            <a
              href={topbarData?.topbar_twitter}
              className="btn btn-light btn-sm-square rounded-circle bg-danger"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-twitter text-white" />
              <i class="fa fa-brands fa-x-twitter text-white"/>
              <i class="fa-brands fa-square-x-twitter text-white"></i>
            </a>
          )} */}

          {topbarData?.topbar_instagram && (
            <a
              href={topbarData?.topbar_instagram}
              className="btn btn-light btn-sm-square rounded-circle bg-danger"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-instagram text-white" />
            </a>
          )}

          {topbarData?.topbar_linkedin && (
            <a
              href={topbarData?.topbar_linkedin}
              className="btn btn-light btn-sm-square rounded-circle me-0 bg-danger"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-linkedin-in text-white" />
            </a>
          )}
        </div>


      </div>

    </div>


    //  <div className="container-fluid topbar bg-primary d-none d-lg-block py-2"
    //   style={{borderRadius: '0 40px'}}
    //   >
    //   <div className="d-flex justify-content-between">
    //     <div className="top-info ps-2">
    //       <small className="me-3"><i className="fas fa-map-marker-alt me-2 text-secondary" /> <a href="#" className="text-white"> Mumbai, Maharashtra</a></small>
    //       <small className="me-3"><i className="fas fa-envelope me-2 text-secondary" /><a href="mailto:connect@kidvik.com" className="text-white">connect@kidvik.com</a></small>
    //     </div>
    //     <div className="top-link pe-2">
    //       <a href className="btn btn-light btn-sm-square rounded-circle"><i className="fab fa-facebook-f text-secondary" /></a>
    //       <a href className="btn btn-light btn-sm-square rounded-circle"><i className="fab fa-twitter text-secondary" /></a>
    //       <a href className="btn btn-light btn-sm-square rounded-circle"><i className="fab fa-instagram text-secondary" /></a>
    //       <a href className="btn btn-light btn-sm-square rounded-circle me-0"><i className="fab fa-linkedin-in text-secondary" /></a>
    //     </div>
    //   </div> 
    // </div>



  );
}

export default TopHeader;
