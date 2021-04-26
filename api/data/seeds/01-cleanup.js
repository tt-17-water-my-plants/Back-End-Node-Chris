const cleaner = require('knex-cleaner');

function cleanTables(knex) {
	return cleaner
		.clean(knex, {
			mode: 'truncate',
			restartIdentity: true, // ask PostgreSQL to reset the Primary Keys to 0
			ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
		})
		.then(() => console.log('All tables truncated, ready to seed!'));
}

exports.seed = function (knex) {
	return cleanTables(knex);
};
