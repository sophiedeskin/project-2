const { User } = require('../models');

const userData =

[
  {
    "username": "Sal",
    "email": "sal@hotmail.com",
    "password": "$2b$10$U2My4uECvASmzpn56hWVA.TTn6lG2y2OeHORlrEMuruL/fSMhe4eG"
  },
  {
    "username": "Lernantino",
    "email": "lernantino@gmail.com",
    "password": "$2b$10$JrU04PuXieeoKGA/21F3.OvOimZjkAlIi/f7sscHAQToRl66Dej6O"
  },
  {
    "username": "Amiko",
    "email": "amiko2k20@aol.com",
    "password": "$2b$10$0wphoGcv1/oo4Y09hmRq..0Yj6/WjvuGSiscpM9yEqsBKHL4hUWh6"
  }
]

const seedUser = () => User.bulkCreate(userData)

module.exports = seedUser