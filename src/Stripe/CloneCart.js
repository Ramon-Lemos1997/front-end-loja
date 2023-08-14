import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import CloneCartItem from "./CloneModelCart";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartAtcion";
import "../App.css";

const CloneCart = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();
 // console.log(cartItems)

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = Cookies.get("loggedInUser");
  
      if (token) {
        try {
          const response = await axios.get("http://localhost:3000/user/getCart", {
            headers: {
              authorization: token,
            },
          });

          const cartItemIds = response.data;

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
                setCartItems(response.data.itemSummary);
                dispatch(addToCart(response.data.itemSummary)); 
              } else {
                //console.log("Falha ao obter itens");
              }
            } catch (error) {
              //console.error(error);
            }
          }
        } catch (error) {
          //console.error(error);
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
          <ul>{cartItems.map((item) => (<CloneCartItem key={item._id} item={item} />))}</ul>
          <button className="FINALIZAR" onClick={props.onClick}>Finalizar compra</button>
        </div>
      ) : (
        <p className="no-items-message">Nenhum item no carrinho.</p>
      )}
    </section>
  );
};

export default CloneCart;