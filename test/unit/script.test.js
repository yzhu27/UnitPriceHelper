const { expect } = require('chai');
const chai = require('chai');
const { JSDOM } = require('jsdom');
chai.use(require('chai-dom'));
require('jsdom-global')();

const harrisConverter = require('../../extension/content_script.js');
describe('harrisConverter tests', function(){
    beforeEach((done) => {
        JSDOM.fromFile('./test/unit/index.html')
        .then((dom) => {
          global.document = dom.window.document
          global.window = dom.window
        })
      .then(done, done);
      })
    
    it('should could detect gallon', function(){
        expect(harrisConverter('1', '1 gal')).to.be.a('Object');
        expect(harrisConverter('1', '1 gal').finalUnit).to.be.equal('gal');
    });

    it('should could detect oz', function(){
        expect(harrisConverter('1', '1 oz')).to.be.a('Object');
        expect(harrisConverter('1', '1 oz').finalUnit).to.be.equal('oz');
        expect(harrisConverter('1', '1 fl oz').finalUnit).to.be.equal('oz');
    });

    it('should could detect ct', function(){
        expect(harrisConverter('1', '1 ct')).to.be.a('Object');
        expect(harrisConverter('1', '1 ct').finalUnit).to.be.equal('item');
    });

    it('should could detect lb', function(){
        expect(harrisConverter('1', '1 lb')).to.be.a('Object');
        expect(harrisConverter('1', '1 lb').finalUnit).to.be.equal('lb');
    });

    it('should could detect bag', function(){
        expect(harrisConverter('1', '1 bag')).to.be.a('Object');
        expect(harrisConverter('1', '1 bag').finalUnit).to.be.equal('Bag');
    });

    it('should could detect pk', function(){
        expect(harrisConverter('1', '1 pk')).to.be.a('Object');
        expect(harrisConverter('1', '1 pack').finalUnit).to.be.equal('Pack');
        expect(harrisConverter('1', '1 pk').finalUnit).to.be.equal('Pack');
    });

    it('should could detect bottles', function(){
        expect(harrisConverter('1', '1 bottles')).to.be.a('Object');
        expect(harrisConverter('1', '1 bottles').finalUnit).to.be.equal('Bottle');
    });

    it('should could detect bottles', function(){
        expect(harrisConverter('1', '1 bottles')).to.be.a('Object');
        expect(harrisConverter('1', '1 bottles').finalUnit).to.be.equal('Bottle');
    });

    it('should could detect bottles', function(){
        expect(harrisConverter('1', '1 bottles')).to.be.a('Object');
        expect(harrisConverter('1', '1 bottles').finalUnit).to.be.equal('Bottle');
    });
});
