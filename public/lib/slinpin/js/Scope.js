'use strict';

var Slinpin = Slinpin || {};

Slinpin.Scope = function (values, next) {
    var me = this;

    values = values || {};

    me.get = function (key) {
        if (me.has(key)) {
            return values[key].provide();
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
    };

    me.constant = function (value) {
        return new Slinpin.ConstantProvider(value);
    };

    me.variable = function (value, values, renames, keys) {
        return new Slinpin.Injector(
            new Slinpin.Container(values),
            new Slinpin.Injector(
                me,
                new Slinpin.VariableProvider(value)
            ),
            renames,
            keys
        );
    };

    me.method = function (value, values, renames, keys) {
        return new Slinpin.Injector(
            new Slinpin.Container(values),
            new Slinpin.Injector(
                me,
                new Slinpin.MethodProvider(value)
            ),
            renames,
            keys
        );
    };

    me.factory = function (value, values, renames, keys) {
        return new Slinpin.Injector(
            new Slinpin.Container(values),
            new Slinpin.Injector(
                new Slinpin.FactoryProvider(value)
            ),
            renames,
            keys
        );
    };

    me.service = function (value, values, renames, keys) {
        return new Slinpin.Injector(
            new Slinpin.Container(values),
            new Slinpin.Injector(
                me,
                new Slinpin.ServiceProvider(value)
            ),
            renames,
            keys
        );
    };
    
    me.set('scope', me.constant(this));

    me.set('invoke', me.service(function (scope) {
        return function (value) {
            return new Slinpin.Invoker(new Slinpin.Injector(
                scope,
                new Slinpin.MethodProvider(value)
            ));
        };
    }));

    me.set('instance', me.service(function (scope) {
        return function (value) {
            return new Slinpin.Invoker(new Slinpin.Injector(
                scope,
                new Slinpin.FactoryProvider(value)
            ));
        };
    }));

    me.set('inject', me.service(function (scope) {
        return function (value) {
            return scope.get(value);
        };
    }));
};
