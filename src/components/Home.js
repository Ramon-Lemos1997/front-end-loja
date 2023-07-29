import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import io from "socket.io-client";


const Home = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      const token = Cookies.get("loggedInUser");
      if (token) {
        try {
          const response = await axios.get("http://localhost:3000/user/getItem", {
            headers: {
              Authorization: token,
            },
          });

          if (response.status === 200) {
            setItems(response.data); 
            setError(null);
            console.log("Itens obtidos com sucesso");
          } else {
            console.log("Falha ao obter itens");
          }
        } catch (error) {
          console.error(error);
          if (error.response && error.response.data) {
            setError(error.response.data); 
          } else {
            setError("Erro inesperado");
          }
        }
      }
    };
    const socket = io.connect("http://localhost:3000");

    socket.emit("getItems");
    socket.on("allItems", (allItems) => {
       setItems(allItems);
       console.log(allItems);
    });
    fetchItems();
    return () => {
      socket.disconnect();
    };
  }, []);



  return (
    <>
      {error ? (
        <div className="error-message-container">{error}</div>
      ) : null}

      {items.length > 0 ? (
        <div>
          <h2>Lista de Itens:</h2>
          <ul>
            {items.map((item) => (
              <li className="linhas" key={item._id}>
                <div>
                  <strong>Categoria:</strong> {item.category}
                </div>
                <div>
                  <strong>Preço:</strong> {item.price}
                </div>
                <div>
                  <strong>Descrição:</strong> {item.description}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
};




export default Home;
