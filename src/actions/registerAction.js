export const resetForm = () => {
  return {
    type: "RESET_FORM",
  };
};

export const setName = (name) => {
  return {
    type: "SET_NAME",
    payload: name,
  };
};

export const setEmail = (email) => {
  return {
    type: "SET_EMAIL",
    payload: email,
  };
};

export const setPassword = (password) => {
  return {
    type: "SET_PASSWORD",
    payload: password,
  };
};


