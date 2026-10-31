import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TopPageModule } from './top-page/top-page.module.js';
import { ProductModule } from './product/product.module.js';
import { ReviewModule } from './review/review.module.js';

@Module({
  imports: [TopPageModule, ProductModule, ReviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
