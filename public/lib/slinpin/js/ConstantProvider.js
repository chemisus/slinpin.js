'use strict';

var Slinpin = Slinpin || {};

Slinpin.ConstantProvider = function (value) {
    var me = this;

    me.keys = function () {
        return [];
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
        
        return me.inject(injector.values(injector.rename(injector.resolve(), [])));
    };

    me.inject = function (values) {
        return value;
    };
};