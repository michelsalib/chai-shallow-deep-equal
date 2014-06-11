"use strict";

var chai = require('chai');
chai.config.includeStack = true;

var shallowDeepEqual = require('../chai-shallow-deep-equal');
chai.use(shallowDeepEqual);

describe('chai-shallow-deep-equal', function() {
    it('success on scalar values', function() {
        new chai.Assertion(true).to.be.shallowDeepEqual(true);
        new chai.Assertion(10).to.be.shallowDeepEqual(10);
        new chai.Assertion('success').to.be.shallowDeepEqual('success');
    });

    it('fail on scalar values', function() {
        new chai.Assertion(true).not.to.be.shallowDeepEqual(false);
        new chai.Assertion(10).not.to.be.shallowDeepEqual(42);
        new chai.Assertion('success').not.to.be.shallowDeepEqual('fail');
    });

    it('success on empty objects', function() {
        new chai.Assertion({}).to.be.shallowDeepEqual({});
    });

    it('success on empty array', function() {
        new chai.Assertion([]).to.be.shallowDeepEqual([]);
    });

    it('success on simple objects', function() {
        new chai.Assertion({a: 10, b: 12}).to.be.shallowDeepEqual({a: 10});
    });

    it('fail on simple objects', function() {
        new chai.Assertion({a: 10, b: 12}).not.to.be.shallowDeepEqual({a: 11});
    });

    it('success on array', function() {
        new chai.Assertion([10,11,12]).to.be.shallowDeepEqual([10,11]);
    });

    it('fail on array', function() {
        new chai.Assertion([10,11,12]).not.to.be.shallowDeepEqual([13]);
    });

    it('success on deep objects', function() {
        new chai.Assertion({a: {b: 12, c: 15}}).to.be.shallowDeepEqual({a: {b: 12}});
    });

    it('fail on deep objects', function() {
        new chai.Assertion({a: {b: 12, c: 15}}).not.to.be.shallowDeepEqual({a: {b: 13}});
    });

    it('success on deep array', function() {
        new chai.Assertion([{b: 12, c: 15}]).to.be.shallowDeepEqual([{b: 12}]);
    });

    it('fail on deep array', function() {
        new chai.Assertion([{b: 12, c: 15}]).not.to.be.shallowDeepEqual([{b: 13}]);
    });

    it('success on using object as array', function() {
        new chai.Assertion([{b: 12}, {c: 15}]).to.be.shallowDeepEqual({length: 2, 0: {b: 12}});
    });

    it('fail on using object as array', function() {
        new chai.Assertion([{b: 12}, {c: 15}]).not.to.be.shallowDeepEqual({length: 3});
    });
});
