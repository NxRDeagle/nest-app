import {
	Controller,
	Post,
	Body,
	Param,
	Get,
	Delete,
	HttpException,
	HttpStatus,
	UsePipes,
	ValidationPipe,
	UseGuards,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto.js';
import { ReviewService } from './review.service.js';
import { REVIEW_NOT_FOUND_ERROR } from './constants.js';
import { JwtAuthGuard } from '../auth/guards/jwt.guard.js';
import { IdValidationPipe } from '../pipes/id-validation.pipe.js';
import { TelegramService } from '../telegram/telegram.service.js';

@Controller('review')
export class ReviewController {
	constructor(
		private readonly reviewService: ReviewService,
		private readonly telegramService: TelegramService,
	) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewService.create(dto);
	}

	@UsePipes(new ValidationPipe())
	@Post('notify')
	async notify(@Body() dto: CreateReviewDto) {
		const { name, title, description, rating, productId } = dto;
		const message =
			`Имя: ${name}\n` +
			`Заголовок: ${title}\n` +
			`Описание: ${description}\n` +
			`Рейтинг: ${rating}\n` +
			`ID Продукта: ${productId}`;
		return this.telegramService.sendMessage(message);
	}

	@Get('byProduct/:productId')
	async getByProduct(@Param('productId', IdValidationPipe) productId: string) {
		return this.reviewService.findByProductId(productId);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedDoc = await this.reviewService.delete(id);
		if (!deletedDoc) {
			throw new HttpException(REVIEW_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
		}
	}
}
