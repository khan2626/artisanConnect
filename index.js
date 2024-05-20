const express = require('express');
const { connectDB } =require('./utils/db');

const app = express();

connectDB();

app.use(express.json());


app.listen(3000, () => {
    console.log('server running')
});