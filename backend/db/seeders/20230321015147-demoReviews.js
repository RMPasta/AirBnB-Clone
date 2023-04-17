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
        review: "great! can't recommend it enough! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        stars: 5,
      },
      {
        spotId: 1,
        userId: 4,
        review: "such cool spot. i wish i lived there. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque habitant morbi tristique senectus et netus et malesuada. Morbi blandit cursus risus at ultrices mi.",
        stars: 5,
      },
      {
        spotId: 1,
        userId: 7,
        review: "I had a good time but my family hated it. :(",
        stars: 2,
      },
      {
        spotId: 1,
        userId: 11,
        review: "I WILL BE BACK!!! COOL SPOT. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque habitant morbi tristique senectus et netus et malesuada. Morbi blandit cursus risus at ultrices mi.",
        stars: 4,
      },
      {
        spotId: 1,
        userId: 5,
        review: "no no. bad! stay. a. way. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        stars: 1,
      },
      {
        spotId: 2,
        userId: 3,
        review: "cool cool coooooooool Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        stars: 4,
      },
      {
        spotId: 2,
        userId: 4,
        review: "sweet cool! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        stars: 5,
      },
      {
        spotId: 3,
        userId: 5,
        review: "business Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque habitant morbi tristique senectus et netus et malesuada. Morbi blandit cursus risus at ultrices mi.",
        stars: 4,
      },
      {
        spotId: 3,
        userId: 12,
        review: "business like Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        stars: 3,
      },
      {
        spotId: 4,
        userId: 5,
        review: "awesome Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        stars: 5,
      },
      {
        spotId: 5,
        userId: 4,
        review: "just ok Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        stars: 2,
      },
      {
        spotId: 6,
        userId: 12,
        review: "Pretty cool Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque habitant morbi tristique senectus et netus et malesuada. Morbi blandit cursus risus at ultrices mi.",
        stars: 4,
      },
      {
        spotId: 7,
        userId: 12,
        review: "Nice stay. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        stars: 3,
      },
      {
        spotId: 8,
        userId: 11,
        review: "loved it Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dui id ornare arcu odio ut sem nulla pharetra diam. Adipiscing enim eu turpis egestas pretium aenean pharetra. Nisl rhoncus mattis rhoncus urna neque. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus in massa tempor nec feugiat nisl pretium fusce.",
        stars: 5,
      },
      {
        spotId: 9,
        userId: 10,
        review: "Not great!! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        stars: 1,
      },
      {
        spotId: 10,
        userId: 3,
        review: "just ok Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        stars: 2,
      },
      {
        spotId: 11,
        userId: 7,
        review: "I had a great time. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        stars: 4,
      },
      {
        spotId: 12,
        userId: 6,
        review: "Wow! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque habitant morbi tristique senectus et netus et malesuada. Morbi blandit cursus risus at ultrices mi.",
        stars: 5,
      },
      {
        spotId: 13,
        userId: 8,
        review: "So cool! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        stars: 4,
      },
      {
        spotId: 14,
        userId: 10,
        review: "Bad bad bad Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        stars: 1,
      },
      {
        spotId: 15,
        userId: 11,
        review: "Really really good Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        stars: 4,
      },
      {
        spotId: 15,
        userId: 9,
        review: "WOW so good. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        stars: 4,
      },
      {
        spotId: 15,
        userId: 8,
        review: "Really good Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque habitant morbi tristique senectus et netus et malesuada. Morbi blandit cursus risus at ultrices mi.",
        stars: 4,
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) =>{
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] }
    }, {});
  }
};
