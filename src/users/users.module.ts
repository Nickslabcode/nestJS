import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersCreateManyService } from './providers/users-create-many.service';
import { CreateUserService } from './providers/create-user.service';
import { FindOneByEmailService } from './providers/find-one-by-email.service';
import { FindOneByGoogleIdService } from './providers/find-one-by-google-id.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersCreateManyService,
    CreateUserService,
    FindOneByEmailService,
    FindOneByGoogleIdService,
  ],
  exports: [UsersService],
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
