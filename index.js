const express = require('express');
const { connectDB } =require('./utils/db');
require('./models/user');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.use(express.json());
    //Define routes here


    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
    });

}).catch(error => {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  });

