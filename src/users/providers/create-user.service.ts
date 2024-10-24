import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { HashingService } from 'src/auth/providers/hashing.service';

@Injectable()
export class CreateUserService {
  constructor(
    /**
     * Injecting usersRepository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    /**
     * Injecting HashingService
     */
    @Inject(forwardRef(() => HashingService)) // necessary when there's a circular dependency
    private readonly hashingService: HashingService,
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
    let newUser = this.usersRepository.create({
      ...createUserDto,
      password: await this.hashingService.hashPassword(createUserDto.password),
    });

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
}
