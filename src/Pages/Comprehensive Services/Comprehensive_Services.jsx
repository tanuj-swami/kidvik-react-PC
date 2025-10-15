import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { FaSchool, FaStethoscope, FaBaby, FaPaintBrush, FaShoppingBag, FaBrain, FaMapMarkerAlt, FaCogs } from "react-icons/fa";
import TopHeadingBar from "../../Helper/TopHeadingBar";
import Categories from "../Category_section/Category_section";
import { useAPI } from "../../Contaxt/ALL_APi_Call/API_Call_Contaxt";
import { BASE_URL } from "../../Helper/Base_Url";
import { Loading } from "../../Helper/Loader";
import { NavLink } from "react-router-dom";

const Section = styled.section`
  padding: 3rem 1rem;
  background-color: #f9fafb;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  span {
    background-color: #e0f2fe;
    color: #0284c7;
    padding: 0.25rem 1rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
  }

  h2 {
    margin-top: 1rem;
    font-weight: 700;
    font-size: 2rem;

    span {
      color: #0284c7;
    }
  }

  p {
    margin-top: 0.75rem;
    color: #6b7280;
    font-size: 1rem;
  }
`;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 1rem;
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease-in-out; /* smooth animation for all properties */

  &:hover {
    transform: translateY(-5px); /* card lifts slightly */
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2); /* stronger shadow on hover */

    .btn-outline {
      background-color: #0284c7; /* blue bg */
      color: #ffffff; /* white text */
      border: 1px solid #0284c7;
    }
  }

  .icon {
    font-size: 2.5rem;
    transition: transform 0.3s; /* smooth icon effect if needed */
  }

  h3 {
    margin-top: 1rem;
    font-size: 1.125rem;
    font-weight: 600;
  }

  p {
    margin-top: 0.5rem;
    color: #6b7280;
    font-size: 0.875rem;
  }

  ul {
    margin-top: 0.5rem;
    color: #374151;
    font-size: 0.875rem;
    padding-left: 1.25rem;
    list-style:none;
  }

  .btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: 1px solid #0284c7;
    border-radius: 0.5rem;
    background: transparent;
    color: #0284c7;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    margin-top: auto; /* push button to bottom */
  }

  .btn-outline .icon {
    font-size: 1rem;
    transition: transform 0.3s;
  }

//   &:hover .icon {
//     transform: scale(1.1); 
//   }


.icon-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 50%; 
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}
.icon {
  font-size: 2rem;
}

`;



const CTAButton = styled.button`
  background-color: #0284c7;
  color: #fff;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #0369a1;
  }
