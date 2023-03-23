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
        url: "building",
      },
      {
        reviewId: 2,
        url: "ocean",
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
