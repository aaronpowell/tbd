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
    
    it('should increment by year when specified', function () {
        var start = new Date(),
            data = tbd.from({})
                    .prop('foo').use(tbd.utils.sequential(start, 'y'))
                    .make(2);
                    
        expect(data[0].foo.getFullYear()).toEqual(start.getFullYear());
        expect(data[1].foo.getFullYear()).toEqual(start.getFullYear() + 1);
    });
    
    it('should increment by month when specified', function () {
        var start = new Date(),
            month = start.getMonth() == 11 ? 0 : start.getMonth + 1,
            data = tbd.from({})
                    .prop('foo').use(tbd.utils.sequential(start, 'M'))
                    .make(2);
                    
        expect(data[0].foo.getMonth()).toEqual(start.getMonth());
        expect(data[1].foo.getMonth()).toEqual(month);
    });
    
    it('should increment by day when specified', function () {
        var start = new Date(),
            data = tbd.from({})
                    .prop('foo').use(tbd.utils.sequential(start, 'd'))
                    .make(2);
                    
        expect(data[0].foo.getDate()).toEqual(start.getDate());
        expect(data[1].foo.getDate()).toEqual(start.getDate() + 1);
    });
    
    it('should increment by hour when specified', function () {
        var start = new Date(),
            hours = start.getHours() === 23 ? 0 : start.getHours() + 1,
            data = tbd.from({})
                    .prop('foo').use(tbd.utils.sequential(start, 'h'))
                    .make(2);

        expect(data[0].foo.getHours()).toEqual(start.getHours());
        expect(data[1].foo.getHours()).toEqual(hours);
    });
    
    it('should increment by minutes when specified', function () {
        var start = new Date(),
            data = tbd.from({})
                    .prop('foo').use(tbd.utils.sequential(start, 'm'))
                    .make(2);
                    
        expect(data[0].foo.getMinutes()).toEqual(start.getMinutes());
        expect(data[1].foo.getMinutes()).toEqual(start.getMinutes() + 1);
    });
    
    it('should increment by seconds when specified', function () {
        var start = new Date(),
            data = tbd.from({})
                    .prop('foo').use(tbd.utils.sequential(start, 's'))
                    .make(2);
                    
        expect(data[0].foo.getSeconds()).toEqual(start.getSeconds());
        expect(data[1].foo.getSeconds()).toEqual(start.getSeconds() + 1);
    });
    
    it('should know that going past the end of a month rolls over to a new month', function () {
        var start = new Date(2011, 2, 1),
            data = tbd.from({})
                    .prop('foo').use(tbd.utils.sequential(start, 'd'))
                    .make(30);

        //just of note you have to +1 the month as it returns a 0-based month index
        expect(data[29].foo.getMonth() + 1).not.toEqual(2);
        expect(data[29].foo.getMonth() + 1).toEqual(3);
    });
});