`;

export default function ServicesSection() {
  const { dropdowensubcategory , sunlaoding, fetchSubcategories, categories } = useAPI();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const subCategoryRef = useRef(null);

  useEffect(() => {
    if (categories?.length > 0) {
      const defaultCategory = categories[0];
      setSelectedCategory(defaultCategory.id);
      fetchSubcategories(defaultCategory.id);
    }
  }, [categories]);

  const handleCategoryClick = (id) => {
    setSelectedCategory(id);
    fetchSubcategories(id);

    // Small delay taaki data load ho jaye, phir scroll kare
    if (window.innerWidth <= 768 || window.innerWidth <= 300) {
      setTimeout(() => {
        if (subCategoryRef.current) {
          subCategoryRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 400);
    }
  };


  // const services = [
  //     {
  //         icon: <FaSchool />,
  //         title: "Schools & Education",
  //         color: "#0284c7", // blue
  //         desc: "Explore the best schools, preschools, and educational institutions in your area with verified reviews and details.",
  //         items: ["Verified Schools", "Preschool Options", "Admission Guidance"],
  //     },
  //     {
  //         icon: <FaStethoscope />,
  //         title: "Healthcare & Doctors",
  //         color: "#16a34a", // green
  //         desc: "Trusted pediatricians, specialists, and healthcare facilities to keep your child healthy & happy.",
  //         items: ["Pediatricians", "Hospitals & Clinics", "Emergency Care"],
  //     },
  //     {
  //         icon: <FaBaby />,
  //         title: "Daycare & Childcare",
  //         color: "#f59e0b", // amber
  //         desc: "Safe and nurturing daycare centers with qualified staff and structured child development programs.",
  //         items: ["Daycare Centers", "Nanny Services", "Play Schools"],
  //     },
  //     {
  //         icon: <FaPaintBrush />,
  //         title: "Activities & Classes",
  //         color: "#a855f7", // purple
  //         desc: "Exciting extra-curricular activities, tuition classes, and after-school programs for every age.",
  //         items: ["Sports Coaching", "Dance & Music", "STEM Classes"],
  //     },
  //     {
  //         icon: <FaShoppingBag />,
  //         title: "Kids Essentials",
  //         color: "#f43f5e", // pink/red
  //         desc: "Find everything your child needs – from clothing essentials to educational materials and safety gear.",
  //         items: ["Clothing", "Toys & Games", "Stationery"],
  //     },
  //     {
  //         icon: <FaBrain />,
  //         title: "Therapy & Development",
  //         color: "#0ea5e9", // light blue
  //         desc: "Personalized therapy and development programs that enhance children’s physical and mental growth.",
  //         items: ["Speech Therapy", "Occupational Therapy", "Behavioral Therapy"],
  //     },
  // ];
  //  console.log("dropdowensubcategory",dropdowensubcategory)
  return (
    <Section className="container">

      <TopHeadingBar icon={<FaCogs />} Topheading="Comprehensive Services" firstHeading="Everything Your Child Needs," secondHeading="All in One Place" description="From education to healthcare, activities to essentials – discover trusted, verified services in your neighborhood that other parents recommend." />
      <div className="row">
        <div className="col-md-3">
          <Categories onCategoryClick={handleCategoryClick} selectedCategory={selectedCategory} />
        </div>
        <div className="col-md-9" ref={subCategoryRef}>
          {
            sunlaoding ? (
              <Loading />
            ) : (
              <>
                <div className="row">
                  {console.log("dropdowensubcategory", dropdowensubcategory)}
                  {dropdowensubcategory.map((service, index) => (
                    <div key={index} className="col-12 col-md-6 col-lg-4 COM-CARD">
                      <Card>
                        <div className="d-flex align-items-center gap-4">
                          {/* Left side image/icon */}
                          <div
                            className="icon-wrapper d-flex align-items-center justify-content-center"
                            style={{
                              // backgroundColor: `${service.color}20`, 
                              borderRadius: "50%",
                              width: "60px",
                              height: "60px",
                              flexShrink: 0,
                            }}
                          >
                            <img
                              src={`${BASE_URL}${service.icon_img}`}
                              // alt={service.title} 
                              style={{ width: "80px", height: "80px", objectFit: "contain", padding: "0px" }}

                            />
                            {/* Agar font icon use karna hai toh:
      <div className="icon" style={{ color: service.color, fontSize: "24px" }}>
        {service.icon}
      </div>
    */}
                          </div>

                          {/* Right side content */}
                          <div>
                            <h5 className="fw-semibold mb-1">{service.name}</h5>
                          </div>
                        </div>
                        <p className="text-muted mb-0 ">{service.remark}</p>

                        <ul className="list-unstyled mt-3 d-flex flex-wrap gap-2">
                          {service.sub_category_detail.map((item, i) => (
                            <li
                              key={i}
                              className="d-flex align-items-center  p-2"
                              style={{
                                minWidth: "140px",
                                // backgroundColor: "#f3f4f6",
                              }}
                            >
                              <img
                                src={`${BASE_URL}${item?.icon_img}`}
                                alt={item?.name}
                                style={{
                                  height: "30px",
                                  width: "30px",
                                  objectFit: "contain",
                                  marginRight: "8px",
                                  borderRadius: "0.25rem",
                                  background: "#fff",
                                  padding: "2px",
                                }}
                              />
                              <span className="text-truncate" style={{ maxWidth: "90px" }}>
                                {item?.name}
                              </span>
                            </li>
                          ))}
                        </ul>
                        
                        <NavLink
                          to="explore"
                          state={{
                            category_id: service?.category.id,
                            sub_category_id: service?.id,
                          }}
                        >

                          <button class="btn-outline">
                            <FaMapMarkerAlt className="icon" />
                            Find Near Me
                          </button>
                        </NavLink>

                      </Card>
                    </div>
                  ))}
                </div>
              </>
            )
          }
          {/* <div className="text-center mt-4">
                <CTAButton>Explore All Services</CTAButton>
            </div> */}

        </div>
      </div>
    </Section>
  );
}
