// src/context/filterReducer.js

export const initialFilterState = {
  isLoading: false,
  isError: false,
  Listing_Data: [],
  filtered_Listing: [],
  sub_category: [],
  sub_category_detail: [],


  sub_category_detail_id: "All", 
  area_id: "All",
  city_id: null,
  category_id: "all",
  sub_category_id: "all",
  search: "",
  priceRange: [0, 1000],
  rating: 0,
};

export const filterReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    case "SET_ERROR":
      return { ...state, isError: action.payload };

    case "SET_LISTING_DATA":
      return { ...state, Listing_Data: action.payload, filtered_Listing: action.payload };

    case "SET_SUBCATEGORY_DETAIL":
      return { ...state, sub_category_detail: action.payload };

    // 🧠 CHAINED FILTERS
    case "SET_FILTER": {
      const { name, value } = action.payload;

      const updatedState = {
        ...state,
        [name]: value,
      };
      // start from the full data
      let filtered = [...state.Listing_Data];

      // 🟢 1️⃣ Category filter
      if (updatedState.category_id !== "all") {
        filtered = filtered.filter(
          (item) => item.category_id === updatedState.category_id
        );
      }

      // 🟡 2️⃣ Subcategory filter
      if (updatedState.sub_category_id !== "all") {
        filtered = filtered.filter(
          (item) => item.sub_category_id === updatedState.sub_category_id
        );
      }

      if (updatedState.area_id && Array.isArray(updatedState.area_id)) {
  if (!updatedState.area_id.includes("All")) {
    filtered = filtered.filter((item) =>
      updatedState.area_id.includes(item.area?.Location_name)
    );
  }
}

if (updatedState.category_id === 6 && Array.isArray(updatedState.sub_category_detail_id)) {
  if (!updatedState.sub_category_detail_id.includes("All")) {
    filtered = filtered.filter((item) =>
      updatedState.sub_category_detail_id.includes(item.sub_category_detail?.name)
    );
  }
}

     
// if (
//   updatedState.category_id === 6 &&
//   updatedState.sub_category_detail_id !== "all" &&
//   updatedState.sub_category_detail_id !== "All"
// ) {
//   filtered = filtered.filter(
//     (item) =>
//       item.sub_category_detail?.name === updatedState.sub_category_detail_id
//   );
// }
      return {
        ...updatedState,
        filtered_Listing: filtered,
      };
    }

    case "SET_CATEGORY":
      return {
        ...state,
        category_id: action.payload,
        sub_category_id: "all",
      };

    case "SET_SUBCATEGORY":
      return { ...state, sub_category: action.payload };

    case "SET_FILTERED_LISTING":
      return { ...state, filtered_Listing: action.payload };

    case "RESET_FILTERS":
      return initialFilterState;

    default:
      return state;
  }
};
