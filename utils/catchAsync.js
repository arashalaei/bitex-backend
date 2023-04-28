/*
    @author Arash Alaei <arashalaei22@gmail.com>
    @since Friday, Februray 25, 2023
*/

/**
 * 
 * @param {Function} fn async Function
 * @returns {Function} handled async Function
 */
module.exports = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};