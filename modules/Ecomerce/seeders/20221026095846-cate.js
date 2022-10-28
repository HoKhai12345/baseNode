'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [{
      name: 'Đồ chơi',
      thumbnail: 'https://d1jqecz1iy566e.cloudfront.net/large/fa088.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Đồ chơi siêu nhân Gao 2',
      thumbnail: 'https://d1jqecz1iy566e.cloudfront.net/large/fa088.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
