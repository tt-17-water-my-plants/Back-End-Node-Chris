const db = require('../../data/dbConfig');

function getById(id) {
	return db('users as u')
		.join('plants as p', 'u.user_id', 'p.user_id')
		.select(
			'u.user_id',
			'p.plant_id',
			'p.nickname',
			'p.species',
			'p.h2oFrequency'
		)
		.where('u.user_id', id);
}

function getByPlantId(id) {
	return db('plants').where({ plant_id: id }).first();
}

async function addPlant(plant) {
	const [id] = await db('plants').insert(plant, 'plant_id');
	return getByPlantId(id);
}

function editPlant(changes, id) {
	return db('plants').where({ plant_id: id }).update(changes);
}

function deletePlant(id) {
	return db('plants').where({ plant_id: id }).del();
}

module.exports = {
	getById,
	getByPlantId,
	addPlant,
	editPlant,
	deletePlant,
};
