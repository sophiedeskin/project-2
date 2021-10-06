const { User } = require('../models');

const userData =

[
  {
    "email": "sal@hotmail.com",
    "password": "password123"
  },
  {
    "email": "lernantino@gmail.com",
    "password": "password123"
  },
  {
    "email": "amiko2k20@aol.com",
    "password": "password123"
  }
]

const seedUser = () => User.bulkCreate(userData)

module.exports = seedUser