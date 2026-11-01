import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageModule } from './top-page/top-page.module.js';
import { ProductModule } from './product/product.module.js';
import { ReviewModule } from './review/review.module.js';
import { getMongoConfig } from './configs/mongo.config.js';

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig,
		}),
		TopPageModule,
		ProductModule,
		ReviewModule,
	],
})
export class AppModule {}
