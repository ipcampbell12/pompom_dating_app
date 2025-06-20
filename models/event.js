'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(models.Location, { foreignKey: 'locationId', as: 'location' });
      Event.belongsTo(models.User, { foreignKey: 'facilitatorId', as: 'facilitator' });

      Event.hasMany(models.Message, { foreignKey: 'eventId', as: 'messages' });

    }
  }
  Event.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    date: DataTypes.DATE,
    locationId: DataTypes.INTEGER,
    facilitatorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};