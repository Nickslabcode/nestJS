import { Injectable } from '@nestjs/common';
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
    await queryRunner.connect();

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
    } finally {
      // Release connection
      await queryRunner.release();
    }

    return newUsers;
  }
}
