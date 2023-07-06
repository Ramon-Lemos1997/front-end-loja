import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import Login from "./components/Login";
import Nav from "./components/Nav";
import "./App.css";
import Home from "./components/Home";
import Cookies from "js-cookie";
import Logout from "./components/Logout"
import Register from "./components/Register"



const store = createStore(rootReducer);

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedInUser = () => {
      const loggedInUser = Cookies.get("loggedInUser");
      if (loggedInUser) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    };
    checkLoggedInUser();
    const interval = setInterval(checkLoggedInUser, 5000);
    //limpa o intervalo quando o app for desmontado
    return () => clearInterval(interval);
  }, []);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };
  const handleLogoutSuccess= () => {
    setLoggedIn(false)
  }
  return (
    <Provider store={store}>
      <Router>
        <Nav /> 
        <Routes>
          <Route path="/login" element={loggedIn ? <Home /> : <Login onLoginSuccess={handleLoginSuccess} />}/>
          <Route path="/logout" element= {loggedIn ? <Logout onLogoutSuccess={handleLogoutSuccess} /> : <Navigate to="/" />}/>
          <Route exact path="/home" element={loggedIn ? <Home /> : <Navigate to="/login" />}/>
          <Route exact path="/register" element={<Register />}/>
          
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
