import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { ReviewModel } from './review.model.js';

@Controller('review')
export class ReviewController {

    @Post('create')
    async create(@Body() dto: Omit<ReviewModel, '_id'>) {
    
    }

    @Get('byProduct/:productId')
    async getByProduct(@Param('productId') productId: string) {

    }

    @Delete(':id')
    async delete(@Param('id') id: string) {

    }
}
