import { SignInDto } from './../dtos/SignIn.dto';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    /**
     * Injecting User Service
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  public signIn(signInDto: SignInDto) {
    // Find user using email ID
    // Throw exception if not found
    // Compare password to the hash
    // Send confirmation
  }

  public isAuth() {
    return true;
  }
}
