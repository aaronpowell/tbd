var jasmine = require('jasmine-node');

jasmine.executeSpecsInFolder(
    __dirname + '/tests',
    function(runner, log) { },
    true,
    false,
    false,
    false,
    new RegExp("spec\\.(js|coffee)$", 'i'),
    {
        report: false,
        savePath : "./reports/",
        useDotNotation: true,
        consolidate: true
    }
);