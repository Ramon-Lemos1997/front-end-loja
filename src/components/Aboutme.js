import React from "react";
import "../About.css";
import { Link } from "react-router-dom";

const AboutMe = () => {
  return (
    <div className="about-me-container">
      <h1>Hello World</h1>
      <p>
        Olá! Me chamo Ramon, um entusiasta da tecnologia e desenvolvedor de software apaixonado por criar soluções criativas e funcionais.
        Minha jornada no mundo da programação começou com jogos e hoje sou um desenvolvedor.
      </p>
      <p>
        Desde então, tenho me dedicado a aprender e aprimorar minhas habilidades em várias tecnologias, frameworks e linguagens.
        Atualmente estou a procura de uma vaga, sou Full Stack.
      </p>
      <p>
        Neste projeto fiz integração com a API de pagamento da STRIPE, lidei com cenários complexos de autenticações, segurança, transmissão de dados em tempo reais entre muitos outros casos.
      </p>
      <p>
        Este projeto foi desenvolvido utilizando JavaScript, React, Redux no front-end, fiz uso de múltiplas bibliotecas como socketIO, axios entre outros. 
        Para o back-end utilizei o NodeJs, fiz uso de múltiplas bibliotecas novamente, como express, cors, socketIO, lodash, bcrypt, JWT, crypto, nodemailer, hapiJoi, dotenv, utilizei o banco de dados MongoBD.
      </p>
      <p>
        Se você quiser entrar em contato comigo para discutir projetos, colaborações ou apenas trocar ideias, fique à vontade para
        me enviar um e-mail <Link to="mailto:johnnyramon2011@gmail.com"><img className="emailicon" src="https://i.ibb.co/qkq8QDg/undraw-Opened-re-i38e.png" alt="Ícone de e-mail" /></Link>
        ou me chamar pelo telefone <Link to="https://api.whatsapp.com/send?phone=5535999482018"><img className="whatsapp-link" src="https://i.ibb.co/qJqft5g/image3.png" alt="WhatsApp" /></Link>.
      </p>
      
    </div>
  );
};

export default AboutMe;
