import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import CartItem from "./ModelCart";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartAtcion";
import "../App.css"

const Cart = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();
 // console.log(cartItems)
  //primeiro pego o carrinho de compras do usuário pelo ID, 
  useEffect(() => {
    const fetchCartItems = async () => {
      const token = Cookies.get("loggedInUser"); //ID;
  
      if (token) {
        try {
          const response = await axios.get("http://localhost:3000/user/getCart", {
            headers: {
              authorization: token,
            },
          });

          const cartItemIds = response.data; //adiciono todos o id's dos items no estado,
          //se existir algum id e envio para o back-end onde recebo o dados do id's como nome, quantidade etc... e atualizo o estado com o dados resumidos e organizados;
          if (cartItemIds.length > 0) {
            try {
              const response = await axios.get("http://localhost:3000/user/getCartItems", {
                params: {
                  productId: cartItemIds,
                },
                headers: {
                  authorization: token,
                },
              });

              if (response.status === 200) {
                setCartItems(response.data.itemSummary); //salvo no estado local para exibição
                dispatch(addToCart(response.data.itemSummary)); //salvo no estado global para melhor UX e para enviar para Api de pagamento;;
              } else {
                //console.log("Falha ao obter itens");
              }
            } catch (error) {
              //console.error(error);
            }
          }
        } catch (error) {
         // console.error(error);
        }
      }
    };
    fetchCartItems();
  }, [dispatch]);

  return (
    <section>
      {cartItems.length > 0 ? (
        <div>
          <h2 className="relative">Itens no Carrinho:</h2>
          <ul>{cartItems.map((item) => (<CartItem key={item._id} item={item} />))}</ul>
          <button className="FINALIZAR" onClick={props.onClick}>Finalizar compra</button>
        </div>
      ) : (
        <p className="no-items-message">Nenhum item no carrinho.</p>
      )}
    </section>
  );
};

export default Cart;