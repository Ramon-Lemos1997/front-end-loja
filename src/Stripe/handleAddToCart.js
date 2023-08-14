import axios from "axios";
import Cookies from "js-cookie";
//adicionar um item no carrinho de compra do usuário, envia o id do item a ser adicionado;
const handleAddToCart = async (itemId) => {
  const token = Cookies.get("loggedInUser");
  const product_id = itemId;
  //console.log(itemId)
  
  if (token) {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/saveCart",
        { productId: product_id },
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (response.status === 200) {
        //console.log('Item adicionado com sucesso!');
      } else {
        console.log("Falha ao adicionar ao carrinho");
      }
    } catch (error) {
      //console.error(error);
      if (error.response && error.response.data) {
        return error.response.data;
      } else {
        return "Erro inesperado";
      }
    }
  }
};

export default handleAddToCart;
