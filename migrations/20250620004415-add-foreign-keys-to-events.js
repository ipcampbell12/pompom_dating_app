'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Events', 'locationId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Locations',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });

    await queryInterface.addColumn('Events', 'facilitatorId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Events', 'locationId');
    await queryInterface.removeColumn('Events', 'facilitatorId');
  },
};
