import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../actions/newItemAction";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import EditItemsForm from "./FormEdit";


const EditItems = () => {
  const navigate = useNavigate();
  const category = useSelector((state) => state.new.category);
  const price = useSelector((state) => state.new.price);
  const stockQuantity = useSelector((state) => state.new.quantity);
  const description = useSelector((state) => state.new.description);
  const [send, setSend] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const _itemId = location?.state.itemId 
  Cookies.set("_id", _itemId, { secure: true, sameSite:"Strict" });
  
  const handleNewItem = async (e) => {
    e.preventDefault();
    if (!category && !price && !description && !stockQuantity) {
      return;
    }
    const token = Cookies.get("loggedInUser");
    const id = Cookies.get("_id");
    //console.log(token)
    
    if (token) {
      try {
        const response = await axios.put(
          "http://localhost:3000/admin/editItem",
          { 
            category,
            price,
            stockQuantity,
            description,

          },
          {
            headers: {
              Authorization: token,
              id: id,
            },
          }
        );

        if (response.status === 200) {
          Cookies.remove("_id");
          setSend(true);
          setError(null);
          //console.log("Item editado com sucesso");
          const socket = io.connect("http://localhost:3000");
          socket.emit("getItems");
          dispatch(reset());

          setTimeout(() => {
            socket.disconnect();
            //console.log("Socket desconectado");
          }, 1000);

        } else {
          //console.log("Falha ao editar o item");
        }
      } catch (error) {
        //console.error(error);
        if (error.response && error.response.data) {
          setError(error.response.data);
        } else {
          setError("Erro inesperado");
        }
      }
    }
  };
  useEffect(() => {
    if (send) {
      setTimeout(() => {
        navigate("/auth"); 
      }, 2000);
    }
  }, [send, navigate]);

  
  return (
    <>
      {error ? (
        <div className="error-message-container">
          {error}
        </div>
      ) : null}

      {send ? (
        <div className="sucess-message-container">
          <div className="item">Item editado com sucesso!</div>
        </div>
      ) : (
        <div className="form-container">
          <EditItemsForm onSubmit={handleNewItem} />
        </div>
      )}
    </>
  );
};

export default EditItems;
