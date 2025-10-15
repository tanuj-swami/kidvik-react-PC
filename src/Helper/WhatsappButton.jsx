import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "../Helper/Whatsapp_Button.css";
import { CONTACT_INFO } from "./Mobile_Number";
import { logUserAction } from "./logUserAction";

function WhatsappButton() {

 const handleClick = async (e) => {
  e.preventDefault(); // stop default navigation first

  try {
    await logUserAction("user", "WhatsApp Click" , "Home Page");
  } catch (error) {
    console.error("Error logging user action:", error);
  }

  // Always open WhatsApp link, success or fail
  window.open(`https://wa.me/${CONTACT_INFO.whatsappNumber}`, "_blank");
};


  return (
    // <a
    //   href={`https://wa.me/${CONTACT_INFO.whatsappNumber}`} 
    //   target="_blank"
    //   rel="noopener noreferrer"
    //   className="whatsapp-button"
    // >
    //   <FaWhatsapp size={30} />
    // </a>

    <a
      href={`https://wa.me/${CONTACT_INFO.whatsappNumber}`}
      onClick={handleClick}
      className="whatsapp-button"
    >
      <FaWhatsapp size={30} />
    </a>
  );
}

export default WhatsappButton;
