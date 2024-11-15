const express = require('express');
const app = express();
require('dotenv').config();
const dbConnect = require('./config/database');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// initialize route folder
const routes = require('./routes/index');
app.use('/', routes);


// Global error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);

    // Set default values if they don't exist
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';

    // Respond with the error details
    res.status(statusCode).json({
        success: false,
        message: message,
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    });
});


// first Database connection will check then start the server.
dbConnect()
    .then(() => {
        console.log("Database connected successfully...");

        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        })
    })
    .catch((e) => {
        console.log("Error in Database connection " + e);
    })