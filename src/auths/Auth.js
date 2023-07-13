import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthComponent = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const checkAuthentication = async () => {
    const token = Cookies.get("loggedInUser"); 

    if (token) {
      try {
        const response = await axios.get("http://localhost:3000/admin", {
          headers: {
            Authorization: token 
          }
        });

        if (response) {
          setAuthenticated(true);
          console.log("Usuário autenticado");
        } else {
          console.log("Falha na autenticação");
        }
      } catch (error) {
        console.error(error);
       
      }
    } else {
      console.log("Token não encontrado");
    }
  };

checkAuthentication();

  return (
    <>
      {authenticated ? (
        <div>Conteúdo autenticado</div>
      ) : (
        <div>Você não possui permissão de administrador</div>
      )}
    </>
  );
};

export default AuthComponent;

