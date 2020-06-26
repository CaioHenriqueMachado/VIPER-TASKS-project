const connection = require('../database/connection');


module.exports = {
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
	}
};