import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Accordion, Card, Spinner } from "react-bootstrap";
import styled from "styled-components";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BASE_URL } from "../../Helper/Base_Url";
import { Loading } from "../../Helper/Loader";

function CompareListting() {
  const location = useLocation();
  const [schoolsData, setSchoolsData] = useState([]);
  const [groupData, setGroupData] = useState({});
  const [activeTab, setActiveTab] = useState("Academic");
  const [hideCommon, setHideCommon] = useState(false);
  const [selectedClass, setSelectedClass] = useState("Nursery");
  const [loading, setLoading] = useState(false);

  const pathnames = location.pathname.split("/").filter((x) => x);
  const params = new URLSearchParams(location.search);
  const idsParam = params.get("ids");
  const ids = idsParam ? idsParam.split(",") : [];

  useEffect(() => {
    const fetchCompareData = async () => {
      if (ids.length === 0) return;
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/partner_compare/${ids.join(",")}/`);
        const result = await res.json();

        if (result?.status) {
          setSchoolsData(result.data);
          setGroupData(result.group?.Education || {});
        }
      } catch (err) {
        console.error("Error fetching compare data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompareData();
  }, []);

  const filteredKeys = (keys) => {
    if (!hideCommon) return keys;
    return keys.filter((key) => {
      const values = schoolsData.map((s) => s[key]);
      return new Set(values).size > 1;
    });
  };

  const tabNames = Object.keys(groupData);

  return (
    <div className="my-2 container-fluid" style={{ background: "#eeebebdc" }}>
      {/* Breadcrumb */}
      <div className="container-fluid px-4 py-1">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0 me-auto">
            <li className="breadcrumb-item fs-5">
              <Link to="/">Home</Link>
            </li>
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
      </div>

      {/* Filter & School Cards */}
      <Container>
        {loading ? (
          <Loading />
        ) : (
          <CompareSection>
            <CompareBox>
              {/* <label className="small text-muted mb-1 d-block text-center">
                I am looking admission in class:
              </label> */}
              {/* <StyledSelect
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option>Nursery</option>
                <option>LKG</option>
                <option>UKG</option>
                <option>Class 1</option>
                <option>Class 2</option>
              </StyledSelect> */}

             <div className="form-check d-flex justify-content-center align-items-center mt-3">
  <input
    className="form-check-input me-2"
    type="checkbox"
    id="hideCommon"
    checked={hideCommon}
    onChange={(e) => setHideCommon(e.target.checked)}
  />
  <label className="form-check-label fw-semibold" htmlFor="hideCommon">
    Hide Common Values
  </label>
</div>

            </CompareBox>

            {/* School Cards */}
            {schoolsData.map((school, idx) => (
              <SchoolCard key={school.PartnerMaster_id}>
                <div
                  className="card-img p-3 text-center text-light d-flex flex-column justify-content-start"
                  style={{
                    position: "relative",
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.5)), url(${BASE_URL}${school.banner_img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "160px",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      color: "white",
                    }}
                  >
                    <h6 className="fw-bold mb-1">
                      {school.listing_name || "School Name"}
                    </h6>
                    {school.area && school.city && (
                      <p className="mb-0" style={{ fontSize: "0.9rem" }}>
                        <FaMapMarkerAlt className="me-1 text-warning" />
                        {school.area?.Location_name}, {school.city?.City_name}
                      </p>
                    )}
                  </div>
                  <NavLink to={`/partner/${school.slug}`}>
                    <button className="custom-btn-banner">View Details</button>
                  </NavLink>
                </div>
              </SchoolCard>
            ))}
          </CompareSection>
        )}
      </Container>

      {/* Tabs for Groups */}
   {!loading && tabNames.length > 0 && (
  <div className="mt-4">
    <Accordion flush alwaysOpen defaultActiveKey={tabNames.map((_, i) => i.toString())}>
      {tabNames.map((tab, index) => (
        <Card key={tab} className="mb-3 shadow-sm">
          <Accordion.Item eventKey={index.toString()}>
            <Accordion.Header>{tab}</Accordion.Header>
            <Accordion.Body>
              <div className="table-responsive text-center">
                <table className="table table-bordered table-striped align-middle mb-0">
                  <caption className="caption-top fw-bold fs-5 text-dark">
                    {tab} Details
                  </caption>
                  <tbody>
                    {filteredKeys(groupData[tab] || []).map((key) => {
                      if (["banner_img", "logo"].includes(key)) return null;
                      return (
                        <tr key={key}>
                          <td className="fw-semibold text-capitalize bg-light p-3">
                            {key}
                          </td>
                          {schoolsData.map((school) => (
                            <td key={school.PartnerMaster_id} className="p-3">
                              {String(school[key] || "—")}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Card>
      ))}
    </Accordion>
  </div>
)}

    </div>
  );
}

export default CompareListting;

// ---------------- Styled Components ----------------
const Container = styled.div`
  background-color: #f8fafc;
  border: 1px solid #d3d4d6c9;
  border-radius: 10px;
`;

const CompareSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  gap: 10px;
  justify-content: center;
  padding: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const CompareBox = styled.div`
  min-width: 260px;
  flex: 1;
  padding: 1rem;
  background: #fefefe;
  border: 1px solid #dee2e6;
  border-radius: 10px;
`;

const SchoolCard = styled.div`
  flex: 1;
  min-width: 260px;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  background: #fff;
  transition: transform 0.3s, box-shadow 0.3s;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  .custom-btn-banner {
    position: absolute;
    bottom: 10px;
    left: 10px;
    border-radius: 6px;
    background: #42b682;
    color: white;
    border: 1px solid #42b682;
    font-size: 1.2rem;
    padding: 6px 12px;
    transition: all 0.3s ease;
  }

  .custom-btn-banner:hover {
    background: white;
    color: #42b682;
    border: 1px solid white;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ced4da;
  font-weight: 600;
  background-color: #fff;
`;

const TabNav = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;

  button {
    border: 1px solid #ccc;
    background: #fff;
    padding: 6px 14px;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  button.active {
    background: #42b682;
    color: white;
    border-color: #42b682;
  }

  button:hover {
    background: #42b682;
    color: white;
  }
`;
