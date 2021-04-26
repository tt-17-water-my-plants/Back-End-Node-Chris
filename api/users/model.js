const db = require('../data/dbConfig');

function getAll() {
	return db('users')
		.select('user_id', 'username', 'phone_number')
		.orderBy('user_id');
}

function getById(id) {
	return db('users')
		.where({ user_id: id })
		.select('user_id', 'username', 'phone_number')
		.first();
}

function getByUsername(username) {
	return db('users')
		.where({ username: username })
		.select('user_id', 'username', 'password')
		.first();
}

async function addUser(user) {
	const [id] = await db('users').insert(user, 'user_id');
	return getById(id);
}

function editUser(changes, id) {
	return db('users').where({ user_id: id }).update(changes);
}

module.exports = {
	getAll,
	getById,
	getByUsername,
	addUser,
	editUser,
};
