import React, { useEffect, useState } from "react";
import { Loading } from "../../Helper/Loader";
import GlobalSlider from "../../GlobalOwlSlider/GlobalOwlSlider ";
import { BASE_URL } from "../../Helper/Base_Url";
import Top_Heading from "../../Helper/Top_Heading";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/Testimonial`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data?.data)) {
          setTestimonials(data.data);
        }
      })
      .catch((err) => console.error("Error fetching testimonials:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-5">
        <h4>No testimonials found</h4>
      </div>
    );
  }

  return (
    <div className="container-fluid testimonial py-3">
      <div className="container py-5 position-relative">
        <Top_Heading
          subtitile="Our Testimonials"
          titile="Parents Say About Us"
        />

        <GlobalSlider>
          {testimonials.map((item) => (
            <div
              key={item.Testimonial_id}
              className="img-border-radius bg-light border border-primary p-4"
             
            >
              <div
                className="p-2 position-relative flex-grow-1 d-flex flex-column"
                // 🔥 Fix equal card height
              >
                <i
                  className="fa fa-quote-right fa-2x text-primary position-absolute"
                  style={{ top: 5, right: 8 }}
                />
                <div className="d-flex align-items-center">
                  <div className="border border-primary bg-white rounded-circle p-1">
                    <img
                      src={`${BASE_URL}${item.Testimonial_image}`}
                      className="rounded-circle"
                      style={{
                        width: 70,
                        height: 70,
                        objectFit: "cover", 
                        
                      }}
                      alt={item.Testimonial_author}
                    />
                  </div>
                  <div className="ms-1">
                    <h6 className="text-dark">{item.Testimonial_author}</h6>
                    <p className="m-0 pb-3 text-muted">
                      {item.Testimonial_subtext ||
                        item.Testimonial_author_Designation}
                    </p>
                    <div className="d-flex pe-5">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="fas fa-star text-primary" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="border-top border-primary mt-3 pt-1 flex-grow-1">
                  <p
                    className="mb-0"
                    dangerouslySetInnerHTML={{
                      __html:
                        item.Testimonial_quote?.slice(0, 120) +
                        (item.Testimonial_quote?.length > 120 ? "..." : ""),
                    }}
                  ></p>
                </div>
              </div>
            </div>
          ))}
        </GlobalSlider>
      </div>
    </div>
  );
}

export default Testimonials;
