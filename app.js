const express = require('express');
const user = require('./Routes/user');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://127.0.0.1/userDatabase')
    .then(() => {
        console.log('Connection is successfull to database');
    })
    .catch((err) => {
        console.log('Could not connect', err);
    });

app.use(cors());
app.use(express.json());
app.use('/user', user);

const port = process.env.PORT || 1800;

app.listen(port, () => console.log(`Port is Running on ${port}`));