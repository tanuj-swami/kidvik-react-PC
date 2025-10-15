import React, { useRef, useState ,useEffect} from 'react';
import styles from '../CategorySelector/CategorySelector.module.css';

import { FaUtensils, FaShoppingBag, FaHospital, FaCar, FaHome, FaBriefcase, FaGraduationCap, FaPlane } from 'react-icons/fa';
import { BASE_URL } from '../../Helper/Base_Url';
import { useAPI } from '../../Contaxt/ALL_APi_Call/API_Call_Contaxt';
import { useFilter } from '../../Contaxt/Filter_contaxt';

const CategorySelector = () => {
const {categories} = useAPI()
const scrollRef = useRef(null);
const {updateFilter} = useFilter();
  // const categories = [
  //   { name: 'Restaurants', icon: <FaUtensils /> },
  //   { name: 'Shopping', icon: <FaShoppingBag /> },
  //   { name: 'Health', icon: <FaHospital /> },
  //   { name: 'Automotive', icon: <FaCar /> },
  //   { name: 'Home Services', icon: <FaHome /> },
  //   { name: 'Professional', icon: <FaBriefcase /> },
  //   { name: 'Education', icon: <FaGraduationCap /> },
  //   { name: 'Travel', icon: <FaPlane /> }
  // ];
  



const scroll = (direction) => {
  if (scrollRef.current) {
    const scrollAmount = 150; // how much to scroll per click
    if (direction === "left") {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }
};
  
  return (
    <div className={styles.categoryContainer}>
      <h2 className={styles.sectionTitle}>Popular Categories</h2>
      
      <div className={styles.scrollContainer}>
 <button
    onClick={() => scroll("left")}
    className={`${styles.scrollButton} ${styles.scrollLeft}`}
    aria-label="Scroll left"
  >
      <i className="fa fa-angle-left"></i>
  </button>
        
        <div className={styles.categoriesScroll} ref={scrollRef}>
          {categories.map((category, index) => (
            <div key={index} className={styles.categoryItem} onClick={()=>
                    updateFilter("category_id", category.id)
            }>
              
              {/* <div className={styles.categoryIcon}>
                 {category.icon}
              </div> */}
              <div>
                <img src={`${BASE_URL}${category.img}`}  className={styles.categoryIcon}alt="" />
                </div>
              <span>{category.name}</span> 
            </div>
          ))}
        </div>
        
        <button
    onClick={() => scroll("right")}
    className={`${styles.scrollButton} ${styles.scrollRight}`}
    // className='slider_next'
    aria-label="Scroll right"
  >
       <i className="fa fa-angle-right"></i>
  </button>

   {/* <button onClick={onClick} className="slider_next">
    </button> */}

      </div>
    </div>
  );
};

export default CategorySelector;