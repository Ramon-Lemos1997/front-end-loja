import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { resetForm } from "../actions/registerAction";
import '../register.css'
import FormRegister from "./FormRegister";


const RegistrationForm = () => {
  const name = useSelector((state) => state.register.name);
  const email = useSelector((state) => state.register.email);
  const password = useSelector((state) => state.register.password);

  const dispatch = useDispatch();
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/user/register", {
        name,
        email,
        password,
      });
      console.log("registrado");
      dispatch(resetForm());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormRegister handleFormSubmit={handleFormSubmit}/>
  );
};

export default RegistrationForm;
