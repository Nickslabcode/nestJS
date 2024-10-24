import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UsersModule } from '../users/users.module';
import { HashingService } from './providers/hashing.service';
import { BcryptService } from './providers/bcrypt.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, HashingService, BcryptService],
  exports: [AuthService],
  imports: [forwardRef(() => UsersModule)],
})
export class AuthModule {}
