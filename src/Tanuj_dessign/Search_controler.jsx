import React, { useEffect, useState } from 'react'
import FilterBar from './FilterBar/FilterBar'
import CategorySelector from "./CategorySelector/CategorySelector"
import BusinessListings from "./BusinessListings/BusinessListings"
import SearchBar from './Search_componenet/search_bar'
import { useFilter } from '../Contaxt/Filter_contaxt'
import { useParams, useLocation } from 'react-router-dom'
import { useAPI } from '../Contaxt/ALL_APi_Call/API_Call_Contaxt'

function Search_controler() {
  const [showFilter, setShowFilter] = useState(true);
  const { Getpartner_data , fetchSubcategories , fetchSubcategoriesdetail } = useAPI();
  const {updateFilter ,filters } = useFilter();
  const { slug} = useParams();
  const location = useLocation();
  const type = location.state?.type || "sub_category";

  const category_id = location.state?.category_id;
  const sub_category_id = location.state?.sub_category_id;
  const sub_category_Detail_id = location.state?.sub_category_Detail_id;


// Step 1: Set initial filters from location.state (only once)
useEffect(() => {
  if (category_id) updateFilter("category_id", category_id);
  if (sub_category_id) updateFilter("sub_category_id", sub_category_id);
  if (sub_category_Detail_id) updateFilter("sub_category_Detail_id", sub_category_Detail_id);
}, [category_id ,sub_category_id , sub_category_Detail_id]);


  useEffect(() => {
    if (slug) {
      Getpartner_data(slug, type);
    }
  }, [slug]);


  return (
    <>
      <div className="container main-content p-2 ">

        <SearchBar />
        <div className="content-layout">
          {showFilter && (
            <div className="sidebar">
              <FilterBar />
            </div>
          )}
          <div className="container bg-white border rounded-3 shadow-lg p-4  ">
            <CategorySelector />
            <BusinessListings setShowFilter={setShowFilter} showFilter={showFilter} />

          </div>
        </div>
        {/* <PromotionSection /> */}
      </div>

    </>
  )
}

export default Search_controler
