describe('tbd-util-sequantial', function() {
    var tbd = require('../lib/');
    
    it('should generate a sequential value for each record', function() {
        var data = tbd.from({})
                    .prop('foo').use(tbd.utils.sequential(0))
                    .make(2);
                    
        expect(data[0].foo).toBe(0);
        expect(data[1].foo).toBe(1);
    });
});