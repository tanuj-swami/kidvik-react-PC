import React from "react";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { FaApple, } from "react-icons/fa";
import { SiGoogleplay } from "react-icons/si";
import CopyRight from "./CopyRight";
import { useLogin } from "../../Contaxt/Login_Contaxt";
import { Link, NavLink } from "react-router-dom";
import { logUserAction } from "../../Helper/logUserAction";
import {  useHandleContactClick } from "../../Helper/handleContactClick";

const Footer = () => {
  const { topbarData } = useLogin();
  const handleContactClick = useHandleContactClick();
  return (
    <footer className="text-light pt-5" style={{ background: "black" }}>
      <div className="container ">

        <div className="row g-4">

          {/* Brand */}
          <div className="col-12 col-md-6 col-lg-3 text-center text-lg-start">
            <img
              src="/img/logo/Kidvik_Final_logo01.jpg.png"
              alt="Kidvik Logo"
              className="img-fluid mb-2"
              style={{ maxWidth: '120px', height: 'auto' }}
            />
            <p className="text-light-50">Trusted Parenting Companion</p>


          </div>

          {/* Services */}
          <div className="col-12 col-md-6 col-lg-3">
            {/* <h5 className="fw-bold mb-3 text-white">Company</h5> */}
            <ul className="list-unstyled mb-3">
              {["About Us", "Partner with Us", "Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, index) => (
                <li key={index} className="mb-2">
                  <a href="#" className="text-white text-decoration-none">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Download Buttons */}
          <div className="col-12 col-md-6 col-lg-3">
            {/* <h5 className="fw-bold mb-3 text-white">Company</h5> */}
            {/* <ul className="list-unstyled mb-3">
              {["About Us", "Partner with Us"].map((item, index) => (
                <li key={index} className="mb-2">
                  <a href="#" className="text-white text-decoration-none">{item}</a>
                </li>
              ))}
            </ul> */}

            {/* <p className="text-white mb-2">Download Our App</p> */}

            <div className="d-flex flex-wrap align-items-center gap-2">
              {/* App Store badge */}
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
              <div className="d-flex justify-content-center justify-content-lg-start gap-2 mt-3">
                {[Facebook, Instagram, Linkedin].map((Icon, idx) => (
                  <a
                    href="#"
                    key={idx}
                    className="btn btn-outline-light btn-sm p-2 d-flex align-items-center justify-content-center"
                    style={{ transition: 'all 0.3s ease' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'white'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <Icon className="w-4 h-4 text-black" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="col-12 col-md-6 col-lg-3">
            <h5 className="fw-bold mb-3 text-white">Contact</h5>
            <ul className="list-unstyled">
              {
                topbarData?.topbar_mail && (
                  <>
                    <Link to={`mailto:${topbarData?.topbar_mail}`} >
                      <li className="d-flex align-items-center mb-2"
                        onClick={(e) =>
                          handleContactClick(e, "email", topbarData?.topbar_mail, "Footer Home Page")
                        }
                      >
                        <Mail className="me-2 text-white" /> {topbarData?.topbar_mail}
                      </li>
                    </Link>
                  </>
                )
              }

              {
                topbarData?.topbar_phoneno && (
                  <Link to={`tel:${topbarData?.topbar_phoneno}`} >
                    <li className="d-flex align-items-center mb-2"
                       onClick={(e) =>
                          handleContactClick(e, "call", topbarData?.topbar_phoneno, "Footer Home Page")
                        }
                    >
                      <Phone className="me-2 text-white" /> {topbarData?.topbar_phoneno}
                    </li>
                  </Link>
                )
              }

              {
                topbarData?.topbar_address && (
                  <li className="d-flex align-items-center mb-2"

                  >
                    <MapPin className="me-2 text-white mt-1" />
                    <span>
                      {topbarData?.topbar_address}<br />

                    </span>
                  </li>

                )
              }
            </ul>
          </div>

        </div>
        <div className="row"><CopyRight /></div>

        {/* Bottom Bar */}

      </div>
    </footer>
  );
};

export default Footer;
