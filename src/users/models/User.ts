import { RegisterDto } from 'users/dtos/registerDto';

export class UserModel {
  name: string;
  email: string;
  password: string;

  constructor(user: RegisterDto) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
  }
}
