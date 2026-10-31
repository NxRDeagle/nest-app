import { Module } from '@nestjs/common';
import { TopPageModule } from './top-page/top-page.module.js';
import { ProductModule } from './product/product.module.js';
import { ReviewModule } from './review/review.module.js';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [ConfigModule.forRoot(), TopPageModule, ProductModule, ReviewModule],
})
export class AppModule {}
