import React, { useEffect, useState } from "react";
import { Loading } from "../../Helper/Loader";
import { BASE_URL } from "../../Helper/Base_Url";
import Services_Card from "../../Cards/Services_Card";
import Top_Heading from "../../Helper/Top_Heading";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${BASE_URL}/Feature`);
        const data = await res.json();
        setServices(data.data || []);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
     <>
     <Loading/>
     </>
    );
  }

  return (
    <div className="container-fluid service py-5">
      <div className="container py-5">

        <Top_Heading subtitile="What We Do" titile="Welcome to Kidvik — Your Partner in Care & Learning" />

        <div className="row g-5">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="col-md-6 col-lg-6 col-xl-3 wow fadeIn"
              data-wow-delay={`${0.1 + index * 0.2}s`}
            >
            
<Services_Card  service={service}/>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Services;
