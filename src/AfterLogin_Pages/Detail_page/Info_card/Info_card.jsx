import React from 'react'
import { motion } from "framer-motion";
import { 
  FaCalendarAlt, FaChild, FaSchool, FaUsers, FaLanguage, FaHospital, FaBook,
   FaStar, FaBell, FaDumbbell,FaUserFriends, FaShoppingCart , FaUserTie,FaMapMarkerAlt
} from "react-icons/fa";
function Info_card({singledetail}) {
   if (!singledetail?.category) return null;

       const categoryName = singledetail.category.name;


        const categoryFields = {
    "Education": [
      { label: "Year of Establishment", value: singledetail?.institute_detail[0]?.Year_of_Establishment , icon: <FaCalendarAlt /> },
      { label: "No Of Academic Staf", value:singledetail?.institute_detail[0]?.No_Of_Academic_Staf, icon: <FaChild /> },
      { label: "School Type", value:singledetail?.institute_detail[0]?.Institute_Category?.InstituteCategory_name, icon: <FaSchool /> },
      { label: "Student-Teacher Ratio", value: singledetail?.institute_detail[0]?.Faculty_Ratio, icon: <FaUsers /> },
      { label: "Language of Instruction ", value: singledetail?.institute_detail[0]?.Language_of_Instruction?.LOI_name, icon: <FaLanguage /> },

    ],
    "Medical": [
      { label: "No. of Doctors", value: singledetail?.medical_detail[0]?.No_of_doctors, icon: <FaHospital /> },
      { label: "Service Names ", value: singledetail?.medical_service[0]?.service_name?.name, icon: <FaUserTie /> },
      { label: "Specialization", value: singledetail?.medical_detail[0]?.specialization?.Specialization_name, icon: <FaStar /> },
      { label: "Availability of Service", value: singledetail?.medical_detail[0]?.Availability_of_doctors, icon: <FaStar /> },
      { label: "Mode of Appointment ", value: singledetail?.medical_detail[0]?.Mode_of_appointment, icon: <FaStar /> },
    ],
    "Recreational Activities": [

      { label: "Year Of Establishment", value: singledetail?.recreational_detail[0]?.Year_of_Establishment || "-", icon: <FaStar /> },
      { label: "Ownership ", value: singledetail?.recreational_detail[0]?.Ownership?.Ownership_name || "-", icon: <FaDumbbell /> },
      { label: "Co Ed Status Name", value: singledetail?.recreational_detail[0]?.Co_Ed_Status?.Co_Ed_Status_name || "-", icon: <FaCalendarAlt /> },
      { label: "Skill Level", value: singledetail?.recreational_detail[0]?.Skill_Level?.name || "-", icon: <FaChild /> },
      { label: "Indoor Outdoor", value: singledetail?.recreational_detail[0]?.Indoor_Outdoor || "-", icon: <FaChild /> },
    ],


    "What's Poppin": [
      { label: "Venue", value: singledetail?.event_detail[0]?.Venue || "-", icon: <FaBell /> },
      { label: "Expected Audience", value:singledetail?.event_detail[0]?.Expected_Audience || "-", icon: <FaMapMarkerAlt /> },
      { label: "Audience Age Group", value: singledetail?.event_detail[0]?.Audience_AgeGroup?.name || "-", icon: <FaStar /> },
      { label: "Start Date", value: singledetail?.event_detail[0]?.Start_Date || "-", icon: <FaUsers /> },
      { label: "End Date", value: singledetail?.event_detail[0]?.End_Date || "-", icon: <FaUsers /> },
    ],
    "Kids Essential": [
      { label: "Brand ", value: singledetail.kidsessentials_detail[0]?.brand?.name || "-", icon: <FaShoppingCart /> },
      { label: "Item Name", value: singledetail.kidsessentials_detail[0]?.Item_Name  || "-", icon: <FaStar /> },
      { label: "Price", value: singledetail.kidsessentials_detail[0]?.Price || "-", icon: <FaBook /> },
      { label: "Age Group", value: singledetail.kidsessentials_detail[0]?.AgeGroup?.name || "-", icon: <FaStar /> },
      { label: "Item Type ", value: singledetail.kidsessentials_detail[0]?.Item_Type || "-", icon: <FaStar /> },
    ],
  };
  const fieldsToShow = categoryFields[categoryName] || [];

  return (
    <>
    <div className="info-cards-container">
   <div className="info-cards">
         {fieldsToShow.map((card, index) => (
            <div className='info-card' key={index}>
              <div className="info-card-icon">
                     {card.icon}
              </div>
              <div className="info-card-label">{card.label}</div>
              <div className="info-card-value">{card.value}</div>
            </div>
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
