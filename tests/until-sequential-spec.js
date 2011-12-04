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
    
    it('should not blow up when starting a sequence at the end of the char list', function () {
        var data = tbd.from({})
                    .prop('foo').use(tbd.utils.sequential('z'))
                    .make(2);
                    
        expect(data[0].foo).toBe('z');
        expect(data[1].foo).toBe('a');
    });
    
    it('should handle sequential dates', function () {
        var start = new Date(),
            data = tbd.from({})
                    .prop('foo').use(tbd.utils.sequential(start))
                    .make(2);
                    
        expect(data[0].foo).toEqual(start);
        expect(data[1].foo).not.toEqual(start);
    });
});