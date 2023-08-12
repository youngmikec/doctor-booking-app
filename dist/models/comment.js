'use strict';

module.exports = function (sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    doctorId: DataTypes.INTEGER,
    timeBooking: DataTypes.STRING,
    dateBooking: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    content: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {});
  Comment.associate = function (models) {
    models.Comment.belongsTo(models.User, {
      foreignKey: 'doctorId'
    });
  };
  return Comment;
};