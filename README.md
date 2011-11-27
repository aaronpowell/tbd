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

### Basic usage

    var tbd = require('tbd');
    
    var data = tbd.from({ hello: 'world' }).make(10);
    
    console.log(data.length); //10
    
### Tweaking properties

    var tbd = require('tbd');
    
    var data = tbd.from({ hello: 'world' })
                .prop('hello').use(function() { return 'my value; }).done()
                .make(10);
                
    console.log(data.length); //10
    
### Using classes

tbd allows you to create objects from classes the same way that you can create data from objects. The difference is that for classes you just pass in the class reference.

You can also provide constructor parameters using the `constructWith` and passing in the arguments as you would pass them for the constructor. If you don't want to pass anything to your constructor you don't need to use that method.

    var Person = function(firstName. lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    };
    
    var data = tbd.from(Person)
                .constructWith('Aaron', 'Powell')
                .make(10);
                
### Utilities

There are a few utility methods provided by tbd to make generating more random data. These hang off the `tbd.utils` namespace.

**tbd.utils.random**

This is used for selecting a random value from an array:

    tbd.from({ foo: 1 }).prop('foo').use(tbd.utils.random(1,2,3,4,5,6,7,8,9)).make(10);
    //foo's value will be randomly selected from the array for each object created
    
## Browser

When using tbd in the browser it works exactly the same way, only you don't need the `require` statement (unless you want to use RequireJS).

# Running the tests

There's a bunch of tests shipped which uses [Jasmine](http://pivotal.github.com/jasmine/) so you can run them from node.js if you want:

    node tests.js

# License

[MIT](https://github.com/aaronpowell/tbd/blob/master/License.txt)