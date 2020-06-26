const connection = require('../database/connection');
//Para criar sessão.

module.exports = {
	async create(request, response) {
        const { login, password } = request.body;

        const user = await connection('users')
        .where({login: login, password: password})
        .select('name')
        .first();

        if ( !user ) {
            return response.status(400).json({ error: 'Your login or password is incorrect' });
        }

        return response.json(user);
    }
}
