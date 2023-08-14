import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../register.css";
import { useNavigate } from "react-router-dom";

const NewPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const navigate = useNavigate();

  const handlePassword = async (e) => {
    e.preventDefault();
    const token = Cookies.get("Code");
    if(!password){
      return;
    }
    const newPassword = password;
    try {
      const response = await axios.put(
        "http://localhost:3000/user/resetPass",
        { newPassword },
        {
          headers: {
            Authorization: token
          }
        }
      );

      if (response.status === 200) {
        setPasswordSuccess(true);
      } else {
        //console.log("Falha ao redefinir senha.");
      }
    } catch (error) {
      //console.error(error);
      if (error.response && error.response.data) {
        setPasswordError(error.response.data);
      } else {
        setPasswordError("Erro inesperado");
      }
    }
  };

  useEffect(() => {
    if (passwordSuccess) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [passwordSuccess, navigate]);

  return (
    <>
      {passwordSuccess ? (
        <div className="success-message-container">
          Senha redefinida com sucesso. 
        </div>
      ) : (
        <>
          {passwordError ? (
            <div className="error-message-container">{passwordError}</div>
          ) : null}
          <div className="form-container">
            <form onSubmit={handlePassword}>
              <div className="input-container">
                <input type="password" className="input" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="button" className="btn-register" onClick={handlePassword}> Redefinir senha </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default NewPasswordForm;
