import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../Helper/Base_Url";
import { Modal } from "react-bootstrap";
import Slider from "react-slick";
import GlobalSlider from "../../GlobalOwlSlider/GlobalOwlSlider ";
// import GlobalSlider from "../../GlobalOwlSlider/GlobalOwlSlider ";
// import { NextArrow, PrevArrow } from "../../Helper/Slider_Indigater";

function Our_Gellery() {

  const [gallery, setGallery] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch(`${BASE_URL}/gallery`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.data) {
          setGallery(data.data);
        }
      })
      .catch((err) => console.error("Error fetching gallery:", err));
  }, []);

  // Slider settings
  // const sliderSettings = {
  //   initialSlide: activeIndex,
  //   dots: true,
  //   appendDots: dots => <ul className="custom-dots">{dots}</ul>,
  //  customPaging: () => <div className="custom-dot"></div>,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: true,
  //    nextArrow: <NextArrow />,
  //   prevArrow: <PrevArrow />,
  // };

  
  // const settings = {
  //   slidesToShow: 3,      
  //   slidesToScroll: 3,      
  //   rows: 2,               
  //   infinite: gallery.length > 6,
  //   dots:true,
  //   appendDots: dots => <ul className="custom-dots">{dots}</ul>,
  //   customPaging: () => <div className="custom-dot"></div>,
  //   arrows: true,
  //    nextArrow: <NextArrow />,
  //   prevArrow: <PrevArrow />,
  // };

  return (
    <div className="col-md-6 col-lg-4 col-xl-3">
      <div className="footer-item">
        <h4 className="text-primary mb-4 border-bottom border-primary border-2 d-inline-block p-2 title-border-radius">
          OUR GALLERY
        </h4>

     {gallery.length > 0 ? (
          <GlobalSlider defaultSlides={3} rows={2}>
            {gallery.map((item, index) => (
              <div key={item.id} className="p-2">
                <div
                  className="footer-galary-img rounded-circle border border-primary"
                  onClick={() => {
                    setActiveIndex(index);
                    setShowModal(true);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={`${BASE_URL}${item.image}`}
                    className="img-fluid rounded-circle p-2"
                    alt={item.name || "gallery"}
                  />
                </div>
              </div>
            ))}
          </GlobalSlider>
        ) : (
          <p className="text-muted">No images available</p>
        )}



      </div>

      {/* Modal with Slider */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Body>
          <GlobalSlider defaultSlides={1}>
            
            {gallery.map((item) => (
              <div key={item.id} className="text-center">
                <img
                  src={`${BASE_URL}${item.image}`}
                  alt={item.name}
                  className="img-fluid"
                  style={{ maxHeight: "80vh", margin: "0 auto",  height:"400px" , width:"400px"}}
                />
                <p className="mt-2">{item.name}</p>
              </div>
            ))}
          </GlobalSlider>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Our_Gellery;
