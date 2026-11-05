import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compare, genSaltSync, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserDocument, UserModel } from './user.model.js';
import { AuthDto } from './dto/auth.dto.js';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './constants.js';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel.name)
		private readonly userModel: Model<UserDocument>,
		private readonly jwtService: JwtService,
	) {}

	async getByEmail(email: string) {
		return this.userModel.findOne({ email }).exec();
	}

	async createUser(dto: AuthDto): Promise<UserDocument> {
		const salt = genSaltSync(10);
		const newUser = new this.userModel({
			email: dto.login,
			passwordHash: await hash(dto.password, salt),
		});
		return newUser.save();
	}

	async validateUser(dto: AuthDto): Promise<Pick<UserModel, 'email'>> {
		const user = await this.getByEmail(dto.login);
		if (!user) {
			throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
		}
		const isCorrectPassword = await compare(dto.password, user.passwordHash);
		if (!isCorrectPassword) {
			throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
		}
		return { email: user.email };
	}

	async login(email: string) {
		const payload = { email };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
