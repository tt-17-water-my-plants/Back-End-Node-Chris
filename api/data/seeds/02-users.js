exports.seed = function (knex) {
	return knex('users').then(function () {
		return knex('users').insert([
			{
				username: 'Plantasaurus',
				password: '1234',
				phone_number: '1111111111',
			},
			{
				username: 'Plant Guy',
				password: '1234',
				phone_number: '2222222222',
			},
			{
				username: 'Plant Girl',
				password: '1234',
				phone_number: '3333333333',
			},
		]);
	});
};
