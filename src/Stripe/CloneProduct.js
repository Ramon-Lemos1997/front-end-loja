import React, {useState} from "react";
import axios from "axios"; 
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import CloneCart from "./CloneCart";
import "../App.css"

const CloneProduct = () => {
    const token = Cookies.get("loggedInUser"); 
    const cartItems = useSelector((state) => state.cart.cartItems); 
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
       
        const sessionUrl = response.data; 
        if(sessionUrl) {
          window.location.href = sessionUrl; 
        }
        } catch (error) {
          //console.error(error);
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
          <CloneCart onClick={handleCheckoutClick}/>
          {checkoutError ? <p className="err-message">{checkoutError}</p> : null}
        </section>
      </>
    );
};

export default CloneProduct;
