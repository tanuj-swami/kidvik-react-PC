import React, { useState } from "react";
import { FaUserCircle, FaSignOutAlt, FaChevronDown, FaPlusCircle, FaListAlt, FaCheckCircle } from "react-icons/fa";
import { Dropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useLogin } from "../../Contaxt/Login_Contaxt";
import { usePartnerLogin } from "../../Contaxt/PartnarLogin_context";
import ButtonLoading from "../../Helper/ButtonLoading";

function UserDropdown({closeNavbarCollaps}) {
  const { auth, logout } = useLogin();
  const { partnerAuth, partnerLogout, Loading } = usePartnerLogin();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const username = auth?.username || partnerAuth?.partnerUsername;
  const accessType = partnerAuth?.accesstypename || partnerAuth?.userType;

  const handleLinkClick = () => {
    setDropdownOpen(false); // close the dropdown
  };

  return (
    <div className="position-relative">
      <Dropdown align="end" show={dropdownOpen} onToggle={() => setDropdownOpen(!dropdownOpen)}>
        <Dropdown.Toggle
          variant="light"
          className="d-flex align-items-center bg-white border rounded shadow-sm px-1 py-1"
        >
          <img
            src="/img/kidvik_school_img/user_image.jpg"
            alt="user"
            className="rounded-circle me-2"
            width="30"
            height="30"
          />
          <h6 className="fw-bold d-none d-md-inline">{`Hey ${username ? username : 'Guest'}`}</h6>
          {/* <FaChevronDown className="ms-2 text-muted small" /> */}
        </Dropdown.Toggle>

        <Dropdown.Menu className="p-3 shadow border-2 bg-light" style={{ borderRadius: "12px", minWidth: "200px" }}>
          <div className="text-center mb-3">
            <img
              src="/img/kidvik_school_img/user_image.jpg"
              alt="User"
              className="rounded-circle border shadow-sm"
              width="80"
              height="80"
            />
            <h5 className="text-muted fw-bold">{accessType} -&nbsp; <span>{partnerAuth?.userTypename} </span></h5>
          </div>

          <hr />

          {(partnerAuth?.userType === "IH" || partnerAuth?.userType === "PR") && (
            <>
              <p className="fw-bold text-muted small mb-2">Partner Zone</p>
              <div className="d-flex flex-column gap-2 mb-3">
                 <NavLink to="/park_listing" className="dropdown-item rounded" onClick={ ()=>{handleLinkClick , closeNavbarCollaps()}}>
                      ➕ Create Listing
                    </NavLink>
                    <NavLink to="/Profile#partner-listings" className="dropdown-item rounded" onClick={ ()=>{handleLinkClick , closeNavbarCollaps()}}>
                      📋 View My Listings
                    </NavLink>
                {partnerAuth?.code === "AD" ? (
                  <>
                  
                    <NavLink
                      to="/listing_approved"
                      className="dropdown-item rounded d-flex align-items-center gap-2"
                      onClick={ ()=>{handleLinkClick , closeNavbarCollaps()}}
                    >
                      <FaCheckCircle className="text-success" /> Approved Listings
                    </NavLink>
                  </>
                ) : (
                  <>
                   
                  </>
                )}
              </div>
              <hr />
            </>
          )}

          <div className="d-flex gap-2">
            <NavLink to="Profile" className="w-50 text-decoration-none" onClick={ ()=>{handleLinkClick , closeNavbarCollaps()}}>
              <button className="btn btn-primary w-100 d-flex align-items-center justify-content-center rounded-pill">
                <FaUserCircle className="me-1" />
                Profile
              </button>
            </NavLink>

            <button
              className="btn btn-primary w-50 d-flex align-items-center justify-content-center rounded-pill"
              onClick={auth?.username ? logout : partnerLogout}
              disabled={Loading}
            >
              <FaSignOutAlt className="me-1" />
              {Loading ? (
                <>
                  <ButtonLoading /> Logout...
                </>
              ) : (
                "Logout"
              )}
            </button>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default UserDropdown;
