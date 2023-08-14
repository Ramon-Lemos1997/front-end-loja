import React, { useState } from "react";
import axios from "axios"; 
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import Cart from "./Cart";
import "../App.css"
//criei um clone onde removo um item ai mudo para o clone para melhor experiência do usuário;
const Product = () => {
    const token = Cookies.get("loggedInUser"); //dados do usuário;
    const cartItems = useSelector((state) => state.cart.cartItems); //estado global;
    const [checkoutError, setCheckoutError] = useState(null); 

    const handleCheckoutClick = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3002/api/create-checkout-session",
                { 
                    productId: cartItems
                },
                {
                    headers: {
                        authorization: token, 
                    },
                }
            );
            //Url da página da stripe;
            const sessionUrl = response.data; 
            if(sessionUrl) {
                window.location.href = sessionUrl; 
            }
        } catch (error) {
            //console.error(error); captura o erro e salva no estado para exibição;
            if (error.response && error.response.data) {
                setCheckoutError(error.response.data); 
            } else {
                setCheckoutError("Erro ao processar a compra. Por favor, tente novamente mais tarde.");
            }
        }
    };

    return (
      <>
        <section>
            <Cart onClick={handleCheckoutClick}/>
            {checkoutError ? <p className="err-message">{checkoutError}</p> : null}
        </section>
      </>
    );
};

export default Product;
