import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';
import appRootPath from 'app-root-path';
import fsExtra from 'fs-extra';
import sharp from 'sharp';
import { FileElementResponse } from './dto/file-element-response.dto.js';
import { MFile } from './mfile.class.js';

@Injectable()
export class FilesService {
	async saveFiles(files: MFile[]): Promise<FileElementResponse[]> {
		const { ensureDir, writeFile } = fsExtra;
		const dateFolder = format(new Date(), 'yyyy-MM-dd');
		const uploadFolder = `${appRootPath.path}/uploads/${dateFolder}`;
		await ensureDir(uploadFolder);
		const res: FileElementResponse[] = [];
		for (const file of files) {
			await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer);
			res.push({
				url: `/uploads/${dateFolder}/${file.originalname}`,
				name: file.originalname,
			});
		}
		return res;
	}

	convertToWebP(file: Buffer): Promise<Buffer> {
		return sharp(file).webp().toBuffer();
	}
}
