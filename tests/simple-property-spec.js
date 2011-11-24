describe('tbd-properties', function() {
    var tbd = require('../lib/');
    it('should clone properties from source', function() {
        var data = tbd.from({ foo: 'bar' }).make(1);
        
        expect(data[0].hasOwnProperty('foo')).toBeTruthy();
        expect(data[0].foo).toEqual('bar');
    });
    
    it('should use default value for properties', function() {
        var data = tbd.from({ 
                foo: 'bar',
                bar: 1,
                baz: true
            }).make(1);
        
        expect(data[0].foo).toEqual('bar');
        expect(data[0].bar).toEqual(1);
        expect(data[0].baz).toBeTruthy();
    });
});