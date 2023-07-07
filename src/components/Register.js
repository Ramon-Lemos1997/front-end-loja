import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../register.css";
import FormRegister from "./FormRegister";

const RegistrationForm = () => {
  const name = useSelector((state) => state.register.name);
  const email = useSelector((state) => state.register.email);
  const password = useSelector((state) => state.register.password);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

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
        setRegistrationError(error.response.data);
      } else {
        setRegistrationError("Erro inesperado");
      }
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
          {registrationError && (
            <div className="error-message-container">
              Erro no registro: {registrationError}
            </div>
          )}
          <FormRegister handleFormSubmit={handleFormSubmit} />
        </>
      )}
    </>
  );
};

export default RegistrationForm;
