import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../actions/cartAtcion"; 
import handleDeleteToCart from "./handleDeleteToCart";
import { useNavigate } from "react-router-dom";

const ModelCart = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); //para despachar um ação do redux;

  const handleRemoveFromCart = async () => {
    try {
      await handleDeleteToCart(item._id); //removo do database;
      //remover o item do estado global;
      await dispatch(removeFromCart(item._id)); //removo do estado global;
      navigate("/cproduct");
    } catch (error) {
      //console.error(error);
      //console.log("Falha ao excluir o item do carrinho");
    }
  };

  return (
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
      <div>
        <strong>Quantidade:</strong> {item.count}
      </div>
      <button className="relative" onClick={handleRemoveFromCart}>
        Remover do carrinho
      </button>
    </li>
  );
};

export default ModelCart;
