import React from 'react';
import StarRating from '../StarRating/Star_Rating';

const BusinessCard = ({ business }) => {
  const renderPriceLevel = (level) => {
    return Array(level)
      .fill('$')
      .join('');
  };



  return (
    <div className="business-card">
      <div className="business-image">
        <img src={business.image} alt={business.name} />
      </div>
      <div className="business-content">
        <h3 className="business-name">{business.name}</h3>
        <div className="business-meta">
          <StarRating rating={business.rating} />
          <span className="business-distance">{business.distance}</span>
          <span className="business-type">{business.type}</span>
        </div>
        <div className="business-features">
          {business.features.map((feature, index) => (
            <span key={index} className="feature-tag">{feature}</span>
          ))}
        </div>
        <p className="business-description">{business.description}</p>
        <div className="business-price">
          <span className="price-level">
            {renderPriceLevel(business.priceLevel)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;

