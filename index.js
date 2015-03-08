var jshint = require('jshint').JSHINT;
var merge = require('merge');

module.exports = function(Folder, args) {
    
    var jshintcmd = function (input, args, name) {
        
        var doc = this;
        var options, globals;
    
        var block = {}, log = [], err, i, lines, line,
            plug, globhash;
    
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
    
        jshint(input, options, globhash);
    
    
        var data = jshint.data();
    
    
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
    
        if (log.length > 0 ) {
            doc.log ("!! JSHint:" + name+"\n"+log.join("\n"));
        } else {
            doc.log("JSHint CLEAN: " + name);
        }
    
        return input;
    };

    Folder.sync("jshint", jshintcmd );
};
