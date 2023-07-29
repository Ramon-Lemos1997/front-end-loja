import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const AuthComponent = () => {
  const [authenticated, setAuthenticated] = useState(false);

  const checkAuthentication = async () => {
    const token = Cookies.get("loggedInUser"); 

    if (token) {
      try {
        const response = await axios.get("http://localhost:3000/admin/auth", {
          headers: {
            Authorization: token 
          }
        });

        if (response.status === 200) {
          setAuthenticated(true);
          console.log("Usuário autenticado");
          console.log(response);
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
      <div className="center">
        <div className="vaiparaolado">Conteúdo autenticado</div>
        <button className="e">
          <Link to="/newItem" className="link-no-decoration">
            Adicionar um novo item
          </Link>
        </button>
      </div>
    ) : (
      <div>Você não possui permissão de administrador</div>
    )}
  </>
  );
};

export default AuthComponent;

