import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import appRootPath from 'app-root-path';
import { FilesController } from './files.controller.js';
import { FilesService } from './files.service.js';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${appRootPath.path}/uploads`,
			serveRoot: '/uploads',
		}),
	],
	controllers: [FilesController],
	providers: [FilesService],
})
export class FilesModule {}
