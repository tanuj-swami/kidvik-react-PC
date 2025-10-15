// import React, { useState } from 'react';
// import styles from './FilterBar.module.css';
// import { FaStar, FaFilter, FaDollarSign, FaClock } from 'react-icons/fa';

// const FilterBar = () => {
//   const [priceRange, setPriceRange] = useState([false, false, false, false]);
//   const [rating, setRating] = useState(0);
//   const [openNow, setOpenNow] = useState(false);
//   const [showMoreFilters, setShowMoreFilters] = useState(false);
//   const [distance, setDistance] = useState(5);

//   const handlePriceToggle = (index) => {
//     const newPriceRange = [...priceRange];
//     newPriceRange[index] = !newPriceRange[index];
//     setPriceRange(newPriceRange);
//   };

//   const handleRatingClick = (value) => {
//     setRating(value === rating ? 0 : value);
//   };

//   const handleReset = () => {
//     setPriceRange([false, false, false, false]);
//     setRating(0);
//     setOpenNow(false);
//     setDistance(5);
//   };

//   return (
//     <div className={styles.filterBar}>
//       <div className={styles.filterSection}>
//         <h3>Filter Results</h3>

//         <div className={styles.filterGroup}>
//           <label>Category</label>
//           <select className={styles.select}>
//             <option>All Categories</option>
//             <option>Restaurants</option>
//             <option>Shopping</option>
//             <option>Health</option>
//             <option>Automotive</option>
//           </select>
//         </div>

//         <div className={styles.filterGroup}>
//           <label>Distance</label>
//           <div className={styles.sliderContainer}>
//             <input
//               type="range"
//               min="1"
//               max="50"
//               value={distance}
//               onChange={(e) => setDistance(e.target.value)}
//               className={styles.slider}
//             />
//             <span>{distance} miles</span>
//           </div>
//         </div>

//         <div className={styles.filterGroup}>
//           <label>Price Range</label>
//           <div className={styles.priceToggle}>
//             {priceRange.map((selected, index) => (
//               <button
//                 key={index}
//                 className={`${styles.priceButton} ${selected ? styles.selected : ''}`}
//                 onClick={() => handlePriceToggle(index)}
//               >
//                 {'$'.repeat(index + 1)}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className={styles.filterGroup}>
//           <label>Rating</label>
//           <div className={styles.starRating}>
//             {[1, 2, 3, 4, 5].map((value) => (
//               <FaStar
//                 key={value}
//                 className={`${styles.star} ${value <= rating ? styles.active : ''}`}
//                 onClick={() => handleRatingClick(value)}
//               />
//             ))}
//           </div>
//         </div>

//         <div className={styles.filterGroup}>
//           <label className={styles.toggleLabel}>
//             <div className={styles.toggleSwitch}>
//               <input
//                 type="checkbox"
//                 checked={openNow}
//                 onChange={() => setOpenNow(!openNow)}
//               />
//               <span className={styles.slider}></span>
//             </div>
//             <span>Open Now</span>
//           </label>
//         </div>

//         <div className={styles.filterActions}>
//           <button 
//             className={styles.moreFilters} 
//             onClick={() => setShowMoreFilters(!showMoreFilters)}
//           >
//             <FaFilter /> {showMoreFilters ? 'Less Filters' : 'More Filters'}
//           </button>

//           {showMoreFilters && (
//             <div className={styles.expandedFilters}>
//               <div className={styles.filterGroup}>
//                 <label>Features</label>
//                 <div className={styles.checkboxGroup}>
//                   <label>
//                     <input type="checkbox" /> Free WiFi
//                   </label>
//                   <label>
//                     <input type="checkbox" /> Parking
//                   </label>
//                   <label>
//                     <input type="checkbox" /> Delivery
//                   </label>
//                   <label>
//                     <input type="checkbox" /> Takeout
import React, { useState, useEffect } from 'react';
import styles from '../FilterBar/Filterbar.module.css';
import { FaStar, FaFilter, FaDollarSign, FaClock } from 'react-icons/fa';
import { useAPI } from '../../Contaxt/ALL_APi_Call/API_Call_Contaxt';
import FilterableSelect from '../../Helper/FilterableSelect';
import { useFilter } from '../../Contaxt/Filter_contaxt';

