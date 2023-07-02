import React from "react";
import axios from "axios";
import { resetLoginForm } from "../actions/loginAction";
import { useDispatch, useSelector } from "react-redux";
import FormLogin from "./FormLogin";
import '../register.css'

const LoginForm = () => {
  const email = useSelector((state) => state.login.email);
  const password = useSelector((state) => state.login.password);
  //const [loginSuccess, setLoginSuccess] = useState(false);
  const dispatch= useDispatch()
  const handleFormLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email,
        password,
      });
      console.log("logado");
      dispatch(resetLoginForm())
    } catch (error) {
      console.error(error);
    }
  };
  return(
    <FormLogin handleFormLogin={handleFormLogin}/>
  )
};

export default LoginForm;
