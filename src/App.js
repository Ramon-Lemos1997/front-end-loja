import React from "react";
//import RegistrationForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";

const store = createStore(rootReducer);

function App() {
  return (
    <div className="App">
      <Provider store={store}><LoginForm /></Provider> 
    </div>
  );
}

export default App;
