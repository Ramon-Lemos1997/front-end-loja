import { combineReducers } from "redux";
import registerReducer from "./registerReducer";
import loginReducer from "./loginReducer";
import newItemReducer from "./newItemRecuder";

const rootReducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  new: newItemReducer
});

export default rootReducer;
