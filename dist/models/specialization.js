'use strict';

module.exports = function (sequelize, DataTypes) {
  var Specialization = sequelize.define('Specialization', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {});
  Specialization.associate = function (models) {
    models.Specialization.hasOne(models.Post);
  };
  return Specialization;
};