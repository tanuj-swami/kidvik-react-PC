import React from "react";
import styled from "styled-components";
import { ChevronRight } from "lucide-react";
import ClassSelector from "./Class_Selecter";
import SchoolCard from "./School_Card";
// Styled Components for extra spacing/shadows
import ComparisonTable from "./Comparesion_Table";
import SearchBar from "./SearchBar";
const PageWrapper = styled.div`
  background-color: #f8f9fa; /* Bootstrap light bg */
  min-height: 100vh;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const BreadcrumbLink = styled.a`
  color: #0d6efd;
  &:hover {
    text-decoration: underline;
  }
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const Sidebar = styled.div`
  margin-bottom: 1.5rem;
`;

const Comparepage = () => {
  const school1Data = {
    ownership: "Private",
    format: "Day School",
    coEd: "Co-Education",
    admissionPartner: "Yes",
  };

  const school2Data = {
    ownership: "Private",
    format: "Play School",
    coEd: "Co-Education",
    admissionPartner: "Yes",
  };

  return (
    <PageWrapper className="container">
      {/* Breadcrumb */}
      <nav className="d-flex align-items-center mb-3 " aria-label="breadcrumb">
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
        <ChevronRight className="mx-2" size={16} />
        <span className="fw-medium text-dark">Compare Schools</span>
      </nav>

      {/* Page Title */}
      <PageTitle>Compare Schools</PageTitle>

      {/* Main Layout */}
      <div className="row">
        {/* Left Sidebar */}
        <div className="col-lg-3 col-12 mb-4">
          <Sidebar>
            <ClassSelector />
          </Sidebar>

          <div className="form-check">
            <check  id="hide-common"></check>
            <label
              htmlFor="hide-common"
              className="form-check-label ms-2"
            >
              Hide Common Values
            </label>
          </div>
        </div>

        {/* Center Content */}
        <div className="col-lg-6 col-12 mb-4">
          {/* School Cards */}
          <div className="d-flex flex-wrap gap-3 mb-4">
            <SchoolCard
              name="Manav Rachna International School"
              location="Sector 51, Gurugram"
            //   image={school1Image}
            />
            <SchoolCard
              name="Mother's Pride"
              location="Sector 57, Gurugram"
            //   image={school2Image}
            />
          </div>

          {/* Comparison Table */}
          <ComparisonTable school1={school1Data} school2={school2Data} />
        </div>

        {/* Right Sidebar */}
        <div className="col-lg-3 col-12 mb-4">
          <div className="sticky-top" style={{ top: "1rem" }}>
            <SearchBar />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Comparepage;
