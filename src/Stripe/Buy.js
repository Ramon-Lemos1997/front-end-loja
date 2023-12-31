import React, { useState, useEffect } from "react";
import ProductDisplay from "./Product";
import Message from "./Message";


export default function App() {
  const [message, setMessage] = useState("");

  //componentes da disponibilizado pela Stripe;
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}