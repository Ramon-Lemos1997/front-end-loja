import React from "react";
import { useDispatch } from "react-redux";
import { setLoginEmail, setLoginPassword } from "../actions/loginAction";
import { Link } from "react-router-dom";

export default function FormLogin(props) {
  const dispatch = useDispatch();

  return (
    <div className="form-container">
      <form className="form-index" onSubmit={props.handleFormLogin}>
        <div className="input-container">
          <input
            type="email"
            className="input"
            placeholder="Email"
            onChange={(e) => dispatch(setLoginEmail(e.target.value))}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            className="input"
            placeholder="Senha"
            onChange={(e) => dispatch(setLoginPassword(e.target.value))}
          />
        </div>
        <button className="btn" type="submit">
          Login
        </button>
        <div className="register-link-container">
          <p>Não possui uma conta? <Link className="c" to={"/register"} >
                Registra-se
              </Link></p>
          <p> <Link className="g" to={"/email"} >
            Esqueceu sua senha?
          </Link></p>
      </div>
      </form>
    </div>
  );
};
