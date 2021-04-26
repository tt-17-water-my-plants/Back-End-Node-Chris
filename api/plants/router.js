const express = require('express');
const router = express.Router();
const Plants = require('./model');

// Middleware
const verifyToken = require('../middleware/verifyToken');
const {
	validatePlantId,
	validateUserId,
} = require('../middleware/idValidaters');
const { plantChecker } = require('../middleware/payloadCheckers');

router.get('/:id', validateUserId, verifyToken, (req, res, next) => {
	const { id } = req.params;

	Plants.getById(id)
		.then((userPlants) => {
			res.json(userPlants);
		})
		.catch((e) => {
			next(e);
		});
});

router.post(
	'/:id',
	validateUserId,
	plantChecker,
	verifyToken,
	(req, res, next) => {
		Plants.addPlant(req.body)
			.then((plant) => {
				return res.status(201).json(plant);
			})
			.catch((e) => {
				next(e);
			});
	}
);

router.put(
	'/:id',
	validatePlantId,
	plantChecker,
	verifyToken,
	(req, res, next) => {
		const { id } = req.params;
		Plants.editPlant(req.body, id)
			.then(() => {
				res.json({ message: 'Plant updated successfully' });
			})
			.catch((e) => {
				next(e);
			});
	}
);

router.delete('/:id', validatePlantId, verifyToken, (req, res, next) => {
	const { id } = req.params;

	Plants.deletePlant(id)
		.then(() => {
			res.json({ message: 'Plant deleted successfully.' });
		})
		.catch((e) => {
			next(e);
		});
});

// eslint-disable-next-line
router.use((error, req, res, next) => {
	res.status(500).json({
		info: 'Error occurred inside authRouter',
		message: error.message,
		stack: error.stack,
	});
});

module.exports = router;
