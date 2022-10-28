'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('products', [{
      name: 'Đồ chơi siêu nhân Gao',
      thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxjMNGL-LRyuoq02_RfgqFqMEHdD-ThkuqQg&usqp=CAU',
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Đồ chơi siêu nhân Gao 2',
      thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxjMNGL-LRyuoq02_RfgqFqMEHdD-ThkuqQg&usqp=CAU',
      categoryId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('products', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
