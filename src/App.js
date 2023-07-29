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
import Logout from "./components/Logout";
import Register from "./components/Register";
import Auth from "./auths/Auth";
import Recovery from "./components/Recovery";
import Code from "./components/SendCode";
import NewPass from "./components/NewPassword";
import NewItems from "./auths/NewItems";

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
        Cookies.remove("loggedInUser");
        
      }
    };
    checkLoggedInUser();
    const interval = setInterval(checkLoggedInUser, 5000);
    
    
    return () => clearInterval(interval);
  }, []);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
   
  };
  const handleLogoutSuccess= () => {
    setLoggedIn(false);
    
  }
  return (
    <Provider store={store}>
      <Router>
        <Nav isLoggedIn={loggedIn}/> 
        <Routes>
          
          <Route exact path="/login" element={loggedIn ? <Navigate to="/"/> : <Login onLoginSuccess={handleLoginSuccess} />}/>;
          <Route exact path="/logout" element= {loggedIn ? <Logout onLogoutSuccess={handleLogoutSuccess} /> : <Navigate to="/" />}/>;
          <Route exact path="/home" element={loggedIn ? <Home /> : <Navigate to="/login" />}/>;
          <Route exact path="/auth" element={loggedIn ? <Auth /> : <Navigate to="/login" />}/>;
          <Route exact path="/register" element={!loggedIn ? <Register /> : <Navigate to="/" />}/>;
          <Route exact path="/recovery" element={!loggedIn ? <Recovery /> : <Navigate to="/" />}/>;
          <Route exact path="/code" element={!loggedIn ? <Code /> : <Navigate to="/" />}/>;
          <Route exact path="/newPass" element={!loggedIn ? <NewPass /> : <Navigate to="/" />}/>;
          <Route exact path="/newItem" element={loggedIn ? <NewItems /> : <Navigate to="/" />}/>;
          
          
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
