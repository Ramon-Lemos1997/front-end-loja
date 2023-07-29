import React, { useState, useEffect } from "react";
import axios from "axios";
import "../register.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const CodeForm = (props) => {
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(null);
  const [codeSuccess, setCodeSuccess] = useState(false);
  const navigate = useNavigate();

  const handleCodeRecovery = async (e) => {
    e.preventDefault();
    const recoveryCode = code;
    try {
      const response = await axios.post(
        "http://localhost:3000/user/code",
        {
          recoveryCode
        }
      );

      if (response.status === 200) {
        Cookies.set("User", response.data, { secure: true });
        setCodeSuccess(true);
      } else {
        console.log("Falha ao enviar o código de recuperação.");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setCodeError(error.response.data);
      } else {
        setCodeError("Erro inesperado");
      }
    }
  };

  useEffect(() => {
    if (codeSuccess) {
       setTimeout(() => {
        navigate("/newPass");
      }, 2000);
    }
  }, [codeSuccess, navigate]);

  return (
    <>
      {codeSuccess ? (
        <div className="success-message-container">
          Código de recuperação enviado com sucesso.
        </div>
      ) : (
        <>
          {codeError ? (
            <div className="error-message-container">{codeError}</div>
          ) : null}
          <div className="form-container">
            <form onSubmit={handleCodeRecovery}>
              <div className="input-container">
                <input
                  type="code"
                  className="input"
                  placeholder="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>

              <button
                type="button"
                className="btn-register"
                onClick={handleCodeRecovery}
              >
                Enviar código
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default CodeForm;
