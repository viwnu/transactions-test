import type { Migration } from '.';
import { INTEGER } from 'sequelize';

export const up: Migration = async ({ context: queryInterface }) =>
  await queryInterface.createTable('Users', {
    balance: {
      type: INTEGER,
      allowNull: false,
    },
  });
export const down: Migration = async ({ context: queryInterface }) => await queryInterface.dropTable('Users');
