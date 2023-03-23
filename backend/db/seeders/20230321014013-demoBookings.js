'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        startDate: new Date("2021-11-02"),
        endDate: new Date("2021-11-18"),
      },
      {
        spotId: 1,
        userId: 3,
        startDate: new Date("2021-12-02"),
        endDate: new Date("2021-12-18"),
      },
      {
        spotId: 2,
        userId: 5,
        startDate: new Date("2021-11-02"),
        endDate: new Date("2021-11-18"),
      },
      {
        spotId: 2,
        userId: 4,
        startDate: new Date("2021-11-22"),
        endDate: new Date("2021-11-25"),
      },
      {
        spotId: 3,
        userId: 4,
        startDate: new Date("2021-11-02"),
        endDate: new Date("2021-11-18"),
      },
      {
        spotId: 3,
        userId: 4,
        startDate: new Date("2021-11-22"),
        endDate: new Date("2021-11-25"),
      },
      {
        spotId: 4,
        userId: 1,
        startDate: new Date("2021-12-02"),
        endDate: new Date("2021-12-18"),
      },
      {
        spotId: 5,
        userId: 4,
        startDate: new Date("2021-11-22"),
        endDate: new Date("2021-11-25"),
      },
      {
        spotId: 5,
        userId: 2,
        startDate: new Date("2021-11-27"),
        endDate: new Date("2021-11-28"),
      },
      {
        spotId: 5,
        userId: 1,
        startDate: new Date("2021-12-04"),
        endDate: new Date("2021-12-08"),
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) =>{
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
