const chai = require('chai');
const should = chai.should();

const sum = (a, b) => a + b;
const deepReduce = require('./index');

describe('Reduce Deep Object Tests', function() {

    it('deep reduce simple object', function() {
        const obj = {
            a: {
                b: {
                    c: [
                        { d: 1 },
                        { d: 400 }
                    ]
                }
            }
        };
        deepReduce(obj, sum, 19, 'a.b.c.d').should.be.eql(420);
    });

    it('deep reduce complex object', function() {
        const obj = {
            a: [
                {
                    b: {
                        c: [
                            { d: 1 },
                            { d: 2 },
                            { d: 3 },
                            { d: 3 },
                        ]
                    }
                },
                {
                    b: {
                        c: [
                            { d: 10 },
                            { d: 20 },
                            { d: 30 },
                        ]
                    }
                },
            ]
        };
        deepReduce(obj, sum, 0, 'a.b.c.d').should.be.eql(69);
    });

    it('return undefined if path not found', function() {
        const obj = { a: { b: { c: { d: 1 } } } };
        const result = deepReduce(obj, sum, 0, 'X.a.b.c.d');
        should.not.exist(result);
    });

    it('uses context', function() {
        const obj = { a: { b: { c: { d: 1 } } } };
        const myContext = { myValue: 10 };
        const myReducer = function(a, b) {
            return this.myValue + a + b;
        }
        deepReduce(obj, myReducer, 0, 'a.b.c.d', myContext).should.be.eql(11);
    });

});
