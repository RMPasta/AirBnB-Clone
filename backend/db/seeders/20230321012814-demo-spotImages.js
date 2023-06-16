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
        url: "https://coolbnb.s3.amazonaws.com/ortley1.webp",
        preview: true,
      },
      {
        spotId: 1,
        url: "https://coolbnb.s3.amazonaws.com/ortley2.webp",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://coolbnb.s3.amazonaws.com/ortley3.webp",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://coolbnb.s3.amazonaws.com/ortley4.webp",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://coolbnb.s3.amazonaws.com/ortley5.webp",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://coolbnb.s3.amazonaws.com/vaca1.webp",
        preview: true,
      },
      {
        spotId: 2,
        url: "https://coolbnb.s3.amazonaws.com/vaca2.webp",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://coolbnb.s3.amazonaws.com/vaca3.webp",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://coolbnb.s3.amazonaws.com/vaca4.webp",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://coolbnb.s3.amazonaws.com/vaca5.webp",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://coolbnb.s3.amazonaws.com/milford1.webp",
        preview: true,
      },
      {
        spotId: 3,
        url: "https://coolbnb.s3.amazonaws.com/milford2.webp",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://coolbnb.s3.amazonaws.com/milford3.webp",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://coolbnb.s3.amazonaws.com/milford4.webp",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://coolbnb.s3.amazonaws.com/milford5.webp",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://coolbnb.s3.amazonaws.com/mantoloking1.webp",
        preview: true,
      },
      {
        spotId: 4,
        url: "https://coolbnb.s3.amazonaws.com/mantoloking2.webp",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://coolbnb.s3.amazonaws.com/mantoloking3.webp",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://coolbnb.s3.amazonaws.com/mantoloking4.webp",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://coolbnb.s3.amazonaws.com/mantoloking5.webp",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://coolbnb.s3.amazonaws.com/mantoloking5.webp",
        preview: true,
      },
      {
        spotId: 5,
        url: "https://coolbnb.s3.amazonaws.com/mantoloking5.webp",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://coolbnb.s3.amazonaws.com/mantoloking5.webp",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://coolbnb.s3.amazonaws.com/mantoloking5.webp",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://coolbnb.s3.amazonaws.com/mantoloking5.webp",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://coolbnb.s3.amazonaws.com/newyork1.webp",
        preview: true,
      },
      {
        spotId: 6,
        url: "https://coolbnb.s3.amazonaws.com/newyork2.webp",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://coolbnb.s3.amazonaws.com/newyork3.webp",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://coolbnb.s3.amazonaws.com/newyork4.webp",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://coolbnb.s3.amazonaws.com/newyork5.webp",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://coolbnb.s3.amazonaws.com/tent1.webp",
        preview: true,
      },
      {
        spotId: 7,
        url: "https://coolbnb.s3.amazonaws.com/tent2.webp",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://coolbnb.s3.amazonaws.com/tent3.webp",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://coolbnb.s3.amazonaws.com/tent4.webp",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://coolbnb.s3.amazonaws.com/tent5.webp",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://coolbnb.s3.amazonaws.com/hut1.webp",
        preview: true,
      },
      {
        spotId: 8,
        url: "https://coolbnb.s3.amazonaws.com/hut2.webp",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://coolbnb.s3.amazonaws.com/hut3.webp",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://coolbnb.s3.amazonaws.com/hut4.webp",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://coolbnb.s3.amazonaws.com/hut5.webp",
        preview: false,
      },
      {
        spotId: 9,
        url: "https://coolbnb.s3.amazonaws.com/sweet1.webp",
        preview: true,
      },
      {
        spotId: 9,
        url: "https://coolbnb.s3.amazonaws.com/sweet2.webp",
        preview: false,
      },
      {
        spotId: 9,
        url: "https://coolbnb.s3.amazonaws.com/sweet3.webp",
        preview: false,
      },
      {
        spotId: 9,
        url: "https://coolbnb.s3.amazonaws.com/sweet4.webp",
        preview: false,
      },
      {
        spotId: 9,
        url: "https://coolbnb.s3.amazonaws.com/sweet5.webp",
        preview: false,
      },
      {
        spotId: 10,
        url: "https://coolbnb.s3.amazonaws.com/wow1.webp",
        preview: true,
      },
      {
        spotId: 10,
        url: "https://coolbnb.s3.amazonaws.com/wow2.webp",
        preview: false,
      },
      {
        spotId: 10,
        url: "https://coolbnb.s3.amazonaws.com/wow3.webp",
        preview: false,
      },
      {
        spotId: 10,
        url: "https://coolbnb.s3.amazonaws.com/wow4.webp",
        preview: false,
      },
      {
        spotId: 10,
        url: "https://coolbnb.s3.amazonaws.com/wow5.webp",
        preview: false,
      },
      {
        spotId: 11,
        url: "https://coolbnb.s3.amazonaws.com/cool1.webp",
        preview: true,
      },
      {
        spotId: 11,
        url: "https://coolbnb.s3.amazonaws.com/cool2.webp",
        preview: false,
      },
      {
        spotId: 11,
        url: "https://coolbnb.s3.amazonaws.com/cool3.webp",
        preview: false,
      },
      {
        spotId: 11,
        url: "https://coolbnb.s3.amazonaws.com/cool4.webp",
        preview: false,
      },
      {
        spotId: 11,
        url: "https://coolbnb.s3.amazonaws.com/cool5.webp",
        preview: false,
      },
      {
        spotId: 12,
        url: "https://coolbnb.s3.amazonaws.com/castle1.webp",
        preview: true,
      },
      {
        spotId: 12,
        url: "https://coolbnb.s3.amazonaws.com/castle2.webp",
        preview: false,
      },
      {
        spotId: 12,
        url: "https://coolbnb.s3.amazonaws.com/castle3.webp",
        preview: false,
      },
      {
        spotId: 12,
        url: "https://coolbnb.s3.amazonaws.com/castle4.webp",
        preview: false,
      },
      {
        spotId: 12,
        url: "https://coolbnb.s3.amazonaws.com/castle5.webp",
        preview: false,
      },
      {
        spotId: 13,
        url: "https://coolbnb.s3.amazonaws.com/brand1.webp",
        preview: true,
      },
      {
        spotId: 13,
        url: "https://coolbnb.s3.amazonaws.com/brand2.webp",
        preview: false,
      },
      {
        spotId: 13,
        url: "https://coolbnb.s3.amazonaws.com/brand3.webp",
        preview: false,
      },
      {
        spotId: 13,
        url: "https://coolbnb.s3.amazonaws.com/brand4.webp",
        preview: false,
      },
      {
        spotId: 13,
        url: "https://coolbnb.s3.amazonaws.com/brand5.webp",
        preview: false,
      },
      {
        spotId: 14,
        url: "https://coolbnb.s3.amazonaws.com/rules1.webp",
        preview: true,
      },
      {
        spotId: 14,
        url: "https://coolbnb.s3.amazonaws.com/rules2.webp",
        preview: false,
      },
      {
        spotId: 14,
        url: "https://coolbnb.s3.amazonaws.com/rules3.webp",
        preview: false,
      },
      {
        spotId: 14,
        url: "https://coolbnb.s3.amazonaws.com/rules4.webp",
        preview: false,
      },
      {
        spotId: 14,
        url: "https://coolbnb.s3.amazonaws.com/rules5.webp",
        preview: false,
      },
      {
        spotId: 15,
        url: "https://coolbnb.s3.amazonaws.com/awe1.webp",
        preview: true,
      },
      {
        spotId: 15,
        url: "https://coolbnb.s3.amazonaws.com/awe2.webp",
        preview: false,
      },
      {
        spotId: 15,
        url: "https://coolbnb.s3.amazonaws.com/awe3.webp",
        preview: false,
      },
      {
        spotId: 15,
        url: "https://coolbnb.s3.amazonaws.com/awe4.webp",
        preview: false,
      },
      {
        spotId: 15,
        url: "https://coolbnb.s3.amazonaws.com/awe5.webp",
        preview: false,
      },
      {
        spotId: 16,
        url: "https://coolbnb.s3.amazonaws.com/cottage1.webp",
        preview: true,
      },
      {
        spotId: 16,
        url: "https://coolbnb.s3.amazonaws.com/cottage2.webp",
        preview: false,
      },
      {
        spotId: 16,
        url: "https://coolbnb.s3.amazonaws.com/cottage3.webp",
        preview: false,
      },
      {
        spotId: 16,
        url: "https://coolbnb.s3.amazonaws.com/cottage4.webp",
        preview: false,
      },
      {
        spotId: 16,
        url: "https://coolbnb.s3.amazonaws.com/cottage5.webp",
        preview: false,
      },
      {
        spotId: 17,
        url: "https://coolbnb.s3.amazonaws.com/great1.webp",
        preview: true,
      },
      {
        spotId: 17,
        url: "https://coolbnb.s3.amazonaws.com/great2.webp",
        preview: false,
      },
      {
        spotId: 17,
        url: "https://coolbnb.s3.amazonaws.com/great3.webp",
        preview: false,
      },
      {
        spotId: 17,
        url: "https://coolbnb.s3.amazonaws.com/great4.webp",
        preview: false,
      },
      {
        spotId: 17,
        url: "https://coolbnb.s3.amazonaws.com/great5.webp",
        preview: false,
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) =>{
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }
    }, {});
  }
};
