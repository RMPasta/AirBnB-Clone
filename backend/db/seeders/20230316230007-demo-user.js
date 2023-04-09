'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'mscott@user.io',
        username: 'mscott',
        firstName: 'Michael',
        lastName: 'Scott',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'jhalpert@user.io',
        username: 'jhalpert',
        firstName: 'Jim',
        lastName: 'Halpert',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'pbeesly@user.io',
        username: 'pbeesly',
        firstName: 'Pam',
        lastName: 'Beesly',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'dshrute@user.io',
        username: 'dshrute',
        firstName: 'Dwight',
        lastName: 'Shrute',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'shudson@user.io',
        username: 'shudson',
        firstName: 'Stanley',
        lastName: 'Hudson',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'abernard@user.io',
        username: 'abernard',
        firstName: 'Andy',
        lastName: 'Bernard',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'plapin-vance@user.io',
        username: 'plapin-vance',
        firstName: 'Phyllis',
        lastName: 'Lapin-Vance',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'kmalone@user.io',
        username: 'kmalone',
        firstName: 'Kevin',
        lastName: 'Malone',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'amartin@user.io',
        username: 'amartin',
        firstName: 'Angela',
        lastName: 'Martin',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'omartinez@user.io',
        username: 'omartinez',
        firstName: 'Oscar',
        lastName: 'Martinez',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'cbratton@user.io',
        username: 'cbratton',
        firstName: 'Creed',
        lastName: 'Bratton',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'dphilbin@user.io',
        username: 'dphilbin',
        firstName: 'Darryl',
        lastName: 'Philbin',
        hashedPassword: bcrypt.hashSync('password')
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['mscott', 'jhalpert', 'pbeesly', 'dshrute', 'shudson', 'abernard', 'plapin-vance', 'kmalone', 'amartin', 'omartinez', 'cbratton', 'dphilbin'] }
    }, {});
  }
};
