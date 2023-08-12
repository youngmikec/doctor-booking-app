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

import { DataTypes } from 'sequelize';

const defineModel = (sequelize) => {
    const Appointment = sequelize.define('Appointment', {
        doctorId: {
            type: DataTypes.INTEGER
        },
        patientId: {
            type: DataTypes.INTEGER
        },
        date: {
            type: DataTypes.STRING
        },
        time: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        },
        deletedAt: {
            type: DataTypes.DATE
        }
    }, {});
    
    return Appointment;
};

export default defineModel;
