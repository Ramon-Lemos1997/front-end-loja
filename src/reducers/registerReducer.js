const initialRegisterState = {
  name: '',
  email: '',
  password: ''
};

const registerReducer = (state = initialRegisterState, action) => {
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
    case "RESET_REGISTER":
      return initialRegisterState; 
    default:
      return state;
  }
};
export default registerReducer;

