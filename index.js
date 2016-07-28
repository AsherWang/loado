var _load = require('./load');
var _do = require('./do');
module.exports = {
    load: function (options) {
        return {
            do: function (cb) {
                var list=_load(options);
                //console.log(list);
                return _do(options.path,list,cb);
            }
        };
    }
};

