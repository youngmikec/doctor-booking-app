// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//     const Appointment = sequelize.define('Appointment', {
//         doctorId: DataTypes.INTEGER,
//         patientId: DataTypes.INTEGER,
//         date: DataTypes.STRING,
//         time: DataTypes.STRING,
//         createdAt: DataTypes.DATE,
//         updatedAt: DataTypes.DATE,
//         deletedAt: DataTypes.DATE,
//     }, {});
//     Appointment.associate = function(models) {

//     };
//     return Appointment;
// };

'use strict';

var _sequelize = require("sequelize");
var defineModel = function defineModel(sequelize) {
  var Appointment = sequelize.define('Appointment', {
    doctorId: {
      type: _sequelize.DataTypes.INTEGER
    },
    patientId: {
      type: _sequelize.DataTypes.INTEGER
    },
    date: {
      type: _sequelize.DataTypes.STRING
    },
    time: {
      type: _sequelize.DataTypes.STRING
    },
    createdAt: {
      type: _sequelize.DataTypes.DATE
    },
    updatedAt: {
      type: _sequelize.DataTypes.DATE
    },
    deletedAt: {
      type: _sequelize.DataTypes.DATE
    }
  }, {});
  return Appointment;
};
module.exports = defineModel;