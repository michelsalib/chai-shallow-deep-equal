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

    function shallowDeepEqual(expect, actual) {
        // scalar description
        if (/boolean|number|string/.test(typeof expect)) {
            return expect == actual;
        }

        // array/object description
        for (var prop in expect) {
            if (typeof actual[prop] == 'undefined') {
                return false;
            }

            if (!shallowDeepEqual(expect[prop], actual[prop])) {
                return false;
            }
        }

        return true;
    }

    chai.Assertion.addMethod('shallowDeepEqual', function (expect) {
        var actual = this._obj;

        this.assert(
            shallowDeepEqual(expect, actual),
            'expected #{this} to shallowly equal #{exp}',
            'expected #{this} to not shallowly equal #{exp}',
            expect,
            actual);
    });

    chai.assert.shallowDeepEqual = function(val, exp, msg) {
        new chai.Assertion(val, msg).to.be.shallowDeepEqual(exp);
    }

}));
