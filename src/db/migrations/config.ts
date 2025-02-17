export default {
  development: {
    username: 'postgres',
    password: process.env.PS_PASSWORD,
    database: 'transactions_test',
    host: 'localhost',
    dialect: 'postgres',
  },
  production: {
    username: 'postgres',
    password: 'root',
    database: 'transactions_test',
    host: 'db',
    port: '5434',
    dialect: 'postgres',
  },
};
