import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ReviewService } from './review.service.js';

describe('ReviewService', () => {
	let service: ReviewService;

	const execMock = vi.fn();
	const reviewRepositoryMock = {
		find: vi.fn(() => ({ exec: execMock })),
	};

	beforeEach(async () => {
		vi.clearAllMocks();

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ReviewService,
				{
					provide: getModelToken('ReviewModel'),
					useValue: reviewRepositoryMock,
				},
			],
		}).compile();

		service = module.get<ReviewService>(ReviewService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('findByProductId is working', async () => {
		const id = new Types.ObjectId().toHexString();
		const expected = [{ productId: id }];

		execMock.mockResolvedValueOnce(expected);
		reviewRepositoryMock.find.mockReturnValueOnce({ exec: execMock });

		const res = await service.findByProductId(id);

		expect(res).toEqual(expected);
		expect(reviewRepositoryMock.find).toHaveBeenCalledOnce();
		expect(execMock).toHaveBeenCalledOnce();
	});
});
