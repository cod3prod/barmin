export const initialState = {
  username: "",
  email: "",
  oldPassword: null,
  newPassword: null,
};

export const profileReducer = (state = initilState, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_OLD_PASSWORD":
      return { ...state, oldPassword: action.payload };
    case "SET_NEW_PASSWORD":
      return { ...state, newPassword: action.payload };
    default:
      return state;
  }
};
