var test = require('tape');
var cp = require('child_process');
var fs = require('fs');

test('first', function (t) {
    t.plan(1);

    var expected = fs.readFileSync('tests/first.txt', {encoding:'utf8'});

    cp.exec('cd tests; node ../node_modules/.bin/litpro first.md', 
        function (err, stdout, stderr) {
            var actual = stdout.split("\n").slice(1,18).join("\n").trim();

            t.equals(actual, expected.trim());
        }
    );



});
