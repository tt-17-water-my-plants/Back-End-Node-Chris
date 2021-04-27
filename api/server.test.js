const request = require('supertest');
const db = require('../api/data/dbConfig');
const server = require('./server');

const ironman = {
	username: 'Tony Stark',
	password: '1234',
	phone_number: '5558675309',
};

const blackwidow = {
	username: 'Natasha Romanoff',
	password: '1234',
	phone_number: '5558675309',
};

beforeAll(async () => {
	await db.migrate.rollback();
	await db.migrate.latest();
});

beforeEach(async () => {
	await db.raw('TRUNCATE TABLE plants RESTART IDENTITY CASCADE');
	await db.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
});

afterAll(async () => {
	await db.destroy();
});

describe('server', () => {
	describe('GET/users', () => {
		test('responds with 200 ok', async () => {
			const res = await request(server).get('/api/users');
			expect(res.status).toBe(200);
		});

		test('returns correct num of users', async () => {
			let res;
			await db('users').insert(ironman);
			res = await request(server).get('/api/users');
			expect(res.body).toHaveLength(1);

			await db('users').insert(blackwidow);
			res = await request(server).get('/api/users');
			expect(res.body).toHaveLength(2);
		});

		test('returns correct format for user', async () => {
			await db('users').insert(ironman);
			await db('users').insert(blackwidow);

			const res = await request(server).get('/api/users');
			expect(res.body[0]).toMatchObject({
				user_id: 1,
				username: ironman.username,
				phone_number: ironman.phone_number,
			});

			expect(res.body[1]).toMatchObject({
				user_id: 2,
				username: blackwidow.username,
				phone_number: blackwidow.phone_number,
			});
		});
	});

	describe('GET/users/:id', () => {
		test('responds with correct user', async () => {
			await db('users').insert(ironman);
			await db('users').insert(blackwidow);
			let res;

			res = await request(server).get('/api/users/1');
			expect(res.body).toMatchObject({
				user_id: 1,
				username: ironman.username,
				phone_number: ironman.phone_number,
			});

			res = await request(server).get('/api/users/2');
			expect(res.body).toMatchObject({
				user_id: 2,
				username: blackwidow.username,
				phone_number: blackwidow.phone_number,
			});
		});
	});

	describe('POST/users', () => {
		test('responds with newly-created user', async () => {
			let res;
			res = await request(server).post('/api/users/register').send(ironman);

			expect(res.status).toBe(201);
			expect(res.body).toMatchObject({
				user_id: 1,
				username: ironman.username,
				phone_number: ironman.phone_number,
			});
		});
	});
});
