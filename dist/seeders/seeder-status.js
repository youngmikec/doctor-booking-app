'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Statuses', [{
      name: 'SUCCESS',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'FAILED',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'NEW',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'DONE',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Statuses', null, {});
  }
};