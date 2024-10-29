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

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
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
          useValue: {},
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
});
