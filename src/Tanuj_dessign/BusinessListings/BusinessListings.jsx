import React ,{useState} from 'react';
import BusinessCard from '../BusinessCard/BusinessCard';
import styles from './BusinessListings.module.css';
import { FaFilter, FaTimes , FaSlidersH } from "react-icons/fa";
import { useAPI } from '../../Contaxt/ALL_APi_Call/API_Call_Contaxt';
import { useFilter } from '../../Contaxt/Filter_contaxt';
import Pagination from '../Pagination/Pagination';
import CategorySelector from '../CategorySelector/CategorySelector';
const BusinessListings = ({setShowFilter , showFilter}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 

  const {partners} = useAPI();
   const {filters} = useFilter();

  const filteredBusinesses = partners.filter((biz) => {
    let match = true;

    if (filters.category_id) {
      match = match && biz.category_id === filters.category_id;
    }
    if (filters.sub_category_id) {
      match = match && biz.sub_category_id === filters.sub_category_id;
    }

    if (filters.sub_category_Detail_id) {
      match = match && biz.sub_category_detail_id === filters.sub_category_Detail_id;
    }

    if (filters.search) {
    const searchTerm = filters.search.toLowerCase().trim();
    const keywords = searchTerm.split(" ").filter(Boolean);

    match =
      match &&
      keywords.every((keyword) =>
        (biz.listing_name && biz.listing_name.toLowerCase().includes(keyword)) ||
        (biz.Tag_Line && biz.Tag_Line.toLowerCase().includes(keyword)) ||
        (biz.description && biz.description.toLowerCase().includes(keyword))
      );
  }

    if (filters.rating > 0) {
      match = match && biz.rating >= filters.rating;
    }

    return match;
  });

   const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBusinesses = filteredBusinesses.slice(startIndex, startIndex + itemsPerPage);

console.log("partners",partners)
  return (
    <>
    <div className={styles.businessListings}>
      <div className={styles.listingHeader}>
           <button
  className="btn btn-primary mb-3 d-flex align-items-center gap-2"
  onClick={() => setShowFilter(!showFilter)}
>
  {showFilter ? (
    <>
     <FaSlidersH /> Close Filters
    </>
  ) : (
    <>
      <FaTimes /> Filter Options
    </>
  )}
</button>
        {/* <h2>Top Businesses Near You</h2> */}
        <div className={styles.sortOptions}>
          <span>Sort by:</span>
          <select>
            <option>Relevance</option>
            <option>Highest Rated</option>
            <option>Distance</option>
            <option>Most Reviewed</option>
          </select>
        </div>
      </div>
      
        {/* <CategorySelector  /> */}
      <div className={styles.listingGrid}>
        {currentBusinesses.map(business => (
          <BusinessCard key={business.id} business={business}  />
        ))}
      </div>
       <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage} />
    </div>
    
    
    </>
  );
};

export default BusinessListings;