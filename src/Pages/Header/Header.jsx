import React from 'react'
import TopHeader from './TopHeader'
import Navbar from './Navbar'
import WhatsappButton from '../../Helper/WhatsappButton'
import { ToastContainer } from "react-toastify";
function Header() {
  return (
   <>
   {/* bg-light-top */} 
   {/* {border-bottom} */}
  <div className="container-fluid p-0" data-wow-delay="0.1s" >
    <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    
<WhatsappButton/>
<TopHeader/>

<Navbar/>

</div>


   </>
  )
}

export default Header