import React, { useEffect, useState } from "react";
import { Loading } from "../../Helper/Loader";
import GlobalSlider from "../../GlobalOwlSlider/GlobalOwlSlider ";
import { BASE_URL } from "../../Helper/Base_Url";
import Event_Card from "../../Cards/Event_Card";
import Top_Heading from "../../Helper/Top_Heading";
function Kidvik_Event() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/Event`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data?.data)) {
          setEvents(data.data);
        }
      })
      .catch((err) => console.error("Error fetching events:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-5">
        <h4>No events found</h4>
      </div>
    );
  }

  return (
    <div className="container-fluid events py-5 bg-light">
      <div className="container py-5">
       
        <Top_Heading subtitile="Our Events" titile="Explore What's Happening Around You"/>

        {/* Slider Start */}
        <GlobalSlider 
        >
          {events.map((event, index) => (
            <div className="p-2" key={event.id || index}>

            <Event_Card  event={event}index={index} />

            </div>
          ))}
        </GlobalSlider>
      </div>
    </div>
  );
}

export default Kidvik_Event;
