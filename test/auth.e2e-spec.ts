import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module.js';
import { disconnect } from 'mongoose';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { loginDto } from './constants.js';

describe('AuthController (e2e)', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/login (POST) - success', async () => {
		const { body } = await request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
			.expect(200);

		expect(body.access_token).toBeDefined();
	});

	it('/auth/login (POST) - fail password', async () => {
		const { body } = await request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, password: '213password' })
			.expect(401);

		expect(body).toEqual({
			statusCode: 401,
			message: 'Неверный пароль',
			error: 'Unauthorized',
		});
	});

	it('/auth/login (POST) - fail login', async () => {
		const { body } = await request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, login: 'aaaa@aaa.ru' })
			.expect(401);

		expect(body).toEqual({
			statusCode: 401,
			message: 'Пользователь с таким email не найден',
			error: 'Unauthorized',
		});
	});

	afterAll(async () => {
		await app.close();
		await disconnect();
	});
});
