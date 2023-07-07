import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { resetLoginForm } from "../actions/loginAction";
import "../register.css";

const LogoutButton = (props) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const id = Cookies.get("loggedInUser");
      const response = await axios.post("http://localhost:3000/user/logout", {
        id,
      });

      if (response) {
        console.log(response.data);
        Cookies.remove("loggedInUser");
        dispatch(resetLoginForm());
        props.onLogoutSuccess();
        console.log("logout")
        window.location.reload();
      } else {
        console.log("Erro ao enviar");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div  >
      <button className="logout-button" onClick={handleLogout}>click to exit</button>
    </div>
  );
  

};

export default LogoutButton;
