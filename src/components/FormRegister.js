import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setName, setPassword } from "../actions/registerAction";

export default function FormRegister(props) {
  const name = useSelector((state) => state.name);
  const email = useSelector((state) => state.email);
  const password = useSelector((state) => state.password);

  const dispatch = useDispatch();

  return (
    <div className="form-container">
      <form className="form-index" onSubmit={props.handleFormSubmit}>
        <div className="input-container">
          <input
            type="text"
            className="input"
            placeholder="Nome"
            value= {name}
            onChange={(e) => dispatch (setName(e.target.value))}
          />
        </div>
        <div className= "input-container">
          <input
            type= "email"
            className= "input"
            placeholder= "Email"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
          />
        </div>
        <div className= "input-container">
          <input
            type="password"
            className="input"
            placeholder="Senha"
            value= {password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
          />
        </div>
        <button className="btn-register" type= "submit" >
          Registrar-se
        </button>
      </form>
    </div>
  );
}