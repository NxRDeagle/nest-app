import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller.js';
import { ProductModel, ProductSchema } from './product.model.js';
import { ProductService } from './product.service.js';

@Module({
	controllers: [ProductController],
	imports: [
		MongooseModule.forFeature([
			{
				name: ProductModel.name,
				schema: ProductSchema,
			},
		]),
	],
	providers: [ProductService],
})
export class ProductModule {}
