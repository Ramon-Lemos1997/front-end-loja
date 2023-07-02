export const setLoginEmail = (email) => {
    return {
      type: "SET_LOGIN_EMAIL",
      payload: email,
    };
  };
  
export const setLoginPassword = (password) => {
return {
    type: "SET_LOGIN_PASSWORD",
    payload: password,
};
};

export const resetLoginForm = () => {
return {
    type: "RESET_LOGIN_FORM",
};
};
