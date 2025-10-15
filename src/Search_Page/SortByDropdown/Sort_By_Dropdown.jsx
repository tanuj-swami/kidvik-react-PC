import React from 'react';

const SortByDropdown = ({ value, onChange }) => {
  return (
    <div className="sort-dropdown">
      <label>Sort by:</label>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="relevance">Relevance</option>
        <option value="rating">Rating</option>
        <option value="distance">Distance</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SortByDropdown;