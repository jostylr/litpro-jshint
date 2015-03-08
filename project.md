# [litpro-jshint](# "version: 0.1.0")

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
* [lprc.js](#lprc "save:| jshint") This contains the options of how to compile
  this using the new version. Not currently used. 
* [package.json](#npm-package "save: | jshint") The requisite package file for a npm project. 
* [TODO.md](#todo "save: | raw ## Todo, ---") A list of growing and shrinking items todo.
* [LICENSE](#license "save:") The MIT license as I think that is the standard in the node community. 
* [.npmignore](#npmignore "save: ")
* [.gitignore](#gitignore "save: ")
* [.travis.yml](#travis "save: ")


## JSHint

Just a stub for now. 

    function (input) {
        return input;
    }

[jshint](# "define:")


## Index

This is the module entry point. It adds the commands jshint and the directive
jshint which loads options and globals.

    var jshint = require('jshint').JSHINT;
    var merge = require('merge');

    module.exports = function(Folder, args) {
        
        var jshintcmd = _"jshint command";

        Folder.sync("jshint", jshintcmd );

`Folder.directives.jshint = _"jshint options" `

    };

### jshint command

The only thing we add is the jshint command. This takes an incoming text and
hints it. The first argument, if present, is a JSON object of options. The 

    function (input, args, name) {
        
        var doc = this;
        var options, globals;

        var block = {}, log = [], err, i, lines, line,
            plug, globhash;

        _":options"

        jshint(input, options, globhash);


        var data = jshint.data();


        _":generating the logs"

        _":report logs"

        return input;
    }

[report logs]()

    if (log.length > 0 ) {
        doc.log ("!! JSHint:" + name+"\n"+log.join("\n"));
    } else {
        doc.log("JSHint CLEAN: " + name);
    }

[options]() 

We can get options from the plugins.jshint object as well as from the
arguments. 

Globals are ultimately an object that has a bunch of true/false properties. If
true, then they can be written too. There is also some blacklist property, but
I am not sure where that gets put so ignoring it. 

   try {
      options = JSON.parse(args[0].trim());
    } catch (e) {
        options = {};
    }

    if (args[1]) {
        globals = args[1].split(";");
    } else {
        globals = [];
    }

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


    block.jshint = {data:data, errors: [], implieds :[], unused :[]};
    lines = input.split("\n");
    for (i = 0; i < jshint.errors.length; i += 1) {
       err = jshint.errors[i];
       if (!err) {continue;}
       line = lines[err.line-1];
       if (line.trim().length < 4) {
            line = "\n---\n" + lines.slice(err.line-2, err.line+1).join("\n") + 
                "\n---\n";     
       }
       log.push("E "+ err.line+","+err.character+": "+err.reason +
            "  "+ line.trim());
        block.jshint.errors.push({"line#": err.line, character: err.character, 
            reason: err.reason, line: lines[err.line-1]} );
    }
    if (data.hasOwnProperty("implieds") ) {
        for (i = 0; i < data.implieds.length; i += 1) {
            err = data.implieds[i];
            log.push("Implied Gobal "+ err.line+": "+err.name +
                "  "+ lines[err.line[0]-1].trim());
            block.jshint.implieds.push({"line#": err.line, 
                name:err.name, line: lines[err.line[0]-1]} );
     }            
    }
    if (data.hasOwnProperty("unused") ) {
        for (i = 0; i < data.unused.length; i += 1) {
            err = data.unused[i];
            log.push("Unused "+ err.line+": "+err.name +
            "  "+ lines[err.line-1].trim());
            block.jshint.unused.push({"line#": err.line, name:err.name, 
                line: lines[err.line-1]} );
     }            
    }


### jshint options

This expects to read the options in the block where this is. You can use pipes
to have some easier format that gets parsed into JSON, but ultimately, it
should produce a JSON object that will be passed into JSHINT every time it is
used. 


    function (args) {

    }

    

## lprc

This creates the lprc file for the plugin. Basically, it just says to run
project.md as the file of choice and to build it in the top directory.


    module.exports = function(Folder, args) {


        if (args.file.length === 0) {
            args.file = ["project.md"];
        }
        args.build = ".";
        args.src = ".";


    }

## Readme

This is the readme for the plugin.  

    # Stuff

    This is a plugin for [literate-programming](https://github.com/jostylr/literate-programming). Install that and then you can use this by requiring it in the lprc.js file. 


## npm package

This should setup the npm file 


    {
      "name": "_`g::docname`",
      "description": "A literate programming compile script. Write your program in markdown.",
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
      "licenses": [
        {
          "type": "MIT",
          "url": "https://github.com/_`g::gituser`/_`g::docname`/blob/master/LICENSE-MIT"
        }
      ],
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
        "test" : "node ./test/test.js"
      },
      "keywords": ["literate programming plugin"]
    }

## gitignore

Stuff not to include in git. Don't check in your modules.

    node_modules

    

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
      - "0.10"
      - "iojs"
      - "0.12"
    

[off](# "block:")

## Todo

Whatever you need to do. 

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
    deps: jshint 2.6.3, merge 1.2.0  ; 
    dev: literate-programming-cli 0.7.0, tape 3.5.0 ")


