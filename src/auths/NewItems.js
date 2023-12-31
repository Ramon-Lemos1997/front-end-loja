import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../actions/newItemAction";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import NewItemForm from "./NewItemForm";

const NewItems = () => {
  const category = useSelector((state) => state.new.category);
  const price = useSelector((state) => state.new.price);
  const stockQuantity = useSelector((state) => state.new.quantity);
  const description = useSelector((state) => state.new.description);
  const [send, setSend] = useState(false);
  const [error, setError] = useState(null); 
  const dispatch = useDispatch();


  const handleNewItem = async (e) => {
    e.preventDefault();
    if (!category && !price && !description && !stockQuantity) {
      return;
    }
    const token = Cookies.get("loggedInUser");
  
    if (token) {
      try {
        const response = await axios.post(
          "http://localhost:3000/admin/newItem",
          {
            category,
            price,
            stockQuantity,
            description,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
  
        if (response.status === 200) {
          setSend(true);
          setError(null);
          //console.log("Item adicionado com sucesso");
          const socket = io.connect("http://localhost:3000");
          socket.emit("getItems");
          dispatch(reset());
  
          setTimeout(() => {
            socket.disconnect();
            //console.log("Socket desconectado");
          }, 1000);
        
        } else {
          //console.log("Falha ao adicionar o item");
        }
      } catch (error) {
        console.error(error);
        if (error.response && error.response.data) {
          setError(error.response.data); 
        } else {
          setError("Erro inesperado"); 
        }
      }
    };
  };
  
  const handleReloadForm = () => {
    setSend(false); 
    dispatch(reset()); 
  };

  return (
    <>
      {error ? (
        <div className="error-message-container">
          {error}
        </div>
      ) : null}

      {send ? (
        <div className="sucess-message-container">
          <div className="item">Item cadastrado com sucesso!</div>
          <button className="newform" onClick={handleReloadForm}>
            Cadastrar novo item
          </button>
          <button className="e">
            <Link to="/auth" className="link-no-decoration">
              Voltar
            </Link>
            </button>
        </div>
      ) : (
        <div className="form-container">
          <NewItemForm onSubmit={handleNewItem} />
        </div>
      )}
    </>
  );
};

export default NewItems;
