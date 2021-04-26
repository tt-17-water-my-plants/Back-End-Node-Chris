exports.up = function (knex) {
	return knex.schema
		.createTable('users', (tbl) => {
			tbl.increments('user_id');
			tbl.string('username', 128).notNullable().unique();
			tbl.string('password', 128).notNullable();
			tbl.string('phone_number').notNullable();
		})
		.createTable('plants', (tbl) => {
			tbl.increments('plant_id');
			tbl.string('nickname', 128).notNullable();
			tbl.string('species', 128).notNullable();
			tbl.string('h2oFrequency', 128).notNullable();
			tbl.string('image_url', 255);
			tbl
				.integer('user_id')
				.references('user_id')
				.inTable('users')
				.onDelete('CASCADE');
		});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('plants').dropTableIfExists('users');
};
