const nodemailer = require('nodemailer');
require('dotenv').config()
const mongoose = require('mongoose')

const USER_MAIL=process.env.USER_MAIL
const PASSWORD_MAIL=process.env.PASSWORD_MAIL


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: USER_MAIL,
        pass: PASSWORD_MAIL
    },
    tls: {
        rejectUnauthorized: false
    }
});

async function enviarMensagemBoasVindas(nomeCliente, emailCliente) {
    const mensagem = {
        from: '"Project Store" <noreply@example.com>', 
        to: emailCliente,
        subject: 'Bem-vindo(a) à nossa loja!!',
        text: `Olá ${nomeCliente}, \n\nObrigado por seu pedido! Esperamos que você goste dos produtos que comprou. \n\nAcesse sua conta para acompanhar o status do seu pedido: []. \n\nEm caso de dúvidas, entre em contato conosco pelo nosso suporte[]. \n\nAtenciosamente, \nEquipe da Project Store`
    };

    await transporter.sendMail(mensagem);
}

module.exports = {
    enviarMensagemBoasVindas
};
