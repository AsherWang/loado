module.exports = function (_path,list, cb) {
    var path=require('path');
    var ret=[];
    for (var index = 0; index < list.length; ++index) {
        var tmp=require(path.join(_path,list[index]));
        ret.push(cb(tmp));
    }
    return ret;
};