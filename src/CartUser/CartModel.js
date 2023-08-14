import React, { useState } from "react";
import handleAddToCart from "../Stripe/handleAddToCart";
import { useNavigate } from "react-router-dom";

const CartModel = (props) => {
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate()
  //adicionar no carrinho e mostrar que adicionou;
  const handleAddToCartClick = async (itemId) => {
    await handleAddToCart(itemId);
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 1000); 
  }
  //função para quando clicar para comprar um item único adicionar ao carrinho e após 200 milisegundos ir para a página do carrinho com o item, o tempo é necessário para adicionar o item primeiro;
  const handleBuyNowClick = async (itemId) => {
    await handleAddToCart(itemId);
    setTimeout(() => {
      navigate("/product")
    }, 200);
  };

  return (
    <li className="linhas" key={props.item._id}>
      <div>
        <strong>Categoria:</strong> {props.item.category}
      </div>
      <div>
        <strong>Preço:</strong> {props.item.price}
      </div>
      <div>
        <strong>Descrição:</strong> {props.item.description}
      </div>
      <div>
        <strong>Quantidade:</strong> {props.item.stockQuantity}
      </div>
      <div className="buttons-container">
        {!showMessage && ( 
          <>
            <button className="relative" onClick={() => handleAddToCartClick(props.item._id)}>
              Adicionar ao carrinho
            </button>
            <button className="relative" onClick={() => handleBuyNowClick(props.item._id)}>
                Comprar agora 
            </button>
          </>
        )}
      </div>
      {showMessage && <p>Item adicionado</p>}
    </li>
  );
};

export default CartModel;

