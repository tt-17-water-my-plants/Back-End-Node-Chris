require('dotenv').config();
const express = require('express');
const server = require('./api/server.js');
const path = require('path');

const PORT = process.env.PORT || 5000;

server.use(express.static(path.join(__dirname, 'client/dist')));

server.listen(PORT, () => {
	console.log(
		`*** Server listening in ${process.env.NODE_ENV} on port: ${PORT} ***`
	);
});
