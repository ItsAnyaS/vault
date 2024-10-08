'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  await queryInterface.createTable('vault', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING
    },
    passcode: {
      allowNull: false,
      type: Sequelize.STRING
    }
  })
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.dropTable('vault');
  }
};