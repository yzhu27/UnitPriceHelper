//Product Page
//get total number
var unitPart = document.getElementsByClassName('h-padding-h-default');
var unitText = unitPart[0].children[2].innerText;
var numUnit = unitText.match(/.*-\s*(.*)\s*-*.*/)[1]; //'52 fl oz'
var num = numUnit.match(/(\d*\.*\d*).*/)[1]; //'52'
var unit = numUnit.match(/\S*\s(.*)/)[1]; //'fl oz'


//get price
var pricePart = document.getElementsByClassName('styles__CurrentPriceFontSize-sc-1mdemp3-1 dIeiFm');
var price = pricePart[0].innerText; //'$3.99'
var moneyUnit = price[0]; //"$"

//calculate unitPrice and add it into Webpage
var perPrice = parseFloat(price.slice(1,-1)) / parseFloat(num); //price.slice(1,-1) = '3.99'
var unitPrice = document.createElement('span');
unitPrice.innerHTML = "(" + moneyUnit + perPrice + " / " + unit + ")";
unitPrice.style = "color:red";
pricePart[0].appendChild(unitPrice);

//Items Page