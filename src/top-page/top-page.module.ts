import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageController } from './top-page.controller.js';
import { TopPageModel, TopPageSchema } from './top-page.model.js';
import { TopPageService } from './top-page.service.js';

@Module({
	controllers: [TopPageController],
	imports: [
		MongooseModule.forFeature([
			{
				name: TopPageModel.name,
				schema: TopPageSchema,
			},
		]),
	],
	providers: [TopPageService],
	exports: [TopPageService],
})
export class TopPageModule {}
