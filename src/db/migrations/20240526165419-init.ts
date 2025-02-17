import { resolve } from 'path';
import { readFile } from 'fs/promises';

const seedQueryFilePath = resolve('src/migrations/init.sql');

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface) {
  const dataSeedQuery = (await readFile(seedQueryFilePath)).toString();
  console.log('dataSeedQuery', dataSeedQuery);
  return queryInterface.sequelize.query(dataSeedQuery);
}
export async function down(queryInterface, Sequelize) {
  console.log('queryInterface', queryInterface);
  console.log('Sequelize', Sequelize);
  /**
   * Add reverting commands here.
   *
   * Example:
   * await queryInterface.dropTable('users');
   */
}
