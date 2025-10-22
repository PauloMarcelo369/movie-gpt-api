import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/UserSchema';
import { ResponseRegisterDto } from './dtos/responseRegisterDto';
import { UserModel } from './models/User';
import { GetUserByEmailResponseDto } from './dtos/getUserByEmailResponseDto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(user: UserModel): Promise<ResponseRegisterDto> {
    const userRep = new this.userModel(user);
    await userRep.save();

    return { name: userRep.name, role: userRep.role };
  }

  async getUserByEmail(email: string): Promise<GetUserByEmailResponseDto> {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new Error('usuario inexistente');
    console.log(user);
    return { sub: user._id.toString(), name: user.name, role: user.role };
  }
}
