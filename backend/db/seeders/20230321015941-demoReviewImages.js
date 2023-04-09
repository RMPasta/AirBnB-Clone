'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: "house1.png",
      },
      {
        reviewId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-41852129/original/4b0889f7-907b-4a81-9548-515542c62a3e.jpeg?im_w=1200",
      },
      {
        reviewId: 3,
        url: "windmill",
      },
      {
        reviewId: 4,
        url: "bridge",
      },
      {
        reviewId: 5,
        url: "band",
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) =>{
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
