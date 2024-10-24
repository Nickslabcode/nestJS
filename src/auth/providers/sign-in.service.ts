import { HashingService } from 'src/auth/providers/hashing.service';
import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/SignIn.dto';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class SignInService {
  constructor(
    /**
     * Injecting usersService
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /**
     * Injecting hashingService
     */
    private readonly hashingService: HashingService,
  ) {}
  public async signIn(signInDto: SignInDto) {
    // Find user using email ID
    // Throw exception if not found
    const user = await this.usersService.findOneByEmail(signInDto.email);

    // Compare password to the hash
    let isEqual: boolean = false;

    try {
      isEqual = await this.hashingService.comparePassword(
        signInDto.email,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not compare passwords. Please try again later',
      });
    }

    // if not equal
    if (!isEqual) {
      throw new UnauthorizedException('Password is incorrect.');
    }

    // Send confirmation
    return { success: isEqual, message: 'User signed in successfully.' };
  }
}
