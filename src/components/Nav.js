import React from "react";
import { Link } from "react-router-dom";

const Nav = (props) => {

  return (
    <nav className="container">
      {props.isLoggedIn ? (
        <>
          <button className="a">
            <Link to={"/index"} className="link-no-decoration">
              Sobre mim
            </Link>
          </button>
          <button className="d">
            <Link to="/logout" className="link-no-decoration">
              Logout
            </Link>
          </button>
          <button className="e">
            <Link to="/store" className="link-no-decoration">
              Store
            </Link>
          </button>
          <button className="f">
            <Link to="/auth" className="link-no-decoration">
              Admin's
            </Link>
          </button>
        </>
      ) : (
        <>
          <button className="a">
            <Link to={"/index"} className="link-no-decoration">
              Sobre mim
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

export default Nav;