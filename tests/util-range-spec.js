describe('tbd-util-range', function() {
    var tbd = require('../lib/');
    
    beforeEach(function() {
        this.addMatchers({
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
    
    it('should pick from a number within the supplied range', function () {
        var data = tbd.from({})
                    .prop('foo').use(tbd.utils.range(0, 10))
                    .make(1);
        expect(data.length).toBe(1);
        expect(data[0].foo).toBeInNumericalRange(0, 10);
    });
    
    it('should allow negative ranges', function () {
        var data = tbd.from({})
                    .prop('foo').use(tbd.utils.range(-10, -1))
                    .make(1);
        expect(data.length).toBe(1);
        expect(data[0].foo).toBeInNumericalRange(-10, -1);
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
    
    it('should handle large number ranges', function () {
        var data = tbd.from({})
                    .prop('foo').use(tbd.utils.range(100, 500))
                    .make(100);
                    
        for (var i = 0, il = data.length; i < il; i++) {
            expect(data[i].foo).toBeInNumericalRange(100, 500);
        }
    });
});