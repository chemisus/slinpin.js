'use strict';

var Slinpin = Slinpin || {};

Slinpin.Invoker = function (injector) {
    var me = this;

    me.invoke = function (values) {
        return injector.provide(injector)(values);
    };
};
