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
import { CreateUserService } from './create-user.service';

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

    /**
     * Injecting createUserService
     */

    private readonly createUserService: CreateUserService,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    return this.createUserService.createUser(createUserDto);
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
