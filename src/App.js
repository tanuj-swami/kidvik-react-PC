// import React, { Suspense, lazy, useEffect } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import MainLayout from "./Layout/MainLayout";
// import LoadingSpinner from "./Componenet/LoadingSpinner";
// import { useLogin } from "./Contaxt/Login_Contaxt";

// // Lazy load pages
// const Home = lazy(() => import("./Pages/Home"));
// const AboutMore = lazy(() => import("./Routers/About_more"));
// const ServicesMore = lazy(() => import("./Routers/Services/Services_more"));
// const KidvikProgramMore = lazy(() => import("./Routers/Kidvik_program/Kidvik_program_more"));
// const KidvikEventMore = lazy(() => import("./Routers/Kidvik_event_more/Kidvik_event_more"));
// const KidvikBlogMore = lazy(() => import("./Routers/Kidvik_Blog_more/Kidvik_blog_more"));
// const KidvikTestimonialMore = lazy(() => import("./Routers/kidvik_Testimonial/Kidvik_testimonial_more"));
// const Contact_us = lazy(() => import("./Routers/Contact_us/Contact_us"));
// const NotFound = lazy(() => import("./Pages/Not_Found"));
// const ProtectedRoute = lazy(() => import("./Layout/Private_Route"));
// const Login = lazy(() => import("./Componenet/Auth/Login"));
// const Profile = lazy(() => import("./AfterLogin_Pages/Profile/Profile"));
// const Entry_screen = lazy(() => import("./AfterLogin_Pages/Entry_screen"));
// const Partner_approved = lazy(() => import("./Partner_Approved_screen/Partner_approved"));
// const Listing_Detail = lazy(() => import("./Componenet/Listing_show_on_UI/Listing_Detail"));
// const Globel_detail = lazy(() => import("./Componenet/Screen/Detail_Category/Globel_detail"));
// const Search_page = lazy(() => import("./Search_Page/Search_Pages"));
// const Search_controler = lazy(() => import("./Tanuj_dessign/Search_controler"));
// const Previwe = lazy(() => import("./AfterLogin_Pages/Detail_page/Previwe"));
// const Search_page_uniaply = lazy(() => import("./AfterLogin_Pages/Search_page_uniaply"));
// const CompareListting = lazy(() => import("./AfterLogin_Pages/Uniapply_design/compare_listting"));
// const Single_Page_Listing = lazy(() => import("./AfterLogin_Pages/Uniapply_design/single_Page_listing/single_Page_listing"));

// export default function App() {
//   const { auth } = useLogin();

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "/js/main.js";
//     script.async = true;
//     document.body.appendChild(script);
//     return () => document.body.removeChild(script);
//   }, []);

//   return (
//     <Suspense fallback={<LoadingSpinner />}>
//       <BrowserRouter>
//         <Routes>
//           {/* Main Layout wrapper */}
//             <Route path="/" element={<MainLayout />}>
//             <Route index element={<Home />} />
//             <Route path="about" element={<AboutMore />} />
//             <Route path="service" element={<ServicesMore />} />
//             <Route path="program" element={<KidvikProgramMore />} />
//             <Route path="event" element={<KidvikEventMore />} />
//             <Route path="blog" element={<KidvikBlogMore />} />
//             <Route path="testimonial" element={<KidvikTestimonialMore />} />
//             <Route path="contact-us" element={<Contact_us />} />
//             <Route path="Listing_Detail/:slug" element={<Listing_Detail />} />
//             <Route path="login" element={<Login />} />
//             <Route path="Search_Page" element={<Search_page />} />
//             <Route path="explore" element={<Search_page_uniaply />} />

//             {/* Protected Routes */}
//             <Route
//               path="park_listing"
//               element={
//                 <ProtectedRoute requirePartner={true}>
//                   <Entry_screen />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="park_listing/:slug"
//               element={
//                 <ProtectedRoute requirePartner={true}>
//                   <Entry_screen />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="Profile"
//               element={
//                 <ProtectedRoute>
//                   <Profile />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="listing_approved"
//               element={
//                 <ProtectedRoute requirePartner allowedCodes={["AD"]}>
//                   <Partner_approved />
//                 </ProtectedRoute>
//               }
//             />
//             <Route path="Detail/:slug" element={<Search_controler />} />
//             <Route
//               path="partner/:slug"
//               element={
//                 <ProtectedRoute>
//                   <Previwe />
//                 </ProtectedRoute>
//               }
//             />
//             <Route path="compare" element={<CompareListting />} />
//             <Route path="detail_Listing/:slug" element={<Single_Page_Listing />} />

//             {/* Dynamic slug route */}
//             <Route path="subcategory/:slug" element={<Globel_detail />} />
//             <Route path="/:slug" element={<Globel_detail />} />

//             {/* Catch-all */}
//             <Route path="*" element={<NotFound />} />
//           </Route>
//         </Routes>
//       </BrowserRouter>
//     </Suspense>
//   );
// }
