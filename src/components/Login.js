import React, { useState } from "react";
import axios from "axios";
import { resetLoginForm } from "../actions/loginAction";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import FormLogin from "./FormLogin";
import "../register.css";

const LoginForm = (props) => {
  const email = useSelector((state) => state.login.email);
  const password = useSelector((state) => state.login.password);
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState(null);

  const handleFormLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email,
        password,
      });

      if (response) {
        console.log("logado");
        
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + 0.5 * 60 * 1000); // Adiciona 2 minutos
        
        Cookies.set("loggedInUser", response.data, { expires: expirationDate, secure: true });
        
        dispatch(resetLoginForm());
        props.onLoginSuccess();
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
          Erro no registro: {loginError}
        </div>
      ) : null}
      <FormLogin handleFormLogin={handleFormLogin} />
    </>
  );
};

export default LoginForm;
