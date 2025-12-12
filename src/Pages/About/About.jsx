import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../Helper/Base_Url";
import { Loading } from "../../Helper/Loader";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const VideoWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 1rem;

  video {
    width: 100%;
    max-height: 500px;
    object-fit: cover;
    border-radius: 1rem;
  }

  @media (max-width: 992px) {
    video {
      max-height: 400px;
    }
  }

  @media (max-width: 576px) {
    video {
      max-height: 250px;
    }
  }
`;

const TextWrapper = styled.div`
  h1 {
    font-size: 2rem;
    @media (max-width: 576px) {
      font-size: 1.5rem;
    }
  }
`;

const fetchAboutData = async () => {
  const res = await fetch(`${BASE_URL}/AboutUs`);
  const json = await res.json();
  return json.data?.[0] || null;
};

function About() {
  const [readMore, setReadMore] = useState(false);

  // ⬇⬇ NEW: useQuery for fetching API
  const { data: aboutData, isLoading, isError, error } = useQuery({
    queryKey: ["aboutData"],
    queryFn: fetchAboutData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-center py-5 text-danger">Error: {error.message}</p>;
  if (!aboutData) return <p className="text-center py-5">No About data found.</p>;

  const previewLimit = 852;

  return (
    <div className="container-fluid py-2 about">
      <div className="container py-5">
        <div className="row g-5 align-items-center">

          {/* Left Column - Video */}
          <div className="col-lg-6">
            <VideoWrapper>
              <video muted autoPlay loop playsInline poster="img/video-thumbnail.jpg">
                <source
                  src={`${BASE_URL}${aboutData.AboutUs_Image}`}
                  type="video/mp4"
                />
              </video>
            </VideoWrapper>
          </div>

          {/* Right Column - Text */}
          <div className="col-lg-6">
            <TextWrapper>
              <h4 className="text-primary mb-4 border-bottom border-primary border-2 d-inline-block p-2 rounded">
                {aboutData.AboutUs_Top_Line}
              </h4>

              <h1 className="text-dark mb-4 fw-bold">
                {aboutData.AboutUs_Heading}
              </h1>

              {/* Description with Read More */}
              <div className="text-dark mb-3" style={{ whiteSpace: "pre-line" }}>
                {readMore ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: aboutData.AboutUs_Description,
                    }}
                  />
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `${aboutData.AboutUs_Description.slice(0, previewLimit)}...`,
                    }}
                  />
                )}

                {aboutData.AboutUs_Description.length > previewLimit && (
                  <button
                    className="btn btn-link p-0 mt-2"
                    onClick={() => setReadMore(!readMore)}
                  >
                    {readMore ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>

              {/* More Button */}
              {aboutData.AboutUs_More_Button === 1 && (
                <NavLink
                  to={aboutData.AboutUs_More_Button_link || "#"}
                  className="btn btn-primary px-5 py-3 mt-3 rounded"
                >
                  {aboutData.AboutUs_More_Button_text}
                </NavLink>
              )}
            </TextWrapper>
          </div>

        </div>
      </div>
    </div>
  );
}

export default About;
