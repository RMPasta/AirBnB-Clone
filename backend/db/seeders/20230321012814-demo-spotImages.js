'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-41852129/original/4b0889f7-907b-4a81-9548-515542c62a3e.jpeg?im_w=1200",
        preview: true,
      },
      {
        spotId: 2,
        url: "nice convenient store",
        preview: true,
      },
      {
        spotId: 3,
        url: "my house",
        preview: false,
      },
      {
        spotId: 4,
        url: "tall tree",
        preview: false,
      },
      {
        spotId: 5,
        url: "music house",
        preview: true,
      },
      {
        spotId: 5,
        url: "cool band",
        preview: false,
      },
      {
        spotId: 5,
        url: "music stuff",
        preview: false,
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) =>{
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
