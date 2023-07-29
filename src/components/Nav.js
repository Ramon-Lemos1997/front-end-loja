import React from "react";
import { Link } from "react-router-dom";

export default function Nav(props) {
  return (
    <nav className="container">
      {props.isLoggedIn ? (
        <>
          <button className="d">
            <Link to="/logout" className="link-no-decoration">
              Logout
            </Link>
          </button>
          <button className="e">
            <Link to="/home" className="link-no-decoration">
              Home
            </Link>
          </button>
          <button className="f">
            <Link to="/auth" className="link-no-decoration">
              verificados
            </Link>
          </button>
        </>
      ) : (
        <>
          <button className="a">
            <Link to={"/"} className="link-no-decoration">
              Página inicial
            </Link>
          </button>
          <button className="b">
            <Link to={"/login"} className="link-no-decoration">
              Login
            </Link>
          </button>
       
        </>
      )}
    </nav>
  );
};
