# [litpro-jshint](# "version: 0.4.0 ; jshint for literate-programming")

This implements the jshint command.

Run `literate-programming -b . project.md` initially. After that, one can
just run `literate-programming` and the lprc.js file will do what needs to be
done. 

This is designed to work with the 1.0 version of literate-programming.


## Directory structure

* [index.js](#index "save: |jshint") This is the file that runs this. It is a
  thin layer on top of the command line module and putting in various litpro
  plugins. 
* [README.md](#readme "save: ") The standard README.
* [lprc.js](#lprc "save:") This contains the options of how to compile
  this using the new version. Not currently used. 
* [package.json](#npm-package "save: | jshint") The requisite package file for a npm project. 
* [TODO.md](#todo "save: | raw ## Todo, ---") A list of growing and shrinking items todo.
* [LICENSE](#license "save:") The MIT license as I think that is the standard in the node community. 
* [.npmignore](#npmignore "save: ")
* [.gitignore](#gitignore "save: ")
* [.travis.yml](#travis "save: ")
* [test.js](#test "save:") 



## Index

This is the module entry point. It adds the commands jshint and the directive
jshint which loads options and globals.

    /*jshint node:true*/
    var jshint = require('jshint').JSHINT;
    var merge = require('merge');

    module.exports = function(Folder) {
        
        var jshintcmd = _"jshint command";

        Folder.sync("jshint", jshintcmd );
       
        

    };



### jshint command

The only thing we add is the jshint command. This takes an incoming text and
hints it. The first argument, if present, is a JSON object of options. The 

    function (input, args, name) {
        
        var doc = this;
        var options, globals;

        var log = [], err, i, lines, line,
            plug, globhash, file, ind, shortname;

        _":options"

        jshint(input, options, globhash);


        var data = jshint.data();


        _":generating the logs"

        _":report logs"

        return input;
    }



[report logs]()

    if (log.length > 0 ) {
        doc.log ("!! JSHint:" + shortname+"\n"+log.join("\n"));
    } else {
        doc.log("JSHint CLEAN: " + shortname);
    }

[options]() 

We can get options from the plugins.jshint object as well as from the
arguments. We are opinionated in setting unused to true. 

Globals are ultimately an object that has a bunch of true/false properties. If
true, then they can be written too. There is also some blacklist property, but
I am not sure where that gets put so ignoring it. 


    options = args[0] || {};

    globals = args[1] || [];

    if (args[2]) {
       file = '';
       shortname = args[2];
    } else {
        ind = name.indexOf(":");
        file = name.slice(0, ind);
        shortname = name.slice(ind +1, 
            name.indexOf(doc.colon.v, ind) );
    }

    options = merge(true, {unused:true}, options);

    if ( (plug = doc.plugins.jshint) ) {
        if (plug.options) {
            options = merge(true, plug.options, options);
        }
        if (plug.globals) {
            globals = globals.concat(plug.globals);
        }
    }

    if (globals) {
        globhash = {};
        globals.forEach( function (el) {
            var bits; 
            bits = el.trim().split(":");
            bits[1] = bits[1] === "true";
            globhash[bits[0].trim()] = bits[1];
        });
    }

    

 

[generating the logs]()


    lines = input.split("\n");
    for (i = 0; i < jshint.errors.length; i += 1) {
       err = jshint.errors[i];
       if (!err) {continue;}
       if (err.reason.indexOf("is defined but never used.") !== -1) {
           continue; //this is covered elsewhere. 
       }
       line = lines[err.line-1];
       if (line.trim().length < 4) {
            line = "\n---\n" + lines.slice(err.line-2, err.line+1).join("\n") + 
                "\n---\n";     
       }
       log.push("E "+ err.line+","+err.character+": "+err.reason +
            "  "+ line.trim());
    }
    if (data.hasOwnProperty("implieds") ) {
        for (i = 0; i < data.implieds.length; i += 1) {
            err = data.implieds[i];
            log.push("Implied Gobal "+ err.line+": "+err.name +
                "  "+ lines[err.line[0]-1].trim());
     }            
    }
    if (data.hasOwnProperty("unused") ) {
        for (i = 0; i < data.unused.length; i += 1) {
            err = data.unused[i];
            log.push("Unused "+ err.line+": "+err.name +
            "  "+ lines[err.line-1].trim());
     }            
    }



    

## lprc

This creates the lprc file for the plugin. Basically, it just says to run
project.md as the file of choice and to build it in the top directory.

    var jshint = require('jshint').JSHINT;
    var merge = require('merge');

    module.exports = function(Folder, args) {

        var jshintcmd = _"jshint command";

        Folder.sync("jshint", jshintcmd );

        if (args.file.length === 0) {
            args.file = ["project.md"];
        }
        args.build = ".";
        args.src = ".";


    };

## Test 


    /*global require */

    var tests = require('literate-programming-cli-test')(true, "hideConsole");

    tests.apply(null, [ 
        ["*first" ]
        ].slice(0)
    ); 


## Readme

This is the readme for the plugin.  

    # JSHint

    This is a plugin for [litpro](https://github.com/jostylr/literate-programming). Install that and then you can use this by requiring it in the lprc.js file. 
    
    It is automatically included in [literate-programming](https://github.com/jostylr/literate-programming). 

    This plugin provides a single command: `jshint`.  It takes three
    arguments:  options, globals, name

    Options should be an object containing [configuration options for
    JSHint](http://jshint.com/docs/options/). This can be conveniently created
    as an argument using the kv subcommand: `| jshint kv(unused, true() ) `

    The second argument is an array for globals. Just write them out. If you
    want to be able to write to them without a warning, use `:true` after the
    name. So for example `jshint , arr($, console, require, state:true)`
    would set those variables as globals and allow module to be written to. 

    The third argument is a name to be written associated with it. The default
    is roughly of the form `BLOCK: ... FILE: ...`

    
## npm package

This should setup the npm file 


    {
      "name": "_`g::docname`",
      "description": "_`g::tagline`",
      "version": "_`g::docversion`",
      "homepage": "https://github.com/_`g::gituser`/_`g::docname`",
      "author": {
        "name": "_`g::authorname`",
        "email": "_`g::authoremail`"
      },
      "repository": {
        "type": "git",
        "url": "git://github.com/_`g::gituser`/_`g::docname`.git"
      },
      "bugs": {
        "url": "https://github.com/_`g::gituser`/_`g::docname`/issues"
      },
      "license": "MIT",
      "main": "index.js",
      "engines": {
        "node": ">=0.10"
      },
      "dependencies":{
        _"g::npm dependencies"
      },
      "devDependencies" : {
        _"g::npm dev dependencies"
      },
      "scripts" : { 
        "test" : "node ./test.js"
      },
      "keywords": ["literate programming plugin"]
    }

## gitignore

Stuff not to include in git. Don't check in your modules.

    node_modules
    .checksum
    /tests/*/

    

## npmignore

npm does not need to see your tests or your litpro code. Submit the js stuff!
Despite the `*.md`, your readme file will be seen. 

    tests
    test.js
    travis.yml
    ghpages
    node_modules
    *.md
    

## Travis

You write tests, right? 


    language: node_js
    node_js:
      - "node"
    

[off](# "block:")

## Todo

Need to figure out how to get the unused variables to behave the way I want. I
want unused parameters to be ignored if there is a variable after it. Not sure
why unused is not working for me. 

---
[on](# "block:")

## License

    The MIT License (MIT)
    Copyright (c) _"g::year" _"g::authorname"

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.



[James Taylor](https://github.com/jostylr "npminfo: jostylr@gmail.com ; 
    deps: jshint 2.11.0, merge 1.2.1  ; 
    dev: litpro 2.0.0, literate-programming-cli-test 0.5.1")



