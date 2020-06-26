const connection = require('../database/connection');


module.exports = {
	async index(request, response) {
		const accounts = await connection('accounts').select('*');
	
		return response.json(accounts);
	},

	async create( request, response ) {
		const {name, account, session} = request.body;
		const user_id = request.headers.authorization;

		const [id] = await connection('accounts').insert({
			name,
			account,
			session,
			user_id,
		});

	return response.json({ id });
	},

	async delete(request, response) {
		const { id } = request.params;
		const user_id = request.headers.authorization;

		const account = await connection('accounts')
		.where('id', id)
		.select('user_id')
		.first();

		if( account.user_id != user_id){
			return response.status(401).json({error: 'Operation not permitted.'}); //Não autorizado
		}
	
		await connection('accounts').where('id', id).delete();

		return response.status(204).send();
	},
};