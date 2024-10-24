import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
// import { UsersService } from '../users/providers/users.service.js';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/SignIn.dto';

@Controller('auth')
export class AuthController {
  constructor(
    /**
     * Injecting Auth Service
     */

    private readonly authService: AuthService,
  ) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  public async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
