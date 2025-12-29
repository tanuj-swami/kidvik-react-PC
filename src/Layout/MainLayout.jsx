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
    <div className="d-flex flex-column min-vh-100">
    <Header/> 
  <main className="flex-fill">
    <Outlet/>
</main>
    <Footer/>
    </div>
    {/* </div> */}
    {/* <CopyRight/> */}
    
    </>
  )
}

export default MainLayout