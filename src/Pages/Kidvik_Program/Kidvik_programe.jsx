import React, { useState , useEffect } from "react";
import GlobalSlider from "../../GlobalOwlSlider/GlobalOwlSlider ";
import { BASE_URL } from "../../Helper/Base_Url";
import { Loading } from "../../Helper/Loader";
import ProgramCard from "../../Cards/Programs_Card";
import Top_Heading from "../../Helper/Top_Heading";
function Kidvik_programe() {
  const [kidvikProgramsData , setkidvikProgramsData] = useState([]);
    const [loading , setLoading] = useState(true);
  
  useEffect(() => {
    const getAboutData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/Activity`);
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          setkidvikProgramsData(json.data);
        }
      } catch (error) {
        console.error("Error fetching About data:", error);
      } finally {
        setLoading(false);
      }
    };

    getAboutData();
  }, []);

  // kidvikProgramsData.js

// const kidvikProgramsData = [
//   {
//     id: 1,
//     title: "Verified Parent Mentors",
//     description:
//       "Get guidance from local parents who've been there—whether you're new or native.",
//     img: "img/kidvik_school_img/kidvik_school image_2.jpeg",
//     teacherImg: "img/kidvik_school_img/user_image.jpg",
//     teacherName: "Gunjan Dadhich",
//     teacherRole: "Product Owner",
//     stats: [
//       { icon: "fas fa-school", text: "150+ Schools" },
//       { icon: "fas fa-comments", text: "500+ Reviews" },
//       { icon: "fas fa-globe", text: "All Cities" }
//     ]
//   },
//   {
//     id: 2,
//     title: "Schools & Healthcare Listings",
//     description:
//       "Discover trusted schools, clinics, and pediatricians near you—verified by real parents.",
//     img: "img/kidvik_school_img/hospital_img_3.jpg",
//     teacherImg: "img/kidvik_school_img/user_image.jpg",
//     teacherName: "Dr. Anika Sharma",
//     teacherRole: "Child Specialist",
//     stats: [
//       { icon: "fas fa-hospital", text: "80+ Listings" },
//       { icon: "fas fa-user-check", text: "Verified Staff" },
//       { icon: "fas fa-medkit", text: "24/7 Support" }
//     ]
//   },
//   {
//     id: 3,
//     title: "Tailored",
//     description:
//       "Weekend workshops, toddler classes & family events—based on your child’s age & interests.",
//     img: "img/kidvik_school_img/event.webp",
//     teacherImg: "img/kidvik_school_img/user_image.jpg",
//     teacherName: "Riya Malhotra",
//     teacherRole: "Community Manager",
//     stats: [
//       { icon: "fas fa-calendar-alt", text: "15+ Events" },
//       { icon: "fas fa-star", text: "High Ratings" },
//       { icon: "fas fa-ticket-alt", text: "Instant Booking" }
//     ]
//   },
//   {
//     id: 3,
//     title: "Tailored",
//     description:
//       "Weekend workshops, toddler classes & family events—based on your child’s age & interests.",
//     img: "img/kidvik_school_img/event.webp",
//     teacherImg: "img/kidvik_school_img/user_image.jpg",
//     teacherName: "Riya Malhotra",
//     teacherRole: "Community Manager",
//     stats: [
//       { icon: "fas fa-calendar-alt", text: "15+ Events" },
//       { icon: "fas fa-star", text: "High Ratings" },
//       { icon: "fas fa-ticket-alt", text: "Instant Booking" }
//     ]
//   }
// ];
  if (loading) {
    return (
     <>
     <Loading/>
     </>
    );
  }
  return (
    <div className="container-fluid program py-2">
      <div className="container py-2">
        <div class="row g-5 justify-content-center">
        <Top_Heading subtitile="Kidvik Core Programs" titile="Smart Tools for Every Parent in the City"/>

        <GlobalSlider>
          {kidvikProgramsData.map((item) => (
               <ProgramCard key={item.id} item={item} />
          ))}
        </GlobalSlider>

        <div class="d-inline-block text-center wow fadeIn" data-wow-delay="0.1s">
            <a href="#" class="btn btn-primary px-5 py-3 text-white btn-border-radius">Vew All Programs</a>
        </div>
       </div>
      </div>
    </div>
    
  );
}

export default Kidvik_programe;
