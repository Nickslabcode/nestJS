import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UsersCreateManyService {
  constructor(
    /**
     * Inject DataSource
     */
    private readonly dataSource: DataSource,
  ) {}

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    const newUsers: User[] = [];
    // Create Query Runner Instance
    const queryRunner = this.dataSource.createQueryRunner();

    // Connect the QRI to the data source
    try {
      await queryRunner.connect();
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try again later',
        {
          cause: error.message,
          description: 'Error connecting to the database',
        },
      );
    }

    // Start transaction
    await queryRunner.startTransaction();
    try {
      // createManyUsersDto.users.forEach(async (user) => {
      //   const newUser = queryRunner.manager.create(User, user);
      //   const result = await queryRunner.manager.save(newUser);

      //   newUsers.push(result);
      // });

      for (const user of createManyUsersDto.users) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);

        newUsers.push(result);
      }

      // If successful - commit
      await queryRunner.commitTransaction();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // If unsuccessful - rollback
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Could not complete transaction', {
        cause: error.message,
      });
    } finally {
      try {
        // Release connection
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException('Could not release the connection', {
          cause: error.message,
        });
      }
    }

    return newUsers;
  }
}
