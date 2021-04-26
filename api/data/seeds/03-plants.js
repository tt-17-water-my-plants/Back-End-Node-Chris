exports.seed = function (knex) {
	return knex('plants').then(function () {
		return knex('plants').insert([
			{
				nickname: 'rich',
				species: 'money tree',
				h2oFrequency: 'daily',
				user_id: 3,
			},
			{
				nickname: 'treebeard',
				species: 'ent',
				h2oFrequency: 'weekly',
				user_id: 1,
			},
			{
				nickname: 'yggdrasill',
				species: 'world tree',
				h2oFrequency: 'bi-millennial',
				user_id: 2,
			},
		]);
	});
};
