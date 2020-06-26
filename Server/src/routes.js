const express = require('express');
const UserController = require('./controllers/UserController');
const AccountController = require('./controllers/AccountController');
const connection = require('./database/connection');
const routes = express.Router();

// Listar usuários
routes.get('/users', UserController.index);

routes.post('/users', UserController.create);

routes.post('/accounts', AccountController.create);

module.exports = routes;