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
            var val = Math.floor(random * (max - min + 1) + min);
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
                return start++;
            };
        } else if (start.constructor === String) {
            var letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
            if (start.length === 1) {
                start = letters.indexOf(start);
                return function () {
                    if (start === letters.length) {
                        start = 0;
                    }
                    return letters[start++];
                };                
            } else {
                var index = -1;
                return function () {
                    if (index === -1) {
                        index++;
                        return start;
                    }
                    return start + letters[index++];
                };
            }
        } else if (start.constructor === Date) {
            var dateType = arguments[1] || 'd',
                inc = 0;
            return function () {
                start = new Date(start.getFullYear(), start.getMonth(), start.getDate(), start.getHours(), start.getMinutes(), start.getSeconds(), start.getMilliseconds());
                switch(dateType) {
                    case 'y':
                        start.setFullYear(start.getFullYear() + inc);
                        break;
                    case 'M':
                        start.setMonth(start.getMonth() + inc);
                        break;
                    case 'd':
                        start.setDate(start.getDate() + inc);
                        break;
                    case 'h':
                        start.setHours(start.getHours() + inc);
                        break;
                    case 'm':
                        start.setMinutes(start.getMinutes() + inc);
                        break;
                    case 's':
                        start.setSeconds(start.getSeconds() + inc);
                        break;
                    default:
                        throw 'The value ' + dateType + ' is not an understood date part';
                }
                inc = inc || 1;
                return start;
            };
        } else {
            throw 'This type is not supported for sequential values at the moment';
        }
    };
    
    this.tbd.utils = utils;
}).call(this);