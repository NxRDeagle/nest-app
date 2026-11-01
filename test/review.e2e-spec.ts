import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { Types, disconnect } from 'mongoose';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { CreateReviewDto } from '../src/product/dto/create-review.dto.js';
import { REVIEW_NOT_FOUND } from '../src/review/constants.js';
import { AppModule } from '../src/app.module.js';

const productId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
	name: 'Тест',
	title: 'Заголовок',
	description: 'Описание тестовое',
	rating: 5,
	productId,
};

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/review/create (POST) - success', async () => {
		const response = await request(app.getHttpServer())
			.post('/review/create')
			.send(testDto)
			.expect(201);

		createdId = response.body._id;
		expect(createdId).toBeDefined();
	});

	it('/review/byProduct/:productId (GET) - success', async () => {
		const response = await request(app.getHttpServer())
			.get('/review/byProduct/' + productId)
			.expect(200);

		expect(response.body.length).toBe(1);
	});

	it('/review/byProduct/:productId (GET) - fail', async () => {
		const response = await request(app.getHttpServer())
			.get('/review/byProduct/' + new Types.ObjectId().toHexString())
			.expect(200);

		expect(response.body.length).toBe(0);
	});

	it('/review/:id (DELETE) - success', async () => {
		return request(app.getHttpServer())
			.delete('/review/' + createdId)
			.expect(200);
	});

	it('/review/:id (DELETE) - fail', async () => {
		return request(app.getHttpServer())
			.delete('/review/' + new Types.ObjectId().toHexString())
			.expect(404, {
				statusCode: 404,
				message: REVIEW_NOT_FOUND,
			});
	});

	afterAll(async () => {
		await app.close();
		await disconnect();
	});
});
