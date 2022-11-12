/**
 * 
 * @param {*} err_str error string to be displayed on error
 */
module.exports.throwError = (err_str) => {
    throw new TypeError(err_str);
}