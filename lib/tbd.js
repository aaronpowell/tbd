(function (undefined) {
    var __hasOwnProp = Object.prototype.hasOwnProperty,
        tbd;

    function ValueBuilder(def, builder) {
        var value = def,
            self = this;
        this.build = function () {
            if (typeof value === 'function') {
                return value();
            } else if (typeof value === 'object' && value) {
                if(value.constructor === Array) {
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
        
        this.make = function(num) {
            return builder.make(num);
        };

        this.done = function () {
            return builder;
        };
    }

    function ObjectBuilder(schema) {
        var i, il,
            props = {},
            self = this;

        for (i in schema) {
            if (!__hasOwnProp.call(schema, i)) continue;

            props[i] = {
                value: new ValueBuilder(schema[i], self)
            };
        }

        this.make = function (num) {
            var o, j,
                ret = [];

            for (i = 0; i < num; i++) {
                o = {};
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