const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();



app.use(express.json());

const authRoute = require('./routes/auth.js');
const postRoute = require('./routes/posts.js')
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);


mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_CONNECT, () => {
    console.log(`DB connection is successful`);
})
app.listen(4000, () => {
    console.log(`app is running on port ${4000}`);
})