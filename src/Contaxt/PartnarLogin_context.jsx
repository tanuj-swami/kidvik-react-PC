import React, { createContext, useContext, useState, useEffect } from "react";
import { showToast } from "../Helper/toastService";
import { BASE_URL } from "../Helper/Base_Url";

// Create context
const PartnerLoginContext = createContext();

// Provider component
export const PartnerLoginProvider = ({ children }) => {
  const [partnerAuth , setPartnerAuth] = useState({
    partnerAccess: null,
    partnerRefresh: null,
    partnerUsername: null,
    partnerEmail: null,
    user_id : null ,
    code:null, 
    userType : null,
    accesstypename : null,
    userTypename : null,
  });
 const [Loading , setlaoding ] = useState(false);
 const [Listingname , setListingname] = useState('Listing Name')
  const [partner_id , setpartner_id] = useState(() => {
  return localStorage.getItem("partner_id") || null;
});
  
  useEffect(() => {
    const storedAuth = {
      partnerAccess: localStorage.getItem("partner_access"),
      partnerRefresh: localStorage.getItem("partner_refresh"),
      partnerUsername: localStorage.getItem("partner_username"),
      partnerEmail: localStorage.getItem("partner_email"),
      user_id: localStorage.getItem("user_id"),
      code : localStorage.getItem("code"),
      userType: localStorage.getItem("userType"),
      accesstypename: localStorage.getItem("accesstypename"),
      userTypename: localStorage.getItem("userTypename"),
    };

    if (storedAuth.partnerAccess) {
      setPartnerAuth(storedAuth);
    }
  }, []);

  // Login function
  const partnerLogin = (data) => {
    localStorage.setItem("partner_access", data.access);
    localStorage.setItem("partner_refresh", data.refresh);
    localStorage.setItem("partner_email", data.email);
    localStorage.setItem("partner_username", data.username);
    localStorage.setItem("user_id", data.user_id);
    localStorage.setItem("code",data.code)
    localStorage.setItem("userType",data.userType)
    localStorage.setItem("accesstypename",data.accesstypename)
    localStorage.setItem("userTypename",data.userTypename)

    setPartnerAuth({
      partnerAccess: data.access,
      partnerRefresh: data.refresh,
      partnerUsername: data.username,
      partnerEmail: data.email,
      user_id : data.user_id,
      code : data.code,
      userType : data.userType,
     accesstypename : data.accesstypename,
      userTypename : data.userTypename,
    });
  };

  // Logout function (optional)

  // const partnerLogout = () => {
  //   localStorage.removeItem("partner_access");
  //   localStorage.removeItem("partner_refresh");
  //   localStorage.removeItem("partner_username");
  //   localStorage.removeItem("partner_email");

  //   setPartnerAuth({
  //     partnerAccess: null,
  //     partnerRefresh: null,
  //     partnerUsername: null,
  //     partnerEmail: null,
  //   });
  // };


  const partnerLogout = async () => {

 setlaoding(true);
   localStorage.removeItem("partner_id");
    try {
      const response = await fetch(`${BASE_URL}/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${partnerAuth.partnerAccess}`,
        },
        body: JSON.stringify({
          refresh: partnerAuth.partnerRefresh,
        }),
      });
         const data = await response.json();
      if (response.ok) {
        localStorage.removeItem("partner_access");
        localStorage.removeItem("partner_refresh");
        localStorage.removeItem("partner_username");
        localStorage.removeItem("partner_email");
        localStorage.removeItem("user_id");
        localStorage.removeItem("code");
        localStorage.removeItem("userType");
        localStorage.removeItem("accesstypename");
        localStorage.removeItem("userTypename");

      setPartnerAuth({
      partnerAccess: null,
      partnerRefresh: null,
      partnerUsername: null,
      partnerEmail: null,
      user_id:null,
      code:null,
      userType : null,
      accesstypename : null,
      userTypename : null,
    });
        showToast(data.message || "success"); 
        console.log("logout",data)

      } else {
        // const errorData = await response.json();
       showToast("Log Out Successfully", "success");

        localStorage.removeItem("partner_access");
        localStorage.removeItem("partner_refresh");
        localStorage.removeItem("partner_username");
        localStorage.removeItem("partner_email");
        localStorage.removeItem("user_id");  
        localStorage.removeItem("code"); 
        localStorage.removeItem("userType"); 
        localStorage.removeItem("accesstypename"); 
        localStorage.removeItem("userTypename"); 

      setPartnerAuth({
      partnerAccess: null,
      partnerRefresh: null,
      partnerUsername: null,
      partnerEmail: null,
      user_id:null,
      code : null , 
      userType : null,
      accesstypename : null,
      userTypename : null,
      
    });
      }

    } catch (error) {
      console.error("Logout failed", error);
      // alert("Something went wrong while logging out!");
     showToast(error || "Submission failed", "error");    
    }
    finally{
       setlaoding(false);

    }
  };
  return (
    <PartnerLoginContext.Provider value={{ partnerAuth , partnerLogin, partnerLogout  , partner_id , setpartner_id , Loading  , setListingname, Listingname}}>
          {children}
    </PartnerLoginContext.Provider>
  );
};

// Custom hook for easy usage
export const usePartnerLogin = () => useContext(PartnerLoginContext);
