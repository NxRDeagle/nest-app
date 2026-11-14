import { IsEnum } from 'class-validator';
import { TopLevelCategory } from '../top-page.model.js';

export class FindTopPageDto {
	@IsEnum(TopLevelCategory)
	firstCategory: TopLevelCategory;
}
