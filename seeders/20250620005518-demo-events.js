'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      {
        title: 'Singles Meetup',
        description: 'Fun event for like-minded singles',
        date: new Date('2025-07-01T19:00:00Z'),
        locationId: 1,      // Make sure this matches your seeded Location id
        facilitatorId: 1,   // Make sure this matches your seeded User id
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Board Game Night',
        description: 'Casual evening with games and snacks',
        date: new Date('2025-07-10T19:00:00Z'),
        locationId: 1,
        facilitatorId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {});
  },
};
