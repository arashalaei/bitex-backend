/*
    @author Arash Alaei <arashalaei22@gmail.com>
    @since Friday, Februray 25, 2023
    @description Defining the model here
*/

// 1) Importing Dependencies
const mongoose = require('mongoose');

// 2) Defining the model schema
const dataSchema = new mongoose.Schema({
    key:{
        type: String,
        required: [true, 'A key must have a name'],
        unique: true,
        trim: true,
    },
    value:{
        type: String,
        required: [true, 'A key must have a value'],
        trim: true,
    },
    date: Date, 
    history: [{
        value: String,
        date: Date,
    }]
});

// 3) Convert the Scheam to a model
const Data = mongoose.model('Data', dataSchema)

// 4) exports the model
module.exports = Data;