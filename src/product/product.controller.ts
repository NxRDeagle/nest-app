import {
	Controller,
	Post,
	Body,
	Param,
	Get,
	Delete,
	Patch,
	HttpCode,
} from '@nestjs/common';
import { ProductModel } from './product.model.js';
import { FindProductDto } from './dto/find-product.dto.js';

@Controller('product')
export class ProductController {
	@Post('create')
	async create(@Body() dto: Omit<ProductModel, '_id'>) {}

	@Get(':id')
	async get(@Param('id') id: string) {}

	@Delete(':id')
	async delete(@Param('id') id: string) {}

	@Patch(':id')
	async patch(@Param('id') id: string, dto: ProductModel) {}

	@HttpCode(200)
	@Post()
	async find(@Body() dto: FindProductDto) {}
}
