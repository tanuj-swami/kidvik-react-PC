import React from 'react'
import { BASE_URL } from '../Helper/Base_Url'
import "../Cards/Event_card.css"
function Event_Card({event , index}) {
  return (
   <>
          <div className="events-item bg-primary rounded border border-primary ">
                <div className="events-inner position-relative ">
                  <div className="events-img overflow-hidden rounded-circle position-relative ">
                    <img
                      src={`${BASE_URL}${event.Event_img}`}
                      className="img-fluid h-100 rounded-circle"
                      alt={event.Heading || "Event"}
                    />
                    <div className="event-overlay">
                      <a
                        href={`${BASE_URL}${event.Event_img}`}
                        data-lightbox={`event-${index}`}
                      >
                        <i className="fas fa-search-plus text-white fa-2x" />
                      </a>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-secondary text-white text-center events-rate">
                    {event.Event_Date || "TBA"}
                  </div>
                  <div className="d-flex justify-content-between px-4 py-2 bg-secondary">
                    <small className="text-white">
                      <i className="fas fa-calendar me-1 text-primary" />{" "}
                      {event.Event_Time || "Time Not Set"}
                    </small>
                    <small className="text-white">
                      <i className="fas fa-map-marker-alt me-1 text-primary" />{" "}
                      {event.Event_Address || "Location Not Available"}
                    </small>
                  </div>
                </div>
                <div className="events-text p-4  bg-white border-top-0 rounded-bottom ">
                  <a href="#" className="h4">
                    {event.Heading}
                  </a>
<p
  className="mb-0 mt-3"
  dangerouslySetInnerHTML={{
    __html:
      event.Description?.slice(0, 100) + 
      (event.Description?.length > 120 ? "..." : "")
  }}
></p>
                </div>
              </div>
   
   </>
  )
}

export default Event_Card