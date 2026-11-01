import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products,
}

export class HHData {
	@Prop()
	count: number;

	@Prop()
	juniorSalary: number;

	@Prop()
	middleSalary: number;

	@Prop()
	seniorSalary: number;
}

export class Advantage {
	@Prop()
	title: string;

	@Prop()
	description: string;
}

export type TopPageDocument = HydratedDocument<TopPageModel>;

@Schema({ timestamps: true })
export class TopPageModel {
	@Prop({ enum: TopLevelCategory })
	firstLevelCategory: TopLevelCategory;

	@Prop()
	secondLevelCategory: string;

	@Prop({ unique: true })
	alias: string;

	@Prop()
	title: string;

	@Prop()
	category: string;

	@Prop()
	hh?: HHData;

	@Prop([Advantage])
	advantages: Advantage[];

	@Prop()
	seoText: string;

	@Prop([String])
	tags: string[];

	@Prop()
	tagsTitle: string;
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);
