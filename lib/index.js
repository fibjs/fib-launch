// console.log(process.platform);
module.exports = require('./impl/' + process.platform + '.js');