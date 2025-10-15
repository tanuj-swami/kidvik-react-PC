// src/Context/FilterContext.js
import React, { createContext, useState, useContext } from "react";

const FilterContext = createContext();

const initialFilterState = {
  category_id: "",
  sub_category_id: "",
  sub_category_Detail_id:"",
  search: "",
  priceRange: [0, 1000],
  rating: 0,
};

export const FilterProvider = ({ children }) => {
  const [filters , setFilters] = useState(initialFilterState);
  const updateFilter = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

console.log("sub_category_id",filters.sub_category_id)

  const resetFilters = () => {
    setFilters(initialFilterState);
  };

  // console.log(filters.category_id);

  return (
    <FilterContext.Provider value={{ filters , updateFilter , resetFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
