//note:an attribute named "__loado_name"(filename of the module) will be appended to every module, and will be removed before returned with js' keyword "delete"

var fs = require('fs');
var path = require('path');

// run cb for each element
// default cb is: function (o){return o}
// ret will not collect null value
// container must be a json or an array
function travel_array(container, list, cb) {
    for (var index = 0; index < list.length; ++index) {
        var module = list[index];
        var tmp = cb ? cb(module) : module;
        if (tmp) {
            if (Array.isArray(container)) {
                container.push(tmp);
            } else {
                container[module.__loado_name.match(/(\w+)(.js)?/)[1]] = tmp; //remove the extend name if exists
            }
            if (module.__loado_name) {
                delete module.__loado_name;
            }
        }
    }
    return container;
}

module.exports = {
    load: function (options) {
        return {
            do: function (cb) {

                //load
                var modules = travel_array([], fs.readdirSync(options.path), function (m) {
                    var tmp = require(path.join(options.path, m));
                    if (options.container && !Array.isArray(options.container) || options.sortby) {
                        tmp.__loado_name = m;
                    }
                    return (options.filter && !options.filter(tmp, m)) ? null : tmp; //return null if the filter returns false
                });

                //sort
                if (options.sortby) {
                    modules.sort(options.sortby);
                }

                //do
                return travel_array(options.container || [], modules, cb);
            }
        };
    }
};








