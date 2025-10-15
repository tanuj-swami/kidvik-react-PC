import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { BASE_URL } from "../../../Helper/Base_Url";
import { Use_Listing_Filter } from "../../Listing_contaxt/Listing_Contaxt";
import { showToast } from "../../../Helper/toastService";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { Loading } from "../../../Helper/Loader";
import CityLocationPicker from "../SearchBar_City_option";
import { logUserAction } from "../../../Helper/logUserAction";
import { FaStar, FaGem, FaCrown, FaLeaf, FaHome, FaEye, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaGlobe } from "react-icons/fa"; // import icons
import { calculateDistance } from "../../../Helper/calculateDistance";



function Search_page_card() {
  const navigate = useNavigate();
  const { state, cityId } = Use_Listing_Filter();
  const [compareList, setCompareList] = useState([]);
  const [hover, setHover] = useState(false);
  const userLat = parseFloat(localStorage.getItem("user_latitude"));
  const userLon = parseFloat(localStorage.getItem("user_longitude"));
  // Load from sessionStorage





  useEffect(() => {
    const stored = JSON.parse(sessionStorage.getItem("compareSchools")) || [];
    setCompareList(stored);
  }, []);

  // Save to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("compareSchools", JSON.stringify(compareList));
  }, [compareList]);

  const handleCompareToggle = async (partner_id) => {
    setCompareList((prev) => {
      let updatedList;

      if (prev.includes(partner_id)) {
        updatedList = prev.filter((id) => id !== partner_id);

        // Log remove action in background
        logUserAction("user", "Remove from Compare", "Explore Page", partner_id).catch((err) =>
          console.error("Error logging remove compare action:", err)
        );
      } else {
        if (prev.length >= 3) {
          showToast(`You can only compare up to 3 listings`, "error");
          return prev;
        }

        updatedList = [...prev, partner_id];

        // Log add action in background
        logUserAction("user", "Add to Compare", "Explore Page", partner_id).catch((err) =>
          console.error("Error logging add compare action:", err)
        );
      }

      return updatedList;
    });
  };


  const removeSchool = (id) => {
    setCompareList((prev) => prev.filter((x) => x !== id));
    // showToast("School removed", "success");
  };

  const clearAll = () => {
    setCompareList([]);
    // showToast("Cleared all", "success");
  };

  const selectedSchools = state.filtered_Listing.filter((s) =>
    compareList.includes(s.PartnerMaster_id)
  );

  // Reset compare list when category or subcategory changes
  useEffect(() => {
    // Only clear if compareList is not empty
    if (compareList.length > 0) {
      setCompareList([]);
      sessionStorage.removeItem("compareSchools");
      // Optional toast
      // showToast("Compare list cleared due to category change", "info");
    }
  }, [state.category_id, state.sub_category_id]);

  // const handleClick = async (e, list) => {
  //   e.preventDefault(); 
  //   try {
  //     await logUserAction("user", "Click on View Listing", "Explore Page", list?.PartnerMaster_id);
  //   } catch (error) {
  //     console.error("Error logging partner click:", error);
  //   }

  //   // Navigate manually after logging
  //   navigate(`/partner/${list.slug}`);
  // };

  // ✅ Validates a proper 10-digit Indian mobile number (not starting with 0)
  const validateIndianNumber = (num) => {
    const cleaned = String(num).trim();
    const regex = /^[6-9]\d{9}$/; // must start with 6-9 and be 10 digits
    return regex.test(cleaned);
  };

  console.log("state.filtered_Listing", state.filtered_Listing)
  return (
    <>
      <Card>
        <div className="listings-wrapper">

          <div className="school-grid min-h-[14rem] grid grid-cols-1 md:grid-cols-3 gap-4">
            {!cityId ? (
              <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border border-gray-200 shadow-sm p-3 w-full col-span-3">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Please select a city first
                </h2>
                <p className="text-gray-500 text-sm">Choose a city to view listings near you.</p>
              </div>
            ) : state.isLoading ? (
              <div className="flex items-center justify-center h-64 col-span-3">
                <Loading />
              </div>
            ) : state.filtered_Listing.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border border-gray-200 shadow-sm p-3 w-full col-span-3">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  No listings found
                </h2>
                <p className="text-gray-500 text-sm">Try changing your filters or selecting another city.</p>
              </div>
            ) : (
              state.filtered_Listing.map((list) => {
                const distance =
  list?.Latitude && list?.longitute && userLat && userLon
    ? calculateDistance(userLat, userLon, list.Latitude, list.longitute)
    : null;
     return ( 
                <div className="school-card" key={list.PartnerMaster_id}>
                  <div className="school-image-container">
                    <img
                      src={
                        list?.logo
                          ? `${BASE_URL}${list.logo}`
                          : "/img/logo/Kidvik_Final_logo01.jpg.png"
                      }
                      alt={list.listing_name}
                      className="school-image"
                    />
                    <span
                      className="status-badge d-flex align-items-center gap-1 px-2 py-1 rounded"

                    >
                      {list?.subscription_type?.SubscriptionType_name}
                    </span>
                  </div>

                  <div className="school-content">
                    <NavLink to={`/partner/${list.slug}`}
                      onClick={(e) => handleClick(e, list)}
                    >
                      <h5 className="school-name">{list.listing_name}</h5>
                      <p className="school-location d-flex align-items-center gap-1 m-0">
                        <FaHome className="text-danger" title="home" />
                        {list?.area?.Location_name || "Unknown Area"},{" "}
                        {list?.city?.City_name || "Unknown City"}
                      </p>
                    </NavLink>
                    {/* <p>{calculateDistance(userLat, userLon, list?.Latitude, list?.longitute)} km away</p> */}

                    <p className="school-distance d-flex align-items-center gap-1 m-0">
                      {distance ? (
                        <>
                          <FaMapMarkerAlt className="text-danger" /> {distance} km away
                        </>
                      ) : (
                        "Distance not available"
                      )}
                    </p>
                    {/* <div className="school-info-grid">   */}
                    <div>Type:<strong> {list?.sub_category?.name}</strong></div>
                    {/* <div><strong>Board:</strong> CBSE</div>
                    <div><strong>Ratio:</strong> 24:1</div> */}
                    {/* </div> */}
                    <div className="d-flex align-items-center  justify-content-between">

                      <div className="d-flex align-items-center gap-1">
                        <button className=" btn-sm btn-success d-flex align-items-center gap-2">
                          <FaStar /> {list?.average_rating || "0.0"}
                        </button>
                        <span className="ms-1">{list?.total_reviews || 0} reviews</span>
                      </div>

                      <NavLink to={`/partner/${list.slug}`} onClick={(e) => handleClick(e, list)}>
                        <FaEye size={20} color="#42b682" title="View Details" />
                      </NavLink>
                    </div>

                    <div className="school-actions d-flex flex-wrap align-items-center gap-1">
                      <label className="d-flex align-items-center gap-2">
                        <input
                          type="checkbox"
                          className="compare-checkbox mt-lg-2 mt-md-2"
                          checked={compareList.includes(list.PartnerMaster_id)}
                          onChange={() => handleCompareToggle(list.PartnerMaster_id)}
                        />
                        Compare
                      </label>

                      {list.geo_location && (
                        <NavLink
                          to={list.geo_location}
                          onClick={(e) => handleClick(e, list)}
                          target="_blank"
                        >
                          <button className="icon-btn" title="View on Map">
                            <FaMapMarkerAlt size={20} />
                          </button>
                        </NavLink>
                      )}

                      {list.website && (
                        <a href={list.website} target="_blank" rel="noopener noreferrer">
                          <button className="icon-btn" title="Visit Website">
                            <FaGlobe size={20} />
                          </button>
                        </a>
                      )}

                      {list.list_mobno && (
                        <a href={`tel:${list.list_mobno}`}>
                          <button className="icon-btn" title="Call Now">
                            <FaPhoneAlt size={20} />
                          </button>
                        </a>
                      )}

                      {validateIndianNumber(list.whats_up) && (
                        <a
                          href={`https://wa.me/91${list.whats_up}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button className="icon-btn " title="Chat on WhatsApp">
                            <FaWhatsapp size={20} />
                          </button>
                        </a>
                      )}
                    </div>



                  </div>
                </div>
     )
          })
            )}
          </div>



        </div>
      </Card>


      {selectedSchools.length > 0 && (
        <>
          <Overlay open={hover} onMouseLeave={() => setHover(false)} />
          <CompareBar>
            <div
              className="compare-box"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <Link to={`/compare/?ids=${selectedSchools.map(s => s.PartnerMaster_id).join(",")}`}

              >
                <button className="compare-btn">
                  COMPARE <span > {selectedSchools.length}</span>
                </button>
              </Link>

              {hover && (
                <div className="schools-tooltip">
                  <div className="schools">
                    {selectedSchools.map((school) => (
                      <div
                        className="school-card-mini"
                        key={school.PartnerMaster_id}
                      >
                        <div className="img-wrap">
                          <img
                            src={
                              school?.logo
                                ? `${BASE_URL}${school.logo}`
                                : "/img/logo/Kidvik_Final_logo01.jpg.png"
                            }
                            alt={school.listing_name}
                          />
                          <button
                            className="remove"
                            onClick={() => removeSchool(school.PartnerMaster_id)}
                          >
                            ✕
                          </button>
                        </div>
                        <p className="name">{school.listing_name}</p>
                        <p className="location">
                          {school?.area?.Location_name || "Unknown Area"},{" "}
                          {school?.city?.City_name || "Unknown City"}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="actions">
                    <button className="clear" onClick={clearAll}>
                      Clear All
                    </button>
                    {/* <Link to={`/compare/?ids=${selectedSchools.map(s => s.PartnerMaster_id).join(",")}`}>
                      <button className="compare-btn" >
                        COMPARE <span > {selectedSchools.length}</span>
                      </button>
                    </Link> */}
                  </div>
                </div>
              )}
            </div>
          </CompareBar>
        </>
      )}


    </>
  );
}

export default Search_page_card;
const Card = styled.section`
 .listings-wrapper {
    background: #f9fafb; /* Light gray section bg */
    border: 1px solid #e5e7eb; /* Subtle gray border */
    border-radius: 12px;
    //  padding: 2rem;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
    //  margin: 1rem 0;
  }
  .school-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    padding: 0.5rem;
    justify-items: center;
  }

  /* Responsive Breakpoints */
  @media (max-width: 992px) {
    .school-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 576px) {
    .school-grid {
      grid-template-columns: 1fr;
    }
  }

  .school-card {
    width: 100%;
    max-width: 350px;
    background: #f5f7f2c0;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.07);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
  }

  .school-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  }

  .school-image-container {
    width: 100%;
    height: 150px;
    position: relative;
    overflow: hidden;
    display: inline-block;
  }

  .school-image {
    width: 100%;
    height: 100%;
      border-radius: 10px;
    object-fit: contain;
    background: #f9fafb;
  }

.status-badge {
  position: absolute;
  top: 0px;        /* distance from top */
  left: 0px;       /* stick to left edge */
  background-color: #42b682; /* red tone — change as needed */
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border-radius: 0 6px 6px px ;
  padding: 4px 8px;
  z-index: 2;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

  .school-content {
    padding: 0.7rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .school-name {
    font-size: 1.1rem;
    font-weight: 600;
    color: #1f2937;
    text-transform: capitalize;
  }

  .school-location {
    font-size: 0.9rem;
    color: #6b7280;
  }

  .school-info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 6px;
    font-size: 0.85rem;
    color: #374151;
    margin-top: 0.5rem;
  }

  .school-actions {
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

.school-actions {
  margin-top: 0.7rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  justify-content: space-between;
}

.icon-btn {
  background: #fff;
  border: 1px solid #8a8b8b93;
  color: #42b682;
  font-size: 0.9rem;
  border-radius: 10px;
  padding: 6px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 38px;
  height: 36px;
  transition: all 0.3s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

.icon-btn:hover {
  background: #42b682;
  color: #fff;
  transform: translateY(-2px);
}

.whatsapp-btn {
  border-color: #25d366;
  color: #25d366;
}

.whatsapp-btn:hover {
  background: #25d366;
  color: #fff;
}

.compare-checkbox {
  cursor: pointer;
  accent-color: #42b682;
  scale: 1.2;
}

`;



const slideIn = keyframes`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.5);
  z-index: 10000;
  display: ${({ open }) => (open ? "block" : "none")};
`;

const CompareBar = styled.div`
  position: fixed;
  bottom: 20px; right: 20px;
  z-index: 10001;

  .compare-box { position: relative; display: inline-block; }

  .compare-btn {
    background: #0056b3;
    color: #fff;
    border: none;
    padding: 10px 16px;
    border-radius: 6px;
    font-weight: bold;
    display: flex; align-items: center; gap: 6px;
  }
  .compare-btn span {
    background: #fff; color: #0056b3;
    font-weight: bold; padding: 2px 6px;
    border-radius: 50%; font-size: 12px;
  }

  .schools-tooltip {
    position: absolute; bottom: 45px; right: 0;
    background: #fff;
    border-radius: 10px;
    padding: 12px;
    min-width: 250px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: ${slideIn} 0.3s ease;
  }
  .schools { display: flex; gap: 12px; overflow-x: auto; }
  .school-card-mini {
    flex: 0 0 auto; width: 140px;
    background: #f8f9fa; border: 1px solid #eee;
    border-radius: 6px;
     padding: 6px; 
     font-size: 12px;
  }
  .img-wrap { position: relative; height: 70px; overflow: hidden; }
  .img-wrap img { width: 100%; height: 100%; object-fit: cover; }
  .remove {
    position: absolute; top: 4px; right: 4px;
    background: red; color: #fff;
    border-radius: 50%; font-size: 12px;
    width: 18px; height: 18px; border: none;
  }
  .actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 8px; }
  .clear { border: none; background: transparent; color: red; cursor: pointer; }
`;
