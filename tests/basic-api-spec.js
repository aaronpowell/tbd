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
});