import React from 'react'
import Header from './Header/Header'
import Banner from './Banner/Banner'
import About from './About/About'
import Services from './Services/Services'
import Kidvik_programe from './Kidvik_Program/Kidvik_programe'
import Kidvik_Event from './Kidvik_Event/Kidvik_Event'
import Blog from './Blog/Blog'
import Testimonials from './Testimonials/Testimonials'
import Footer from './Footer/Footer_copy'
import Contact_us from '../Routers/Contact_us/Contact_us'
import Comprehensive_Services from './Comprehensive Services/Comprehensive_Services'
import Simple_Process from './Simple Process/Simple_Process'
import MobileAppSection from './MobileAppSection/MobileAppSection'
import Categories from './Category_section/Category_section'
import What_Drives_Us from './What Drives Us/What_Drives_Us'
import Partners from './Partner/Partner'
import Trending_are from './Trending_are/Trending_are'
import Compresive from './Comprehensive Services/Compresive'
import Partner_with_us from '../Createpartner/Partner_with_us'

function Home() {
  return (
    <>
    <Banner/>
    <About/>
     <What_Drives_Us showCards={false}/>
    <MobileAppSection/>
    {/* <Comprehensive_Services/> */}
    <Compresive/>
    <Trending_are/>
    <Blog/>
    {/* <Testimonials/> */}
   
    <Simple_Process/>
    {/* <Partner_with_us/> */}
    <Partners/>
    {/* <Services/> */}
    {/* <Kidvik_programe/> */}
    {/* <Kidvik_Event/> */}
    
   
   

    </>
  )
}

export default Home