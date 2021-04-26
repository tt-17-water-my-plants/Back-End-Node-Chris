const express = require('express');
const bcrypt = require('bcryptjs');
const createToken = require('../../utils/createToken');

const router = express.Router();

const Users = require('./model');

// Middleware
const {
	registerChecker,
	loginChecker,
	userEditChecker,
} = require('../middleware/payloadCheckers');
const checkUsername = require('../middleware/checkUsername');
const verifyToken = require('../middleware/verifyToken');
const { validateUserId } = require('../middleware/idValidaters');

router.get('/', (_, res, next) => {
	Users.getAll()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((e) => {
			next(e);
		});
});

router.get('/:id', validateUserId, (req, res, next) => {
	const { id } = req.params;

	Users.getById(id)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((e) => {
			next(e);
		});
});

router.post('/register', registerChecker, checkUsername, (req, res, next) => {
	let newUser = req.body;
	const hashedPass = bcrypt.hashSync(newUser.password, 8);
	newUser.password = hashedPass;

	Users.addUser(newUser)
		.then((addedUser) => {
			return res.status(201).json(addedUser);
		})
		.catch((e) => {
			next(e);
		});
});

router.post('/login', loginChecker, async (req, res) => {
	const { username, password } = req.body;
	const tryUser = await Users.getByUsername(username);

	if (tryUser && bcrypt.compareSync(password, tryUser.password)) {
		const token = createToken(tryUser);
		res
			.status(200)
			.json({ message: 'Login Successful', token, user_id: tryUser.user_id });
	} else {
		res.status(401).json({ message: 'Invalid Credentials' });
	}
});

router.put(
	'/:id/update',
	validateUserId,
	userEditChecker,
	verifyToken,
	(req, res, next) => {
		const { id } = req.params;
		let changes = req.body;
		const hashedPass = bcrypt.hashSync(changes.password, 8);
		changes.password = hashedPass;

		Users.editUser(changes, id)
			.then(() => {
				res.status(200).json({ message: 'User updated successfully' });
			})
			.catch((e) => {
				next(e);
			});
	}
);

// eslint-disable-next-line
router.use((error, req, res, next) => {
	res.status(500).json({
		info: 'Error occurred inside usersRouter',
		message: error.message,
		stack: error.stack,
	});
});

module.exports = router;
