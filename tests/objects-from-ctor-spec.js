describe('tbd-supports-ctor-pattern', function() {
    var tbd = require('../lib/');

    beforeEach(function() {
        this.addMatchers({
            toBeInArray: function(array) {
                return ~array.indexOf(this.actual);
            }
        });
    });

    it('should create from a function', function() {
        var c = function() { };
        
        var data = tbd.from(c).make(1);
        
        expect(data.length).toEqual(1);
        expect(data[0].constructor).toBe(c);
    });
    
    it('should create different objects each time', function() {
        var c = function() { };
        
        var data = tbd.from(c).make(2);
        expect(data[0]).not.toBe(data[1]);
    });
    
    it('should allow custom ctor arguments', function() {
        var c = function(a, b) {
            this.a = a;
            this.b = b;
        };
        
        var data = tbd.from(c)
                    .constructWith('a', 'b')
                    .make(1);
        
        expect(data[0].a).toEqual('a');
        expect(data[0].b).toEqual('b');
    });
    
    it('should allow random values in ctor', function() {
        var c = function(a) {
            this.a = a;
        };
        
        var data = tbd.from(c)
                    .constructWith(tbd.utils.random(1,2,3))
                    .make(1);
                    
        expect(data[0].a).toBeInArray([1,2,3]);
    });
});