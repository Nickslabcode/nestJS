import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

@Injectable()
export class FindOneByEmailService {
  constructor(
    /**
     * Injecting usersRepository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async findOneByEmail(email: string) {
    let user: User | undefined = undefined;

    try {
      user = await this.usersRepository.findOneBy({
        email,
      });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description:
          'There was a problem fetching the user. Please try again later',
      });
    }

    // if user is not found
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    return user;
  }
}
