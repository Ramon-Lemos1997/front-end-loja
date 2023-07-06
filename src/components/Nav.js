import React from "react";
import { Link} from "react-router-dom";

export default function Nav(props) {
  return (
    <nav className="container">
      
      <button >
        <Link to={"/logout"} className="link-no-decoration">Logout</Link> 
      </button>
      <button >
        <Link  to={"/login"} className="link-no-decoration">Login</Link> 
      </button>
      <button >
        <Link  to={"/register"} className="link-no-decoration">Registrar-se</Link> 
      </button>
    </nav>
  );
}
