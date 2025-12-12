import React from "react";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "../../Helper/Loader";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BASE_URL } from "../../Helper/Base_Url";
import "../Banner/Banner.css";

async function fetchSlides() {
  const res = await fetch(`${BASE_URL}/Slider/?Slider_Plateform=web`);
  const data = await res.json();
  return data?.data || [];
}

function Banner() {
  const { data: slides = [], isLoading, isError } = useQuery({
    queryKey: ["sliderData"],
    queryFn: fetchSlides,
  });

  const settings = {
    dots: true,
    appendDots: (dots) => <ul className="custom-dots">{dots}</ul>,
    customPaging: () => <div className="custom-dot"></div>,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="text-center py-5">
        <h4>Error loading slider</h4>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="text-center py-5">
        <h4>No slides found</h4>
      </div>
    );
  }

  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <div key={index} className="p-0 m-0">
          <div
            className="slider-bg"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.4)), url('${BASE_URL}${slide.Slider_image}')`,
            }}
          >
            {(slide.Slider_maintext || slide.Slider_topline) && (
              <div className="text-center align-items-center pt-5">
                {slide.Slider_topline && (
                  <h3 className="text-light mb-3 display-5">
                    {slide.Slider_topline}
                  </h3>
                )}

                {slide.Slider_maintext && (
                  <h3 className="display-5 slider_color mb-4">
                    {slide.Slider_maintext}
                  </h3>
                )}

                <div>
                  {slide.Slider_button_text1 && (
                    <a
                      href=""
                      className="btn btn-primary px-4 py-3 px-md-5 me-3 btn-border-radius"
                    >
                      {slide.Slider_button_text1}
                    </a>
                  )}

                  {slide.Slider_button_text2 && (
                    <a
                      href=""
                      className="btn btn-primary px-4 py-3 px-md-5 btn-border-radius"
                    >
                      {slide.Slider_button_text2}
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default Banner;
