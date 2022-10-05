var assert = require('assert');
const { it } = require('node:test');
const { expect } = require('chai');

const harrisConverter = require('../extension/content_script.js');

describe('harrisConverter tests', function(){
    it('should could detect gallon', function(){
        expect(harrisConverter('1', '1 gal')).to.be.a('Object');
        expect(harrisConverter('1', '1 gal').finalPrice).to.be.equal('1.000');
        expect(harrisConverter('1', '1 gal').finalUnit).to.be.equal('gal');
    });
});
/*
testResult("getUnit can detect gal", () => {
    expect(getUnit("1","1 gal").toBe("{finalPrice: '1', finalUnit: 'gal'}"))
});

testResult("getUnit can detect oz", () => {
    expect(getUnit("1","1 oz").toBe("{finalPrice: '1', finalUnit: 'oz'}"))
});

testResult("getUnit can detect fl oz", () => {
    expect(getUnit("1","1 fl oz").toBe("{finalPrice: '1', finalUnit: 'oz'}"))
});

testResult("getUnit can detect ct", () => {
    expect(getUnit("1","1 ct").toBe("{finalPrice: '1', finalUnit: 'ct'}"))
});

testResult("getUnit can detect lb", () => {
    expect(getUnit("1","1 lb").toBe("{finalPrice: '1', finalUnit: 'lb'}"))
});

testResult("getUnit can detect bag", () => {
    expect(getUnit("1","1 bag").toBe("{finalPrice: '1', finalUnit: 'Bag'}"))
});

testResult("getUnit can detect pack", () => {
    expect(getUnit("1","1 pack").toBe("{finalPrice: '1', finalUnit: 'Pack'}"))
});

testResult("getUnit can detect bottles", () => {
    expect(getUnit("1","1 bottles").toBe("{finalPrice: '1', finalUnit: 'Bottle'}"))
});

testResult("getUnit can detect pk", () => {
    expect(getUnit("1","1 pk").toBe("{finalPrice: '1', finalUnit: 'Pack'}"))
});

testResult("getUnit can detect unknown unit", () => {
    expect(getUnit("1","1 centimeter").toBe("{finalPrice: '1', finalUnit: 'unknown unit'}"))
});

testResult("getUnit can detect integer", () => {
    expect(getUnit("10","2 oz").toBe("{finalPrice: '5', finalUnit: 'oz'}"))
});

testResult("getUnit can detect float", () => {
    expect(getUnit("2.25",".5 oz").toBe("{finalPrice: '1.5', finalUnit: 'oz'}"))
});
*/