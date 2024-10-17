export const initialState = {
  title: "",
  address: "",
  coordinate: {},
  description: "",
};

export const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_NEW_INITIAL":
      return { ...state, ...action.payload };
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_ADDRESS":
      return { ...state, address: action.payload };
    case "SET_COORDINATE":
      return { ...state, coordinate: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};
