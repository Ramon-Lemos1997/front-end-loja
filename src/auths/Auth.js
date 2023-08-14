import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const AuthComponent = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
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
            
          } else {
            //console.log("Falha na autenticação");
          }
        } catch (error) {
          //console.error(error);
       
        }
      } else {
        //console.log("Token não encontrado");
      }
    };

    checkAuthentication();
  }, []); 

  return (
    <>
      {authenticated ? (
        <div className="center">
          <div className="vaiparaolado">Você possui credenciais para este acesso!</div>
          <button className="e">
            <Link to="/newItem" className="link-no-decoration">
              Adicionar um novo item
            </Link>
          </button>
          <button className="e">
            <Link to="/cartAuth" className="link-no-decoration">
              Ver items
            </Link>
          </button>
        </div>
      ) : (
        <p className="err-message">Você não possui credenciais para este tipo de acesso.</p>
      )}
    </>
  );
};

export default AuthComponent;
