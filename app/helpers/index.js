const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const helpers = {};

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const location = require(path.join(__dirname, file));
        const name = file.split('.js')[0];
        helpers[name] = location;
    });
    
module.exports = helpers;
