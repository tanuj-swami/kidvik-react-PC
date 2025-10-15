// src/components/Slider/CustomArrows.jsx
import React from "react";

export const NextArrow = ({ onClick }) => (
  <div
    className="custom-slick-arrow slick-next"
    onClick={onClick}
    style={{
      position: "absolute",
      top: "50%",
      right: "-20px",
      transform: "translateY(-50%)",
      zIndex: 2,
      background: "var(--bs-primary)",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    }}
  >
    <i className="fa fa-chevron-right text-white"></i>
  </div>
);

export const PrevArrow = ({ onClick }) => (
  <div
    className="custom-slick-arrow slick-prev"
    onClick={onClick}
    style={{
      position: "absolute",
      top: "50%",
      left: "-20px",
      transform: "translateY(-50%)",
      zIndex: 2,
      background: "var(--bs-primary)",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    }}
  >
    <i className="fa fa-chevron-left text-white"></i>
  </div>
);
