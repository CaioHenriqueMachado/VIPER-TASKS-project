
exports.up = function(knex) {
	return knex.schema.createTable('accounts', function (table) {
		table.increments();
		table.string('name').notNullable();
		table.string('account').notNullable();
		table.string('session').notNullable();

		table.string('user_id').notNullable();

		table.foreign('user_id').references('id').inTable('users');
	});
};

exports.down = function(knex) {
	return knex.schema.dropTable('accounts');

};
