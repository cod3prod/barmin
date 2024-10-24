export const initialState = {
    username: "",
    email: "",
    password: "",
    checkUsername: null,
    checkEmail: null
};

export const checkReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USERNAME":
            return { ...state, username: action.payload };
        case "SET_EMAIL":
            return { ...state, email: action.payload };
        case "SET_PASSWORD":
            return { ...state, password: action.payload };
        case "SET_CHECK_USERNAME":
            return { ...state, checkUsername: action.payload };
        case "SET_CHECK_EMAIL":
            return { ...state, checkEmail: action.payload };
        default:
            return state;
    }
}