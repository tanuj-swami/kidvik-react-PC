import React ,{useState ,useEffect }from 'react'
import Slider from "react-slick";
import { Loading } from "../../Helper/Loader";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BASE_URL } from '../../Helper/Base_Url';
import '../Banner/Banner.css';

function Banner() {

  const [slides, setSlides] = useState([]);
  const [loading , setLoading] = useState(true);


  useEffect(() => {
    fetch(`${BASE_URL}/Slider/?Slider_Plateform=web`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data?.data)) {
          setSlides(data.data);
        }
      })
      .catch((err) => console.error("Error fetching slider:", err))
      .finally(() => setLoading(false));
  }, []);

  const settings = {
    dots: true,
    appendDots: dots => <ul className="custom-dots">{dots}</ul>,
    customPaging: () => <div className="custom-dot"></div>,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  if (loading) {
    return <Loading />;
  }

  if (slides.length === 0) {
    return (
      <div className="text-center py-5">
        <h4>No slides found</h4>
      </div>
    );
  }
  // console.log("slides",slides)

  return (




   <Slider {...settings}>
  {slides.map((slide , index) => (
    <div key={index} className='p-0 m-0'>
      <div
        className="slider-bg"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.4)), url('${BASE_URL}${slide.Slider_image}')`,
          // backgroundSize:"60vh 100wh"

        }}
      >
        
        {(slide.Slider_maintext || slide.Slider_topline) && (
    <div className='text-center align-items-center pt-5'>

      {slide.Slider_topline && (
        <h3 className="text-primary mb-3 display-5 ">{slide.Slider_topline}</h3>
      )}

      {slide.Slider_maintext && (
        <h3 className="display-5 text-white mb-4">{slide.Slider_maintext}</h3>
      )}

      <div>

        {slide.Slider_button_text1 && (
          <a href="" className="btn btn-primary px-4 py-3 px-md-5 me-3 btn-border-radius">
            {slide.Slider_button_text1}
          </a>
        )}
        {slide.Slider_button_text2 && (
          <a href="" className="btn btn-primary px-4 py-3 px-md-5 btn-border-radius">
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





      /* <div
  className="container-fluid py-5 hero-header wow fadeIn"
  data-wow-delay="0.1s"
  style={{
    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.05)), url('../img/hero-img.jpg')`,
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  }}
>

  <div className="container py-5">
    <div className="row g-5">
      <div className="col-lg-7 col-md-12">
        <h1 className="mb-3 text-primary">Your Parenting Companion</h1>
        <h1 className="mb-5 display-1 text-white">Discover Trusted Schools, Clinics &amp; Events</h1>
        <a  className="btn btn-primary px-4 py-3 px-md-5  me-4 btn-border-radius">Get Started</a>
        <a  className="btn btn-primary px-4 py-3 px-md-5 btn-border-radius">Learn More</a>
      </div>
    </div>
  </div>
</div> */



  
  ) 
}

export default Banner