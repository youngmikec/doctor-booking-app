'use strict';

module.exports = function (sequelize, DataTypes) {
  var Status = sequelize.define('Status', {
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {});
  Status.associate = function (models) {
    models.Status.hasOne(models.Patient);
  };
  return Status;
};