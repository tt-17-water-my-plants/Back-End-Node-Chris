const Plants = require('../plants/model');
const Users = require('../users/model');

const validateUserId = async (req, res, next) => {
	const { id } = req.params;
	const validUser = await Users.getById(id);

	if (!validUser) {
		res.status(400).json({ message: 'Invalid User Id' });
	} else {
		next();
	}
};

const validatePlantId = async (req, res, next) => {
	const { id } = req.params;
	const validPlant = await Plants.getByPlantId(id);

	if (!validPlant) {
		res.status(400).json({ message: 'Invalid plant Id' });
	} else {
		next();
	}
};

module.exports = {
	validateUserId,
	validatePlantId,
};
