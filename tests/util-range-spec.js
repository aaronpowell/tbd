describe('tbd-util-range', function() {
    var tbd = require('../lib/');
    
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
});