"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          address: "1 Cool Street",
          city: "Seaside Heights",
          state: "New Jersey",
          country: "United States of America",
          lat: 11,
          lng: 11,
          name: "Ortley House",
          description:
            "Great pool! Right by the shore. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          price: 1000,
        },
        {
          ownerId: 1,
          address: "2 Cool Street",
          city: "Fire Island Pines",
          state: "New York",
          country: "United States of America",
          lat: 22,
          lng: 22,
          name: "Vacation House",
          description:
            "Close to good places! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis pellentesque id nibh tortor.",
          price: 2000,
        },
        {
          ownerId: 1,
          address: "3 Cool Street",
          city: "Milford",
          state: "Connecticut",
          country: "United States of America",
          lat: 33,
          lng: 33,
          name: "Home in Milford",
          description:
            "Just look at that home. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Neque vitae tempus quam pellentesque.",
          price: 3000,
        },
        {
          ownerId: 2,
          address: "4 Cool Street",
          city: "Mantoloking",
          state: "New Jersey",
          country: "United States of America",
          lat: 44,
          lng: 44,
          name: "House in Mantoloking",
          description:
            "Wow great home! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam id diam maecenas ultricies.",
          price: 4000,
        },
        {
          ownerId: 3,
          address: "5 Cool Street",
          city: "New York",
          state: "New York",
          country: "United States of America",
          lat: 55,
          lng: 55,
          name: "Bungalow in New York",
          description:
            "Music happens here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin sagittis nisl rhoncus mattis rhoncus urna neque.",
          price: 5000,
        },
        {
          ownerId: 4,
          address: "6 Cool Street",
          city: "Seaside Heights",
          state: "New Jersey",
          country: "United States of America",
          lat: 66,
          lng: 66,
          name: "Hut in Seaside",
          description:
            "Really good hut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut sem viverra aliquet eget sit amet.",
          price: 6000,
        },
        {
          ownerId: 5,
          address: "7 Cool Street",
          city: "Chincoteague Island",
          state: "Virginia",
          country: "United States of America",
          lat: 77,
          lng: 77,
          name: "Really Great House to Stay",
          description:
            "Great house! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris ultrices eros in cursus turpis massa.",
          price: 7000,
        },
        {
          ownerId: 6,
          address: "8 Cool Street",
          city: "Ocean City",
          state: "Maryland",
          country: "United States of America",
          lat: 88,
          lng: 88,
          name: "Cool New House",
          description:
            "So cool. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec ultrices dui sapien eget mi proin.",
          price: 8000,
        },
        {
          ownerId: 7,
          address: "9 Cool Street",
          city: "Scranton",
          state: "Pennsylvania",
          country: "United States of America",
          lat: 99,
          lng: 99,
          name: "A Castle",
          description:
            "A real life castle! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet.",
          price: 9000,
        },
        {
          ownerId: 8,
          address: "10 Cool Street",
          city: "Atlantic City",
          state: "New Jersey",
          country: "United States of America",
          lat: 111,
          lng: 111,
          name: "Brand New House",
          description:
            "Super new. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida rutrum quisque non tellus orci ac auctor.",
          price: 900,
        },
        {
          ownerId: 9,
          address: "11 Cool Street",
          city: "Seaside Heights",
          state: "New Jersey",
          country: "United States of America",
          lat: 222,
          lng: 222,
          name: "This House Rules",
          description:
            "Awesome house!!! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae purus faucibus ornare suspendisse.",
          price: 800,
        },
        {
          ownerId: 10,
          address: "12 Cool Street",
          city: "Revere",
          state: "Massachusetts",
          country: "United States of America",
          lat: 333,
          lng: 333,
          name: "Awesome Place to be",
          description:
            "You'll regret not staying here if you don't! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae purus faucibus ornare suspendisse.",
          price: 700,
        },
        {
          ownerId: 11,
          address: "13 Cool Street",
          city: "Seaside Heights",
          state: "New Jersey",
          country: "United States of America",
          lat: 444,
          lng: 444,
          name: "Cottage in Seaside Heights.",
          description:
            "Great cottage. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim ut tellus elementum sagittis vitae.",
          price: 1400,
        },
        {
          ownerId: 12,
          address: "14 Cool Street",
          city: "Hampton",
          state: "New Hampshire",
          country: "United States of America",
          lat: 555,
          lng: 555,
          name: "Sweet Little Place",
          description:
            "So sweet this litte place is. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non consectetur a erat nam at lectus urna duis convallis.",
          price: 1500,
        },
        {
          ownerId: 12,
          address: "15 Cool Street",
          city: "Seaside Heights",
          state: "New Jersey",
          country: "United States of America",
          lat: 666,
          lng: 666,
          name: "Big Big Home",
          description:
            "Big, big place. I mean wow, it's huge. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget nunc lobortis mattis aliquam.",
          price: 1600,
        },
        {
          ownerId: 13,
          address: "16 Cool Street",
          city: "Woodbury",
          state: "Connecticut",
          country: "United States of America",
          lat: 777,
          lng: 777,
          name: "Really great pool place",
          description:
            "Just look at this pool and book this spot! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget nunc lobortis mattis aliquam.",
          price: 200,
        },
        {
          ownerId: 13,
          address: "17 Cool Street",
          city: "Seaside Heights",
          state: "New Jersey",
          country: "United States of America",
          lat: 666,
          lng: 666,
          name: "Right by the beach",
          description:
            "Doesn't get much closer to the beach than this. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget nunc lobortis mattis aliquam.",
          price: 600,
        },
        {
          ownerId: 1,
          address: "18 Cool Street",
          city: "Jersey City",
          state: "New Jersey",
          country: "United States of America",
          lat: 111,
          lng: 111,
          name: "Jersey Livin'",
          description:
            "Doesn't get much closer to Jersey than this. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget nunc lobortis mattis aliquam.",
          price: 200,
        },
        {
          ownerId: 13,
          address: "19 Cool Street",
          city: "Heightstown",
          state: "New Jersey",
          country: "United States of America",
          lat: 222,
          lng: 222,
          name: "Right by the beach",
          description:
            "You can't beat this deal! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget nunc lobortis mattis aliquam.",
          price: 100,
        },
        {
          ownerId: 2,
          address: "20 Cool Street",
          city: "Brick",
          state: "New Jersey",
          country: "United States of America",
          lat: 333,
          lng: 333,
          name: "Wonder house",
          description:
            "Get a load of this place!! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget nunc lobortis mattis aliquam.",
          price: 89,
        },
        {
          ownerId: 3,
          address: "21 Cool Street",
          city: "Seaside Heights",
          state: "New Jersey",
          country: "United States of America",
          lat: 66,
          lng: 66,
          name: "Right ON the beach",
          description:
            "Doesn't get much closer to the beach than this!!! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget nunc lobortis mattis aliquam.",
          price: 300,
        },
        {
          ownerId: 4,
          address: "22 Cool Street",
          city: "Wall",
          state: "New Jersey",
          country: "United States of America",
          lat: 33,
          lng: 32,
          name: "Right by the beach",
          description:
            "I love this building. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget nunc lobortis mattis aliquam.",
          price: 222,
        },
        {
          ownerId: 5,
          address: "23 Cool Street",
          city: "Seaside Heights",
          state: "New Jersey",
          country: "United States of America",
          lat: 88,
          lng: 66,
          name: "Nice shore home!",
          description:
            "Soooo Relaxing. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget nunc lobortis mattis aliquam.",
          price: 343,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        ownerId: {
          [Op.in]: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20, 21, 22, 23,
          ],
        },
      },
      {}
    );
  },
};
