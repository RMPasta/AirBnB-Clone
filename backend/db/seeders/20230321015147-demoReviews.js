'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 3,
        review: "great!",
        stars: 5,
      },
      // {
      //   spotId: 1,
      //   userId: 4,
      //   review: "such cool spot",
      //   stars: 5,
      // },
      // {
      //   spotId: 1,
      //   userId: 5,
      //   review: "no no. bad!",
      //   stars: 1,
      // },
      {
        spotId: 2,
        userId: 3,
        review: "cool cool",
        stars: 4,
      },
      // {
      //   spotId: 2,
      //   userId: 4,
      //   review: "sweet cool",
      //   stars: 5,
      // },
      {
        spotId: 3,
        userId: 5,
        review: "business",
        stars: 4,
      },
      // {
      //   spotId: 3,
      //   userId: 1,
      //   review: "business like",
      //   stars: 3,
      // },
      {
        spotId: 4,
        userId: 5,
        review: "awesome",
        stars: 5,
      },
      {
        spotId: 5,
        userId: 4,
        review: "just ok",
        stars: 2,
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) =>{
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
