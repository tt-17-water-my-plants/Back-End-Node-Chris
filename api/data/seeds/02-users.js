exports.seed = function (knex) {
	return knex('users').then(function () {
		return knex('users').insert([
			{
				username: 'admin',
				password: 'admin',
				phone_number: '5558675309',
			},
			{
				username: 'Plant Guy',
				password: '1234',
				phone_number: '5555555555',
			},
			{
				username: 'Plant Girl',
				password: '1234',
				phone_number: '5555555556',
			},
		]);
	});
};
