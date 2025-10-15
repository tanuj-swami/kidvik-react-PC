import React, { useState } from 'react';
import styles from './BusinessCard.module.css';
import { FaStar, FaMapMarkerAlt, FaCheck } from 'react-icons/fa';
import { BASE_URL } from '../../Helper/Base_Url';
import ButtonLoading from '../../Helper/ButtonLoading';
import { Loading } from '../../Helper/Loader';
import { useAPI } from '../../Contaxt/ALL_APi_Call/API_Call_Contaxt';
import { Link } from 'react-router-dom';

const BusinessCard = ({ business  }) => {
  const [isHovered, setIsHovered] = useState(false);
  const {loading} = useAPI();

  // const renderStars = (rating) => {
  //   const stars = [];
  //   for (let i = 1; i <= 5; i++) {
  //     if (i <= Math.floor(rating)) {
  //       stars.push(<FaStar key={i} className={styles.starFilled} />);
  //     } else if (i - 0.5 <= rating) {
  //       stars.push(<FaStar key={i} className={styles.starHalf} />);
  //     } else {
  //       stars.push(<FaStar key={i} className={styles.starEmpty} />);
  //     }
  //   }
  //   return stars;
  // };


  console.log("business",business)
  return (
    <>
      {loading ? (
        <>
        <Loading/>
        </>
      ): (
    <div 
      className={`${styles.businessCard} ${isHovered ? styles.hovered : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.imageContainer}>
        <img src={ business?.logo ? `${BASE_URL}${business?.logo}` : "/img/logo/Kidvik_Final_logo01.jpg.png"} alt={business?.listing_name} />
      </div>
      
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3>{business?.listing_name}</h3>
            <p className={styles.tagline}>
      {business?.Tag_Line || "Your trusted partner for quality services"}  
    </p>
          {/* {business.verified && (
            <span className={styles.verifiedBadge}>
              <FaCheck /> Verified
            </span>
          )} */}
        </div>
       
        

     <div className={styles.categoryTag}>
  <img
    src={`${BASE_URL}${business?.category?.icon_img}`}
    alt={business?.category?.name}
    className={styles.categoryIcon}
  />
  <span>{business?.category?.name}</span>
</div>

<div className={`d-flex justify-content-between gap-2`}>
  {business?.sub_category && (
    <div className={styles.subCategoryTag}>
      <span>{business?.sub_category?.name}</span>
    </div>
  )}

  {business?.category?.name === "Recreational Activities" &&
    business?.sub_category_detail?.name && (
      <div className={styles.subCategoryTag}>
        <span>{business?.sub_category_detail?.name}</span>
      </div>
  )}
</div>




        
        <div className={styles.rating}>
          {/* <div className={styles.stars}>
            {

              business?.partner_reviews_rating.map((reviwe)=>(
                <>
                
                {renderStars(reviwe.rating)}
                
                </>
              ))
            }
          </div> */}
          {/* <span className={styles.ratingText}>
            {reviwe.rating} ({business.reviewCount} reviews)
          </span> */}


        </div>
        
        <div className={styles.location}>
          <FaMapMarkerAlt />
          <span>{business.city?.City_name}</span>
        </div>
        
        {/* <div className={styles.features}>
          {business?.partner_facility.map((feature, index) => (
            <span key={index} className={styles.feature}>
              {feature?.facility?.facility}
            </span>
          ))}
        </div> */}
        
        <Link to={`/partner/${business?.slug === "" || null ? business?.PartnerMaster_id : business?.slug }`}>
        <button className='btn btn-primary'>
          
              View Details
        </button>
        </Link>
      </div>

      
    </div>
      )}
    
    </>
  );
};

export default BusinessCard;