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

  public login(email: string, password: string, id: string) {
    // Check if user exists
    // const user = this.usersService.findOneById('1234');
    // login
    // token
    return 'SAMPLE_TOKEN';
  }

  public isAuth() {
    return true;
  }
}
