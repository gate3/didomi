import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export default registerAs('databaseConfig', (): TypeOrmModuleOptions => {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  return {
    type: 'postgres',
    host: DB_HOST,
    port: +DB_PORT,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [join(__dirname, '..', '**', '*.entity{.ts,.js}')],
    synchronize: false,
    logging: true,
    migrations: [
      join(__dirname, '..', 'src', '**', 'migrations/**/*{.ts,.js}'),
    ],
    cli: {
      migrationsDir: `src/migrations`,
    },
  };
});
