module.exports = function (options) {
    //console.log('in module load');
    //console.log(options);
    var fs = require('fs');
    var list=fs.readdirSync(options.path);
    return list;
};