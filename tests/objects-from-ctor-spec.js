describe('tbd-supports-ctor-pattern', function() {
    var tbd = require('../lib/');
    
    it('should create from a function', function() {
        var c = function() { };
        
        var data = tbd.from(c).make(1);
        
        expect(data.length).toEqual(1);
        expect(data[0].constructor).toBe(c);
    });
    
    it('should create different objects each time', function() {
        var c = function() { };
        
        var data = tbd.from(c).make(2);
        expect(data[0]).not.toBe(data[1]);
    });
});