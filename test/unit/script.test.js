const { expect } = require('chai');
const chai = require('chai');
const { JSDOM } = require('jsdom');
chai.use(require('chai-dom'));
require('jsdom-global')();

const { 
    addListPriceTips,
    harrisConverter, 
    costcoConverter
} = require('../../extension/content_script.js');

describe('addListPriceTips test for harris teeter', function(){
    beforeEach((done) => {
        //JSDOM.fromFile('./test/unit/index.html')
        JSDOM.fromFile('./test/unit/HarrisTeeter.txt')
        //JSDOM.fromURL('https://www.harristeeter.com/search?query=oil')
        .then((dom) => {
          global.document = dom.window.document
          global.window = dom.window
        })
      .then(done, done);
      })
    
    it('distinguish websites', function(){
        expect(addListPriceTips('https://www.harristeeter.com/search')).to.be.not.equal(0);
    });

});

describe('addListPriceTips test for costco', function(){
    beforeEach((done) => {
        //JSDOM.fromFile('./test/unit/index.html')
        //JSDOM.fromFile('./test/unit/HarrisTeeter.html')
        JSDOM.fromURL('https://www.costco.com/royal-basmati-rice%2c-20-lbs.product.100315872.html')
        .then((dom) => {
          global.document = dom.window.document
          global.window = dom.window
        })
      .then(done, done);
      })
    
    it('distinguish websites', function(){
        expect(addListPriceTips('https://www.costco.com/')).to.be.equal(0);
    });

});

// describe('addListPriceTips test for target', function(){
//     beforeEach((done) => {
//         //JSDOM.fromFile('./test/unit/index.html')
//         //JSDOM.fromFile('./test/unit/HarrisTeeter.html')
//         JSDOM.fromURL('https://www.target.com/s?searchTerm=oil')
//         .then((dom) => {
//           global.document = dom.window.document
//           global.window = dom.window
//         })
//       .then(done, done);
//       })
    
//     it('distinguish websites', function(){
//         expect(addListPriceTips('https://www.target.com/s')).to.be.equal(0);
//     });

// });

describe('harrisConverter tests', function(){
    beforeEach((done) => {
        JSDOM.fromFile('./test/unit/index.html')
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
        expect(harrisConverter('1', '1 ct').finalUnit).to.be.equal('item');
    });

    it('detect lb', function(){
        expect(harrisConverter('1', '1 lb')).to.be.a('Object');
        expect(harrisConverter('1', '1 lb').finalUnit).to.be.equal('lb');
    });

    it('detect bag', function(){
        expect(harrisConverter('1', '1 bag')).to.be.a('Object');
        expect(harrisConverter('1', '1 bag').finalUnit).to.be.equal('Bag');
    });

    it('detect pk and pack', function(){
        expect(harrisConverter('1', '1 pk')).to.be.a('Object');
        expect(harrisConverter('1', '1 pack').finalUnit).to.be.equal('Pack');
        expect(harrisConverter('1', '1 pk').finalUnit).to.be.equal('Pack');
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
});


describe('costcoConverter tests', function(){
    beforeEach((done) => {
        JSDOM.fromFile('./test/unit/index.html')
        .then((dom) => {
          global.document = dom.window.document
          global.window = dom.window
        })
      .then(done, done);
      })
    
    it('detect Quant', function(){
        expect(costcoConverter('1', 'oliver oil, 5 fl oz,1-ct')).to.be.a('Object');
        expect(costcoConverter('1', 'oliver il, 5 fl oz,1-ct').finalUnit).to.be.equal('fl oz');
    });

    it('detect price', function(){
        expect(costcoConverter('3.99', 'rice, 2 lb,3-packs')).to.be.a('Object');
        expect(costcoConverter('3.99', 'rice, 2 lb,3-packs').finalUnit).to.be.equal('lb');
    });

    it('convert g to kg', function(){
        expect(costcoConverter('8', 'lays chips, 350 g,2-packs')).to.be.a('Object');
        expect(costcoConverter('8', 'lays chips, 350 g,2-packs').finalUnit).to.be.equal('kg');
    });

    it('convert ml to L', function(){
        expect(costcoConverter('10', 'diet coke, 1500 ml,12-packs')).to.be.a('Object');
        expect(costcoConverter('10', 'diet coke, 1500 ml,12-packs').finalUnit).to.be.equal('L');
    });

});