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

    function shallowDeepEqual(expect, actual, path, result) {

        // null value
        if (expect === null) {
            if (! (actual === null)) {
              result.push('Expected to have null but got "' + actual +'" at path "'+ path +'".')
              return false;
            }

            return true;
        }

        // undefined expected value
        if (typeof expect == 'undefined') {
            if (typeof actual != 'undefined') {
                result.push('Expected to have undefined but got "' + actual +'" at path "'+ path +'".')
                return false;
            }

            return true;
        }

        // scalar description
        if (/boolean|number|string/.test(typeof expect)) {
            if (expect != actual) {
                result.push('Expected to have "' + expect +'" but got "'+ actual +'" at path "'+ path +'".')
                return false;
            }

            return true;
        }

        // dates
        if (expect instanceof Date) {
            if (actual instanceof Date) {
                if (expect.getTime() != actual.getTime()) {
                    result.push(
                        'Expected to have date "' + expect.toISOString() + '" but got ' +
                        '"' + actual.toISOString() + '" at path "' + path + '".'
                    );
                    return false;
                }

            } else {
                result.push(
                    'Expected to have date "' + expect.toISOString() + '" but got ' +
                    '"' + actual + '" at path "' + path + '".'
                );
                return false;
            }
        }

        if (actual === null) {
            result.push( 'Expected to have an array/object but got null at path "' + path + '".')
            return false;
        }

        // array/object description 
        for (var prop in expect) {
            if (typeof actual[prop] == 'undefined' && typeof expect[prop] != 'undefined') {
                result.push('Expected "' + prop + '" field to be defined at path "' + path +  '".')
                return false;
            }

            shallowDeepEqual(expect[prop], actual[prop], path + (path == '/' ? '' : '/') + prop, result);
        }

        return true;
    }

    chai.Assertion.addMethod('shallowDeepEqual', function (expect) {
        let result = [];
        shallowDeepEqual(expect, this._obj, '/', result);

        if (result.length > 0) {
            this.assert(false, result.join("\r\n"), undefined, expect, this._obj);
        }
    });

    chai.assert.shallowDeepEqual = function(val, exp, msg) {
        new chai.Assertion(val, msg).to.be.shallowDeepEqual(exp);
    }

}));
