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
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-606252984970410405/original/c2774404-8db5-4a7d-9580-9031ca01f7ed.jpeg?im_w=720",
      },
      {
        reviewId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-41852129/original/4b0889f7-907b-4a81-9548-515542c62a3e.jpeg?im_w=1200",
      },
      {
        reviewId: 3,
        url: "https://a0.muscache.com/im/pictures/193b0a53-0770-47c2-b2d2-98fcafea2a5e.jpg?im_w=720",
      },
      {
        reviewId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-43389186/original/6213066a-cc8e-465f-bb58-c248aeca4ddd.jpeg?im_w=720",
      },
      {
        reviewId: 5,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-647842360836448520/original/8040d66a-dd17-40ec-bdee-97749072c348.jpeg?im_w=720",
      },
      {
        reviewId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-647842360836448520/original/4d89e4d2-016b-40c1-a331-d1176d821bba.jpeg?im_w=720",
      },
      {
        reviewId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-647842360836448520/original/cdfc7999-bfcc-42d3-855d-82426adb0fde.jpeg?im_w=720",
      },
      {
        reviewId: 8,
        url: "https://a0.muscache.com/im/pictures/6a4c6a8e-241d-4d17-8b20-185c8539c8b8.jpg?im_w=1200",
      },
      {
        reviewId: 9,
        url: "https://a0.muscache.com/im/pictures/2ccdba18-afd6-4f31-bf53-d2ff875ad161.jpg?im_w=720",
      },
      {
        reviewId: 10,
        url: "https://a0.muscache.com/im/pictures/4b5e164a-13dc-4e2c-9480-ca516b90be68.jpg?im_w=720",
      },
      {
        reviewId: 11,
        url: "https://a0.muscache.com/im/pictures/691e331b-5366-4193-af4c-fb3bd6cc3cf6.jpg?im_w=1200",
      },
      {
        reviewId: 12,
        url: "https://a0.muscache.com/im/pictures/b65beba8-35f0-4c13-be85-b1611e131b54.jpg?im_w=720",
      },
      {
        reviewId: 13,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-657868726088510799/original/1396cecb-b55e-4b21-8c24-ad45dedbdd3a.jpeg?im_w=1200",
      },
      {
        reviewId: 14,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-657868726088510799/original/d4b849f7-7ee4-4aaf-b90e-9682dfee52ca.jpeg?im_w=720",
      },
      {
        reviewId: 15,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-592144969386429220/original/89f66457-c56e-43e7-ae9d-2b29099a3c73.jpeg?im_w=720",
      },
      {
        reviewId: 16,
        url: "https://a0.muscache.com/im/pictures/6b14b5c4-9611-48ef-92e6-f4c15393da1d.jpg?im_w=720",
      },
      {
        reviewId: 17,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-592144969386429220/original/26896012-41be-47a2-bf4e-2f372bc517f4.jpeg?im_w=720",
      },
      {
        reviewId: 18,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-592144969386429220/original/2f5d406a-7493-499d-8736-af03841da288.jpeg?im_w=720",
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) =>{
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      reviewId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18] }
    }, {});
  }
};
