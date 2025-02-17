import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import * as dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV.trim()}`,
});

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.PS_HOST,
  port: Number(process.env.PS_PORT),
  username: process.env.PS_USER,
  password: process.env.PS_PASSWORD,
  database: process.env.PS_DB_NAME,
});

const umzug = new Umzug({
  migrations: {
    glob: ['src/db/migrations/*.ts', { cwd: __dirname }],
    resolve: ({ name, path, context }) => {
      // adjust the migration parameters Umzug will
      // pass to migration methods, this is done because
      // Sequilize-CLI generates migrations that require
      // two parameters be passed to the up and down methods
      // but by default Umzug will only pass the first
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const migration = require(path || '');
      return {
        name,
        up: async () => migration.up(context, Sequelize),
        down: async () => migration.down(context, Sequelize),
      };
    },
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

// export the type helper exposed by umzug, which will have the `context` argument typed correctly
export type Migration = typeof umzug._types.migration;

(async () => {
  try {
    await sequelize.authenticate();
    await umzug.up();
    console.log('Connection established and migrations run.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
