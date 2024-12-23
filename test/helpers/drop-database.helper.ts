import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export async function dropDatabase(config: ConfigService): Promise<void> {
  // Create the connection dataSource
  const appDataSource = await new DataSource({
    type: 'postgres',
    // entities: [User],
    synchronize: config.get('database.synchronize'),
    port: config.get('database.port'),
    username: config.get('database.user'),
    password: config.get('database.password'),
    host: config.get('database.host'),
    database: config.get('database.name'),
  }).initialize();

  // Drop all tables
  await appDataSource.dropDatabase();

  // Close connection
  await appDataSource.destroy();
}
