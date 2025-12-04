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

// Lógica de conexão do chat (server.js)
io.on('connection', (socket) => {
    // 1. Recebe o nome de usuário (NOVO)
    socket.on('set user', (username) => {
        socket.username = username; // Armazena o nome na conexão
        const joinMsg = { user: 'Admin', text: `${username} entrou no chat!` };
        io.emit('chat message', joinMsg); // Broadcast do log de entrada
    });

    // ... código de envio de mensagem existente ...
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    // 2. Adapta o disconnect para usar o nome armazenado
    socket.on('disconnect', () => {
        if (socket.username) { // Verifica se o nome foi definido
            const leaveMsg = { user: 'Admin', text: `${socket.username} saiu do chat!` };
            io.emit('chat message', leaveMsg); // Broadcast do log de saída
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Servidor de Chat rodando na porta ${PORT}`);
});