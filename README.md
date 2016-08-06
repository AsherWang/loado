# loado
[![Build Status](https://travis-ci.org/AsherWang/loado.svg?branch=master)](https://travis-ci.org/AsherWang/loado)  
-----
load node modules in a folder and then run them with result

#### Usage
e.g. load models in a web app(express or koa or sth)  

```
//load all modules in folder d1 with filter, and then sort the them, and then run with them in order
// ret will be an array of every module's name 
var ret = loado.load({
    path: path.join(__dirname, 'd1'),
    filter: function(module,name){return module.name!='m4';},
    sortby: function(module1,module2){
        return module1.name < module2.name;
    }
}).do(function (m) {
    return m.name;
});

```
#### Options
options for `load` 
+ path: required, the path of folder containing modules you want to load.
+ filter: optional, to exclude some modules you don't want.
+ orderby: optional, to sort them before run with them. 

callback for `do`, if the callback function is
+ not passed, ```loado.load(...).do()``` will return an array of modules
+ if passed, an array collecting the returned value(if returned) of the function passed will be returned

#### License
MIT
