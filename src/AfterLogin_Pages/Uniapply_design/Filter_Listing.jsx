import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Use_Listing_Filter } from "../Listing_contaxt/Listing_Contaxt";
import { Loading } from "../../Helper/Loader";
import { getUniqueWithAll } from "../../Helper/getUniqueWithAll";
import MultiSelectDropdown from "../../Helper/Multi-select_filter_dropdowen";

const Sidebar = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.07);
  border: 1px solid #eee;
  position: sticky;
  top: 100px;
  transition: all 0.3s ease;

  /* 🔹 FILTER TITLE BAR */
  .filters-title {
    font-weight: 600;
    font-size: 18px;
    border-bottom: 2px solid #eee;
    padding: 10px 0;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    i {
      transition: transform 0.3s ease;
    }
  }

  .filters-title.open i {
    transform: rotate(180deg);
  }

  /* 🔹 FILTER BODY ANIMATION */
  .filters-body {
    max-height: 1000px;
    opacity: 1;
    overflow: visible;
    transition: all 0.3s ease;
  }

  .filters-body.closed {
    max-height: 0;
    opacity: 0;
    margin: 0;
    padding: 0;
  }

  .filter-section {
    margin-bottom: 18px;
  }

  .filter-toggle {
    background: transparent;
    border: none;
    font-weight: 600;
    color: #333;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #0d6efd;
    }

    i {
      transition: transform 0.3s ease;
    }

    &.open i {
      transform: rotate(180deg);
    }
  }

  .filter-content {
    margin-top: 4px;
    max-height: 0;
    overflow: visible;
    opacity: 0;
    transition: all 0.3s ease;
  }

  .filter-content.open {
    max-height: 100px;
       opacity: 1;
    // padding-top: 8px;
  }

  /* 📱 MOBILE OPTIMIZATION */
  @media (max-width: 768px) {
    position: relative;
    top: auto;
    box-shadow: none;
    padding: 0; /* remove padding completely */

    .filters-title {
      margin: 5px;
      padding: 6px 8px;
      border-bottom: none;
      font-size: 14px;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      i {
        font-size: 16px;
      }
    }

    .filters-body {
      margin-top: 5px;
      border-radius: 10px;
      background: #fff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
      padding: 12px;
      transition: all 0.3s ease;
    }

    .filters-body.closed {
      max-height: 0;
      opacity: 0;
      margin: 0;
      padding: 0;
      box-shadow: none;
    }
  }
`;

function Filter_Listing() {
  const { updateFilter, cityname, LoadingArea, cityId, state } = Use_Listing_Filter();
  const [selectedAreas, setSelectedAreas] = useState(["All"]);
  const [selectedSubcat, setSelectedSubcat] = useState([]);
  const [area, setArea] = useState([]);
  const [Recreations, setRecreations] = useState([]);
  const [openFilters, setOpenFilters] = useState({
    sidebar: true,
    area: true,
    subcategory: true,
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleSection = (section) => {
    setOpenFilters((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) setOpenFilters((prev) => ({ ...prev, sidebar: false }));
  }, [isMobile]);

  useEffect(() => {
    if (state.Listing_Data?.length > 0) {
      const areaList = getUniqueWithAll(state.Listing_Data, "area.Location_name");
      setArea(areaList);

      const filteredForCategory6 = state.Listing_Data.filter(
        (item) => item.category_id === 6
      );
      const recreationalList = getUniqueWithAll(
        filteredForCategory6,
        "sub_category_detail.name"
      );
      setRecreations(recreationalList);
    }
  }, [state.Listing_Data]);

  return (
    <div className="col-lg-3 col-md-4">
      <Sidebar>
        {/* 🔽 Filter Title (Always Visible on Mobile) */}
        <div
          className={`filters-title ${openFilters.sidebar ? "open" : ""}`}
          onClick={() => toggleSection("sidebar")}
        >
          <span>
            <i className="fas fa-sliders-h text-primary me-2"></i> Filters
          </span>
          <i className="fas fa-chevron-down"></i>
        </div>

        {/* ✅ Filters Body */}
        <div
          className={`filters-body ${
            openFilters.sidebar ? "open" : "closed"
          }`}
        >
          {/* 🏙️ Area Filter */}
          <div className="filter-section">
            <button
              className={`filter-toggle ${openFilters.area ? "open" : ""}`}
              onClick={() => toggleSection("area")}
            >
              Area {cityname ? `in ${cityname}` : ""}
              <i className="fas fa-chevron-down" />
            </button>

            <div className={`filter-content ${openFilters.area ? "open" : ""}`}>
              {/* <div className="border rounded p-1"> */}
                {LoadingArea ? (
                  <div className="w-100 text-center py-3">
                    <Loading />
                    <p className="text-muted mt-2 mb-0">
                      Loading areas for {cityname || "selected city"}...
                    </p>
                  </div>
                ) : !cityId ? (
                  <div className="text-center py-3 text-muted">
                    <p className="fw-semibold mb-1">Please select a city first</p>
                    <small>Choose a city to view nearby listings.</small>
                  </div>
                ) : area.length === 0 ? (
                  <div className="text-center py-3 text-warning fw-semibold">
                    No areas available for {cityname}.
                  </div>
                ) : (
                  <MultiSelectDropdown
                    optionsList={area}
                    selectedValues={selectedAreas}
                    setSelectedValues={setSelectedAreas}
                    updateFilter={updateFilter}
                    filterName="area_id"
                    placeholder="Select area(s)"
                  />
                )}
              {/* </div> */}
            </div>
          </div>

          {/* 🧩 Subcategory Filter */}
          {state.category_id === 6 && Recreations?.length > 0 && (
            <div className="filter-section">
              <button
                className={`filter-toggle ${openFilters.subcategory ? "open" : ""}`}
                onClick={() => toggleSection("subcategory")}
              >
                Subcategory Details
                <i className="fas fa-chevron-down" />
              </button>

              <div
                className={`filter-content ${openFilters.subcategory ? "open" : ""}`}
              >
                <div className="border rounded p-3">
                  <MultiSelectDropdown
                    optionsList={Recreations}
                    selectedValues={selectedSubcat}
                    setSelectedValues={setSelectedSubcat}
                    updateFilter={updateFilter}
                    filterName="sub_category_detail_id"
                    placeholder="Select subcategory(s)"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </Sidebar>
    </div>
  );
}

export default Filter_Listing;
