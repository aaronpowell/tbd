# tbd - Test Data Builder

Have you ever needed to push out a bunch of data for testing your app? Maybe your backend services aren't ready but you want to build the UI for the expected data?

Well tbd to the rescue, tbd will allow you to quickly build up some data quickly and painlessly.

tbd is designed to work in both Node.js and in the browser so you can use it for any application you want.

# Getting tbd

For *Node.js*:

    npm install tbd
    
For the browser - grab the latest version from [git](https://github.com/aaronpowell/tbd/blob/master/lib/tbd.js).

# Using tbd

## Node.js

Basic usage:

    var tbd = require('tbd');
    
    var data = tbd.from({ hello: 'world' }).make(10);
    
    console.log(data.length); //10
    
Tweaking properties:

    var tbd = require('tbd');
    
    var data = tbd.from({ hello: 'world' })
                .prop('hello').use(function() { return 'my value; }).done()
                .make(10);
                
    console.log(data.length); //10
    
## Browser

When using tbd in the browser it works exactly the same way, only you don't need the `require` statement (unless you want to use RequireJS).

# Running the tests

There's a bunch of tests shipped which uses [Jasmine](http://pivotal.github.com/jasmine/) so you can run them from node.js if you want:

    node tests.js

# License

[MIT](https://github.com/aaronpowell/tbd/blob/master/License.txt)