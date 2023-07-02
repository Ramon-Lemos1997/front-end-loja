const initialState = {
  name: '',
  email: '',
  password: ''
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.payload
      };
    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload
      };
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload
      };
    case "SET_REGISTRATION_SUCCESS":
      return {
        ...state,
        registrationSuccess: action.payload
      };
    case "RESET_FORM":
      return {
        ...state,
        name: "",
        email: "",
        password: ""
      };
    default:
      return state;
  }
};
export default registerReducer;

