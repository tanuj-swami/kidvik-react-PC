import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { BASE_URL , bgcolor } from "../../Helper/Base_Url";
import TopHeadingBar from "../../Helper/TopHeadingBar";
import { Use_Listing_Filter } from "../../AfterLogin_Pages/Listing_contaxt/Listing_Contaxt";
import { Loading } from "../../Helper/Loader";
import GlobalSlider from "../../GlobalOwlSlider/GlobalOwlSlider ";

const Section = styled.section`
  padding: 4rem 1rem;
  // background-color: ${bgcolor} ;

  @media (max-width: 768px) {
    padding: 2rem 0.5rem;
  }
`;

const fadeUp = keyframes`
  0% { opacity: 0; transform: translateY(20px);}
  100% { opacity: 1; transform: translateY(0);}
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  animation: ${fadeUp} 0.6s ease forwards;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 25px rgba(0,0,0,0.2);
  }

  img {
    width: 100px;
    height: 100px;
    object-fit: contain;
    margin-bottom: 1rem;
  }

  h5 {
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: #111827;
  }

  p {
    font-size: 0.9rem;
    color: #6b7280;
    min-height: 60px;
  }

  .quote {
    margin-top: 1rem;
    font-size: 0.9rem;
    font-style: italic;
    color: #0284c7;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    img {
      width: 80px;
      height: 80px;
    }
  }
`;

const Quete = styled.div`
  .quote {
    // margin-top: 1rem;
    font-size: 1rem;
    font-style: italic;
    color: #0284c7;
  }
`;
const Wrapper = styled.section`
  .category-bar .nav-link {
    position: relative;
    color: #333;
    padding-bottom: 6px;
    transition: color 0.2s;
    white-space: nowrap;
    font-weight: 500;
    cursor: pointer;
  }

  .category-bar .nav-link::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0%;
    height: 3px;
    background-color: #42B682;
    transition: width 0.3s ease-in-out;
    cursor: pointer;
  }

  .category-bar .nav-link:hover,
  .category-bar .nav-link.active,
  .category-bar .nav-link:focus {
    color: var(--bs-primary);
  }

  .category-bar .nav-link:hover::after,
  .category-bar .nav-link.active::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    .category-bar {
      overflow-x: auto;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: thin;
      scrollbar-color: rgba(0,0,0,0.25) transparent;
    }

    .category-bar::-webkit-scrollbar {
      height: 6px;
    }

    .category-bar::-webkit-scrollbar-thumb {
      background-color: rgba(0,0,0,0.25);
      border-radius: 8px;
    }

    .category-bar .nav {
      flex-wrap: nowrap;
      justify-content: flex-start !important;
      gap: 12px;
      padding: 8px 12px;
    }

    .category-bar .nav-item {
      display: inline-block;
    }

    .category-bar .nav-link {
      font-size: 1rem;
      padding: 8px 12px;
    }
  }
`;

export default function Trending_are() {
  const [trending, setTrending] = useState([]);
  const [trenloading, setLoading] = useState(true);
  const { category, loading, error } = Use_Listing_Filter();
  const [activeCat, setActiveCat] = useState("all");
  const [filteredTrending, setFilteredTrending] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(`${BASE_URL}/trending_master/`);
        const data = await res.json();
        setTrending(data.data);
      } catch (err) {
        console.error("Error fetching trending:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  useEffect(() => {
    if (activeCat === "all") {
      setFilteredTrending(trending);
    } else {
      const filtered = trending.filter(
        (item) => String(item.category_id) === String(activeCat)
      );
      setFilteredTrending(filtered);
    }
  }, [activeCat, trending]);

  return (
    <Section>
      <TopHeadingBar
        firstHeading="Trending"
        secondHeading="on Kidvik"
        description="See what other parents are loving! Explore, compare, and connect with trusted local services for your child."
      />

      {/* Category Bar */}
      <Wrapper>
        <div className="container-fluid px-4 category-bar">
          {error && (
            <div className="alert alert-danger text-center" role="alert">
              ❌ Failed to load categories. Please try again.
            </div>
          )}
          <ul className="nav justify-content-center">
            {loading ? (
              <p className="text-center text-secondary">Loading categories...</p>
            ) : (
              <>
                <li className="nav-item fs-5">
                  <span
                    className={`nav-link ${activeCat === "all" ? "active" : ""}`}
                    onClick={() => setActiveCat("all")}
                  >
                    All
                  </span>
                </li>
                {category.map((cat) => (
                  <li className="nav-item fs-5" key={cat.id}>
                    <span
                      className={`nav-link ${activeCat === cat.id ? "active" : ""}`}
                      onClick={() => setActiveCat(cat.id)}
                    >
                      {cat.name}
                    </span>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      </Wrapper>

      {/* Trending Carousel */}
      {trenloading ? (
        <Loading />
      ) : filteredTrending.length > 0 ? (
        <GlobalSlider>
           {filteredTrending.map((item) => (
                      <div key={item.id} className="p-2">
                        <div className="card h-100 shadow-sm small-card">
                          
                          {/* Blog Image */}
                          <img
                            src={`${BASE_URL}${item.img}`}
                            className="card-img-top rounded-top"
                            alt={item.title}
                            style={{
                              height: "150px",
                              objectFit: "cover",
                            }}
                          />
                          <div className="card-body d-flex flex-column p-3">
                            {/* Title */}
                           <Quete>
                            <div className="d-flex justify-content-between align-items-center">
                            <h6 className="card-title text-primary fw-bold mb-2 " style={{ fontSize: "1rem" }}>
                              {item.title.length > 40 ? item.title.slice(0, 40) + "..." : item.title}
                            </h6>
                            {item.quote && <div className="quote">"{item.quote}"</div>}
                            </div>
                           </Quete>
                            {/* Content */}
                            <p className="card-text text-muted mb-2" style={{ fontSize: "1rem", flexGrow: 1 }}>
                              {item.description.length > 100 ? item.description.slice(0, 100) + "..." : item.description}
                            </p>


          
                            {/* Meta */}
                            {/* <div className="d-flex justify-content-between text-muted small mb-2">
                              <span>
                                <i className="fas fa-calendar-alt me-1"></i>
                                {item.Date
                                  ? new Date(item.Date).toLocaleDateString("en-GB", {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    })
                                  : "No Date"}
                              </span>
                              <span>
                                <i className="fas fa-user me-1"></i>
                                {item.keywords || "Author"}
                              </span>
                            </div> */}
          
                            {/* View Button */}
                            {/* <NavLink
                              // to={`/blog/${item.slug}`}
                              to="/"
                              className="btn btn-primary btn-sm mt-auto"
                            >
                              View
                            </NavLink> */}
                          </div>
                          
                        </div>
                      </div>
                    ))}

          {/* {filteredTrending.map((item) => (
            // <Card key={item.id}>
              <img src={`${BASE_URL}${item.img}`} alt={item.title} />
              <h5>{item.title}</h5>
              <p>{item.description?.slice(0, 100)}...</p>
              {item.quote && <div className="quote">"{item.quote}"</div>}
            // </Card>
          ))} */}
        </GlobalSlider>
      ) : (
        <p
          className="text-muted fw-medium"
          style={{
            height: "250px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.1rem",
            backgroundColor: "#c2e4cdd5",
            borderRadius: "10px",
            marginTop: "1rem",
          }}
        >
          <i className="bi bi-info-circle me-2 text-secondary"></i>
          No trending data available
        </p>
      )}
    </Section>
  );
}
