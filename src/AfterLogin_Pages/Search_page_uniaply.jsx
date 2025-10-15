import React, { useState, useEffect } from 'react'
import "./Uniapply_design/Uniapply.css"
import { useAPI } from '../Contaxt/ALL_APi_Call/API_Call_Contaxt'
import { Link, useLocation } from 'react-router-dom';
import { Modal } from "react-bootstrap";

import CityLocationPicker from './Uniapply_design/SearchBar_City_option';
import styled from 'styled-components';
import { Use_Listing_Filter } from './Listing_contaxt/Listing_Contaxt';
import { Loading } from '../Helper/Loader';
import Filter_Listing from './Uniapply_design/Filter_Listing';
import { BASE_URL } from '../Helper/Base_Url';
import Search_page_card from './Uniapply_design/Search_page_card/Search_page_card';

function Search_page_uniaply() {
  const location = useLocation();
  const [activeCat, setActiveCat] = useState(null);
  const pathnames = location.pathname.split("/").filter((x) => x);
  const { state, category, loading, error, dispatch, subLoading } = Use_Listing_Filter();
  const category_id = location.state?.category_id || state.category_id;
  const sub_category_id = location.state?.sub_category_id || state.sub_category_id;
  const sub_category_detail = location.state?.sub_category_Detail_id || state.sub_category_detail_id;
  useEffect(() => {
    if (category_id && category_id !== "all") {
      setActiveCat(category_id);
      dispatch({ type: "SET_CATEGORY", payload: category_id });
    }
    if (sub_category_id && sub_category_id !== "all") {
      dispatch({
        type: "SET_FILTER",
        payload: { name: "sub_category_id", value: sub_category_id },
      });
    }
    if (sub_category_detail && sub_category_detail !== "all") {
      dispatch({
        type: "SET_FILTER",
        payload: { name: "sub_category_detail_id", value: sub_category_detail },
      });
    }
  }, [category_id, sub_category_id, sub_category_detail]);

  // 🟢 2️⃣ Default fallback when user came directly (no NavLink)
  useEffect(() => {
    if (!location.state && category.length > 0 && !activeCat) {
      const defaultCategory = category[0];
      setActiveCat(defaultCategory.id);
      dispatch({ type: "SET_CATEGORY", payload: defaultCategory.id });
    }
  }, [category, location.state]);

  // 🟢 3️⃣ Auto-select first subcategory when category changes and sub_category not set
  useEffect(() => {
    if (
      state.sub_category.length > 0 &&
      (!state.sub_category_id || state.sub_category_id === "all")
    ) {
      const firstSub = state.sub_category[0];
      dispatch({
        type: "SET_FILTER",
        payload: { name: "sub_category_id", value: firstSub.value },
      });
    }
  }, [state.sub_category]);


  // 🟢 After your first useEffect that sets category_id and sub_category_id
  useEffect(() => {
    if (
      state.sub_category.length > 0 &&
      sub_category_id &&
      sub_category_id !== "all"
    ) {
      dispatch({
        type: "SET_FILTER",
        payload: { name: "sub_category_id", value: sub_category_id },
      });
    }
  }, [state.sub_category, sub_category_id]);

  return (
    <>
      <Wrapper>
        <div className="container-fluid px-4  category-bar">
          {error && (
            <div className="alert alert-danger text-center" role="alert">
              ❌ Failed to load categories. Please try again.
            </div>
          )}

          <ul className="nav justify-content-center">
            {
              loading ? <Loading /> : (
                category.map((cat, index) => (
                  <li className="nav-item fs-4" key={index}>
                    <Link
                      className={`nav-link ${activeCat === cat.id ? "active" : ""}`}
                      onClick={() => {
                        setActiveCat(cat.id);
                        dispatch({ type: "SET_CATEGORY", payload: cat.id });
                      }}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))
              )
            }
          </ul>
        </div>
      </Wrapper>


      {/* <div className="container-fluid px-4 py-1">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0 me-auto">
            <li className="breadcrumb-item fs-5 "><Link to="/">Home </Link></li>
            
            {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <li
              key={name}
              className="breadcrumb-item active fs-5 text-capitalize"
              aria-current="page"
            >
              {name.replace(/-/g, " ")}
            </li>
          ) : (
            <li key={name} className="breadcrumb-item fs-5 text-capitalize">
              <Link to={routeTo}>{name.replace(/-/g, " ")}</Link>
            </li>
          );
        })}
          </ol>
        </nav>
      </div> */}

      <div className="container-fluid px-4 mt-1">
        <div className="row">
          {/* Left Sidebar - Filters */}

          <Filter_Listing />

          {/* Main Content Area */}
          <div className="col-lg-9 col-md-8">

            <div className="results-header d-flex justify-content-between align-items-center mb-2">

              <div className="d-flex align-items-center">
                {/* <h4 className="page-title mb-0">List of Schools in Pune</h4> */}
                <h4 className="page-title mb-0">
                  List of{" "}
                  {state.sub_category_id !== "all"
                    ? state.sub_category.find(sc => sc.value === state.sub_category_id)?.label || "Category"
                    : state.category_id !== "all"
                      ? category.find(c => c.id === state.category_id)?.name
                      : "Schools"}
                </h4>


                {/* <span className="results-count ms-3">773 Schools</span> */}
                <Result>
                  <span className="results-count ms-3">
                    <span className="badge bg-secondary">
                      {state.filtered_Listing.length}{" "}
                      {state.sub_category_id !== "all"
                        ? state.sub_category.find(sc => sc.value === state.sub_category_id)?.label || "Schools"
                        : state.category_id !== "all"
                          ? category.find(c => c.id === state.category_id)?.name
                          : "Schools"}{" "}
                      found
                    </span>
                  </span>
                </Result>
              </div>
              {/* Sort Dropdown */}
              <div className="sort-dropdown">
                <select className="form-select" id="sortBy">
                  <option value="relevance">Sort By: Relevance</option>
                  <option value="name">Name</option>
                  <option value="fee">Fee</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            {/* School Type Filters */}

           <div className="school-type-filters mb-4">
  {state.sub_category.map((sub) => (
    <button
      key={sub.value}
      className={`btn school-type-btn d-flex align-items-center gap-2 ${state.sub_category_id === sub.value ? "active" : ""}`}
      onClick={() =>
        dispatch({
          type: "SET_FILTER",
          payload: { name: "sub_category_id", value: sub.value },
        })
      }
    >
      <i className="fas fa-check me-1" />
      {sub.img && <img src={`${BASE_URL}${sub.img}`} alt={sub.label} style={{ height: "24px", width: "24px", objectFit: "contain" }} />}
      <span>{sub.label}</span>
    </button>
  ))}
</div>
            <Search_page_card  showcard={false}/>
          </div>


        </div>
      </div>


    </>
  )
}


const Wrapper = styled.section`
.category-bar .nav-link {
  position: relative;
  color: #333;
  padding-bottom: 6px;
  transition: color 0.2s;
  white-space: nowrap; 
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
}

.category-bar .nav-link:hover {
  color: var(--bs-primary);
}

.category-bar .nav-link:hover::after {
  width: 100%;
}

.category-bar .nav-link.active {
  color: var(--bs-primary);
}

.category-bar .nav-link.active::after {
  width: 100%;
}

/* ✅ Mobile responsive scrollable category bar */
@media (max-width: 768px) {
  .category-bar {
    overflow-x: auto;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
     scrollbar-width: none;
  }

  .category-bar::-webkit-scrollbar {
    display: none; /* Hide scrollbar in Chrome/Safari */
  }

  .category-bar .nav {
    flex-wrap: nowrap;
    justify-content: flex-start !important;
    gap: 12px;
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

const Result = styled.div`
.results-count .badge {
  border-radius: 12px;
  padding: 4px 10px;
  font-size: 0.875rem;
}

`


export default Search_page_uniaply
