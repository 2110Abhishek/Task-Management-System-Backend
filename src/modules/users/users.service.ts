import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async create(userData: Partial<User>): Promise<UserDocument> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(userData.passwordHash || '', salt);
    
    const newUser = new this.userModel({
      ...userData,
      passwordHash: hash,
    });
    
    return newUser.save();
  }

  async createGuestUser(): Promise<UserDocument> {
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const guestData = {
      email: `guest_${randomSuffix}@example.com`,
      passwordHash: randomSuffix, // Just a placeholder, guests shouldn't login via email
      name: `Dexter`,
      avatar: `https://i.pravatar.cc/150?u=dexter`,
      isGuest: true,
    };
    return this.create(guestData);
  }
}
