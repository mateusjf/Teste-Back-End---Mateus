'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [{
      name: 'Computador',
      price: 1200.99,
      description: 'Um computador de ultima geração',
      user_id: 1,
      category_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Products', null, {});
  }
};
