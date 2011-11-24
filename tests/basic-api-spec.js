describe('tbd-builder', function() {
    var tbd = require('../lib/');
    it('should allow usage of undefined', function() {
        var amount = 10,
            data = tbd.from().make(amount);
        
        expect(data.length).toEqual(amount);
    });
    
    it('should return an empty set with no make amount', function() {
        var data = tbd.from().make();
        
        expect(data.length).toEqual(0);
    });
    
    it('should allow making from property builder', function() {
        var number = 10,
            data = tbd.from({ foo: 'bar' }).prop('foo').make(number),
            data2 = tbd.from({ foo: 'bar' }).make(number);
            
        expect(data.length).toEqual(number);
        expect(data.length).toEqual(data2.length);
    });
});