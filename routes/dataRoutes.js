/*
    @author Arash Alaei <arashalaei22@gmail.com>
    @since Friday, Februray 24, 2023
    @description This file is The route data.
*/

// 1) Importing Dependencies
const router = require('express').Router();
const dataController = require('./../controllers/dataController');

// 2) Define the routes
router
    .route('/')
    .post(dataController.createDate)
    .get(dataController.getAllDate)

router
    .route('/:id')
    .patch(dataController.updateDate)
    .get(dataController.getDate)
    .delete(dataController.deleteDate)

// Exports the data-route
module.exports = router;