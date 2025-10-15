import React, { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', query, 'in', location);
  };

  return (
    <div className="search-bar-container ">
      <div className="container">
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-inputs">
            <div className="search-input">
              <input
                type="text"
                placeholder="Coffee Shops"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="search-input">
              <input
                type="text"
                placeholder="Downtown"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <div className="search-buttons">
            <button type="submit" className="btn btn-primary">Search</button>
            {/* <button type="button" className="btn btn-secondary">Save Search</button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;