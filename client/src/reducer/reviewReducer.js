export const initialState = {
  prevRating: 0,
  rating: 0,
  body: "",
};

export const reviewReducer = (state, action) => {
  switch (action.type) {
    case "SET_NEW_INITIAL":
      return { ...state, ...action.payload };
    case "SET_RATING":
      return { ...state, rating: action.payload };
    case "SET_PREV_RATING":
      return { ...state, prevRating: action.payload };
    case "SET_BODY":
      return { ...state, body: action.payload };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};
