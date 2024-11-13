const express = require('express');
const app = express();
require('dotenv').config();
const dbConnect = require('./config/database');

const PORT = process.env.PORT

// first Database connection will check then start the server.
dbConnect()
    .then(() => {
        console.log("Database connected successfully...");

        app.listen(process.env.PORT, () => {
            console.log(`server is running on port ${process.env.PORT}`);
        })
    })
    .catch((e) => {
        console.log("Error in Database connection " + e);
    })