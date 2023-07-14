import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormRegister from "./FormRegister";
import "../register.css"


const RegistrationForm = () => {
  const name = useSelector((state) => state.register.name);
  const email = useSelector((state) => state.register.email);
  const password = useSelector((state) => state.register.password);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!name && !email && !password) {
      return null;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/user/register",
        {
          name,
          email,
          password,
        }
      );

      if (response) {
        console.log("registrado");
        setRegistrationSuccess(true);
      } else {
        console.log("Erro inesperado");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("Erro inesperado");
      }
      setRegistrationSuccess(false);
    }
  };

  useEffect(() => {
    if (registrationSuccess) {
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
  }, [registrationSuccess, navigate]);

  return (
    <>
      {registrationSuccess ? (
        <div className="success-message-container">
          Registrado com sucesso!
        </div>
      ) : (
        <>
          {errorMessage && (
            <div className="error-message-container">{errorMessage}</div>
          )}
          <FormRegister
            handleFormSubmit={handleFormSubmit}
            registrationSuccess={registrationSuccess}
          />
        </>
      )}
    </>
  );
};

export default RegistrationForm;
