const { expect } = require('chai');
const chai = require('chai');
const { JSDOM } = require('jsdom');
chai.use(require('chai-dom'));
require('jsdom-global')();

const { 
    addListPriceTips
} = require('../../extension/content_script.js');


describe('addListPriceTips test for target', function(){
    beforeEach((done) => {
        JSDOM.fromFile('./test/unit/testHTML/Target')
        .then((dom) => {
          global.document = dom.window.document
          global.window = dom.window
        })
      .then(done, done);
      })
    
    it('addListPriceTips test for target', function(){
        expect(addListPriceTips('https://www.target.com/s')).to.be.not.equal(0);
    });

});