'use strict';
/** @type {import('sequelize-cli').Migration} */

const {Enum} = require("../utils/common");
const {CUSTOMER , ADMIN , FLIGH_COMPANY} = Enum.USER_ROLES_ENUMS;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.ENUM,
        values:[ADMIN, CUSTOMER, FLIGH_COMPANY],
        allowNull: false,
        defaultValue : CUSTOMER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Roles');
  }
};