const FilterBar = () => {
  const { filters, updateFilter } = useFilter();
  const { dropdowenCategories, dropdowensubcategory, fetchSubcategories , fetchSubcategoriesdetail  , dropdowensubcategorydetail } = useAPI();



  const [priceRange, setPriceRange] = useState([false, false, false, false]);
  const [rating, setRating] = useState(0);
  const [openNow, setOpenNow] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [distance, setDistance] = useState(5);
  const handlePriceToggle = (index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = !newPriceRange[index];
    setPriceRange(newPriceRange);
  };

  const handleRatingClick = (value) => {
    setRating(value === rating ? 0 : value);
  };

  const handleReset = () => {
    setPriceRange([false, false, false, false]);
    setRating(0);
    setOpenNow(false);
    setDistance(5);
  };


  // useEffect(() => {
  //   if (filters.category_id) {
  //     fetchSubcategories(filters.category_id);
  //     updateFilter("sub_category_id", ""); 
  //   }
  // }, [filters.category_id]);


  useEffect(() => {
    if (filters.sub_category_id) {
      fetchSubcategoriesdetail(filters.sub_category_id);
      updateFilter("sub_category_Detail_id", ""); 
    }
  }, [filters.sub_category_id]);


  return (
    <div className={styles.filterBar}>
      <div className={styles.filterSection}>
        <h3>Filter Results  < FaFilter/></h3>

        <div className={styles.filterGroup}>

         <FilterableSelect
  label="Category"
  name="category_id"
  value={filters.category_id}
  onChange={(e) => updateFilter(e.target.name, e.target.value)}
  placeholder="Filter on category"
  options={dropdowenCategories}
/>

<FilterableSelect
  label="Sub Category"
  name="sub_category_id"
  value={filters.sub_category_id}
  onChange={(e) => updateFilter(e.target.name, e.target.value)}
  placeholder="Filter on subcategory"
  options={dropdowensubcategory}
/>
       </div>


         {
          filters.category_id === 6 &&(
           <>
        <div className={styles.filterGroup}>
          <FilterableSelect
            label="Sub Category Detail"
            name="sub_category_Detail_id"
            value={filters.sub_category_Detail_id}
            onChange={(e) => updateFilter(e.target.name, e.target.value)}
            placeholder="Filter on subcategory Detail"
            options={dropdowensubcategorydetail}
          />
        </div>
            </>
          )
         }



        {/* <div className={styles.filterGroup}>
          <label>Distance</label>
          <div className={styles.sliderContainer}>
            <input
              type="range"
              min="1"
              max="50"
              value={distance}
              onChange={(e) => setDistance(parseInt(e.target.value))}
              className={styles.slider}
            />
            <span>{distance} miles</span>
          </div>
        </div> */}

        {/* <div className={styles.filterGroup}>
          <label>Price Range</label>
          <div className={styles.priceToggle}>
            {priceRange.map((selected, index) => (
              <button
                key={index}
                className={`${styles.priceButton} ${selected ? styles.selected : ''}`}
                onClick={() => handlePriceToggle(index)}
              >
                {'$'.repeat(index + 1)}
              </button>
            ))}
          </div>
        </div> */}

        {/* <div className={styles.filterGroup}>
          <label>Rating</label>
          <div className={styles.starRating}>
            {[1, 2, 3, 4, 5].map((value) => (
              <FaStar
                key={value}
                className={`${styles.star} ${value <= rating ? styles.active : ''}`}
                onClick={() => handleRatingClick(value)}
              />
            ))}
          </div>
        </div> */}

        {/* <div className={styles.filterGroup}>
          <label className={styles.toggleLabel}>
            <div className={styles.toggleSwitch}>
              <input
                type="checkbox"
                checked={openNow}
                onChange={() => setOpenNow(!openNow)}
              />
              <span className={styles.slider}></span>
            </div>
            <span>Open Now</span>
          </label>
        </div> */}

        <div className={styles.filterActions}>
          <button
            className={styles.moreFilters}
            onClick={() => setShowMoreFilters(!showMoreFilters)}
          >
            <FaFilter /> {showMoreFilters ? 'Less Filters' : 'More Filters'}
          </button>

          {showMoreFilters && (
            <div className={styles.expandedFilters}>
              <div className={styles.filterGroup}>
                <label>Features</label>
                <div className={styles.checkboxGroup}>
                  <label>
                    <input type="checkbox" /> Free WiFi
                  </label>
                  <label>
                    <input type="checkbox" /> Parking
                  </label>
                  <label>
                    <input type="checkbox" /> Delivery
                  </label>
                  <label>
                    <input type="checkbox" /> Takeout
                  </label>
                  <label>
                    <input type="checkbox" /> Outdoor Seating
                  </label>
                  <label>
                    <input type="checkbox" /> Wheelchair Accessible
                  </label>
                </div>
              </div>

             
            </div>
          )}

          <div className={styles.buttonGroup}>
            <button className={styles.resetButton} onClick={handleReset}>
              Reset
            </button>
            <button className={styles.applyButton}>
              Apply Filters
            </button>
          </div>
        </div>


      </div>
    </div>
  );
};

export default FilterBar;
