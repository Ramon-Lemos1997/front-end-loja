import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from "socket.io-client";
import "../App.css"
//componente onde será redirecionado após o pagamento;
const Sucess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/store'); 
    }, 5000);
    const socket = io.connect("http://localhost:3000");
    socket.emit("getItems");
    

    setTimeout(() => {
     socket.disconnect();
    //console.log("Socket desconectado");
    }, 1000);
    return () => clearTimeout(timeout); // Limpa o timeout ao desmontar o componente
  }, [navigate]);

  return (
    <div className="thank-you-container">
      <h2 className="thank-you-heading">Obrigado por sua compra!</h2>
      <p className="thank-you-message">Volte sempre!</p>
    </div>
  );
};

export default Sucess;
