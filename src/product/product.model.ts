import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

class ProductCharachteristic {
	@Prop()
	name: string;

	@Prop()
	value: string;
}

export type ProductDocument = HydratedDocument<ProductModel>;

@Schema({ timestamps: true })
export class ProductModel {
	@Prop()
	image: string;

	@Prop()
	title: string;

	@Prop()
	price: number;

	@Prop()
	oldPrice: number;

	@Prop()
	credit: number;

	@Prop()
	calculatedRating: number;

	@Prop()
	description: string;

	@Prop()
	advantages: string;

	@Prop()
	disAdvantages: string;

	@Prop([String])
	categories: string[];

	@Prop([String])
	tags: string[];

	@Prop({ type: [ProductCharachteristic], _id: false })
	characteristics: ProductCharachteristic[];
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
