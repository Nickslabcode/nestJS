import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './providers/auth.service';
import { UsersModule } from '../users/users.module';
import { HashingService } from './providers/hashing.service';
import { BcryptService } from './providers/bcrypt.service';
import { SignInService } from './providers/sign-in.service';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { GenerateTokensService } from './providers/generate-tokens.service';

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
    GenerateTokensService,
  ],
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  exports: [AuthService, HashingService],
})
export class AuthModule {}
