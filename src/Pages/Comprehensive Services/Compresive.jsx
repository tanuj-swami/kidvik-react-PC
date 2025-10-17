import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useAPI } from "../../Contaxt/ALL_APi_Call/API_Call_Contaxt";
import { BASE_URL, bgcolor } from "../../Helper/Base_Url";
import SubCategory from "./SubCategory";
import { Use_Listing_Filter } from "../../AfterLogin_Pages/Listing_contaxt/Listing_Contaxt";
import { Loading } from "../../Helper/Loader";
import { Link } from "react-router-dom";

const CategoryWrapper = styled.div`
  margin-top: 2rem;
`;

const CategoryTitle = styled.h4`
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #4caf5080;
  border-radius: 12px;
  width: 160px;
  height: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
    border-color: #4caf50;
  }

  img {
    max-width: 80px;
    max-height: 80px;
    margin-bottom: 0.8rem;
    object-fit: contain;
  }

  h6 {
    margin-top: 0.5rem;
    font-weight: 600;
    font-size: 1rem;
    color: #333;
    word-wrap: break-word;
  }
`;

function Compresive() {
  const { category, loading } = Use_Listing_Filter();
  const subCategoryRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(null);


  const handleCategoryClick = (catName) => {
    setSelectedCategory(catName);
    // Scroll to SubCategory
    subCategoryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <>

      <div className="py-4" style={{background: bgcolor}}>
        <div className="container">

        
        <CategoryTitle>Explore Categories</CategoryTitle>

        <CardWrapper>

          {
            loading ? (<> <Loading /> </>) : (
              category.map((cat) => (
                <Link to={`/explore`}
                  state={{
                    category_id: cat.id ,
                  }}
                >
                  <Card key={cat?.id} onClick={() => handleCategoryClick(cat.name)} >
                    <img src={`${BASE_URL}${cat.icon_img}`} alt={cat.name} />
                    <h6>{cat.name}</h6>
                  </Card>
                </Link>

              )))}
        </CardWrapper>
      </div>
      <SubCategory ref={subCategoryRef} selectedCategory={selectedCategory} />
      </div>

    </>
  );
}

export default Compresive;
