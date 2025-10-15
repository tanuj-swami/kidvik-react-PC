import React, { createContext, useContext, useState , useEffect } from "react";
import { BASE_URL } from "../Helper/Base_Url";
import { showToast } from "../Helper/toastService";

// Create context
const LoginContext = createContext();

// Provider component


export const LoginProvider = ({ children }) => {
  const [auth , setAuth] = useState({
    accessToken: null,
    refreshToken: null,
    userId: null,
    username: null,
  });
    const [topbarData, setTopbarData] = useState([]);
 
   useEffect(() => {
    const storedAuth = {
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken"),
      userId: localStorage.getItem("userId"),
      username: localStorage.getItem("username"),
    };

    if (storedAuth.accessToken) {
      setAuth(storedAuth);
    }
  }, []);
  

  useEffect(() => {
    const fetchTopbarData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/topbar`); 
        const json = await res.json();
        if (json?.data) {
          setTopbarData(json?.data?.[0]);
        }
      } catch (error) {
        console.error('Error fetching topbar data:', error);
      }
    };
    fetchTopbarData();
  }, []);

   const login = (data) => {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("username", data.username);

    setAuth(data); 
  };


 useEffect(() => {
    const storedAuth = {
      accessToken: localStorage.getItem("accessToken"),
      refreshToken: localStorage.getItem("refreshToken"),
      userId: localStorage.getItem("userId"),
      username: localStorage.getItem("username"),
    };

    if (storedAuth.accessToken) {
      setAuth(storedAuth);
    }
  }, []);

  // inside LoginProvider
const logout = async () => {

  try {
    const response = await fetch(`${BASE_URL}/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.accessToken}`,
      },
      body: JSON.stringify({
        refresh: auth.refreshToken,
      }),
    });
       const data = await response.json();
    if (response.ok) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");

      // Clear state
      setAuth({
        accessToken: null,
        refreshToken: null,
        userId: null,
        username: null,
      });
        showToast(data.message || "success"); 
    } else {
      // const errorData = await response.json();
    localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");

      // Clear state
      setAuth({
        accessToken: null,
        refreshToken: null,
        userId: null,
        username: null,
      });
        showToast('Log Out Successfully' || "success"); 
      
    }
  } catch (error) {
    console.error("Logout failed", error);
    // alert("Something went wrong while logging out!");
   showToast(error || "Submission failed", "error");    

  }
};






  // const logout = () => {
  //   setUser(null);
  //   setToken(null);
  // };

  return (
    <LoginContext.Provider value={{ login , auth , logout , topbarData, setTopbarData }}>
      {children}
    </LoginContext.Provider>
  );
};

// Custom hook for easy use
export const useLogin = () => useContext(LoginContext);
