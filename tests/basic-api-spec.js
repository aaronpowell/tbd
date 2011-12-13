describe('tbd-builder', function() {
    var tbd = require('../lib/');
    
    beforeEach(function() {
        this.addMatchers({
            toBeInArray: function(array) {
                return ~array.indexOf(this.actual);
            },
            toBeInDateRange: function(min, max) {
                var actual = this.actual.getTime();
                return actual <= max.getTime() && actual >= min.getTime();
            },
            toBeInNumericalRange: function (min, max) {
                var actual = this.actual;
                return actual <= max && actual >= min;
            }
        });
    });
    
    it('should allow usage of undefined', function() {
        var amount = 10,
            data = tbd.from().make(amount);
        
        expect(data.length).toEqual(amount);
    });
    
    it('should return an empty set with no make amount', function() {
        var data = tbd.from().make();
        
        expect(data.length).toEqual(0);
    });
    
    it('should allow making from property builder', function() {
        var number = 10,
            data = tbd.from({ foo: 'bar' }).prop('foo').make(number),
            data2 = tbd.from({ foo: 'bar' }).make(number);
            
        expect(data.length).toEqual(number);
        expect(data.length).toEqual(data2.length);
    });
    
    it('should allow functions in the object literal', function () {
        var data = tbd.from({
            a: 1,
            b: function () { return 'hello'; },
            c: tbd.utils.range(1, 10),
            d: tbd.utils.random('a', 'b', 'c'),
            e: tbd.utils.sequential(1)
        }).make(1);
        
        expect(data.length).toEqual(1);
        expect(data[0].a).toEqual(1);
        expect(data[0].b).toEqual('hello');
        expect(data[0].c).toBeInNumericalRange(1, 10);
        expect(data[0].d).toBeInArray('a', 'b', 'c');
        expect(data[0].e).toEqual(1);
    });
});