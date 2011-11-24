describe('tbd-util-random', function() {
    var tbd = require('../lib/');
    
    beforeEach(function() {
        this.addMatchers({
            toBeInArray: function(array) {
                return ~array.indexOf(this.actual);
            }
        });
    });
    
    it('should have a random generator api', function() {
        expect(tbd.utils.random).toBeDefined();
    });
    
    it('should allow random generation from arguments', function() {
        var data = tbd.from({ foo: 1 })
                    .prop('foo').use(tbd.utils.random(1,2,3,4,5)).done()
                    .make(1);
                    
        expect(data[0].foo).toBeInArray([1,2,3,4,5]);
    });
    
    it('should randomly choose from string arguments', function() {
        var data = tbd.from({ foo: '' })
                    .prop('foo').use(tbd.utils.random('foo', 'bar', 'baz')).done()
                    .make(1);
                    
        expect(data[0].foo).toBeInArray(['foo', 'bar', 'baz']);
    });
});