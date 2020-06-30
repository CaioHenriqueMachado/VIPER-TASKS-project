const connection = require('../database/connection');


module.exports = {
    // Listar dados do perfil
	async index(request, response) {
        const user_id = request.headers.authorization;

        const datas_user = await connection('users')
            .where('id',user_id)
            .select('login','name', 'email')
            .first();

        return response.json(datas_user);
	}
}