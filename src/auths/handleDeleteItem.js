import axios from "axios";
import Cookies from "js-cookie";
import io from "socket.io-client";


const handleDeleteItem = async (itemId) => {
  try {
    const token = Cookies.get("loggedInUser");
    //console.log(token)
    const _idItem = itemId;
    if(!_idItem){
      return;
    }
    const response = await axios.delete(
      "http://localhost:3000/admin/deleteItem",
      {
        data: { _idItem }, 
        headers: {
          Authorization: token,
        },
      }
    );

    if (response.status === 200) {
      //console.log("Item excluído com sucesso!");
      const socket = io.connect("http://localhost:3000");
      socket.emit("getItems");
      
      setTimeout(() => {
       socket.disconnect();
      //console.log("Socket desconectado");
      }, 1000);
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


export default handleDeleteItem;
