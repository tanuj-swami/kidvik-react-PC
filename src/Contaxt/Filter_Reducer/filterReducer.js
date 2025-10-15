// src/Filter_Reducer/filterReducer.js

export const filterReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FILTER":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case "RESET_FILTERS":
      return {
        search: "",
        category: "",
        priceRange: [0, 1000],
        rating: 0,
      };

    default:
      return state;
  }
};
