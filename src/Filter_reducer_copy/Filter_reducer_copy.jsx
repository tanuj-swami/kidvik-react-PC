// src/context/filterReducer.js

export const initialFilterState = {
  isLoading: false,
  isError: false,
  Listing_Data: [],
  filtered_Listing: [],
  sub_category: [],
  sub_category_detail: [],

  area_id: "all",
  city_id: null,
  category_id: "all",
  sub_category_id: "all",
  sub_category_detail_id: "all", 
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
      return { ...state, Listing_Data: action.payload };

case "SET_SUBCATEGORY_DETAIL":
  return { ...state, sub_category_detail: action.payload };


case "SET_FILTER":
  const { name, value } = action.payload;

  let filtered = state.Listing_Data;

 
  if (name === "category_id") {
    filtered = value === "all"
      ? state.Listing_Data
      : state.Listing_Data.filter(item => item.category_id === value);

    return {
      ...state,
      category_id: value,
      sub_category_id: "all",
      filtered_Listing: filtered
    };
  }

   if (name === "area_id"){
    filtered = filtered.filter(item => item.area_id === value);
    return {
      ...state,
      area_id: value,
      filtered_Listing: filtered,
    };
  }


  if (name === "area_id") {

  if (value === "All") {
    filtered = filtered;
  } else {
    filtered = filtered.filter(
        (item) => item.area?.Location_name === value
    );
  }

  return {
    ...state,
    area_id: value,
    filtered_Listing: filtered,
  };
}


  if (name === "sub_category_id") {
    filtered = value === "all"
      ? state.Listing_Data.filter(item => 
          state.category_id === "all" ? true : item.category_id === state.category_id
        )
      : state.Listing_Data.filter(item =>
          item.sub_category_id === value
        );

    return {
      ...state,
      sub_category_id: value,
      filtered_Listing: filtered
    };
  }

     if (name === "sub_category_detail_id") {
    filtered =
      value === "all"
        ? state.Listing_Data.filter(item =>
            state.sub_category_id === "all"
              ? true
              : item.sub_category_id === state.sub_category_id
          )
        : state.Listing_Data.filter(
            item => item.sub_category_detail_id === value
          );

    return {
      ...state,
      sub_category_detail_id: value,
      filtered_Listing: filtered,
    };
  } 

  return state;


case "SET_CATEGORY":
  const filteredByCategory = state.Listing_Data.filter(
    (item) => action.payload === "all" || item.category?.id === action.payload
  );
  return {
    ...state,
    category_id: action.payload,
    sub_category_id: "all",
    filtered_Listing: filteredByCategory
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
