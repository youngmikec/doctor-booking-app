'use strict';

module.exports = function (sequelize, DataTypes) {
  var Place = sequelize.define('Place', {
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {});
  Place.associate = function (models) {};
  return Place;
};