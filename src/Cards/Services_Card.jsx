import React from 'react'
import { BASE_URL } from '../Helper/Base_Url'

function Services_Card({service}) {
  return (
    <>
      <div className="text-center border-primary border bg-white service-item">
                <div className="service-content d-flex align-items-center justify-content-center p-4">
                  <div className="service-content-inner">
                    <div className="p-4">
                      {/* If icon_class is null, fallback to a default */}
                      <i
                        className={`${service.icon_class || "fas fa-star"} fa-6x text-primary`}
                      />
                    </div>
                    <a href={service.Button_link || "#"} className="h4">
                      {service.Heading}
                    </a>
                    <p className="my-3">{service.Description}</p>
                    {service.Button_text && (
                      <a
                        href={service.Button_link || "#"}
                        className="btn btn-primary text-white px-4 py-2 my-2 btn-border-radius"
                      >
                        {service.Button_text}
                      </a>
                    )}
                  </div>
                </div>
              </div>
    
    </>
  )
}

export default Services_Card