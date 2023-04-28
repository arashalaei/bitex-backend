/*
    @author Arash Alaei <arashalaei22@gmail.com>
    @since Friday, Februray 25, 2023
    @description Control the data api's.
*/

// 1) Importing Dependencies
const factory = require('./handlerFactory');
const Data = require('./../models/dataModel');
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync');

// 2) Define The API'S

// Create a new one
exports.createDate = factory.createOne(Data);

// Get All Date
exports.getAllDate = factory.getAll(Data)

// Get one
exports.getDate = factory.getOne(Data)

// delete one
exports.deleteDate = factory.deleteOne(Data)


// UPDATE
exports.updateDate = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const doc = await Data.findById(id);
    
    if(!doc) return next(new AppError('No document found with that ID', 404));

    const {value} = req.body;
    const { history } = doc;
    if(value && value !== doc.value){
        const newDoc = await Data.findByIdAndUpdate(id, {value, history: [...history, {value: doc.value, date: Date.now()}]},{
            new: true,
            runValidators: true
        })

        res.status(200)
        .json({
            status: 'success',
            data:{
                data: newDoc
            }
        })
    }

    res.status(200)
        .json({
            status: 'success',
            data:{
                data: doc
            }
        })
})