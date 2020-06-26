const express = require('express');

const routes = express.Router();

routes.get('/user', (request, response) => {
	return response.json({
		event: 'Semana',
		aluno: 'Caio'
	});
});

module.exports = routes