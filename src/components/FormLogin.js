import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoginEmail, setLoginPassword } from "../actions/loginAction";

export default function FormLogin(props) {
  const email = useSelector((state) => state.login.email);
  const password = useSelector((state) => state.login.password);
  const dispatch = useDispatch();

  return (
    <div className="form-container">
      <form className="form-index" onSubmit={props.handleFormLogin}>
        <div className="input-container">
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => dispatch(setLoginEmail(e.target.value))}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            className="input"
            placeholder="Senha"
            value={password}
            onChange={(e) => dispatch(setLoginPassword(e.target.value))}
          />
        </div>
        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
