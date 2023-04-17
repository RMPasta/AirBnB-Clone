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
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-41852129/original/4b0889f7-907b-4a81-9548-515542c62a3e.jpeg?im_w=1200",
        preview: true,
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-41852129/original/c4626438-2299-4b48-9046-63339a9c9fe1.jpeg?im_w=720",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-41852129/original/c6876367-55b9-42c2-8be5-adb5a99565bd.jpeg?im_w=720",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-41852129/original/88d7d5d2-3d6a-4195-a47b-0027be35ca9c.jpeg?im_w=1200",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-41852129/original/0c31010f-9ddd-47d1-a205-87688d167367.jpeg?im_w=720",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/69a505b7-bbf2-40ea-b8c0-56cec2aa1d08.jpg?im_w=1200",
        preview: true,
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-737127523249211662/original/107fd8b6-0093-4a78-9860-c36c38656672.jpeg?im_w=720",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-737127523249211662/original/a7e7b8a3-84d8-4b43-8967-168d03313a6a.jpeg?im_w=720",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-44572791/original/1f324ad5-6f94-4d47-a79a-aac75eb5942b.jpeg?im_w=720",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-44572791/original/e67f8999-f190-4a71-8fcb-03f290508200.jpeg?im_w=720",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/2888f2a3-de42-421f-ab4c-ae8ac9ba6292.jpg?im_w=1200",
        preview: true,
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/6c6b244d-92fa-40f3-8a78-0842e1c812f4.jpg?im_w=720",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/740db50e-0db6-4eb0-810b-70a54345d0c9.jpg?im_w=720",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/740db50e-0db6-4eb0-810b-70a54345d0c9.jpg?im_w=720",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-32724817/original/69e4e251-e72a-4a8c-9331-b0a65c4703c0.jpeg?im_w=720",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-46352146/original/a1547a97-0f17-4fad-8f22-ea2bd40e868d.jpeg?im_w=1200",
        preview: true,
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-46352146/original/74f2834f-e474-4712-8ecc-152b7a3d71f7.jpeg?im_w=720",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-46352146/original/48c0f3b3-02d8-4f1e-9bb1-3df11c0ab8d3.jpeg?im_w=1200",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-32724817/original/ed4d9c8c-b660-4e29-b27f-9151d748c565.jpeg?im_w=720",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/747e957a-161f-449d-8fb6-3e7ef377d5fe.jpg?im_w=1200",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/c195b00e-0e63-4798-a7c3-b9716fc18768.jpg?im_w=720",
        preview: true,
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/67de0e17-7ba9-42f5-8531-7f8b09628da7.jpg?im_w=720",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/3bdfa78f-8c27-4f25-b840-a8cf8e4507a4.jpg?im_w=720",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/275883b7-acb5-4df5-a177-3988be976e71.jpg?im_w=1200",
        preview: true,
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/7c15a234-7cc9-440f-b7f8-ae4c7aeee96d.jpg?im_w=720",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/13881df9-7737-441f-a3c4-509c5393b277.jpg?im_w=720",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/5bec34d5-c788-47fc-8b21-cbe5a0187489.jpg?im_w=1200",
        preview: true,
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-601340107894637996/original/86617006-c147-4d65-bfa5-9c3ed14ea868.jpeg?im_w=720",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-601340107894637996/original/7a498994-d68a-4d71-a198-3bf9a793982a.jpeg?im_w=720",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/7d4ebf00-a829-4892-a030-27646d0aaa3a.jpg?im_w=1200",
        preview: true,
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/e02dc547-a386-4c95-aa83-f0798a6486ab.jpg?im_w=720",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/7381855a-e96c-453a-8ce8-61123e3ec2bb.jpg?im_w=720",
        preview: false,
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/c8b0a5de-3507-4d0f-8fa4-d4882f5c2526.jpg?im_w=1200",
        preview: true,
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/d2eb8777-b143-4a71-a092-edc7a44ae259.jpg?im_w=720",
        preview: false,
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/0006b507-7bcb-4b53-89ee-10afcbaa5f62.jpg?im_w=720",
        preview: false,
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/4dfc350a-ac73-410d-a1d5-b6ae3352cc2d.jpg?im_w=1200",
        preview: true,
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/31f45b9e-901d-4daa-8fe7-1b8ef636dfce.jpg?im_w=720",
        preview: false,
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/b4a0c447-1b02-44fb-bd93-1f70098b5898.jpg?im_w=720",
        preview: false,
      },
      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/30ae29ca-20d2-41d5-9e87-d6e0c0aefa62.jpg?im_w=1200",
        preview: true,
      },
      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/a4eb6bc6-5fe7-40af-9bdc-dc4ccfa21b64.jpg?im_w=720",
        preview: false,
      },
      {
        spotId: 11,
        url: "https://a0.muscache.com/im/pictures/b88e62b1-c59c-4e6f-8cf2-0951d772fb29.jpg?im_w=1200",
        preview: false,
      },
      {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-606252984970410405/original/a1c076a8-c82a-4f4a-83ce-6f916d0b2af4.jpeg?im_w=1200",
        preview: true,
      },
      {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-606252984970410405/original/906ba04f-de6e-4d4e-9b5a-51558ebd3fac.jpeg?im_w=720",
        preview: false,
      },
      {
        spotId: 12,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-606252984970410405/original/0c1c829c-f068-424b-93d4-5da133772ece.jpeg?im_w=1200",
        preview: false,
      },
      {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-53341342/original/3b4f31c6-28ba-46c6-9ce6-e41895e984e3.jpeg?im_w=1200",
        preview: true,
      },
      {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-53341342/original/4c61d418-5265-465c-a3ab-3f24c09f241c.jpeg?im_w=720",
        preview: false,
      },
      {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-53341342/original/780d37b9-850a-4e2c-93a7-27d2401248ac.jpeg?im_w=720",
        preview: false,
      },
      {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/4ba36270-aeda-4467-84c6-df40f8ec1b7b.jpg?im_w=1200",
        preview: false,
      },
      {
        spotId: 13,
        url: "https://a0.muscache.com/im/pictures/1e0996e3-7676-4435-aa02-1f7f161422a4.jpg?im_w=720",
        preview: false,
      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-43389186/original/0334954a-408f-4af7-b6e5-2dd69353d338.jpeg?im_w=1200",
        preview: true,
      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-43389186/original/d9a83e13-a7ad-4dea-83fd-ef3f9b12b2c2.jpeg?im_w=720",
        preview: false,
      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/193b0a53-0770-47c2-b2d2-98fcafea2a5e.jpg?im_w=720",
        preview: false,
      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/8ecc4e0e-358b-40d7-b18c-3ae8beca259f.jpg?im_w=720",
        preview: false,
      },
      {
        spotId: 14,
        url: "https://a0.muscache.com/im/pictures/ed008cc8-9001-4fde-b1bd-8df3d1705634.jpg?im_w=1200",
        preview: false,
      },
      {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/4dae2ca6-47f3-4a41-86a3-54dbd0ee021c.jpg?im_w=1200",
        preview: true,
      },
      {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/d27460a5-ae24-4acd-9cf3-9850748d89a9.jpg?im_w=720",
        preview: false,
      },
      {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/171831e4-3fb5-449f-ab67-9aed2f279e8c.jpg?im_w=720",
        preview: false,
      },
      {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-45642208/original/418676a4-18ae-4059-b0c9-2ddc806020ed.jpeg?im_w=720",
        preview: false,
      },
      {
        spotId: 15,
        url: "https://a0.muscache.com/im/pictures/1eadc23c-2040-476a-994a-57835056d13e.jpg?im_w=720",
        preview: false,
      },
      {
        spotId: 16,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-45178572/original/7fae161f-1d04-4c9b-acea-8bf3593fc004.jpeg?im_w=1200",
        preview: true,
      },
      {
        spotId: 16,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-45178572/original/fd8fa075-7aaa-4b2c-afc8-0c456ff57d57.jpeg?im_w=720",
        preview: false,
      },
      {
        spotId: 16,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-45178572/original/877cb0a0-4a5d-451b-909c-8ba287334e08.jpeg?im_w=720",
        preview: false,
      },
      {
        spotId: 16,
        url: "https://a0.muscache.com/im/pictures/5f390c40-aaaf-4215-85d1-9423cceea1d3.jpg?im_w=720",
        preview: false,
      },
      {
        spotId: 16,
        url: "https://a0.muscache.com/im/pictures/5f390c40-aaaf-4215-85d1-9423cceea1d3.jpg?im_w=720",
        preview: false,
      },
      {
        spotId: 17,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-52513855/original/62dd6c05-0ebf-41c9-b123-fd7963410e5d.jpeg?im_w=1200",
        preview: true,
      },
      {
        spotId: 17,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-52513855/original/79b96cc3-3ecc-4793-b1cb-5bd335e59cae.jpeg?im_w=720",
        preview: false,
      },
      {
        spotId: 17,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-52513855/original/f86eae7c-71e8-465c-be9b-1b3770ed2f1d.jpeg?im_w=720",
        preview: false,
      },
      {
        spotId: 17,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-52513855/original/8195c8d5-a8dd-47ee-8cf5-26236e3ac6dc.jpeg?im_w=720",
        preview: false,
      },
      {
        spotId: 17,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-52513855/original/0f6e6824-f4b1-4385-b900-ee390f354aa0.jpeg?im_w=720",
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
