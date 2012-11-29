'use strict';

var Slinpin = Slinpin || {};

Slinpin.Container = function (values, next) {
    var me = this;

    values = values || {};

    me.get = function (key) {
        if (me.has(key)) {
            return values[key];
        }

        if (typeof next === 'undefined') {
            return null;
        }

        return next.get(key);
    };

    me.set = function (key, value) {
        values[key] = value;

        return this;
    };

    me.has = function (key) {
        return typeof values[key] !== 'undefined';
    };

    me.contains = function (key) {
        if (me.has(key)) {
            return true;
        }

        if (typeof next !== 'undefined') {
            return next.contains(key);
        }

        return false;
    }
};