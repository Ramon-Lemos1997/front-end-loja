import React, { useState, useEffect } from "react";
import axios from "axios";
import "../register.css";
import { useNavigate } from "react-router-dom";

const RecoveryForm = (props) => {
  const [email, setEmail] = useState("");
  const [recoveryError, setRecoveryError] = useState(null);
  const [recoverySuccess, setRecoverySuccess] = useState(false);
  const navigate = useNavigate();

  const handleFormRecovery = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/user/recovery",
        {
          email
        }
      );

      if (response.status === 200) {
        setRecoverySuccess(true);
      } else {
        console.log("Falha ao se comunicar com o email fornecido.");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setRecoveryError(error.response.data);
      } else {
        setRecoveryError("Erro inesperado");
      }
    }
  };

  useEffect(() => {
    if (recoverySuccess) {
      setTimeout(() => {
        navigate("/code");
      }, 2000);
    }
  }, [recoverySuccess, navigate]);

  return (
    <>
      {recoverySuccess ? (
        <div className="success-message-container">
          Código de recuperação enviado com sucesso. 
        </div>
      ) : (
        <div className="form-container">
          {recoveryError && (
            <div className="error-message-container">{recoveryError}</div>
          )}
          <form onSubmit={handleFormRecovery}>
            <div className="input-container">
              <input
                type="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="button"
              className="btn-register"
              onClick={handleFormRecovery}
            >
              Enviar código de recuperação para seu Email.
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default RecoveryForm;
