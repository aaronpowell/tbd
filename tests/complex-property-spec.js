describe('tbd-complex-properties', function() {
    var tbd = require('../');
    it('should clone complex properties', function() {
        var data = tbd.from({
                        foo: {
                            bar: 'baz'
                        }
                    }).make(2);

        expect(data[0].foo).not.toBe(data[1].foo);
    });
});