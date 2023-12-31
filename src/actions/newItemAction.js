export const setCategory = (category) => {
  return {
    type: "SET_CATEGORY",
    payload: category,
  };
};
  
export const setPrice = (price) => {
  return {
    type: "SET_PRICE",
    payload: price,
  };
};

export const setQuantity = (quantity) => {
  return {
    type: "SET_QUANTITY",
    payload: quantity,
  };
};

export const setDescription = (description) => {
  return {
    type: "SET_DESCRIPTION",
    payload: description,
  };
};

export const reset = () => {
  return {
    type: "RESET",
  };
};
