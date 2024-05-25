// services/userService.js
const User = require('../models/user');
//const Artisan = require('../models/artisan');

const createUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  console.log('user created')
};

/** 
const createArtisan = async (artisanData) => {
  const artisan = new Artisan(artisanData);
  await artisan.save();
  return artisan;
};
*/
module.exports = { createUser };
