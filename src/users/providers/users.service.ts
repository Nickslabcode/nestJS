import { CreateUserDto } from './../dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../../auth/providers/auth.service';
import { GetUsersParamDto } from './../dtos/get-users-param.dto';
import {
  Injectable,
  Inject,
  forwardRef,
  RequestTimeoutException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { UsersCreateManyService } from './users-create-many.service';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UsersService {
  constructor(
    /**
     * Injecting AuthService
     */
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    /**
     * Injecting UsersRepository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    /**
     * Inject usersCreateManyService
     */
    private readonly usersCreateManyService: UsersCreateManyService,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    // Check if user already exists with the same email
    let existingUser = null;

    try {
      existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try again later.',
        {
          cause: error.message,
          description: 'Error connecting to the database',
        },
      );
    }
    // Handle exceptions
    if (existingUser) {
      throw new BadRequestException(
        'The user already exists. Please check your email',
      );
    }
    // Create a new user
    let newUser = this.usersRepository.create(createUserDto);
    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to create a new user at the moment. Please try again later.',
        {
          cause: error.message,
          description: 'Error connecting to the database',
        },
      );
    }

    return newUser;
  }

  public async findAll(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getUserParamDto: GetUsersParamDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    limit: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    page: number,
  ) {
    // const isAuth = this.authService.isAuth();
    const users = this.usersRepository.find();
    return users;
  }

  public async findOneById(id: number) {
    let user = null;

    try {
      user = await this.usersRepository.findOneBy({
        id,
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to create a new user at the moment. Please try again later.',
        {
          cause: error.message,
          description: 'Error connecting to the database',
        },
      );
    }

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    return user;
  }

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return this.usersCreateManyService.createMany(createManyUsersDto);
  }
}
