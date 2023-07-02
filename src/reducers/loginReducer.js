const initialLoginState = {
    email: "",
    password: "",
};

const loginReducer = (state = initialLoginState, action) => {
switch (action.type) {
    case "SET_LOGIN_EMAIL":
    return {
        ...state,
        email: action.payload,
    };
    case "SET_LOGIN_PASSWORD":
    return {
        ...state,
        password: action.payload,
    };
    case "RESET_LOGIN_FORM":
    return initialLoginState;
    default:
    return state;
    }
};
  
export default loginReducer;
  