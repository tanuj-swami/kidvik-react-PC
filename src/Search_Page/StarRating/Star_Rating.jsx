import React from 'react';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return <span key={i} className="star full">★</span>;
        } else if (i === fullStars && hasHalfStar) {
          return <span key={i} className="star half">★</span>;
        } else {
          return <span key={i} className="star empty">☆</span>;
        }
      })}
      <span className="rating-value">{rating}</span>
    </div>
  );
};

export default StarRating;