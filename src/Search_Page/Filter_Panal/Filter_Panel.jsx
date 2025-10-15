import React, { useState } from 'react';

const FilterPanel = () => {
  const [priceRange, setPriceRange] = useState('');
  const [rating, setRating] = useState('');
  const [distance, setDistance] = useState(5);
  const [categories, setCategories] = useState({
    restaurants: false,
    coffeeShops: true,
    bars: false,
    retail: false,
    services: false
  });
  const [features, setFeatures] = useState({
    wifi: false,
    outdoorSeating: true,
    parking: false,
    delivery: false,
    takeout: false
  });

  const handleCategoryChange = (category) => {
    setCategories({
      ...categories,
      [category]: !categories[category]
    });
  };

  const handleFeatureChange = (feature) => {
    setFeatures({
      ...features,
      [feature]: !features[feature]
    });
  };

  const handleReset = () => {
    setPriceRange('');
    setRating('');
    setDistance(5);
    setCategories({
      restaurants: false,
      coffeeShops: false,
      bars: false,
      retail: false,
      services: false
    });
    setFeatures({
      wifi: false,
      outdoorSeating: false,
      parking: false,
      delivery: false,
      takeout: false
    });
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Filters</h3>
      </div>
      
      <div className="filter-section">
        <h4>Categories</h4>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={categories.restaurants}
              onChange={() => handleCategoryChange('restaurants')}
            />
            Restaurants
          </label>
          <label>
            <input
              type="checkbox"
              checked={categories.coffeeShops}
              onChange={() => handleCategoryChange('coffeeShops')}
            />
            Coffee Shops
          </label>
          <label>
            <input
              type="checkbox"
              checked={categories.bars}
              onChange={() => handleCategoryChange('bars')}
            />
            Bars
          </label>
          <label>
            <input
              type="checkbox"
              checked={categories.retail}
              onChange={() => handleCategoryChange('retail')}
            />
            Retail
          </label>
          <a href="#" className="show-more">Show more</a>
        </div>
      </div>
      
      <div className="filter-section">
        <h4>Features</h4>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={features.wifi}
              onChange={() => handleFeatureChange('wifi')}
            />
            Wifi
          </label>
          <label>
            <input
              type="checkbox"
              checked={features.outdoorSeating}
              onChange={() => handleFeatureChange('outdoorSeating')}
            />
            Outdoor Seating
          </label>
          <label>
            <input
              type="checkbox"
              checked={features.parking}
              onChange={() => handleFeatureChange('parking')}
            />
            Parking
          </label>
          <a href="#" className="show-more">Show more</a>
        </div>
      </div>
      
      <div className="filter-section">
        <h4>Price Range</h4>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="price"
              value="$"
              checked={priceRange === '$'}
              onChange={() => setPriceRange('$')}
            />
            $
          </label>
          <label>
            <input
              type="radio"
              name="price"
              value="$$"
              checked={priceRange === '$$'}
              onChange={() => setPriceRange('$$')}
            />
            $$
          </label>
          <label>
            <input
              type="radio"
              name="price"
              value="$$$"
              checked={priceRange === '$$$'}
              onChange={() => setPriceRange('$$$')}
            />
            $$$
          </label>
          <label>
            <input
              type="radio"
              name="price"
              value="$$$$"
              checked={priceRange === '$$$$'}
              onChange={() => setPriceRange('$$$$')}
            />
            $$$$
          </label>
        </div>
      </div>
      
      <div className="filter-section">
        <h4>Rating</h4>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="rating"
              value="4+"
              checked={rating === '4+'}
              onChange={() => setRating('4+')}
            />
            4+ Stars
          </label>
          <label>
            <input
              type="radio"
              name="rating"
              value="3+"
              checked={rating === '3+'}
              onChange={() => setRating('3+')}
            />
            3+ Stars
          </label>
          <label>
            <input
              type="radio"
              name="rating"
              value="2+"
              checked={rating === '2+'}
              onChange={() => setRating('2+')}
            />
            2+ Stars
          </label>
        </div>
      </div>
      
      <div className="filter-section">
        <h4>Distance</h4>
        <div className="slider-container">
          <input
            type="range"
            min="1"
            max="10"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="slider"
          />
          <div className="slider-value">{distance} miles</div>
        </div>
      </div>
      
      <div className="filter-actions">
        <button className="btn btn-primary">Apply Filters</button>
        <button className="btn btn-text" onClick={handleReset}>Reset All</button>
      </div>
    </div>
  );
};

export default FilterPanel;

