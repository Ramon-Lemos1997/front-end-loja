//import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { resetLoginForm } from "../actions/loginAction";
import "../register.css";

const LogoutButton = (props) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
       const response = await axios.post(
        "http://localhost:3000/user/logout",{}, 
      );
  
      if (response.status === 200) {
        Cookies.remove("loggedInUser");
        dispatch(resetLoginForm());
        props.onLogoutSuccess();
      } else {
        console.log("Erro ao efetuar o logout");
      }
    } catch (error) {
      console.error(error);
    }
  };  
  handleLogout()
  return (
    LogoutButton
    /*<div  >
      <button className="logout-button" onClick={handleLogout}>click to exit</button>
    </div>*/
  );
  

};

export default LogoutButton;
