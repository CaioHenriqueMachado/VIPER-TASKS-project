const express = require('express');
const crypto = require('crypto');
const connection = require('./database/connection');
const { response } = require('express');
const routes = express.Router();


routes.get('/users', async (request, response) => {
	const users = await connection('users').select('*');

	return response.json(users);

});

routes.post('/users', async(request, response) => {
	const { login, password, name, email } = request.body;
	const blocked = false;
	const admin = false;
	const id = crypto.randomBytes(4).toString('HEX');

	await connection('users').insert({
		id,
		login,
		password,
		name,
		email,
		blocked,
		admin,
	})

	return response.json({ id });
});

module.exports = routes;