# loado
[![Build Status](https://travis-ci.org/AsherWang/loado.svg?branch=master)](https://travis-ci.org/AsherWang/loado)  
-----
load all node modules in a folder and then do sth with them

#### Usage
load all modules(exclude those whose attr(name) equals 'm4') in folder d1,
and then sort the them by name, and then run with them in order.
ret will be an array of every module's name.

``` "javascript"
var ret = loado.load({
    container: [],
    path: path.join(__dirname, 'd1'),
    filter: function(module,name){return module.name!='m4';},
    sortby: function(module1,module2){
        return module1.name < module2.name;
    }
}).do(function (m) {
    //...
    return m.name;
});
```
#### Options
options for `load`
+ path: required, the path of folder containing modules you want to load.

    ``` "javascript"
        path : path.join(__dirname,"d1") //load all modules in folder d1
    ```

+ container: []\(default\) or {}, will be returned by function `do` after appending some values to it  
    + when {}  
    　　`loado.load(...).do(...)` will return a json object, filename(etx name removed) or folder name as key

    + when []  
    　　return an array

+ filter: optional, to exclude some modules you don't want.

    ``` "javascript"
        filter : function(module, name){
            //module : the module loaded
            //name : the filename or folder name of the module
            ...
            return false if you want to exclude the module.
        }
    ```

+ sortby: optional, to sort them before run with them.

    ``` "javascript"
        sortby : function(module1, module2){
            //set a rule for the sort(see also Array.sort)
            //module1.__loado_name stores the filename or floder name of the module1
        }
    ```

callback for `do`, if the callback function is
+ not passed, ```loado.load(...).do()``` will return the ```options.container``` with modules appended to
+ passed, then return the ```options.container``` containing the returned value(if returned and not null) of the callback

#### Note
The attribute `__loado_name` will be removed before the result of function `do` is returned  
well its docs is longer than its code. ´_>`
#### License
MIT
