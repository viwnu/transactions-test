import { QueryInterface } from 'sequelize';
import { User } from '../models';

export = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    const existingUsers = (await queryInterface.select(null, 'Users')) as unknown as User[];
    if (existingUsers.length) {
      if (existingUsers[0].balance < 10000) {
        await queryInterface.bulkUpdate('Users', { balance: 10000 }, {});
      }
      return;
    }
    await queryInterface.bulkInsert('Users', [{ balance: 10000 }]);
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
