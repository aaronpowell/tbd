(function () {
    'use strict';
    var hasOwnProp = Object.prototype.hasOwnProperty,
        tbd;

    function ValueBuilder(def, builder) {
        var value = def,
            self = this;
        this.build = function () {
            if (typeof value === 'function') {
                return value();
            } else if (typeof value === 'object' && value) {
                if (value.constructor === Array) {
                    return value.slice();
                }

                return tbd.from(value).make(1)[0];
            }
            return value;
        };

        this.use = function (data) {
            value = data;
            return self;
        };

        this.make = function (num) {
            return builder.make(num);
        };

        this.done = function () {
            return builder;
        };
    }

    function ObjectBuilder(schema) {
        var i, ctorArgs,
            props = {},
            self = this,
            source = schema;

        function parseSchema() {
            var i;
            for (i in schema) {
                if (!hasOwnProp.call(schema, i) || hasOwnProp.call(props, i)) continue;

                props[i] = {
                    value: new ValueBuilder(schema[i], self)
                };
            }            
        }

        if(typeof source !== 'function') {
            parseSchema();
        } else {
            this.constructWith = function() {
                ctorArgs = [].slice.call(arguments);
                return self;
            };
        }

        this.make = function (num) {
            var o, j,
                ret = [];
                
            for (i = 0; i < num; i++) {
                o = {};
                if(typeof source === 'function') {
                    if(ctorArgs) {
                        schema = {};
                        source.apply(schema, ctorArgs);
                    } else {
                        schema = new source();
                    }
                    parseSchema();
                    o.constructor = source;
                }

                for (j in props) {
                    o[j] = props[j].value.build();
                }
                ret.push(o);
            }

            return ret;
        };

        this.prop = function (propName) {
            if (!props[propName]) {
                props[propName] = {
                    value: new ValueBuilder(null, self)
                };
            }

            return props[propName].value;
        };
    }

    tbd = this.tbd = {
        from: function (schema) {
            return new ObjectBuilder(schema);
        }
    };
}).call(this);

(function() {
    'use strict';
    var utils = {};
    
    utils.random = function () {
        var args = [].slice.call(arguments);
        
        return function () {
            var random = Math.random();
            
            return args[Math.floor(random * args.length)];
        };
    };
    
    utils.range = function (min, max) {
        return function () {
            var random = Math.random();
            var val = Math.floor(random * (max-min));
            if(min.constructor === Date || max === Date) {
                val = Math.floor(random * (max.getTime() - min.getTime()));
                return new Date(max.getTime() - val);
            } else {
                return val;
            }
        };
    };
    
    utils.sequential = function(start) {
        if (start.constructor === Number) {
            return function () {
                var x = start;
                start++;
                return x;
            };
        } else if (start.constructor === String) {
            var letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
            start = letters.indexOf(start);
            return function () {
                var x = start;
                start++;
                return letters[x];
            };
        } else {
            throw 'This type is not supported for sequential values at the moment';
        }
    };
    
    this.tbd.utils = utils;
}).call(this);