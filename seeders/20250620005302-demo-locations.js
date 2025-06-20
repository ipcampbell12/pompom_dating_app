'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Locations', [
      {
        name: 'Cafe Central',
        address: '123 Main St',
        city: 'YourCity',
        state: 'YourState',
        zip: '12345',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Locations', null, {});
  },
};
