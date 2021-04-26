const { jwtSecret } = require('../config/secret');
const jwt = require('jsonwebtoken');

module.exports = (user) => {
	const payload = {
		subject: user.user_id,
		username: user.username,
		phone_number: user.phone_number,
	};
	const options = {
		expiresIn: '1d',
	};
	return jwt.sign(payload, jwtSecret, options);
};
