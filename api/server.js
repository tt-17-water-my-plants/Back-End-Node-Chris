const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

const plantsRouter = require('./plants/router');
const usersRouter = require('./users/router');

server.use('/api/plants', plantsRouter);
server.use('/api/users', usersRouter);

server.get('/', (_req, res) => {
	res.send('The API is running...');
});

server.use('*', (_req, res) => {
	res.status(404).json({ message: '404: Resource not found' });
});

module.exports = server;
