const { expect } = require('chai');
const chai = require('chai');
const { JSDOM } = require('jsdom');
chai.use(require('chai-dom'));
require('jsdom-global')();

const { 
    addListPriceTips,
    costcoConverter
} = require('../../extension/content_script.js');


describe('addListPriceTips test for costco', function(){
    beforeEach((done) => {
        JSDOM.fromFile('./test/unit/testHTML/Costco')
        .then((dom) => {
          global.document = dom.window.document
          global.window = dom.window
        })
      .then(done, done);
      })
    
    it('addListPriceTips test for costco', function(){
        expect(addListPriceTips('https://www.costco.com/')).to.be.not.equal(0);
        
    });

});

describe('costcoConverter tests', function(){
    beforeEach((done) => {
        JSDOM.fromFile('./test/unit/testHTML/index')
        .then((dom) => {
          global.document = dom.window.document
          global.window = dom.window
        })
      .then(done, done);
      })
    
    it('detect Quant', function(){
        expect(costcoConverter('12', 'oliver oil, 5 fl oz,1-ct')).to.be.a('Object');
        expect(costcoConverter('12', 'oliver il, 5 fl oz,1-ct').finalUnit).to.be.equal('fl oz');
    });

    it('detect price', function(){
        expect(costcoConverter('3.99', 'rice, 2 lb,3-packs')).to.be.a('Object');
        expect(costcoConverter('3.99', 'rice, 2 lb,3-packs').finalUnit).to.be.equal('lb');
    });
});