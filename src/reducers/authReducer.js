//para utilizar o redux como gerenciador do estado de logged se quiser;
/*const initialState = {
  loggedInUser: null,
  isAuthenticated: false,
  expirationDate: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loggedInUser: action.payload.user,
        isAuthenticated: true,
        expirationDate: action.payload.expirationDate,
      };
    case "LOGOUT":
      return {
        ...state,
        loggedInUser: null,
        isAuthenticated: false,
        expirationDate: null,
      };
    default:
      return state;
  }
};

export default authReducer;*/
