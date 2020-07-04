const connection = require('../database/connection');
//Para criar sessão.

module.exports = {
	async create(request, response) {
        const { login, password } = request.body;

        const user = await connection('users')
        .where({login: login, password: password})
        .select('name','id')
        .first();

        if ( !user ) {
            return response.status(400).json({ error: 'Your login or password is incorrect' });
        }

        return response.json(user);
    },

    async update( request, response ) {
        const  id_autho  = request.headers.authorization;
        const { id } = request.params;
		const { password, new_password, confirm_new_password } = request.body;


		const user = await connection('users')
        .where('id', id_autho)
        .select('*')
		.first();

		if( user.id !== id){
			return response.status(401).json({error: 'Operation not permitted.'}); //Não autorizado
        }
        
        if ( user.password !== password ){
            return response.status(401).json({error: 'Operation not permitted.'}); //Não autorizado
        }

        if ( new_password !== confirm_new_password ){
            return response.status(401).json({error: 'Operation not permitted.'}); //Não autorizado
        }

        if ( new_password === password ){
            return response.status(401).json({error: 'Operation not permitted.'}); //Não autorizado
        }

		await connection('users').where('id', id).update({
			'password': new_password,

		});

		return response.status(200).send();

	},


}
