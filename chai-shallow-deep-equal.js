"use strict";

(function (plugin) {
    if (
        typeof require === "function" &&
        typeof exports === "object" &&
        typeof module === "object"
        ) {
        // NodeJS
        module.exports = plugin;
    } else if (
        typeof define === "function" &&
        define.amd
        ) {
        // AMD
        define(function () {
            return plugin;
        });
    } else {
        // Other environment (usually <script> tag): plug in to global chai instance directly.
        chai.use(plugin);
    }
}(function (chai, utils) {

    function shallowDeepEqual(expect, actual, path) {

        // null value
        if (expect === null) {
            if (! (actual === null)) {
              throw 'Expected "' + actual +'" to be null at path "'+ path +'".';
            }

            return true;
        }

        // undefined value
        if (typeof expect == 'undefined') {
            if (! (typeof actual == 'undefined')) {
              throw 'Expected "' + actual +'" to be undefined at path "'+ path +'".';
            }

            return true;
        }

        // scalar description
        if (/boolean|number|string/.test(typeof expect)) {
            if (expect != actual) {
                throw 'Expected "' + actual +'" to equal "'+ expect +'" at path "'+ path +'".';
            }

            return true;
        }

        // dates
        if (expect instanceof Date) {
            if (actual instanceof Date) {
                if (expect.getTime() != actual.getTime()) {
                    throw(
                        'Expected "' + actual.toISOString() + '" to equal ' +
                        '"' + expect.toISOString() + '" at path "' + path + '".'
                    );
                }

            } else {
              throw(
                  'Expected "' + actual + '" to equal ' +
                  '"' + expect.toISOString() + '" at path "' + path + '".'
              );
            }
        }

        // array/object description
        for (var prop in expect) {
            if (typeof actual[prop] == 'undefined') {
                if (typeof expect[prop] == 'undefined') {
                    return true
                } else {
                    throw 'Cannot find property "' + prop +'" at path "'+ path +'".';
                }
            }

            shallowDeepEqual(expect[prop], actual[prop], path + '/' + prop);
        }

        return true;
    }

    chai.Assertion.addMethod('shallowDeepEqual', function (expect) {
        try {
            shallowDeepEqual(expect, this._obj, '.');
        }
        catch (msg) {
            this.assert(false, msg, undefined, expect, this._obj);
        }
    });

    chai.assert.shallowDeepEqual = function(val, exp, msg) {
        new chai.Assertion(val, msg).to.be.shallowDeepEqual(exp);
    }

}));
