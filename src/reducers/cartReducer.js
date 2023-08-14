//para armazenar algo carrinho se quiser, passei para o back-end esta função;
const initialState = {
    cartItems: [], //aqui tenho um array de array, por isso uso o map;
  };
//aqui salvo o cart no estado global para enviar para Stripe;
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CART":
      return {
        cartItems: [action.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        cartItems: state.cartItems.map((currArray) =>
          currArray.map((item) =>
            item._id === action.payload //encontrar o item;
              ? item.count <= 1 //verifico se o item encontrado é menor que 1;
                ? null //se for menor ou igual a 1, retorno null para indicar que o item deve ser removido;
                : { ...item, count: item.count - 1 } //se for maior que 1, decrementa o count;
              : item //se o ID não bater, retorno o item sem modificar nada;
          ).filter((item) => item !== null) //remove os itens com valor null;
        ),
      };
    case "CLEAR_CART":
      return {
        cartItems: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
  