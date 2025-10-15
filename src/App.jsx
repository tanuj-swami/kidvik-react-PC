import React, { Suspense, lazy, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import LoadingSpinner from "./Componenet/LoadingSpinner";
import Login from "./Componenet/Auth/Login";
import Entry_screen from "./AfterLogin_Pages/Entry_screen";
import Profile from "./AfterLogin_Pages/Profile/Profile";
import Partner_approved from "./Partner_Approved_screen/Partner_approved";
import Listing_Detail from "./Componenet/Listing_show_on_UI/Listing_Detail";

import Globel_detail from "./Componenet/Screen/Detail_Category/Globel_detail";
import { Search_page } from "./Search_Page/Search_Pages";
import Search_controler from "./Tanuj_dessign/Search_controler";
import Previwe from "./AfterLogin_Pages/Detail_page/Previwe";
import CompareListting from "./AfterLogin_Pages/Uniapply_design/compare_listting";
import ScrollToTop from "./Helper/ScrollToTop";
import Comparepage from "./AfterLogin_Pages/Uniapply_design/Comare_page/Comapare_page";
import Create_partner from "./Createpartner/Create_partner";
const Search_page_uniaply = lazy(() => import("./AfterLogin_Pages/Search_page_uniaply"));

// Lazy load pages
const Home = lazy(() => import("./Pages/Home"));
const AboutMore = lazy(() => import("./Routers/About_more"));
const ServicesMore = lazy(() => import("./Routers/Services/Services_more"));
const KidvikProgramMore = lazy(() => import("./Routers/Kidvik_program/Kidvik_program_more"));
const KidvikEventMore = lazy(() => import("./Routers/Kidvik_event_more/Kidvik_event_more"));
const KidvikBlogMore = lazy(() => import("./Routers/Kidvik_Blog_more/Kidvik_blog_more"));
const KidvikTestimonialMore = lazy(() => import("./Routers/kidvik_Testimonial/Kidvik_testimonial_more"));
const Contact_us = lazy(() => import("./Routers/Contact_us/Contact_us"));
const NotFound = lazy(() => import("./Pages/Not_Found"));
const ProtectedRoute = lazy(() => import("./Layout/Private_Route"))
const Single_Page_Listing = lazy(() => import("./AfterLogin_Pages/Uniapply_design/single_Page_listing/single_Page_listing"));




const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
       <ScrollToTop />
        <MainLayout />

      </>
    ),

    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <AboutMore /> },
      { path: "service", element: <ServicesMore /> },
      { path: "program", element: <KidvikProgramMore /> },
      { path: "event", element: <KidvikEventMore /> },
      { path: "blog", element: <KidvikBlogMore /> },
      { path: "testimonial", element: <KidvikTestimonialMore /> },
      { path: "contact-us", element: <Contact_us /> },
      { path: "*", element: <NotFound /> },
      { path: "login", element: <Login /> },
      { path: "Search_Page", element: <Search_page /> },
      { path: "Listing_Detail/:slug", element: <Listing_Detail /> },
      { path: "detail_Listing/:slug", element: <Single_Page_Listing /> },
      { path: "subcategory/:slug", element: <Globel_detail /> },
      { path: "compare", element: <CompareListting /> },
      { path: "partner-signup", element: <Create_partner /> },
      { path: "partnersignup", element: <Create_partner /> },
      // { path: "compare", element: <Comparepage /> },
      {
        path: "park_listing",
        element: (
          <ProtectedRoute requirePartner={true}>
            <Entry_screen />
          </ProtectedRoute>
        ),
      },

      {
        path: "park_listing/:slug/",
        element: (
          <ProtectedRoute requirePartner={true}>
            <Entry_screen />
          </ProtectedRoute>
        ),
      },


      {
        path: "Profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },

      {
        path: "listing_approved",
        element: (
          <ProtectedRoute requirePartner allowedCodes={["AD"]}>
            <Partner_approved />
          </ProtectedRoute>
        ),
      },
      {
        path: "Detail/:slug",
        element: (
            <Search_controler />
        ),
      },
      {
        path: "explore",
        element: (
          <Search_page_uniaply />
        ),
      },

      {
        path: "partner/:slug",
        element: (
            <Previwe />
        ),
      },


    ],
  },
]);

export default function App() {

  useEffect(() => {
    // Dynamically load external JS
    var script = document.createElement("script");
    script.src = "/js/main.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
