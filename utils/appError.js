/*
    @author Arash Alaei <arashalaei22@gmail.com>
    @since Friday, Februray 25, 2023
    @description To handle errors
*/

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
    
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
    
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;