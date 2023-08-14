import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import Login from "./Login/Login";
import { Nav } from "./Components/Nav";
import "./App.css";
import CartUser from "./CartUser/CartUser";
import Cookies from "js-cookie";
import Logout from "./Login/Logout";
import Register from "./Register/Register";
import Auth from "./auths/Auth";
import Email from "./RecoveryPassword/Email";
import Code from "./RecoveryPassword/SendCode";
import NewPass from "./RecoveryPassword/NewPassword";
import NewItems from "./auths/NewItems";
import CartAuth from "./auths/CartAuth";
import EditItems from "./auths/EditItem";
import Buy from "./Stripe/Buy";
import Product from "./Stripe/Product";
import CloneProduct from "./Stripe/CloneProduct";
import Success from "./Checkout/Success";
import AboutMe from "./Components/Aboutme";



//crio o store com os reducers
const store = createStore(rootReducer);

const App = () => {
  //estado para renderizar se estiver logado;
  const [loggedIn, setLoggedIn] = useState(false);
  //checagem a cada 1day minutos para ver se o usuário perdeu o acesso e retirar a permissão;
  useEffect(() => {
    const checkLoggedInUser = () => {
      const loggedInUser = Cookies.get("loggedInUser");
      if (loggedInUser) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        Cookies.remove("loggedInUser");
        
      }
    };
    checkLoggedInUser();
    const interval = setInterval(checkLoggedInUser, 24 * 60 * 60 * 1000);
    //limpra o intervalo quando é desmontado o componente;
    return () => clearInterval(interval);
  }, []);
  //mudar o estado do login na hora;
  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };
  //mudar o estado para o logout;
  const handleLogoutSuccess= () => {
    setLoggedIn(false);
  }
  return (
     //provider para toda minha rota conhecer meu store; //poderia adicionar o provider ao index para o pegar todo app, mas aqui atende a necessidade atual;
    <Provider store={store}>
      <Router>
        <Nav isLoggedIn={loggedIn}/> 
        <Routes>
          
          <Route exact path="/login" element={loggedIn ? <Navigate to="/index"/> : <Login onLoginSuccess={handleLoginSuccess} />}/>;
          <Route exact path="/logout" element= {loggedIn ? <Logout onLogoutSuccess={handleLogoutSuccess} /> : <Navigate to="/index" />}/>;
          <Route exact path="/store" element={loggedIn ? <CartUser /> : <Navigate to="/login" />}/>;
          <Route exact path="/auth" element={loggedIn ? <Auth /> : <Navigate to="/login" />}/>;
          <Route exact path="/register" element={!loggedIn ? <Register /> : <Navigate to="/index" />}/>;
          <Route exact path="/email" element={!loggedIn ? <Email /> : <Navigate to="/index" />}/>;
          <Route exact path="/code" element={!loggedIn ? <Code /> : <Navigate to="/index" />}/>;
          <Route exact path="/newPass" element={!loggedIn ? <NewPass /> : <Navigate to="/index" />}/>;
          <Route exact path="/newItem" element={loggedIn ? <NewItems /> : <Navigate to="/index" />}/>;
          <Route exact path="/cartAuth" element={loggedIn ? <CartAuth /> : <Navigate to="/index" />}/>;
          <Route exact path="/edit" element={loggedIn ? <EditItems /> : <Navigate to="/index" />}/>;
          <Route exact path="/buy" element={loggedIn ? <Buy /> : <Navigate to="/index" />}/>;
          <Route exact path="/product" element={loggedIn ? <Product /> : <Navigate to="/index" />}/>;
          <Route exact path="/cproduct" element={loggedIn ? <CloneProduct /> : <Navigate to="/index" />}/>;
          <Route exact path="/success" element={ <Success />}/>;
          <Route exact path="/index" element={ <AboutMe />}/>;
          <Route exact path="" element={ <AboutMe />}/>;
         
          
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
