import React from "react";
import { useDispatch } from "react-redux";
import { setCategory, setPrice, setDescription, setQuantity } from "../actions/newItemAction";
import { Link } from "react-router-dom";

const FormEdit = (props) => {
  const dispatch = useDispatch();

  return (
    <form onSubmit={props.onSubmit} className="custom-form">
      <label className="custom-label">
        Categoria:
        <input
          type="text"
          onChange={(e) => dispatch(setCategory(e.target.value))}
          className="input"
        />
      </label>
      <label className="custom-label">
        Preço:
        <input
          type="number"
          onChange={(e) => dispatch(setPrice(parseFloat(e.target.value)))}
          className="input"
        />
      </label>
      <label className="custom-label">
        Quantidade:
        <input
          type="number"
          onChange={(e) => dispatch(setQuantity(parseInt(e.target.value)))}
          className="input"
        />
      </label>
      <label className="custom-label">
        Descrição:
        <textarea
          onChange={(e) => dispatch(setDescription(e.target.value))}
          className="custom-textarea"
        />
      </label>
      <button type="submit" className="custom-button">
        Editar Item
      </button>
      <button className="e">
        <Link to="/auth" className="link-no-decoration">
          Voltar
        </Link>
      </button>
    </form>
  );
};

export default FormEdit;
