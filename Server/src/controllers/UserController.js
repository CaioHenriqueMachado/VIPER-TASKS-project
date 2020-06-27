const connection = require('../database/connection');
const crypto = require('crypto');


module.exports = {
	// Só vai ser usado caso crie um admin
	async index(request, response) {
		const users = await connection('users').select('*');
	
		return response.json(users);
	},

	async create( request, response ) {
		const { login, password, name, email } = request.body;
		const blocked = false;
		const admin = true;
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
	}
}