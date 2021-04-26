const Users = require('../users/model');

module.exports = async (req, res, next) => {
	const { username } = req.body;
	const user = await Users.getByUsername(username);

	if (user) {
		res.status(400).json({ message: 'Username taken' });
	} else {
		next();
	}
};
