import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UsersModule } from '../users/users.module';
import { HashingService } from './providers/hashing.service';
import { BcryptService } from './providers/bcrypt.service';
import { SignInService } from './providers/sign-in.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      // When there's an abstract class
      provide: HashingService,
      useClass: BcryptService,
    },
    SignInService,
  ],
  imports: [forwardRef(() => UsersModule)],
  exports: [AuthService, HashingService],
})
export class AuthModule {}
