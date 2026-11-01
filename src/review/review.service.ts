import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model, Types } from 'mongoose';
import { ReviewDocument, ReviewModel } from './review.model.js';
import { CreateReviewDto } from '../product/dto/create-review.dto.js';

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel(ReviewModel.name) private reviewModel: Model<ReviewDocument>,
	) {}

	async create(dto: CreateReviewDto): Promise<ReviewDocument> {
		const newReview = new this.reviewModel(dto);
		return newReview.save();
	}

	async delete(id: string): Promise<ReviewDocument | null> {
		return this.reviewModel.findByIdAndDelete(id).exec();
	}

	async findByProductId(productId: string): Promise<ReviewDocument[]> {
		return this.reviewModel
			.find({ productId: new Types.ObjectId(productId) })
			.exec();
	}

	async deleteByProductId(productId: string): Promise<DeleteResult> {
		return this.reviewModel
			.deleteMany({ productId: new Types.ObjectId(productId) })
			.exec();
	}
}
