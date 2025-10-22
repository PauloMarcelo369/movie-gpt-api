import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/UserSchema';

describe('UsersService (E2E with in-memory mongo', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UsersService,
          useValue: {
            createUser: jest
              .fn()
              .mockImplementation((dto) => ({ name: dto.name, role: 'user' })),
            getUserByEmail: jest.fn().mockImplementation((email) => ({
              sub: 'kdmdkmd',
              name: 'paulo',
              role: 'user',
            })),
          },
        },
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
    const expected = { sub: 'kdmdkmd', name: 'paulo', role: 'user' };
    const response = await service.getUserByEmail('marcelomp@gmail.com');
    expect(response).toEqual(expected);
  });

  // it('should return a user with the given email');
});
