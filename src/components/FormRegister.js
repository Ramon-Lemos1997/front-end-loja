import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setName, setPassword } from "../actions/registerAction";

export default function FormRegister(props) {
  const name = useSelector((state) => state.name);
  const email = useSelector((state) => state.email);
  const password = useSelector((state) => state.password);

  const dispatch = useDispatch();a

  return (
    <div className="container">
      <form className="form" onSubmit={props.handleFormLogin}>
        <input
          type="text"
          className="input"
          placeholder="Nome"
          value={name}
          onChange={(e) => dispatch(setName(e.target.value))}
        />
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
        />
        <input
          type="password"
          className="input"
          placeholder="Senha"
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
        />
        <button type="submit" className="button">
          Registrar-se
        </button>
      </form>
    </div>
  );
}
