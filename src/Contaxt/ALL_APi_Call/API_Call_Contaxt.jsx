// src/API_Context.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../Helper/Base_Url";
import  fetchSelectOptions  from "../../AfterLogin_Pages/Entry_screen_step/MasterTableData/Master_Institude_2nd_step";
import { useFilter } from "../Filter_contaxt";

const APIContext = createContext();

export const APIProvider = ({ children }) => {
  const [partners , setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subcategories , setsubcategories] = useState([])
  const [dropdowenCategories , setdropdowenCategories] = useState([])
  const [dropdowensubcategory , setdropdowensubcategory] = useState([])
  const [dropdowensubcategorydetail , setdropdowensubcategorydetail] = useState([])
  const [singledetail , setsingledetail] = useState([])
  const [subcatlaoding , setsubcatloading] = useState(true);
  const [sunlaoding , setsubloading] = useState(true);
//  const [Listingdata , setlistingdata] = useState([]);
//  const [loadinglisting , setloadinglisting] = useState([];)
 const [detailloading , setdetailloading] = useState(true);

   const Getpartner_data = async (slug , type) => {
    console.log("type",type)
    try {
      setLoading(true);

          let url;
         if (type === "sub_categorydetail") {
          url = `${BASE_URL}/partner_master/?sub_category_detail_slug=${slug}`;
        } else {
          url = `${BASE_URL}/partner_master/?sub_category_slug=${slug}`;
        }
      const res = await fetch(url);
      const data = await res.json();
      console.log("partner_data", data);

     setPartners(data?.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setsubcatloading(true);
        const res = await fetch(`${BASE_URL}/sub_category/`);
        const data = await res.json();
        setsubcategories(data?.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setsubcatloading(false);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    fetchSelectOptions(`${BASE_URL}/category_master/`, "name")
      .then(setdropdowenCategories);
  }, []);


const fetchSubcategories = async (categoryId) => {
setsubloading(true)
  try {
    const res = await fetch(`${BASE_URL}/sub_category/?category_id=${categoryId}`);
    const data = await res.json();
    // const options = data.data.map((item) => ({
    //   value: item.id,
    //   label: item.name,
    // }));
    setdropdowensubcategory(data.data);
  } catch (err) {
    console.error("Error fetching subcategories:", err);
    setdropdowensubcategory([]);
   
  }
  finally{
    setsubloading(false)
  }
};


  

  // useEffect(() => {
  //   if (filters.category_id) {
  //     fetchSubcategories(filters.category_id).then((options) => {
  //       const selectedSubId = filters.sub_category_id;
  //       if (!selectedSubId) return;
  //       const exists = options.some(opt => Number(opt.value) === Number(selectedSubId));
  //       if (!exists) {
  //         updateFilter("sub_category_id", "");
  //         updateFilter("sub_category_Detail_id", "");
  //       }
  //     });
  //   } else {
  //     setdropdowensubcategory([]);
  //     updateFilter("sub_category_id", "");
  //     updateFilter("sub_category_Detail_id", "");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [filters.category_id]);


// Step 3: Jab sub_category_id set ho jaye, uske details fetch karo
// useEffect(() => {
//   if (filters.sub_category_id) {
//     fetchSubcategoriesdetail(filters.sub_category_id).then(() => {
//       if (!sub_category_Detail_id) {
//         updateFilter("sub_category_Detail_id", "");
//       }
//     });
//   }
// }, [filters.sub_category_id]);

  const fetchSubcategoriesdetail = async (sub_categoryId) => {
    if (!sub_categoryId) {
      setdropdowensubcategorydetail([]);
      return [];
    }
    try {
      const res = await fetch(`${BASE_URL}/sub_category_detail/?sub_category_id=${sub_categoryId}`);
      const data = await res.json();
      const options = (data?.data || []).map((item) => ({ value: item.id, label: item.name }));
      setdropdowensubcategorydetail(options);
      return options;
    } catch (err) {
      console.error("Error fetching subcategories detail:", err);
      setdropdowensubcategorydetail([]);
      return [];
    }
  };

  // useEffect(() => {
  //   if (filters.sub_category_id) {
  //     fetchSubcategoriesdetail(filters.sub_category_id).then((options) => {
  //       const selectedDetailId = filters.sub_category_Detail_id;
  //       if (!selectedDetailId) return;
  //       const exists = options.some(opt => Number(opt.value) === Number(selectedDetailId));
  //       if (!exists) {
  //         updateFilter("sub_category_Detail_id", "");
  //       }
  //     });
  //   } else {
  //     setdropdowensubcategorydetail([]);
  //     updateFilter("sub_category_Detail_id", "");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [filters.sub_category_id]);


async function Getsinglepartner(slug) {
  const url = `${BASE_URL}/partner_all/${slug}/`;  
  try {
    setdetailloading(true);
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json(); // use .json() if response is JSON
    console.log("singledetal",data)
    setsingledetail(data); // store directly in state
  } catch (err) {
    console.error("Fetch error:", err);
  }
  finally{
        setdetailloading(false);

  }
}



  return (
    <APIContext.Provider value={{ partners,
      Getpartner_data,
      subcategories ,
      subcatlaoding,
      loading, 
      error , 
      dropdowenCategories  ,
       dropdowensubcategory,
       fetchSubcategories , 
       fetchSubcategoriesdetail , 
       dropdowensubcategorydetail ,
       Getsinglepartner,
       singledetail , 
       sunlaoding , 
       detailloading, 
       }}>
      {children}
    </APIContext.Provider>
  );
};

// ✅ Custom hook for using API context
export const useAPI = () => useContext(APIContext);
