import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDocument, AuthModel } from './auth.model.js';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(AuthModel.name) private authModel: Model<AuthDocument>,
	) {}

	async getByEmail(email: string) {
		return this.authModel.findOne({ email });
	}

	async createUser({ email, password }: { email: string; password: string }) {
		const newUser = new this.authModel({ email, password });
		return newUser.save();
	}
}
