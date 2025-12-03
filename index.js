// server.js
const express = require('express');//IMPORTA A BIBLIOTECA EXPRESS E GUARDA NO OBJETO EXPRESS
const http = require('http');//IMPORTA A BIBLIOTECA HTTP E GUARDA NO OBJETO HTTP
const socketIo = require('socket.io');//IMPORTA A BIBLIOTECA SOCKET.IO E GUARDA NO OBJETO SOCKETIO

const app = express();//EXECUTA EXPRESS COMO UMA FUNÇÃO E ARMAZENA O VALOR NO OBJETO APP
const server = http.createServer(app); //INTEGRA A BIBLIOTECA EXPRESS AO SERVIDOR - PERMITE ESCUTAR REQUISIÇÕES

// Configuração do Socket.IO
const io = socketIo(server, {
    cors: { origin: "*", methods: ["GET", "POST"] } // Permite conexões do seu frontend no Netlify
});

// Lógica de conexão do chat (será expandida depois)
io.on('connection', (socket) => {
    console.log('🔌 Novo usuário conectado!');
        socket.on('chat message', (msg) => {
            io.emit('chat message', msg);
        });
    socket.on('disconnect', () => {
        console.log('❌ Usuário desconectado');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Servidor de Chat rodando na porta ${PORT}`);
});