var assert = require('assert');

var loado=require('../index');
var path=require('path');


describe('the result of my first test for loado', function () {
    describe('should be', function () {
        it("an Array", function (done) {
            var ret=loado.load({path:path.join(__dirname,'d1'),filter:{}}).do(function(m){return m.name;});
            assert(ret.toString()==['m1','m2','m3'].toString());
            done();
        });
    });
});