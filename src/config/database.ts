import * as dotenv from 'dotenv';

dotenv.config();

export default {
  test: {
    url: process.env.TEST_DATABASE_URL,
    synchronize: process.env.TYPEORM_SYNCHRONIZE,
    logging: process.env.TYPEORM_LOGGING
  },
  development: {
    url: process.env.DEV_DATABASE_URL,
    synchronize: process.env.TYPEORM_SYNCHRONIZE,
    logging: process.env.TYPEORM_LOGGING
  },
  production: {
    url: process.env.DATABASE_URL,
    synchronize: process.env.TYPEORM_SYNCHRONIZE,
    logging: process.env.TYPEORM_LOGGING
  },
  common: {
    type: process.env.TYPEORM_CONNECTION,
    entities: [process.env.TYPEORM_ENTITIES],
    migrations: [process.env.TYPEORM_MIGRATIONS],
    migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN,
    cli: {
      migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
      entitiesDir: process.env.TYPEORM_ENTITIES_DIR,
    },
  },
};
