import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaUserCircle } from "react-icons/fa";

function Review({ singledetail }) {
  const reviews = singledetail?.partner_reviews_rating || [];

  if (reviews.length === 0) {
    return (
      <div className="review-section container py-4">
        <h2 className="text-primary mb-3 d-flex align-items-center">
          <FaStar className="me-2" /> Reviews
        </h2>
        <p>No reviews available.</p>
      </div>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    const numericRating = parseFloat(rating);
    for (let i = 1; i <= 5; i++) {
      if (numericRating >= i) {
        stars.push(<FaStar key={i} className="text-warning me-1" />);
      } else if (numericRating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-warning me-1" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-warning me-1" />);
      }
    }
    return stars;
  };

  return (
    <div className="review-section">
      <h2 className="text-primary mb-2 d-flex align-items-center">
        <FaStar className="me-2" /> Reviews
      </h2>
              <hr className="mb-3 p-0" />


      {reviews.map((review) => (
        <div key={review.id} className="card mb-3 shadow-sm review-card">
          <div className="card-body">
            {/* Responsive row */}
            <div className="row align-items-start">
              {/* User info */}
              <div className="col-12 col-md-8 d-flex align-items-center mb-2 mb-md-0">
                <FaUserCircle className="me-2 text-secondary" size={35} />
                <div>
                  <strong>{review.user?.user?.username || "Anonymous"}</strong>
                  <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                    {new Date(review.create_date).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Rating stars */}
              <div className="col-12 col-md-4 d-flex align-items-center">
                <span className="me-2 fw-bold">{review.rating}</span>
                <div>{renderStars(review.rating)}</div>
              </div>
            </div>

            {/* Review text */}
            <div className="mt-2">
              <p className="text-secondary mb-0">{review.review}</p>
            </div>
          </div>
        </div>
      ))}

      <style jsx>{`
        .review-card {
          border-radius: 0.75rem;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .review-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
}

export default Review;
