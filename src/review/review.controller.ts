import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { CreateReviewDto } from '../product/dto/create-review.dto.js';

@Controller('review')
export class ReviewController {
	@Post('create')
	async create(@Body() dto: CreateReviewDto) {}

	@Get('byProduct/:productId')
	async getByProduct(@Param('productId') productId: string) {}

	@Delete(':id')
	async delete(@Param('id') id: string) {}
}
