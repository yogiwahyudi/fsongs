'use strict';
const bcrypt = require('bcryptjs')
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Users', [{
        id: 1,
        email: 'user1@gmail.com',
        password: bcrypt.hashSync('user', 10),
        createdAt: new Date(),
        updatedAt: new Date()

      }], {});
      await queryInterface.bulkInsert('Favorites', [{
        id: 1,
        title: 'The Scientist',
        artist: 'Coldpaly',
        image: 'https://api.deezer.com/album/299821/image',
        file: 'https://cdns-preview-b.dzcdn.net/stream/c-b2a9b8a5b6dd033ce39a76a7f628bb54-3.mp3',
        userId:2,
        createdAt: new Date(),
        updatedAt: new Date()

      }], {});
  },

  async down (queryInterface, Sequelize) {
    /*
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Favorites', null, {});
  }
};
