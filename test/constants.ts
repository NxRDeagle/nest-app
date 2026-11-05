import { Types } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto.js';
import { CreateReviewDto } from '../src/review/dto/create-review.dto.js';

// Должен существовать в тестовой БД
export const loginDto: AuthDto = {
	login: 'test@mail.ru',
	password: 'password123',
};

export const productId = new Types.ObjectId().toHexString();

export const testDto: CreateReviewDto = {
	name: 'Тест',
	title: 'Заголовок',
	description: 'Описание тестовое',
	rating: 5,
	productId,
};
