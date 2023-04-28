/*
    @author Arash Alaei <arashalaei22@gmail.com>
    @since Friday, Februray 24, 2023
    @description This file is responsible for coordinating other files such as: routing and...
*/

// 1) Importing Dependencies
const express = require('express'); // The Web application framework.
const cors = require('cors'); // Used to enable CORS.
const morgan = require('morgan'); // HTTP request logger middleware for node.js.
const rateLimit = require('express-rate-limit'); // Use to limit repeated requests to public APIs and/or endpoints.
const helmet = require('helmet'); // Helmet helps us secure our Express apps by setting various HTTP headers.
const mongoSanitize = require('express-mongo-sanitize'); // Sanitizes user-supplied data to prevent MongoDB Operator Injection.
const xss = require('xss-clean'); // Node.js Connect middleware to sanitize user input coming from POST body, GET queries, and url params.
const compression = require('compression'); // The middleware will attempt to compress response bodies for all request that traverse through the middleware
const globalErrorHandler = require('./controllers/errorController'); // Error Controller
const AppError = require('./utils/appError');

const dataRouter = require('./routes/dataRoutes'); // The route.

// 2) Start express app
const app = express(); // The Instance of expressjs

// 3) GLOBAL MIDDLEWARES

app.use(cors()); // enable CORS
app.use(helmet()); // Set security HTTP headers

// Development logging
if(process.env.NODE_ENV === 'development') { 
    app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' })); // Body parser, reading data from body into req.body.
app.use(mongoSanitize()); // Data sanitization against NoSQL query injection.
app.use(xss()); // Data sanitization against XSS
app.use(compression());

// 4) ROUTES

app.use('/api/v1/data', dataRouter);

// 5) handle errs

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

// EXPORTS THE APP
module.exports = app;