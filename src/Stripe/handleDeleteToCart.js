import axios from "axios";
import Cookies from "js-cookie";

//envia um delete para o back-end, envia o id para ser removido;
const handleDeleteToCart = async (itemId) => {
  try {
    const token = Cookies.get("loggedInUser");
    const productId = itemId;
    
    const response = await axios.delete(
      "http://localhost:3000/user/deleteCart",
      {
        data: { productId }, 
        headers: {
          Authorization: token,
        },
      }
    );

    if (response.status === 200) {
      //console.log("Item excluído do carrinho com sucesso!");
    } else {
      //console.log("Falha ao excluir o item");
    }
  } catch (error) {
    //console.error(error);
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return "Erro inesperado";
    }
  }
};


export default handleDeleteToCart;
