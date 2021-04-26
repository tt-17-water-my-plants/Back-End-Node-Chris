exports.up = function (knex) {
	return knex.schema
		.createTable('users', (table) => {
			table.increments('user_id');
			table.string('username', 128).notNullable().unique();
			table.string('password', 128).notNullable();
			table.bigInteger('phone_number').notNullable();
		})
		.createTable('plants', (table) => {
			table.increments('plant_id');
			table.string('nickname', 128).notNullable();
			table.string('species', 128).notNullable();
			table.string('h2oFrequency', 128).notNullable();
			table
				.integer('user_id')
				.references('user_id')
				.inTable('users')
				.onDelete('CASCADE');
		});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('plants').dropTableIfExists('users');
};
