# tbd - Test Data Builder

[![Build Status](https://secure.travis-ci.org/aaronpowell/tbd.png)](https://secure.travis-ci.org/aaronpowell/tbd.png)

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

    tbd.from({ foo: 1 })
        .prop('foo').use(tbd.utils.random(1,2,3,4,5,6,7,8,9))
        .make(10);
    //foo's value will be randomly selected from the array for each object created
    
**tbd.utils.range**

This is used for randomly choosing a value from a range, similar to the `random` method but simpler as you specify an upper and lower bounds:

    tbd.from({ foo: 1 })
        .prop('foo').use(tbd.utils.range(1, 1000))
        .make(10);
    //foo's value will be randomly chosen from a number between 1 and 1000 (inclusive)
    
Ranges don't have to be just numbers, they can also be dates:

    tbd.from({ date: new Date })
        .prop('date').use(tbd.utils.range(new Date(2010, 1, 1), new Date()))
        .make(10);
    //the date propery will be a randomly chosing date between the min and max
    
**tbd.utils.sequence**

This is used for creating a sequential set of data from a starting value:

    tbd.from({ foo: 1 })
        .prop('foo').use(tbd.utils.sequential(1))
        .make(10);
    //[0].foo === 1, [9].foo === 10

Sequentials support numbers, letters (and words, where the next letter in the alphabet is appended) and dates:

    tbd.from({ date: new Date })
        .prop('foo').use(tbd.utils.sequential(new Date() /* optional parameter for date property the increment, default is 'd' */)
        .make(10);
    //the 'day' property will be incremented by 1 from the starting value
    
Dates allow you to increment any part of the date object (except milliseconds), to do so pass in a 2nd argument:

* y -> Year
* M -> Month
* d -> Day (default)
* h -> Hour
* m -> Minutes
* s -> Seconds
    
## Browser

When using tbd in the browser it works exactly the same way, only you don't need the `require` statement (unless you want to use RequireJS).

# Running the tests

There's a bunch of tests shipped which uses [Jasmine](http://pivotal.github.com/jasmine/) so you can run them from node.js if you want:

    node tests.js

# License

[MIT](https://github.com/aaronpowell/tbd/blob/master/License.txt)