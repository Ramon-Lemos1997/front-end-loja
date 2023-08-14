const initialState = {
    category: "",
    price: "",
    quantity: "",
    description: ""
};

const newItemReducer = (state = initialState, action) => {
switch (action.type) {
    case "SET_CATEGORY":
        return {
            ...state,
            category: action.payload,
        };
    case "SET_PRICE":
        return {
            ...state,
            price: action.payload,
        };
    case "SET_QUANTITY":
        return {
            ...state,
            quantity: action.payload,
        };
    case "SET_DESCRIPTION":
        return {
            ...state,
            description: action.payload,
        };
    case "RESET":
        return initialState;
    default:
        return state;
    }
};
  
export default newItemReducer;
  