import { combineReducers } from "redux";
import registerReducer from "./registerReducer";
import loginReducer from "./loginReducer";
import newItemReducer from "./newItemRecuder";
import cartReducer from "./cartReducer";
//mport authReducer from "./authReducer";
//todos os reducers, para o store no app;
const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  new: newItemReducer,
  cart: cartReducer
});

export default rootReducer;
