import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'username',
  password: 'password',
  database: 'database-name',
  entities: ['**/*.entity.js'],
  migrations: ['migrations/*.js'],
});
