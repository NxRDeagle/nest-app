import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SitemapController } from './sitemap.controller.js';
import { TopPageModule } from '../top-page/top-page.module.js';

@Module({
	controllers: [SitemapController],
	imports: [ConfigModule, TopPageModule],
})
export class SitemapModule {}
