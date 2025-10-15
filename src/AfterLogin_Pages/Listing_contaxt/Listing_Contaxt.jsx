// src/context/FilterContext.js
import React, { createContext, useReducer, useContext , useEffect, useState  } from "react";
import { filterReducer, initialFilterState } from "./Reducer/Reducer";
import { BASE_URL } from "../../Helper/Base_Url";

const FilterContext = createContext();

export const Listing_Provider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialFilterState);
const [category , setcategory] = useState([])
const [loading , setLoading] = useState(true);
const [error , setError ] = useState("")
const [Allcities , setCities] = useState([])
const [Allcityloading , setAllcityloading] = useState(true);
const [Citiesdrowen , setCitiesdrowen] = useState([])
const [subLoading, setSubLoading] = useState(false);
const [cityId , setCityId] = useState(() => localStorage.getItem("selectedCityId") || null);
const [cityname , setcityname] = useState(()=> localStorage.getItem("selectedCityName") || null)
const [Area , setArea] = useState([])
const[LoadingArea , setLoadingArea] = useState(false);
useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      if (!cityId) {
          setShowCityPrompt(true)
         } 
      try {
        const res = await fetch(`${BASE_URL}/partner_master/?city_id=${cityId}`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        dispatch({ type: "SET_LISTING_DATA", payload: data.data || [] });
        dispatch({ type: "SET_FILTERED_LISTING", payload: data.data || [] });
        dispatch({ type: "SET_ERROR", payload: false });
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: true });
        console.error("Error fetching partner data:", err);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchData();
  }, [cityId, dispatch]);


useEffect(() => {
   
    const savedCityId = localStorage.getItem("selectedCityId");

    // If formData.city_id is empty, fallback to localStorage
    const cityIdToUse = cityId || savedCityId;

    if (cityIdToUse) {
      setLoadingArea(true);
      fetch(`${BASE_URL}/location_mst/?city_id=${cityIdToUse}`)
        .then((res) => res.json())
        .then((data) => {
          const options = data.data.map((item) => ({
            value: item.id,
            label: item.Location_name,
          }));
          setArea(options);

        })
        .catch((err) => console.error("Error fetching areas:", err))
        .finally(() => setLoadingArea(false));
    } else {
      setArea([]);
      // setFormData((prev) => ({ ...prev, city_id: "" }));
    }
  }, [cityId]);



    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const res = await fetch(`${BASE_URL}/category_master/`);
          const data = await res.json();
           setcategory(data?.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []);
    
  
useEffect(() => {
  const fetchSubcategories = async (categoryId) => {
     setSubLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/sub_category/?category_id=${categoryId}`);
      const data = await res.json();

      const selectedCategory = category.find(c => c.id === categoryId);
      const categoryLabel = selectedCategory ? selectedCategory.name : "Category";

      const options = data.data.map(item => ({
        value: item.id,
        label: item.name,
        img: item.icon_img
      }));

      const finalOptions = [{ value: "all", label: `All ${categoryLabel}` }, ...options];

      dispatch({ type: "SET_SUBCATEGORY", payload: finalOptions });

      // Default subcategory = "all"
      dispatch({ type: "SET_FILTER", payload: { name: "sub_category_id", value: "all" } });

    } catch (err) {
      console.error(err);
      dispatch({ type: "SET_SUBCATEGORY", payload: [] });
    }
     finally {
      setSubLoading(false); // stop loading
    }
  };

  if (state.category_id && state.category_id !== "all") {
    fetchSubcategories(state.category_id);
  } else {
     dispatch({ type: "SET_SUBCATEGORY", payload: [] });
  }
}, [state.category_id, category]);



useEffect(() => {
  if (!state.Listing_Data) return;

  let filtered = state.Listing_Data;

  if (state.category_id && state.category_id !== "all") {
    filtered = filtered.filter(item => item.category_id === state.category_id);
  }

  if (state.sub_category_id && state.sub_category_id !== "all") {
    filtered = filtered.filter(item => item.sub_category_id === state.sub_category_id);
  }

  dispatch({ type: "SET_FILTERED_LISTING", payload: filtered });
}, [state.Listing_Data, state.category_id, state.sub_category_id]);


// useEffect(() => {
//   const fetchSubcategoryDetails = async (subcategoryId) => {
//     try {
     
//       const res = await fetch(`${BASE_URL}/sub_category_detail/?sub_category_id=${subcategoryId}`);
//       const data = await res.json();

//       const options = data.data.map((item) => ({
//         value: item.id,
//         label: item.name,
//       }));
       
//       const finalOptions = [{ value: "all", label: "All Details" }, ...options];
//       dispatch({ type: "SET_SUBCATEGORY_DETAIL", payload: finalOptions });
//     } catch (err) {
//       console.error("Error fetching subcategory details:", err);
//       dispatch({ type: "SET_SUBCATEGORY_DETAIL", payload: [] });
//     }
//   };

//   if (state.sub_category_id && state.sub_category_id !== "all") {
//     // Fetch only if category is Recreational
//     const selectedCategory = category.find(
//       (cat) => cat.id === state.category_id
//     );
//     if (selectedCategory?.id === 6){
//       fetchSubcategoryDetails(state.sub_category_id);
//     } else {
//       dispatch({ type: "SET_SUBCATEGORY_DETAIL", payload: [] });
//     }
//   } else {
//     dispatch({ type: "SET_SUBCATEGORY_DETAIL", payload: [] });
//   }
// }, [state.sub_category_id, state.category_id, category]);


  const fetchCities = async () => {
   setAllcityloading(true);
    try {
      const res = await fetch(`${BASE_URL}/city/`);
      const data = await res.json();
      setCities(data.data || []);

    } catch (err) {
      console.error("Error fetching cities:", err);
    }
    finally{
         setAllcityloading(false);

    }
  };
  useEffect(() => {
    fetchCities();
  }, []); 




  const updateFilter = (name , value) => {
    dispatch({ type: "SET_FILTER", payload: { name, value } });
  };


  const resetFilters = () => {
    dispatch({ type: "RESET_FILTERS" });
  };


  return (
    <FilterContext.Provider value={{ state , updateFilter, resetFilters ,
     category , loading , error ,  dispatch , Allcities  , Citiesdrowen 
     , subLoading , setCityId  , cityId , LoadingArea , Area , cityname , setcityname , Allcityloading 
     }}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom hook for consuming the context
export const Use_Listing_Filter = () => useContext(FilterContext);
