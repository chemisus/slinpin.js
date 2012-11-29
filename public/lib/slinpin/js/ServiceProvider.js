'use strict';

var Slinpin = Slinpin || {};

Slinpin.ServiceProvider = function (value) {
    var me = this;
    var cached = false;
    var cache;

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
            cache = me.inject(injector.values(injector.rename(injector.resolve(), [])));

            cached = true;
        }

        return cache;
    };

    me.inject = function (values) {
        return value.apply(value, values);
    };
};