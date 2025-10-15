import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import {
    FaPhoneAlt,
    FaWhatsapp,
    FaGlobe,
    FaMapMarkerAlt,
    FaHeart,
    FaClock,
    FaStar,
    FaHome
} from "react-icons/fa";
import { BASE_URL } from "../Helper/Base_Url";
import "../AfterLogin_Pages/Listing_Card.css";
import renderStars from "../Helper/Render_Star";

function ListingCard({ item }) {
    const reviews = item?.partner_reviews_rating || [];
const averageRating =
  reviews.length > 0
    ? reviews.reduce((sum, r) => sum + parseFloat(r.rating), 0) / reviews.length
    : 0;

    return (
        <Card className="listing-card shadow-sm mb-4 h-100 border-0">
  {/* Image Section */}
  <div className="image-container position-relative">
    <Card.Img
      variant="top"
      src={item.logo ? `${BASE_URL}${item.logo}` : "/img/logo/Kidvik_Final_logo01.jpg.png"}
      alt={item.listing_name}
      className="card-img-top"
    />
    {/* Favourite Heart */}
    {/* <Badge bg="light" text="danger" className="heart-badge d-flex align-items-center">
      <FaHeart className="me-1" /> 10
    </Badge> */}
  </div>

  {/* Card Body */}
  <Card.Body className="p-3">
   <Card.Title className="fw-semibold text-dark mb-3 fs-5">
  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2">
    
    {/* Listing Name */}
    <span className="text-truncate">{item.listing_name}</span>

    {/* Rating */}
    <div className="d-flex align-items-center">
      {renderStars(averageRating)}
      <span className="ms-2 small text-muted">
        {averageRating.toFixed(1)} / 5
      </span>
      {reviews.length > 0 && (
        <span className="ms-2 small text-muted">
          ({reviews.length} reviews)
        </span>
      )}
    </div>
  </div>
</Card.Title>


    <Card.Subtitle className="text-muted mb-1 d-flex align-items-center small">
     <FaHome className="me-1 text-primary" />
{item.area?.Location_name}

    </Card.Subtitle>

    {/* Address */}
    <p className="text-muted small mb-3">      <FaMapMarkerAlt className="me-1 text-danger" />
 {item.state?.State_name} ,{item.city?.City_name}</p>

    {/* Action Buttons */}
    <div className="d-flex flex-wrap gap-2">
      {item?.person_mobile_number && (
        <Button
          variant="outline-success"
          size="sm"
          className="action-btn"
          as="a"
          href={`tel:${item?.person_mobile_number}`}
        >
          <FaPhoneAlt className="icon" />
          <span className="d-none d-sm-inline">Call</span>
        </Button>
      )}
      {item?.whats_up && (
        <Button
          variant="outline-success"
          size="sm"
          className="action-btn"
          as="a"
          target="_blank"
          href={`https://wa.me/${item?.whats_up}`}
        >
          <FaWhatsapp className="icon" />
          <span className="d-none d-sm-inline">WhatsApp</span>
        </Button>
      )}
      {item?.website && (
        <Button
          variant="outline-primary"
          size="sm"
          className="action-btn"
          as="a"
          target="_blank"
          href={item?.website.startsWith("http") ? item?.website : `https://${item?.website}`}
        >
          <FaGlobe className="icon" />
          <span className="d-none d-sm-inline">Website</span>
        </Button>
      )}
      {item?.geo_location && (
        <Button
          variant="outline-secondary"
          size="sm"
          className="action-btn"
          as="a"
          target="_blank"
          href={item?.geo_location}
        >
          <FaMapMarkerAlt className="icon" />
          <span className="d-none d-sm-inline">Map</span>
        </Button>
      )}
    </div>
  </Card.Body>
</Card>

    );
}

export default ListingCard;
