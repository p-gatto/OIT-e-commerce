/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { LoginDto } from './dots/login.dto';

import { SeedService } from '../seed/seed.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
        private readonly seedService: SeedService
    ) { }

    async validateUser(username: string, password: string): Promise<any> {

        const user = await this.userModel.findOne({ username });

        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user.toObject();
            return result;
        }
        return null;
    }

    async login(loginDto: LoginDto) {

        const user = await this.validateUser(loginDto.username, loginDto.password);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { username: user.username, sub: user._id };
        return {
            token: this.jwtService.sign(payload),
        };
    }

    async getProfile(userId: string) {
        const user = await this.userModel.findById(userId).select('-password');
        return { displayName: user!.displayName };
    }

    async createUser(username: string, password: string, displayName: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new this.userModel({
            username,
            password: hashedPassword,
            displayName,
        });
        return user.save();
    }

    async seedUsers(): Promise<{ message: string, count: number, users?: string[], displayNames?: string[] }> {
        return await this.seedService.seedUsers();
    }
}