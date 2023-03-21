'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 1,
        lng: 1,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123,
      },
      {
        ownerId: 2,
        address: "1234 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 10,
        lng: 10,
        name: "Convient Store",
        description: "Place for convience",
        price: 1234,
      },
      {
        ownerId: 3,
        address: "12345 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 100,
        lng: 100,
        name: "My House",
        description: "Big, big house",
        price: 12345,
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) =>{
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1] }
    }, {});
  }
};
