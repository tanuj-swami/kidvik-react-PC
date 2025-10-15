import React, { useState } from 'react'
import SearchBar from './Search_Bar/Search_Bar'
import FilterPanel from './Filter_Panal/Filter_Panel'
import BusinessCard from './BusinessCard/Business_Card'
import SortByDropdown from './SortByDropdown/Sort_By_Dropdown'
import Pagination from './Pagination/Pagination'
import ViewToggle from './ViewToggle/View_Toggle'
import "./Search_page_style/Search_page.css"

 export function Search_page() {
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('relevance');

  // Sample business data - you can expand this to an array for multiple cards
  const businesses = [
    {
      id: 1,
      name: "Cafe Mocha",
      image: "/img/about.jpg",
      rating: 4.5,
      distance: "2 km",
      type: "Cafe",
      features: ["Free WiFi", "Outdoor Seating", "Pet Friendly"],
      description: "A cozy cafe serving freshly brewed coffee and snacks.",
      priceLevel: 2, // $$
    },
    
  ];

  return (
    <div className="search-page">
      <SearchBar />   
      <main className="main-content">
        <div className="container">
          <div className="content-wrapper">
            {/* Sidebar with filters */}
            <aside className="sidebar">
              <FilterPanel />
            </aside>
            
            {/* Results section */}
            <div className="results-container">
              {/* Results header with count, sort, and view toggle */}
              <div className="results-header">
                <div className="results-count">
                  <h2>Results ({businesses.length})</h2>
                </div>
                <div className="results-controls">
                  <SortByDropdown value={sortBy} onChange={setSortBy} />
                  <ViewToggle value={viewMode} onChange={setViewMode} />
                </div>
              </div>
              
              {/* Results grid/list */}
              <div className={`results-grid ${viewMode}`}>
                {businesses.map(business => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
              
              {/* Pagination */}
              <Pagination 
                currentPage={currentPage} 
                totalPages={5} 
                onPageChange={setCurrentPage} 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}