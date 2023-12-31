import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { setEmail, setName, setPassword, resetRegister } from "../actions/registerAction";


export default function FormRegister(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!props.registrationSuccess) {
      dispatch(resetRegister());
    }
  }, [props.registrationSuccess, dispatch]);

  return (
    <div className="form-container">
      <form className="form-index" onSubmit={props.handleFormSubmit}>
        <div className="input-container">
          <input
            type="text"
            className="input"
            placeholder="Nome"
            onChange={(e) => dispatch (setName(e.target.value))}
          />
        </div>
        <div className= "input-container">
          <input
            type= "email"
            className= "input"
            placeholder= "Email"
            onChange={(e) => dispatch(setEmail(e.target.value))}
          />
        </div>
        <div className= "input-container">
          <input
            type="password"
            className="input"
            placeholder="Senha"
            onChange={(e) => dispatch(setPassword(e.target.value))}
          />
        </div>
        <button className="btn-register" type= "submit" >
          Registrar-se
        </button>
      </form>
    </div>
  );
};