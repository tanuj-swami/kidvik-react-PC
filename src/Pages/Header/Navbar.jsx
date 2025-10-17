import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import '../Header/Navbar.css'
import { CONTACT_INFO } from '../../Helper/Mobile_Number';
import Navbar_Menu from './Navbar_Menu';
import UserDropdown from '../../AfterLogin_Pages/Profile/UserDropdowen';
import { useLogin } from '../../Contaxt/Login_Contaxt';
import { usePartnerLogin } from '../../Contaxt/PartnarLogin_context';
import CityLocationPicker from '../../AfterLogin_Pages/Uniapply_design/SearchBar_City_option';
function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();
  const { auth } = useLogin();
  const { partnerAuth } = usePartnerLogin();

  useEffect(() => {
    if (location.pathname === "/login") {
      setIsSticky(false);
      return;
    }

    const handleScroll = () => {

      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    const closeNavbarCollapse = () => {
  const navbarCollapse = document.querySelector(".navbar-collapse.show");
  if (navbarCollapse) {
    const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, {
      toggle: true,
    });
    bsCollapse.hide();
  }
};

  return (
    <>

      <div className='container-fluid px-0 navbar-container' >
        <nav className={`navbar navbar-light navbar-expand-xl p-0 m-0 navbar-sticky  px-0 ${isSticky ? 'sticky' : ''}`}>
          {/* <a href="index.html" class="navbar-brand border"><h1 class="text-primary display-6"><img src="img/logo/Kidvik_logo01.jpeg" alt="Kidvik Logo" class="border"></h1></a> */}
          <Link to="htpps://kidvik.com" className>
            <img src="/img/logo/Kidvik_Final_logo01.jpg.png" alt="Kidvik Logo" className="a-img" />
          </Link>
          <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="fa fa-bars text-primary" />
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">

            <Navbar_Menu closeNavbarCollapse={closeNavbarCollapse} />

            {/* <div className="d-flex me-4">
          <div id="phone-tada" className="d-flex align-items-center justify-content-center">
            <a href className="position-relative wow tada" data-wow-delay=".9s">
              <i className="fa fa-phone-alt text-primary fa-2x me-4" />
              <div className="position-absolute" style={{top: '-7px', left: 20}}>
                <span><i className="fa fa-comment-dots text-secondary" /></span>
              </div>
            </a>
          </div>
          <div className="d-flex flex-column pe-3 border-end border-primary">
            <span className="text-primary">Have any questions?</span>
            <a href={`tel:${CONTACT_INFO.whatsappNumber}`}><span className="text-secondary">Free: {CONTACT_INFO.Mobile_Number}</span></a>
          </div>
        </div> */}

            {
              auth.accessToken || partnerAuth?.partnerAccess ? (
                <>
                  <UserDropdown  closeNavbarCollapse={closeNavbarCollapse}/>
                </>
              ) : (
                <div className="d-flex me-4 justify-content-start">
                  <Link to="/login">
                    <button onClick={closeNavbarCollapse}
                      className="d-flex align-items-center gap-2 px-3 py-2 btn btn-primary" >
                      <i className="fas fa-user text-white"></i>
                      <span className="text-white">Login</span>
                    </button>
                  </Link>
                </div>

              )
            }
            



            {/* <button className="btn-search btn btn-primary btn-md-square rounded-circle" data-bs-toggle="modal" data-bs-target="#searchModal"><i className="fas fa-search text-white" /></button> */}
          </div>

        </nav>
      </div>

      
      <div className="modal fade" id="searchModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body d-flex align-items-center">
              <div className="input-group w-75 mx-auto d-flex">
                <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
              </div>
            </div>
          </div>
        </div>
      </div>

        <CityLocationPicker />

    </>
  )
}

export default Navbar