import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller.js';
import { ProductModel, ProductSchema } from './product.model.js';

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
})
export class ProductModule {}
