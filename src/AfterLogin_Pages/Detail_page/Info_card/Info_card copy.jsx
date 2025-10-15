import React from 'react'
import { motion } from "framer-motion";
import { FaStar, FaCalendarAlt, FaUserFriends, FaSchool, FaUsers, FaLanguage } from "react-icons/fa";

function Info_card() {
  return (
    <>
    <div className="info-cards-container">
   <div className="info-cards">
          {[
            { icon: <FaCalendarAlt />, label: "Established", value: "2005" },
            { icon: <FaUserFriends />, label: "Age Range", value: "2-6 years" },
            { icon: <FaSchool />, label: "School Type", value: "Montessori Preschool" },
            { icon: <FaUsers />, label: "Student-Teacher Ratio", value: "8:1" },
            { icon: <FaLanguage />, label: "Language", value: "English, Spanish" },
          ].map((card, index) => (
            <motion.div
              key={index}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.2 }}
            >
              <div className="icon">{card.icon}</div>
              <p className="label">{card.label}</p>
              <h3 className="value">{card.value}</h3>
            </motion.div>
          ))}
        </div>
        </div>
   {/* <div className="info-cards-container">
  <div className="info-cards">
    <div className="info-card">
      <div className="info-card-icon">
        <i className="fas fa-calendar-alt" />
      </div>
      <div className="info-card-label">Established</div>
      <div className="info-card-value">2005</div>
    </div>
    <div className="info-card">
      <div className="info-card-icon">
        <i className="fas fa-child" />
      </div>
      <div className="info-card-label">Age Range</div>
      <div className="info-card-value">2-6 years</div>
    </div>
    <div className="info-card">
      <div className="info-card-icon">
        <i className="fas fa-school" />
      </div>
      <div className="info-card-label">School Type</div>
      <div className="info-card-value">Montessori Preschool</div>
    </div>
    <div className="info-card">
      <div className="info-card-icon">
        <i className="fas fa-users" />
      </div>
      <div className="info-card-label">Student-Teacher Ratio</div>
      <div className="info-card-value">8:1</div>
    </div>
    <div className="info-card">
      <div className="info-card-icon">
        <i className="fas fa-language" />
      </div>
      <div className="info-card-label">Language</div>
      <div className="info-card-value">English, Spanish</div>
    </div>
  </div>
</div> */}

  
    
    </>
  )
}

export default Info_card
