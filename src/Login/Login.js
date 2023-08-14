import React, { useState } from "react";
import axios from "axios";
import { resetLoginForm } from "../actions/loginAction";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import FormLogin from "../Login/FormLogin";
import { useNavigate } from "react-router-dom";
import '../register.css';

const LoginForm = (props) => {
  const email = useSelector((state) => state.login.email);
  const password = useSelector((state) => state.login.password);
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const handleFormLogin = async (e) => {
    e.preventDefault();
    if (!email && !password) {
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + 25 * 60 * 60 * 1000); // um dia de permissão;
        
        Cookies.remove("Code");
        Cookies.set("loggedInUser", response.data, { expires: expirationDate, secure: true, sameSite:"Strict" });
        
        dispatch(resetLoginForm());
        props.onLoginSuccess();
        navigate("/store");
      } else {
        //console.log("falha no login");
      }
    } catch (error) {
      //console.error(error);
      if (error.response && error.response.data) {
        setLoginError(error.response.data);
      } else {
        setLoginError("Erro inesperado");
      }
    }
  };

  return (
    <>
      {loginError ? (
        <div className="error-message-container">
          {loginError}
        </div>
      ) : null}
   
      <FormLogin handleFormLogin={handleFormLogin} />
      
    </>
  );
};

export default LoginForm;
