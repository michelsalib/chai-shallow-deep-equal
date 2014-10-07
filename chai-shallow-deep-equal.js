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
        // scalar description
        if (/boolean|number|string/.test(typeof expect)) {
            if (expect != actual) {
                throw 'Expected "' + actual +'" to equal "'+ expect +'" at path "'+ path +'".';
            }

            return true;
        }

        // dates
        if (expect.constructor === Date) {
            if (expect.getTime() != actual.getTime()) {
                throw(
                    'Expected "' + actual.toISOString() + '" to equal ' +
                    '"' + expect.toISOString() + '" at path "' + path + '".'
                );
            }
        }

        // array/object description
        for (var prop in expect) {
            if (typeof actual[prop] == 'undefined') {
                throw 'Cannot find property "' + prop +'" at path "'+ path +'".';
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
