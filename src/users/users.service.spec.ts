import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { RegisterDto } from './dtos/registerDto';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/UserSchema';

describe('UsersService', () => {
  let service: UsersService;
  const fakeId = new Types.ObjectId();

  const mockUserModel: Partial<Model<User>> & jest.Mock = jest
    .fn()
    .mockImplementation((dto: RegisterDto) => ({
      ...dto,
      role: 'user',
      save: jest.fn().mockResolvedValue({
        _id: fakeId,
        name: dto.name,
        role: 'user',
      }),
    }));

  mockUserModel.findOne = jest.fn().mockResolvedValue({
    _id: fakeId,
    name: 'paulo',
    role: 'user',
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getModelToken('User'), useValue: mockUserModel },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should create a user', async () => {
    const expected = {
      name: 'John',
      role: 'user',
    };

    const created = await service.createUser({
      name: 'John',
      email: 'john@example.com',
      password: '12345678',
    });

    expect(created).toEqual(expected);
  });

  it('should get a user by email', async () => {
    const expected = { sub: fakeId.toString(), name: 'paulo', role: 'user' };

    const response = await service.getUserByEmail('marcelomp@gmail.com');
    expect(response).toEqual(expected);
  });
});
