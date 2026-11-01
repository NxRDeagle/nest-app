import {
	Controller,
	Post,
	Body,
	Param,
	Get,
	Delete,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { CreateReviewDto } from '../product/dto/create-review.dto.js';
import { ReviewService } from './review.service.js';
import { REVIEW_NOT_FOUND } from './constants.js';

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewService.create(dto);
	}

	@Get('byProduct/:productId')
	async getByProduct(@Param('productId') productId: string) {
		return this.reviewService.findByProductId(productId);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedDoc = await this.reviewService.delete(id);
		if (!deletedDoc) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}
}
