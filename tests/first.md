:first.md
# First Test

This is just a simple example. 

    var great = 4;

    jack = 4;

    jack += 7

    while ( jack = 8) {
        jill.says = function (args, data) {
            "bad" + jack;
            data;
        }
        jill = 5;
        jane = 3;
        john = kit;
        kit = john;
    }

    eval("hay");

    console.log("yoo");

[first.js](# "save: | jshint kv(evil, true(), unused, strict ), 
    arr(jane, john, kit:true) ")

[](# ":| jshint , , plain")

## Options

    { "evil" : true}


## Custom jshint

    doc.plugins.jshint = {
        options: {
            "loopfunc" : true
        }, 
        globals : [
            "console", "jill:true"
            ]
    };


[](# "eval:")
---:lprc.js
module.exports = function (Folder, args) {
    args.file = ["first.md"];   
    require("../../index.js")(Folder, args);
};
---=build/first.js
var great = 4;

jack = 4;

jack += 7

while ( jack = 8) {
    jill.says = function (args, data) {
        "bad" + jack;
        data;
    }
    jill = 5;
    jane = 3;
    john = kit;
    kit = john;
}

eval("hay");

console.log("yoo");

---=out.test
# DOC: first.md
## 0
* !! JSHint:first.md:first.js
E 5,10: Missing semicolon.  jack += 7
E 7,14: Expected a conditional expression and instead saw an assignment.  while ( jack = 8) {
E 9,17: Expected an assignment or function call and instead saw an expression.  "bad" + jack;
E 10,9: Expected an assignment or function call and instead saw an expression.  data;
E 11,6: Missing semicolon.  ---
        data;
    }
    jill = 5;
---
E 13,5: Read only.  jane = 3;
E 14,5: Read only.  john = kit;
Implied Gobal 3,5,7,9: jack  jack = 4;
Unused 8: args  jill.says = function (args, data) {
Unused 1: great  var great = 4;
* * *
* !! JSHint:plain
E 5,10: Missing semicolon.  jack += 7
E 7,14: Expected a conditional expression and instead saw an assignment.  while ( jack = 8) {
E 9,17: Expected an assignment or function call and instead saw an expression.  "bad" + jack;
E 10,9: Expected an assignment or function call and instead saw an expression.  data;
E 11,6: Missing semicolon.  ---
        data;
    }
    jill = 5;
---
E 18,1: eval can be harmful.  eval("hay");
Implied Gobal 3,5,7,9: jack  jack = 4;
Implied Gobal 13: jane  jane = 3;
Implied Gobal 14,15: john  john = kit;
Implied Gobal 14,15: kit  john = kit;
Unused 1: great  var great = 4;
# FOLDER LOGS
## SAVED
./build/first.js
## DONE
./build
