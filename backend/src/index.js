const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const http = require('http');

const routes = require('./routes');
const { setupWebscoket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebscoket(server);


mongoose.connect('mongodb+srv://guintoki:123698745@cluster0-diu4g.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.use(cors());
app.use(express.json());

// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de Parâmetros:

// Query Params: request.query (Filtros. ordenação, paginação...)
// Route Params: request.params(Identificar um recurso na alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

// MongoDB (Não-relacional)

app.use(routes);

server.listen(3333);