var fs = require('fs');
var path = require('path');

function not_empty(obj) {
    for (var o in obj) {
        return true;
    }
    return false;
}

// run cb for each element
// default cb is: function (o){return o}
function travel_array(list, cb) {
    var ret = [];
    for (var index = 0; index < list.length; ++index) {
        var tmp = cb ? cb(list[index]) : list[index];
        if (tmp && not_empty(tmp)) {
            ret.push(tmp);
        }
    }
    return ret;
}

module.exports = {
    load: function (options) {
        return {
            do: function (cb) {

                //load
                var modules = travel_array(fs.readdirSync(options.path), function (m) {
                    var tmp = require(path.join(options.path, m));
                    return (options.filter && !options.filter(tmp,m)) ? null : tmp;
                });

                //sort
                if (options.sortby) {
                    modules.sort(options.sortby);
                }

                //do
                return travel_array(modules, cb);
            }
        };
    }
};