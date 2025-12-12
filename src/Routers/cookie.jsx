import React, { useEffect, useState } from "react";
import { Loading } from "../Helper/Loader";
import { BASE_URL } from "../Helper/Base_Url";
import { useLogin } from "../Contaxt/Login_Contaxt";
import styled from "styled-components";
import What_Drives_Us from "../Pages/What Drives Us/What_Drives_Us";
import TopHeadingBar from "../Helper/TopHeadingBar";
import { FaCogs } from "react-icons/fa"

import { Heart, Shield, Users, Target, Award, Clock } from "lucide-react";
import { Link } from "react-router-dom";

function About_more() {

    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { topbarData } = useLogin();
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

            {/* <section className="py-5" >
               
                <div className="container mb-5">
                   
                    <TopHeadingBar icon={<FaCogs />} 
                    Topheading="Our Story" firstHeading="“Making Parenting  " secondHeading="Easier, Smarter, and More Connected.”" description="Every parent wants the best for their child — yet finding trusted services, reliable guidance, and enriching activities often feels like an endless search. As parents ourselves, we’ve been there — navigating countless recommendations, comparing schools, healthcare providers, and experiences that truly nurture a child’s growth. 

That’s where KIDVIK began — born from a heartfelt desire to make parenting simpler, smarter, and more connected.

We set out to create a platform where everything related to children — from education and healthcare to events, recreation, and essentials — comes together in one trusted space. A place where parents can explore verified options, make confident choices, and feel supported at every step.

What started as a personal need soon became our purpose: to empower parents with convenience and confidence, while helping children explore, learn, and thrive.

At KIDVIK, we’re more than just a platform — we’re a community built by parents, for parents. Every feature we design and every service we share carries one goal: to make raising happy, healthy, and confident kids a little easier every day.

Because when parents feel supported, children truly shine. " />
                    <Link to="about">

                        
                    </Link>
                   
                </div>


            </section> */}


<section className="py-5">
  {/* Values Section */}
  <div className="container mb-5">
    {/* <h3 className="text-center mb-5 fw-bold">What Drives Us</h3> */}
    <TopHeadingBar
      icon={<FaCogs />}
      Topheading="Our Story"
      firstHeading="“Making Parenting"
      secondHeading="Easier, Smarter, and More Connected.”"
      description={
        <>
          <p>
            Every parent wants the best for their child — yet finding trusted
            services, reliable guidance, and enriching activities often feels
            like an endless search. As parents ourselves, we’ve been there —
            navigating countless recommendations, comparing schools, healthcare
            providers, and experiences that truly nurture a child’s growth.
          </p>

          <p>
            That’s where KIDVIK began — born from a heartfelt desire to make
            parenting simpler, smarter, and more connected.
          </p>

          <p>
            We set out to create a platform where everything related to children
            — from education and healthcare to events, recreation, and
            essentials — comes together in one trusted space. A place where
            parents can explore verified options, make confident choices, and
            feel supported at every step.
          </p>

          <p>
            What started as a personal need soon became our purpose: to empower
            parents with convenience and confidence, while helping children
            explore, learn, and thrive.
          </p>

          <p>
            At KIDVIK, we’re more than just a platform — we’re a community built
            by parents, for parents. Every feature we design and every service
            we share carries one goal: to make raising happy, healthy, and
            confident kids a little easier every day.
          </p>

          <p>Because when parents feel supported, children truly shine.</p>
        </>
      }
    />
  </div>
</section>





          



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