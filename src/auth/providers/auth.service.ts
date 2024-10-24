import { SignInDto } from './../dtos/SignIn.dto';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';
import { SignInService } from './sign-in.service';

@Injectable()
export class AuthService {
  constructor(
    /**
     * Injecting User Service
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /**
     * Injecting signInService
     */
    private readonly signInService: SignInService,
  ) {}

  public async signIn(signInDto: SignInDto) {
    return this.signInService.signIn(signInDto);
  }

  public isAuth() {
    return true;
  }
}
