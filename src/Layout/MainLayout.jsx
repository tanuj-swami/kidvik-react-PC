import React from 'react'
import Header from '../Pages/Header/Header'
import { Outlet ,useLocation, } from "react-router-dom";
import Footer from '../Pages/Footer/Footer';
function MainLayout() {
    const location = useLocation();
const hideLayoutRoutes = ["/partnersignup"]; // add more paths if needed

  if (hideLayoutRoutes.includes(location.pathname)) {
    return <Outlet />; 
  }
  return (
    <>

    <Header/> 

    <Outlet/>

    <Footer/>
    {/* </div> */}
    {/* <CopyRight/> */}
    
    </>
  )
}

export default MainLayout