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
        startDate: new Date("2023-11-02"),
        endDate: new Date("2023-11-18"),
      },
      {
        spotId: 1,
        userId: 3,
        startDate: new Date("2023-11-19"),
        endDate: new Date("2023-11-21"),
      },
      {
        spotId: 1,
        userId: 4,
        startDate: new Date("2023-11-23"),
        endDate: new Date("2023-11-24"),
      },
      {
        spotId: 1,
        userId: 5,
        startDate: new Date("2023-12-02"),
        endDate: new Date("2023-12-18"),
      },
      {
        spotId: 2,
        userId: 5,
        startDate: new Date("2023-11-02"),
        endDate: new Date("2023-11-18"),
      },
      {
        spotId: 2,
        userId: 4,
        startDate: new Date("2023-11-22"),
        endDate: new Date("2023-11-25"),
      },
      {
        spotId: 3,
        userId: 4,
        startDate: new Date("2023-11-02"),
        endDate: new Date("2023-11-18"),
      },
      {
        spotId: 3,
        userId: 4,
        startDate: new Date("2023-11-22"),
        endDate: new Date("2023-11-25"),
      },
      {
        spotId: 4,
        userId: 1,
        startDate: new Date("2023-12-02"),
        endDate: new Date("2023-12-18"),
      },
      {
        spotId: 5,
        userId: 4,
        startDate: new Date("2023-11-22"),
        endDate: new Date("2023-11-25"),
      },
      {
        spotId: 5,
        userId: 2,
        startDate: new Date("2023-11-27"),
        endDate: new Date("2023-11-28"),
      },
      {
        spotId: 5,
        userId: 1,
        startDate: new Date("2023-12-04"),
        endDate: new Date("2023-12-08"),
      },
      {
        spotId: 6,
        userId: 1,
        startDate: new Date("2023-12-04"),
        endDate: new Date("2023-12-08"),
      },
      {
        spotId: 7,
        userId: 1,
        startDate: new Date("2023-12-04"),
        endDate: new Date("2023-12-08"),
      },
      {
        spotId: 8,
        userId: 1,
        startDate: new Date("2023-12-04"),
        endDate: new Date("2023-12-08"),
      },
      {
        spotId: 9,
        userId: 1,
        startDate: new Date("2023-12-04"),
        endDate: new Date("2023-12-08"),
      },
      {
        spotId: 10,
        userId: 1,
        startDate: new Date("2023-12-04"),
        endDate: new Date("2023-12-08"),
      },
      {
        spotId: 11,
        userId: 1,
        startDate: new Date("2023-12-04"),
        endDate: new Date("2023-12-08"),
      },
      {
        spotId: 12,
        userId: 1,
        startDate: new Date("2023-12-04"),
        endDate: new Date("2023-12-08"),
      },
      {
        spotId: 13,
        userId: 1,
        startDate: new Date("2023-12-04"),
        endDate: new Date("2023-12-08"),
      },
      {
        spotId: 14,
        userId: 1,
        startDate: new Date("2023-12-04"),
        endDate: new Date("2023-12-08"),
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) =>{
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }
    }, {});
  }
};
