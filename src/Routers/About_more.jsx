import React, { useEffect, useState } from "react";
import { Loading } from "../Helper/Loader";
import { BASE_URL } from "../Helper/Base_Url";
import { useLogin } from "../Contaxt/Login_Contaxt";
import styled from "styled-components";
import What_Drives_Us from "../Pages/What Drives Us/What_Drives_Us";

function About_more() {

    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);
   const {topbarData} = useLogin();
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
  
    if (loading) {
      return (
        <>
          <Loading />
        </>
      );
    }
  
    if (!aboutData) {
      return <p className="text-center py-5">No About data found.</p>;
    }
  
  return (
    <>
      <div className="container-fluid py-5 about bg-light" style={{
            // background: `linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)),url(${BASE_URL}${aboutData?.AboutUs_Backgroung_Image})`,
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}>
    
            <div className="container py-5" >
              <div className="row g-5 align-items-center">
    
                {/* Left Column - Video */}
                {/* <div className="pt-4 col-lg-6 wow fadeIn" data-wow-delay="0.1s">

                  <video
                    id="aboutVideo"
                    className="w-100 video-border-radius p-2"
                    style={{ height: "500px", objectFit: "cover", }}
                    muted
                    autoPlay
                    loop
                    playsInline
                    poster="img/video-thumbnail.jpg"
                  >
                    <source
                      src={`${BASE_URL}${aboutData?.AboutUs_Image}`}
                      // src='img/kidvik_school_img/about_vedio_02.mp4'
                      type="video/mp4"
                    />
                  </video>
                </div> */}

                 <div className="col-lg-6">
                            <VideoWrapper>
                              <video
                                
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
                <div className="col-lg-6 wow fadeIn" data-wow-delay="0.3s">
                  <h4 className="text-primary mb-4 border-bottom border-primary border-2 d-inline-block p-2 title-border-radius">
                    {aboutData?.AboutUs_Top_Line}
                  </h4>
                  <h1 className="text-dark mb-4 fw-bold ">
                    {aboutData?.AboutUs_Heading}
                  </h1>
                  <p
                    className="text-dark mb-4"
                    dangerouslySetInnerHTML={{ __html: aboutData?.AboutUs_Description }}
                  ></p>
    
                  {/* <div
                  className="row mb-4"
                  dangerouslySetInnerHTML={{ __html: aboutData.key_Points }}
                ></div> */}

                  {/* More Details Button */}
                </div>
    
              </div>
            </div>
           <What_Drives_Us showCards={true}/>

            <div className="container">

            <div dangerouslySetInnerHTML={{ __html: aboutData?.key_Points }} />

                   {topbarData?.topbar_text && (
      <div className="text-dark text-center mx-auto d-flex align-items-center gap-2 bg-light p-3 rounded-pill px-3">
        <span>{topbarData?.topbar_text}</span>
        {topbarData?.Button_text && (
          <a
            href={topbarData?.Button_link || '#'}
            className="btn btn-sm btn-dark rounded-pill px-3"
          >
            {topbarData?.Button_text}
          </a>
        )}
      </div>
    )}
            </div>

          </div>

    

    </>
  )
}



export default About_more
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