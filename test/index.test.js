var assert = require('assert');
var loado = require('../index');
var path = require('path');

describe('the result of test for loado', function () {
    describe('should be', function () {
        it("an Array with m3, m2, m1", function (done) {

            //options for loading modules
            var options = {
                path: path.join(__dirname, 'd1'),
                filter:function(module,name){return module.name!='m4';},
                sortby:function(m1,m2){
                    return m1.name < m2.name;
                }
            };

            //play with every module loaded
            var run_with_module = function (m) {
                return m.name;
            };

            var ret = loado.load(options).do(run_with_module);
            

            assert(Array.isArray(ret));
            assert(ret.toString() == ['m3','m2','m1'].toString());
            done();
        });
    });
});
