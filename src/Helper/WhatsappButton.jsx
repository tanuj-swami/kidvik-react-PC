import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "../Helper/Whatsapp_Button.css";
import { CONTACT_INFO } from "./Mobile_Number";
import { logUserAction } from "./logUserAction";
import { useLogin } from "../Contaxt/Login_Contaxt";
import { NavLink } from "react-router-dom";

function WhatsappButton() {
  const { topbarData } = useLogin();

const handleClick = async (e) => {
  e.preventDefault(); 
  try {
    await logUserAction("user", "WhatsApp Click", "Home Page");
  } catch (error) {
    console.error("Error logging user action:", error);
  }

  // Ensure number has country code
  let phoneNumber = topbarData?.topbar_phoneno || "";
  
  // If it doesn't start with '91', prepend it
  if (!phoneNumber.startsWith("91")) {
    phoneNumber = `91${phoneNumber}`;
  }

  // Open WhatsApp link
  window.open(`https://wa.me/${phoneNumber}`, "_blank");
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

    <NavLink
      to={`https://wa.me/${topbarData?.topbar_phoneno}`}
      onClick={handleClick}
      className="whatsapp-button"
    >
      <FaWhatsapp size={30} />
    </NavLink>
  );
}

export default WhatsappButton;
