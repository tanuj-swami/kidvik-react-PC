import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../Helper/Base_Url";
import ListingCard from "../../Cards/Listing_Card";
import { Container, Row, Col, Spinner } from "react-bootstrap";

function Listing_Detail() {
  const { slug } = useParams();
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchDataById(slug);
    }
  }, [slug]);

  const fetchDataById = async (slug) => {
    setLoading(true); // start loader
    try {
      const res = await fetch(`${BASE_URL}/partner_all/?sub_category_slug=${slug}`);
      const data = await res.json();
      console.log("API Response:", data);

      if (res.ok) {
        setDetail(data || []);
      }
    } catch (error) {
      console.error("Error fetching Listing data:", error);
    } finally {
      setLoading(false); // stop loader
    }
  };

  console.log("Slug:", slug);
  console.log("Detail:", detail);

  return (
    <Container fluid className="py-5" style={{ backgroundColor: "var(--bs-bg-color)" }}>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
          <Spinner animation="border" variant="primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row className="g-4">
          {detail.length > 0 ? (
            detail.map((item) => (
              <Col key={item.PartnerMaster_id} xs={12} sm={6} lg={4}>
                <ListingCard item={item} />
              </Col>
            ))
          ) : (
            <p className="text-center">No listings found.</p>
          )}
        </Row>
      )}
    </Container>
  );
}

export default Listing_Detail;
