const express = require('express');
const { connectDB } =require('./utils/db');
const userRoute = require('./routes/userRoute');
const projecRoute = require('./routes/projectRoute');



const app = express();
const PORT = process.env.PORT || 4000;

connectDB().then(() => {
    app.use(express.json());
    //Define routes here
    app.use('/users', userRoute);
    app.use('/Projects', projecRoute);
    

    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
    });

}).catch(error => {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
});

