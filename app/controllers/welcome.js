const { response } = require('../helpers');

module.exports = {
    hello: (req, res) => {
        return response(null, {message: 'Hello World'}, res);
    }
}
