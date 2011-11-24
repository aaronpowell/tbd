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
    
    it('should create properties when they don\'t exist', function() {
        var data = tbd.from({}).prop('foo').done().make(1);
        
        expect(data[0].hasOwnProperty('foo')).toBeTruthy();
    });
    
    it('should allow property values to be overriden', function() {
        var data = tbd
                    .from({ foo: 'bar' })
                    .prop('foo').use('baz').done()
                    .make(1);
                    
        expect(data[0].foo).toEqual('baz');
    });
    
    it('should allow property values from functions', function() {
        var data = tbd.from({ foo: 'bar' })
                    .prop('foo').use(function() { return 'baz'; }).done()
                    .make(1);
                    
        expect(data[0].foo).toEqual('baz');
    });
});