import React from 'react';
import styled from "styled-components";
import { useAPI } from "../../Contaxt/ALL_APi_Call/API_Call_Contaxt";
import { BASE_URL, bgcolor } from "../../Helper/Base_Url";
import { Link } from 'react-router-dom';

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

function SubCategory({selectedCategory , ref}) {
  const { subcategories, subcatlaoding } = useAPI();

  if (subcatlaoding) return <p>Loading...</p>;

  // Group subcategories by category
  const categoriesMap = {};
  subcategories.forEach(sub => {
    const catName = sub.category?.name || "Uncategorized";
    if (!categoriesMap[catName]) {
      categoriesMap[catName] = [];
    }
    categoriesMap[catName].push(sub);
  });

  return (
    <div className="py-5" style={{background: bgcolor}}>
      <div className='container' >

     
      {Object.keys(categoriesMap).map((categoryName, idx) => (
        // (!selectedCategory || selectedCategory === categoryName) && (
        <CategoryWrapper key={idx}>
          <CategoryTitle >{categoryName}</CategoryTitle>
          <CardWrapper>
            {categoriesMap[categoryName].map((subcat) => (
             <Link
              to="/explore"
               state={{
                    category_id: subcat?.category_id ,
                    sub_category_id: subcat?.id
                  }}
             >
              <Card key={subcat.id} >
                <img src={`${BASE_URL}${subcat.icon_img}`} alt={subcat.name} />
                <h6>{subcat.name}</h6>
              </Card>

             </Link>
              
            ))}
          </CardWrapper>
        </CategoryWrapper>
        // )
      ))}
       </div>
    </div>
  );
}

export default SubCategory;
