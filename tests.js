var jasmine = require('jasmine-node');
var matcher = new RegExp("spec\\.(js|coffee)$", 'i');

jasmine.executeSpecsInFolder(
    __dirname + '/tests',
    function(runner, log) { },
    true,
    true,
    false,
    false,
    matcher,
    {
        report: false,
        savePath : "./reports/",
        useDotNotation: true,
        consolidate: true
    }
);

if (process.argv.length === 3 && process.argv[2] === 'web') {
    var express = require('express'),
        fs = require('fs'),
        pub = __dirname + '/web/public',
        tests = __dirname + '/tests/',
        server;

    server = express.createServer();

    server.use(server.router);
    server.use(express.static(pub));
    server.set('view engine', 'jade');
    server.set('views', __dirname + '/web/views');

    server.get('/specs.js', function (req, res) {
        var files = fs.readdirSync(tests).filter(function (x) { return x.match(matcher); });
        var js = '';
        
        for (var i =0, il = files.length; i < il; i++) {
            js += fs.readFileSync(tests + files[i]);
        }
        res.send(js, { 'Content-Type': 'application/javascript' });
    });
    
    server.get('/tbd.js', function (req, res) {
        var tbd = fs.readFileSync(__dirname + '/lib/tbd.js');
        
        res.send(tbd, { 'Content-Type': 'application/javascript' });
    });

    server.get('/', function (req, res) {
        res.render('index');
    });

    console.log('We are up and running');

    server.listen(process.env.PORT || 2911);
}