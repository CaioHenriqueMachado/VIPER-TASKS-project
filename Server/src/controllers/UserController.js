const connection = require('../database/connection');
const GetDate = require('../controllers/GetDateController');
const crypto = require('crypto');
// const { exit } = require('process');

module.exports = {
	// Só vai ser usado caso crie um admin
	async index(request, response) {
		const users = await connection('users').select('*');
	
		return response.json(users);
	},

	async create( request, response ) {
		const { login, password, name, email } = request.body;
		const id = crypto.randomBytes(30).toString('HEX');
		const created_at = GetDate();
		const updated_at = created_at
		console.log(created_at);
		if (login.length < 4 || password.length < 8 || name.length < 4 || email.length < 7){
			return response.status(401).json({error: 'Operation not permitted.'}); //Não autorizado
		}
	
		await connection('users').insert({
				id,
				login,
				password,
				name,
				email,
				created_at,
				updated_at
		});
		return response.json({ id });
	
	},

	async update( request, response ) {
		const  id  = request.headers.authorization;
		const { name, email, login } = request.body;
		const updated_at = GetDate();

		if (login.length < 4 || name.length < 4 || email.length < 7){
			return response.status(401).json({error: 'Operation not permitted.'}); //Não autorizado
		}

		const user = await connection('users')
		.where('id', id)
		.first();

		if( user.id != id){
			return response.status(401).json({error: 'Operation not permitted.'}); //Não autorizado
		}

		await connection('users').where('id', id).update({
			'name': name,
			'email': email,
			'login': login,
			'updated_at': updated_at
		});

		return response.status(200).send();

	},
}