
const http = require('http');
const logger = require('./logger');
/**
 * json template
 * @param {object} err contain code, message, and data
 * @param {object} docs contain code, message and data
 * @param {function} res express response function
 */
const response = (err, docs, res) => {

    // Return Error
    if (err) {
        const code = err.code || 400;
        logger.error(JSON.stringify(err));
        res.status(code).json({
            code: code,
            status: false,
            message: err.message || http.STATUS_CODES[code],
            data: err.data || null
        });
    } else {
        // Return Success
        const code = docs.code || 200;

        return res.status(code).json({
            code: code,
            status: true,
            message: docs.message || http.STATUS_CODES[code],
            data: docs.data || null
        });
    }
};

module.exports = response;