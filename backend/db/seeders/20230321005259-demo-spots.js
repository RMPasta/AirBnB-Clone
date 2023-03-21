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
        ownerId: 4,
        address: "123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 11,
        lng: 11,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 1000,
      },
      {
        ownerId: 1,
        address: "1234 Orlando Drive",
        city: "Orlando",
        state: "Florida",
        country: "United States of America",
        lat: 22,
        lng: 22,
        name: "Convient Store",
        description: "Place for convience",
        price: 2000,
      },
      {
        ownerId: 5,
        address: "12345 Walt Road",
        city: "Hamilton",
        state: "New Jersey",
        country: "United States of America",
        lat: 33,
        lng: 33,
        name: "My House",
        description: "Big, big house",
        price: 3000,
      },
      {
        ownerId: 3,
        address: "123456 Bumbis Way",
        city: "Wee",
        state: "Alaska",
        country: "United States of America",
        lat: 44,
        lng: 44,
        name: "A Tree",
        description: "Tall Tree",
        price: 4000,
      },
      {
        ownerId: 2,
        address: "1234567 Road Ave",
        city: "Huntington",
        state: "Maryland",
        country: "United States of America",
        lat: 55,
        lng: 55,
        name: "A House",
        description: "Music happens here",
        price: 6000,
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) =>{
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
