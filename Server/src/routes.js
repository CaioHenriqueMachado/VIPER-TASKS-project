const express = require('express');
const UserController = require('./controllers/UserController');
const AccountController = require('./controllers/AccountController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const connection = require('./database/connection');
const routes = express.Router();

// Listar usuários
routes.get('/users', UserController.index);
routes.post('/users', UserController.create);

routes.get('/accounts', AccountController.index);
routes.post('/accounts', AccountController.create);
routes.delete('/accounts/:id', AccountController.delete);

routes.get('/profile', ProfileController.index);

routes.post('/session', SessionController.create);

module.exports = routes;
// npm start