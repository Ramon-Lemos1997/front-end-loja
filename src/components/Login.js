import React, { useState } from "react";
import axios from "axios";
import { resetLoginForm } from "../actions/loginAction";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import FormLogin from "./FormLogin";
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
      return null;
    }
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email,
        password,
      });

      if (response.status === 200) {
        console.log("logado");

        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + 24 * 60 * 60 * 1000);

        Cookies.set("loggedInUser", response.data, { expires: expirationDate, secure: true });
        Cookies.remove("User");
        dispatch(resetLoginForm());
        props.onLoginSuccess();
        navigate("/home");
      } else {
        console.log("falha no login");
      }
    } catch (error) {
      console.error(error);
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
