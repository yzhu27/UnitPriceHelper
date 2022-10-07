const { expect } = require('chai');
const chai = require('chai');
const { JSDOM } = require('jsdom');
chai.use(require('chai-dom'));
require('jsdom-global')();

const { 
    addListPriceTips,
    harrisConverter
} = require('../../extension/content_script.js');


describe('addListPriceTips test for harris teeter', function(){
    beforeEach((done) => {
        JSDOM.fromFile('./test/unit/testHTML/HarrisTeeter')
        .then((dom) => {
          global.document = dom.window.document
          global.window = dom.window
        })
      .then(done, done);
      })
    
    it('addListPriceTips test for harris teeter', function(){
        expect(addListPriceTips('https://www.harristeeter.com/search')).to.be.not.equal(0);
    });

});


describe('harrisConverter tests', function(){
    beforeEach((done) => {
        JSDOM.fromFile('./test/unit/testHTML/index')
        .then((dom) => {
          global.document = dom.window.document
          global.window = dom.window
        })
      .then(done, done);
      })
    
    it('detect gallon', function(){
        expect(harrisConverter('1', '1 gal')).to.be.a('Object');
        expect(harrisConverter('1', '1 gal').finalUnit).to.be.equal('gal');
    });

    it('detect oz and fl oz', function(){
        expect(harrisConverter('1', '1 oz')).to.be.a('Object');
        expect(harrisConverter('1', '1 oz').finalUnit).to.be.equal('oz');
        expect(harrisConverter('1', '1 fl oz').finalUnit).to.be.equal('oz');
    });

    it('detect ct', function(){
        expect(harrisConverter('1', '1 ct')).to.be.a('Object');
        expect(harrisConverter('1', '1 ct').finalUnit).to.be.equal('count');
    });

    it('detect lb', function(){
        expect(harrisConverter('1', '1 lb')).to.be.a('Object');
        expect(harrisConverter('1', '1 lb').finalUnit).to.be.equal('lb');
    });

    it('detect pk and pack', function(){
        expect(harrisConverter('1', '1 pk')).to.be.a('Object');
        expect(harrisConverter('1', '1 pack').finalUnit).to.be.equal('pack');
        expect(harrisConverter('1', '1 pk').finalUnit).to.be.equal('pack');
    });

    it('detect bottles', function(){
        expect(harrisConverter('1', '1 bottles')).to.be.a('Object');
        expect(harrisConverter('1', '1 bottles').finalUnit).to.be.equal('Bottle');
    });

    it('detect cans', function(){
        expect(harrisConverter('1', '1 cans')).to.be.a('Object');
        expect(harrisConverter('1', '1 cans').finalUnit).to.be.equal('can');
    });

    it('detect L and l', function(){
        expect(harrisConverter('1', '1 L')).to.be.a('Object');
        expect(harrisConverter('1', '1 l').finalUnit).to.be.equal('L');
        expect(harrisConverter('1', '1 L').finalUnit).to.be.equal('L');
    });

    it('detect ml', function(){
        expect(harrisConverter('1', '1 ml')).to.be.a('Object');
        expect(harrisConverter('1', '1 ml').finalUnit).to.be.equal('ml');
    });

    it('detect unit', function(){
        expect(harrisConverter('1', '1 unit')).to.be.a('Object');
        expect(harrisConverter('1', '1 unit').finalUnit).to.be.equal('unit');
    });

    it('detect box and boxes', function(){
        expect(harrisConverter('1', '1 box')).to.be.a('Object');
        expect(harrisConverter('1', '1 box').finalUnit).to.be.equal('box');
        expect(harrisConverter('1', '1 boxes').finalUnit).to.be.equal('box');
    });


    it('detect suit and suits', function(){
        expect(harrisConverter('1', '1 suit')).to.be.a('Object');
        expect(harrisConverter('1', '1 suit').finalUnit).to.be.equal('suit');
        expect(harrisConverter('1', '1 suits').finalUnit).to.be.equal('suit');
    });

    it('detect suits', function(){
        expect(harrisConverter('1', '1 suits')).to.be.a('Object');

    });

    it('detect bag and bags', function(){
        expect(harrisConverter('1', '1 bag')).to.be.a('Object');
        expect(harrisConverter('1', '1 bag').finalUnit).to.be.equal('bag');
        expect(harrisConverter('1', '1 bags').finalUnit).to.be.equal('bag');
    });


    it('detect unknown', function(){
        expect(harrisConverter('1', '1 abc')).to.be.a('Object');
        expect(harrisConverter('1', '1 abc').finalUnit).to.be.equal('unknown unit');
    });

    it('count integer unit price correctly', function(){
        expect(harrisConverter('10', '2 oz')).to.be.a('Object');
        expect(harrisConverter('10', '2 oz').finalPrice).to.be.equal('5.000');
    });

    it('count decimal unit price correctly', function(){
        expect(harrisConverter('2.25', '1.5 oz')).to.be.a('Object');
        expect(harrisConverter('2.25', '1.5 oz').finalPrice).to.be.equal('1.500');
    });

    it('extreme large value', function(){
        expect(harrisConverter('100', '0.01 oz')).to.be.a('null');
    });

    it('negative value', function(){
        expect(harrisConverter('-2', '1 oz')).to.be.a('null');
    });

    it('detect $', function(){
        expect(harrisConverter('2', '$')).to.be.a('Object');
        expect(harrisConverter('2', '$').finalPrice).to.be.equal('$');
    });
});
