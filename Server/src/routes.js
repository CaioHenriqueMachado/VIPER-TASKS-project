const express = require('express');
const UserController = require('./controllers/UserController');
const TaskController = require('./controllers/TaskController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const connection = require('./database/connection');
const routes = express.Router();

// Listar usuários
routes.get('/users', UserController.index);
routes.post('/users', UserController.create);
routes.put('/users/:id', UserController.update);


routes.get('/task/:id', TaskController.show);
routes.get('/tasks', TaskController.index);
routes.post('/tasks', TaskController.create);
routes.put('/tasks/:id', TaskController.update);
routes.delete('/tasks/:id', TaskController.delete);


routes.get('/profile', ProfileController.index);

routes.post('/session', SessionController.create);
routes.put('/sessions/:id', SessionController.update);

module.exports = routes;
// npm start