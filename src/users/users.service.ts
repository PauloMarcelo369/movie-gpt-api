import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/UserSchema';
import { ResponseRegisterDto } from './dtos/responseRegisterDto';
import { UserModel } from './models/User';
import { GetUserByNameResponseDto } from './dtos/getUserByNameResponseDto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(user: UserModel): Promise<ResponseRegisterDto> {
    const userRep = new this.userModel(user);
    userRep.save();
    return { name: userRep.name, role: userRep.role };
  }

  async getUserByEmail(email: string): Promise<GetUserByNameResponseDto> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new Error('usuario inexistente');
    return { sub: user._id.toHexString(), name: user.name, role: user.role };
  }
}
