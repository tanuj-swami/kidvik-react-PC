import React from 'react';
import styles from './PromotionSection.module.css';
import { FaStore, FaChartLine, FaUsers } from 'react-icons/fa';

const PromotionSection = () => {
  return (
    <div className={styles.promotionSection}>
      <div className={styles.promotionContent}>
        <h2>Own a Business?</h2>
        <p>List your business on Yellow Pages and reach thousands of potential customers</p>
        
        <div className={styles.benefitCards}>
          <div className={styles.benefitCard}>
            <FaStore className={styles.benefitIcon} />
            <h3>Increase Visibility</h3>
            <p>Get discovered by customers searching for your services</p>
          </div>
          
          <div className={styles.benefitCard}>
            <FaChartLine className={styles.benefitIcon} />
            <h3>Grow Your Business</h3>
            <p>Access analytics and insights to optimize your listing</p>
          </div>
          
          <div className={styles.benefitCard}>
            <FaUsers className={styles.benefitIcon} />
            <h3>Build Reputation</h3>
            <p>Collect and showcase customer reviews and ratings</p>
          </div>
        </div>
        
        <button className={styles.listButton}>
          List Your Business
        </button>
      </div>
    </div>
  );
};

export default PromotionSection;