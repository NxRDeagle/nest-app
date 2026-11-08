import {
	Controller,
	Post,
	Body,
	Param,
	Get,
	Delete,
	Patch,
	HttpCode,
	NotFoundException,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { ProductModel } from './product.model.js';
import { FindProductDto } from './dto/find-product.dto.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { ProductService } from './product.service.js';
import { PRODUCT_NOT_FOUND_ERROR } from './constants.js';
import { IdValidationPipe } from '../pipes/id-validation.pipe.js';

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post('create')
	async create(@Body() dto: CreateProductDto) {
		return this.productService.create(dto);
	}

	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const product = await this.productService.findById(id);
		if (!product) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
		}
		return product;
	}

	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedProduct = await this.productService.deleteById(id);
		if (!deletedProduct) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
		}
	}

	@Patch(':id')
	async patch(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: ProductModel,
	) {
		const updatedProduct = await this.productService.updateById(id, dto);
		if (!updatedProduct) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
		}
		return updatedProduct;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindProductDto) {
		return this.productService.findWithReviews(dto);
	}
}
