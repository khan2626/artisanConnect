const mongoose = require('mongoose');

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'artisanConnect';
const url = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

async function connectDB() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database successfully');
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
}

module.exports = { connectDB };