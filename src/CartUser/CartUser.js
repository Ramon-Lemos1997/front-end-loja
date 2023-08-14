import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import CartModel from "./CartModel";

const CartUser = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
        try {
          const token = Cookies.get("loggedInUser");
          const response = await axios.get("http://localhost:3000/user/getItem", {
            headers: {
              Authorization: token,
            },
          });

          if (response.status === 200) {
            //setItems(response.data);
            setError(null);
          } else {
            //console.log("Falha ao obter items");
          }
        } catch (error) {
          //console.error(error);
          if (error.response && error.response.data) {
            setError(error.response.data);
          } else {
            setError("Erro inesperado");
          }
        }
      
    };
    //pego o items pelo socket;
    const socket = io.connect("http://localhost:3000");
    socket.emit("getItems");
    socket.on("allItems", (itemsWithStock) => {
      setItems(itemsWithStock);
    });

    fetchItems();
    
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      {error ? <div className="error-message-container">{error}</div> : null}

      <button className="b">
        <Link to="/product" className="link-no-decoration">
          Ver carrinho
        </Link>
      </button>
      {/*faço um map para me inteirar sobre cada objeto*/ }
      {items.length > 0 ? (
        <div>
          <h2 className="relative">Lista de Itens:</h2>
          <ul>
            {items.map((item) => (<CartModel key={item._id} item={item} />))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default CartUser;
