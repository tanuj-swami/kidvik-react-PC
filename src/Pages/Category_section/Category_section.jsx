import React from "react";
import styled from "styled-components";
import { GraduationCap, Heart, Users, Palette, CheckCircle  } from "lucide-react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useAPI } from "../../Contaxt/ALL_APi_Call/API_Call_Contaxt";
import { BASE_URL } from "../../Helper/Base_Url";
// const categories = [
//   {
//     icon: GraduationCap,
//     title: "Schools",
//     bgColor: "#d1fae5", 
//     iconColor: "text-success",
//     checkColor: "bg-success"
//   },
//   {
//     icon: Heart,
//     title: "Hospitals",
//     bgColor: "#fee2e2", 
//     iconColor: "text-danger",
//     checkColor: "bg-danger"
//   },
//  {
//   icon: FaRegCalendarAlt,   
//   title: "Upcoming Events",
//   bgColor: "#fef3c7", // light orange/yellow (event vibe)
//   iconColor: "text-warning", // Bootstrap warning = orange
//   checkColor: "bg-warning"
// },

//   {
//     icon: Palette,
//     title: "Activities",
//     bgColor: "#d1fae5", // green-light
//     iconColor: "text-success",
//     checkColor: "bg-success"
//   }
// ];


// Styled component for hover effect and checkmark positioning


const CategoryCard = styled.div`
  position: relative;
  border-radius: 1rem;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  
  
  /* Light background based on props */
  background-color: ${(props) => props.bg || "#d1fae5"}; /* default green-light */

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }

  .checkmark {
    position: absolute;
    top: 0.40rem;
    right: 0.50rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  svg {
    transition: transform 0.3s;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;


const Categories = ({onCategoryClick ,  selectedCategory}) => {
  const  {fetchSubcategories , categories  ,} = useAPI();
  console.log("category_aman",categories)

return (
 <section id="categories">
      <div className="container ">
        {/* <div className="row g-4"> */}
       {categories.map((category, index) => {
  const isActive = selectedCategory === category.id;

  return (  // <-- important: return the JSX
    <div
      key={index}
      className="mb-3"
      onClick={() => onCategoryClick(category.id, fetchSubcategories)}
    >
      <CategoryCard
        bg={category.remark}
        className={`d-flex gap-3 align-items-center ${isActive ? "border border-primary" : ""}`}
      >
        <img
          src={`${BASE_URL}${category.icon_img}`}
          alt={category.name}
          style={{ height: "50px", width: "50px", objectFit: "contain" }}
        />
        <div>
        <p className="fw-semibold mb-0">{category.name}</p>
       
        </div>

        {isActive && (
          <div className="checkmark bg-success">
            <CheckCircle className="w-3 h-3" />
          </div>
        )}
      </CategoryCard>
    </div>
  );
})}

        {/* </div> */}
      </div>
    </section>
  );
};

export default Categories;
