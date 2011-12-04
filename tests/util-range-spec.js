describe('tbd-util-range', function() {
    var tbd = require('../lib/');
    
    beforeEach(function() {
        this.addMatchers({
            toBeInDateRange: function(min, max) {
                var actual = this.actual.getTime();
                return actual <= max.getTime() && actual >= min.getTime();
            }
        });
    });
    
    it('should pick from a number within the supplied range', function () {
        var data = tbd.from({})
                    .prop('foo').use(tbd.utils.range(0, 10))
                    .make(1);
        expect(data.length).toBe(1);
        expect(data[0].foo).toBeGreaterThan(-1);
        expect(data[0].foo).toBeLessThan(11);
    });
    
    it('should allow negative ranges', function () {
        var data = tbd.from({})
                    .prop('foo').use(tbd.utils.range(-1, -10))
                    .make(1);
        expect(data.length).toBe(1);
        expect(data[0].foo).toBeGreaterThan(-11);
        expect(data[0].foo).toBeLessThan(0);
    });
    
    it('should handle date ranges', function () {
        var min = new Date(2010, 1, 1);
        var max = new Date();
        var data = tbd.from({})
                    .prop('foo').use(tbd.utils.range(min, max))
                    .make(1);
                    
        expect(data.length).toBe(1);
        expect(data[0].foo).toBeInDateRange(min, max);
    });
});