describe('tbd-util-sequantial', function() {
    var tbd = require('../lib/');
    
    it('should generate a sequential value for each record', function () {
        var data = tbd.from({})
                    .prop('foo').use(tbd.utils.sequential(0))
                    .make(2);
                    
        expect(data[0].foo).toBe(0);
        expect(data[1].foo).toBe(1);
    });
    
    it('should handle letters', function () {
        var data = tbd.from({})
                    .prop('foo').use(tbd.utils.sequential('a'))
                    .make(2);
                    
        expect(data[0].foo).toBe('a');
        expect(data[1].foo).toBe('b');
    });
    
    it('should append a new letter to sequential words', function () {
        var data = tbd.from({})
                    .prop('foo').use(tbd.utils.sequential('hello'))
                    .make(2);
                    
        expect(data[0].foo).toBe('hello');
        expect(data[1].foo).toBe('helloa');
    });
});