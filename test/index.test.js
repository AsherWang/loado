var loado = require('../index');
var path = require('path');
var should = require('should');

describe('the result of test for loado', function () {
    describe('test1 should be', function () {
        it("an Array with m3, m2, m1", function (done) {

            //options for loading modules
            var options = {
                container:[],
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
            ret.should.eql(['m3','m2','m1']);
            done();
        });
    });
    describe('test2 should be', function () {
        it("a json  object {index:'m4'}", function (done) {

            //options for loading modules
            var options = {
                container:{},
                path: path.join(__dirname, 'd1','m4')
            };

            //play with every module loaded
            var run_with_module = function (m) {
                return m.name;
            };

            var ret = loado.load(options).do(run_with_module);
            ret.should.eql({index:'m4'});
            done();
        });
    });


});
