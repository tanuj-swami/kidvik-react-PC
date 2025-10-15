import React from 'react'
import {  FaCheckCircle } from "react-icons/fa";

function TopHeadingBar({ icon, Topheading, firstHeading, secondHeading, description }) {
  return (
  <>
      <div className="text-center mb-3">
        <div className="d-inline-flex align-items-center  bg-opacity-10 text-primary px-3 py-2 rounded-pill mb-3">
              {icon && <span className="me-2">{icon}</span>}
          <span className="fw-bold fs-5">{Topheading}</span>
        </div>
            <h2 className="fw-bold mb-3">
              {firstHeading} <span className="text-primary">{secondHeading}</span>
            </h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
              {description}
              discover, compare, and connect with trusted local services.
            </p>
          </div>
  </>
  )
}

export default TopHeadingBar
