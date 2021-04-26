const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/secret');

module.exports = (req, res, next) => {
	const token = req.headers.authorization;

	if (token) {
		jwt.verify(token, jwtSecret, (err) => {
			if (err) {
				res.status(401).json({ message: 'Token invalid' });
			} else {
				next();
			}
		});
	} else {
		res.status(401).json({ message: 'No token' });
	}
};
