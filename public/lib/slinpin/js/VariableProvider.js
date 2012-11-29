'use strict';

var Slinpin = Slinpin || {};

Slinpin.VariableProvider = function (value) {
    var me = this;
    var cached = false;
    var keys;

    me.keys = function () {
        var funStr = value.toString();
        return funStr.slice(funStr.indexOf('(')+1, funStr.indexOf(')')).match(/([^\s,]+)/g);
    };

    me.resolve = function () {
        return me.keys();
    };

    me.rename = function (keys) {
        return keys;
    };

    me.values = function (keys, containers) {
        keys = keys || me.keys();
        containers = containers || [];
        var values = [];

        for (var i in keys) {
            values[i] = null;

            for (var j in containers) {
                if (containers[j].contains(keys[i])) {
                    values[i] = containers[j].get(keys[i]);
                    break;
                }
            }
        }

        return values;
    };

    me.provide = function (injector) {
        injector = injector || me;
        
        if (!cached) {
            keys = injector.rename(injector.resolve(), []);

            cached = true;
        }

        return me.inject(injector.values(keys));
    };

    me.inject = function (values) {
        return value.apply(value, values);
    };
};