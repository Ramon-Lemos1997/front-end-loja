import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setPrice, setDescription, reset } from "../actions/newItemAction";
import { Link } from "react-router-dom";
import io from "socket.io-client";

const NewItems = () => {
  const category = useSelector((state) => state.new.category);
  const price = useSelector((state) => state.new.price);
  const description = useSelector((state) => state.new.description);
  const [send, setSend] = useState(false);
  const [error, setError] = useState(null); 
  const dispatch = useDispatch();


  const handleNewItem = async (e) => {
    e.preventDefault();
    if (!category && !price && !description) {
      return null;
    }
    const token = Cookies.get("loggedInUser");
  
    if (token) {
      try {
        const response = await axios.post(
          "http://localhost:3000/admin/newItem",
          {
            category,
            price,
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
          console.log("Item adicionado com sucesso");
          const socket = io.connect("http://localhost:3000");
          socket.emit("getItems");
          dispatch(reset());
  
          setTimeout(() => {
            socket.disconnect();
            console.log("Socket desconectado");
          }, 1000);
        
        } else {
          console.log("Falha ao adicionar o item");
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
        Cadastrar novo item</button>
        <button className="e">
        <Link to="/auth" className="link-no-decoration">
          Voltar para verificados
        </Link></button></div>
      ) : (
        <div className="form-container">
          <form onSubmit={handleNewItem} className="custom-form">
            <label className="custom-label">
              Categoria:
              <input
                type="text"
                value={category}
                onChange={(e) => dispatch(setCategory(e.target.value))}
                className="input"
              />
            </label>
            <label className="custom-label">
              Preço:
              <input
                type="number"
                value={price}
                onChange={(e) => dispatch(setPrice(parseFloat(e.target.value)))}
                className="input"
              />
            </label>
            <label className="custom-label">
              Descrição:
              <textarea
                value={description}
                onChange={(e) => dispatch(setDescription(e.target.value))}
                className="custom-textarea"
              />
            </label>
            <button type="submit" className="custom-button">
              Adicionar Item
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default NewItems;
