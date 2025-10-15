// src/components/GlobalSlider/GlobalSlider.jsx
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { PrevArrow, NextArrow } from "../Helper/Slider_Indigater";

function GlobalSlider({
  children,
  autoplay = true,
  dots = true,
  arrows = true,
  defaultSlides = 3, 
  infinite = true,
  onSlideChange,
  rows = 1

}) {
  const [slidesToShow, setSlidesToShow] = useState(defaultSlides);

  // Responsive control with window resize
  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth < 576) setSlidesToShow(1); // mobiles
      else if (window.innerWidth < 1024) setSlidesToShow(2); // tablets
      else setSlidesToShow(defaultSlides); // desktops
    };

    updateSlides(); // run on first load
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, [defaultSlides]);


  function NextArrow({ onClick }) {
  return (
    <button onClick={onClick} className="slider_next">
      <i className="fa fa-angle-right"></i>
    </button>
  );
}

function PrevArrow({ onClick }) {
  return (
    <button onClick={onClick} className="slider_prev">
      <i className="fa fa-angle-left"></i>
    </button>
  );
}
  const settings = {
    slidesToShow,
    slidesToScroll: 1,
    arrows,
    dots,
    rows,
    infinite,
    autoplay,
    autoplaySpeed: 3000,
    speed: 600,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow />,
   appendDots: (dots) => <ul className="custom-dots">{dots}</ul>, customPaging: () => <div className="custom-dot"></div>,
    afterChange: (current) => {
      if (onSlideChange) onSlideChange(current);
    },
  };

  return <Slider {...settings}>{children}</Slider>;
}

export default GlobalSlider;
