const connection = require('../database/connection');


module.exports = {
	async index(request, response) {
		const tasks = await connection('tasks').select('*');
	
		return response.json(tasks);
	},

	async create( request, response ) {
		const {name, description, difficulty} = request.body;
		const user_id = request.headers.authorization;
		const concluded = false;

		const [id] = await connection('tasks').insert({
			name,
			description,
			difficulty,
			concluded,
			user_id,
		});

	return response.json({ id });
	},

	async update( request, response ) {
		const { id } = request.params;
		const {name, description, difficulty, concluded} = request.body;
		const user_id = request.headers.authorization;

		const task = await connection('tasks')
		.where('id', id)
		.select('user_id')
		.first();

		if( task.user_id != user_id){
			return response.status(401).json({error: 'Operation not permitted.'}); //Não autorizado
		}

		await connection('tasks').where('id', id).update({
			'name': name,
			'description': description,
			'difficulty':difficulty,
			'concluded':concluded


		});

		return response.status(200).send();

	},

	async delete(request, response) {
		const { id } = request.params;
		const user_id = request.headers.authorization;

		const task = await connection('tasks')
		.where('id', id)
		.select('user_id')
		.first();

		if( task.user_id != user_id){
			return response.status(401).json({error: 'Operation not permitted.'}); //Não autorizado
		}
	
		await connection('tasks').where('id', id).delete();

		return response.status(204).send();
	},
};