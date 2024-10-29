import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateGoogleUserService } from './create-google-user.service';
import { FindOneByGoogleIdService } from './find-one-by-google-id.service';
import { FindOneByEmailService } from './find-one-by-email.service';
import { CreateUserService } from './create-user.service';
import { UsersCreateManyService } from './users-create-many.service';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const mockCreateUsersService: Partial<CreateUserService> = {
      createUser: (createUserDto: CreateUserDto) =>
        Promise.resolve({
          id: 12,
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          email: createUserDto.email,
          password: createUserDto.password,
        }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: DataSource,
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide: CreateGoogleUserService,
          useValue: {},
        },
        {
          provide: FindOneByGoogleIdService,
          useValue: {},
        },
        {
          provide: FindOneByEmailService,
          useValue: {},
        },
        {
          provide: CreateUserService,
          useValue: mockCreateUsersService,
        },
        {
          provide: UsersCreateManyService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should be defined', () => {
      expect(service.createUser).toBeDefined();
    });

    it('should call createUser on createUserService', async () => {
      const user = await service.createUser({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        password: 'Password!234',
      });

      const mockUser = {
        id: 12,
        ...user,
      };

      expect(user).toEqual(mockUser);
    });
  });
});
