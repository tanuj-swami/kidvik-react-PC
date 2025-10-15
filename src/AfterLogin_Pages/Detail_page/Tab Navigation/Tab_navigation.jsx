import React from "react";
import { 
  FaHome, FaMapMarkerAlt, FaBuilding, FaPhoneAlt, FaStar, 
  FaUserTie, FaGlobe, FaClock, FaHospital, FaBook, FaBell, FaRunning, FaShoppingCart ,
   FaFileAlt, FaRupeeSign , FaTicketAlt , FaListAlt  , FaDumbbell
} from "react-icons/fa";

function Tab_navigation({ activeTab, setActiveTab, singledetail }) {
  // Common tabs
  const commonTabs = [
    { name: "Overview", icon: <FaHome /> },
    { name: "Address", icon: <FaMapMarkerAlt /> },
    { name: "Facilities", icon: <FaBuilding /> },
    { name: "Contact", icon: <FaPhoneAlt /> },
    { name: "Reviews", icon: <FaStar /> },
    { name: "Team", icon: <FaUserTie /> },
    { name: "Social Link", icon: <FaGlobe /> },
    { name: "Timing", icon: <FaClock /> },
  ];

  // Function to get dynamic category tabs based on category id or name
  const getCategoryTabs = (category) => {
    if (!category) return [];

    const tabs = [];

    switch (category.name) {
      case "Education":
        tabs.push(
          { name: "Education Detail", icon: <FaBook /> },
          { name: "Education Admission Criteria", icon:  <FaFileAlt /> },
          { name: "Education Fee detail", icon:<FaRupeeSign /> }
        );
        break;

      case "Medical":
        tabs.push({ name: "Medical Detail", icon: <FaHospital /> });
        break;

      case "What's Poppin":
        tabs.push(
          { name: "Events", icon: <FaBell /> },
          { name: "Event Tickets & Schedule", icon: <FaTicketAlt /> }
        );
        break;

      case "Recreational Activities":
        tabs.push(
          { name: "Activity Overview", icon: <FaListAlt  /> },
          { name: "Recreational Programs", icon: <FaDumbbell /> }
        );
        break;



      case "Kids Essential":
        tabs.push(
          { name: "Kids Essential Detail", icon: <FaShoppingCart /> }
        );
        break;

      default:
        tabs.push({ name: `${category.name} Detail`, icon: null });
    }

    return tabs;
  };

  // Get dynamic category tabs
  const categoryTabs = getCategoryTabs(singledetail?.category);

  // Merge common and category-specific tabs
  const tabs = [...commonTabs, ...categoryTabs];

  return (
    <div className="tabs ">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`tab ${activeTab === tab.name ? "active" : ""}`}
          onClick={() => setActiveTab(tab.name)}
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "0.5rem",
            marginBottom: "0.5rem",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            cursor: "pointer",
            background: activeTab === tab.name ? "#42B682" : "#f1f1f1",
            color: activeTab === tab.name ? "#fff" : "#000",
            transition: "all 0.3s",
          }}
        >
          {tab.icon && <span style={{ marginRight: "0.5rem" }}>{tab.icon}</span>}
          {tab.name}
        </div>
      ))}
    </div>
  );
}

export default Tab_navigation;
