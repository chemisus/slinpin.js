'use strict';

var Slinpin = Slinpin || {};

Slinpin.Injector = function (container, provider, renames, keys) {
    var me = this;

    me.keys = function () {
        return provider.keys();
    };

    me.resolve = function () {
        if (typeof keys !== 'undefined') {
            return keys;
        }
        
        return provider.resolve();
    };

    me.rename = function (keys, renamed) {
        if (typeof renames !== 'undefined') {
            for (var i in renames) {
                var index = keys.indexOf(i);
                
                if (index !== -1 && !renamed[i]) {
                    keys[index] = renames[i];
                    
                    renamed[i] = true;
                }
            }
        }
        
        return provider.rename(keys, renamed);
    };

    me.values = function (keys, containers) {
        containers = containers || [];

        containers.push(me);

        return provider.values(keys, containers);
    };

    me.provide = function (injector) {
        injector = injector || me;
        
        return provider.provide(injector);
    };

    me.get = function (key) {
        return container.get(key);
    };

    me.has = function (key) {
        return container.has(key);
    };

    me.contains = function (key) {
        return container.contains(key);
    };
};
