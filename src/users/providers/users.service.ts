import { CreateUserDto } from './../dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUsersParamDto } from './../dtos/get-users-param.dto';
import {
  Injectable,
  RequestTimeoutException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { UsersCreateManyService } from './users-create-many.service';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { CreateUserService } from './create-user.service';
import { FindOneByEmailService } from './find-one-by-email.service';
import { FindOneByGoogleIdService } from './find-one-by-google-id.service';
import { CreateGoogleUserService } from './create-google-user.service';
import { GoogleUser } from '../interfaces/google-user.interface';

@Injectable()
export class UsersService {
  constructor(
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

    /**
     * Injecting findOneByEmailService
     */
    private readonly findOneByEmailService: FindOneByEmailService,

    /**
     * Injecting findOneByGoogleIdService
     */
    private readonly findOneByGoogleIdService: FindOneByGoogleIdService,

    /**
     * Injecting createGoogleUserService
     */
    private readonly createGoogleUserService: CreateGoogleUserService,
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

  public async findOneByEmail(email: string) {
    return this.findOneByEmailService.findOneByEmail(email);
  }

  public async findOneByGoogleId(googleId: string) {
    return this.findOneByGoogleIdService.findOneByGoogleId(googleId);
  }

  public async createGoogleUser(googleUser: GoogleUser) {
    return this.createGoogleUserService.createGoogleUser(googleUser);
  }
}
