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
        startDate: new Date(),
        endDate: new Date('August 19, 2023 24:00:00'),
      },
      {
        spotId: 2,
        userId: 5,
        startDate: new Date(),
        endDate: new Date('August 27, 2023 24:00:00'),
      },
      {
        spotId: 3,
        userId: 4,
        startDate: new Date(),
        endDate: new Date('August 1, 2023 24:00:00'),
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) =>{
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
