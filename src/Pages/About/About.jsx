import React, { useEffect, useState } from "react";
import { BASE_URL, bgcolor } from "../../Helper/Base_Url";
import { Loading } from "../../Helper/Loader";
import styled from "styled-components";

const VideoWrapper = styled.div`
  width: 100%;
  height: auto;
  overflow: hidden;
  border-radius: 1rem;

  video {
    width: 100%;
    height: 100%;
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

  p {
    transition: max-height 0.3s ease, overflow 0.3s ease;
    overflow: hidden;
  }
`;

function About() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    const getAboutData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/AboutUs`);
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          setAboutData(json.data[0]);
        }
      } catch (error) {
        console.error("Error fetching About data:", error);
      } finally {
        setLoading(false);
      }
    };

    getAboutData();
  }, []);

  if (loading) return <Loading />;
  if (!aboutData) return <p className="text-center py-5">No About data found.</p>;

  // Limit for text preview
  const previewLimit = 500;

  return (
    <div
      className="container-fluid py-2 about"
      // style={{
      //   background: `linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url(${BASE_URL}${aboutData.AboutUs_Backgroung_Image})`,
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "cover",
      // }}
      
    >
      <div className="container py-5">
        <div className="row g-5 align-items-center">
          {/* Left Column - Video */}
          <div className="col-lg-6">
            <VideoWrapper>
              <video
                muted
                autoPlay
                loop
                playsInline
                poster="img/video-thumbnail.jpg"
              >
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
              <h1 className="text-dark mb-4 fw-bold">{aboutData.AboutUs_Heading}</h1>

              {/* <div className="text-dark mb-3" dangerouslySetInnerHTML={{ __html: aboutData.AboutUs_Short_Description }}></div> */}
              <div className="text-dark mb-3" style={{ whiteSpace: 'pre-line' }}>
              {readMore
                ? <div dangerouslySetInnerHTML={{ __html: aboutData.AboutUs_Description }}></div>
                : <div dangerouslySetInnerHTML={{ __html: `${aboutData.AboutUs_Description.slice(0, previewLimit)}...` }}></div>}
              {aboutData.AboutUs_Description.length > previewLimit && (
                <button
                  className="btn btn-link p-0"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? "Read Less" : "Read More"}
                </button>
              )}
              </div>


              {aboutData.AboutUs_More_Button === 1 && (
                <a
                  href={aboutData.AboutUs_More_Button_link || "#"}
                  className="btn btn-primary px-5 py-3 ms-3 mt-3 rounded"
                >
                  {aboutData.AboutUs_More_Button_text}
                </a>
              )}
            </TextWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
