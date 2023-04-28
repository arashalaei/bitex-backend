/*
    @author Arash Alaei <arashalaei22@gmail.com>
    @since Friday, Februray 24, 2023
    @description The main task of this file is connect the database to the program
*/

// 1) Importing Dependencies
require('dotenv').config({ path: './config.env' }); // for reading data from config.env
const mongoose = require('mongoose'); // The ORM of mongodb
const app = require('./app');

// 2) Handle Uncaught Exceptions
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

// 3) Connecting to the DB
const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.set("strictQuery", false);
mongoose
    .connect(DB)
    .then(() => console.log('DB connection successful!'));

// 4) Running the server
const port = process.env.PORT || 3000; // Read port from config.env
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

// 5) Handle Uncaught Rejection
process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

// 6) Terminate the server on end-signal
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});