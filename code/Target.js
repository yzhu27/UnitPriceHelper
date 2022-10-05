//Product Page: https://www.target.com/p/
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

//Items Page: https://www.target.com/c/     https://www.target.com/s
//code for search page
var allItems = document.getElementsByClassName('styles__StyledRow-sc-wmoju4-0 kEpCtb')[3];
//allItems.children[i]: i from 0-25, exclude 6 and 16
for (let i=0; i<26; i++){
    if (i == 6 || i == 16){
        continue;
    }

    var curItem = allItems.children[i];
    var unitPart = curItem.children[0].children[0].children[0].children[1].children[0].children[0].children[0].children[0].children[0];
    var unitText = unitPart.innerText;
    //var numUnit = unitText.match(/.*-\s(\d*\.*\d*[a-z]*\s*[a-z]*)\s*-*.*/)[1]; //'52 fl oz'
    var numUnit = unitText.match(/\S*\s*-\s(\d.*)\s*-*.*/)[1];
    var num = numUnit.match(/(\d*\.*\d*).*/)[1]; //'52'
    var unit = numUnit.match(/\d*\.*\d*\s*([A-Za-z]*\s*[A-Za-z]*).*/)[1]; //'fl oz'

    var pricePart = curItem.children[0].children[0].children[0].children[1].children[0].children[0].children[1].children[0].children[0];
    var price = pricePart.innerText; //'$3.99'
    var moneyUnit = price[0]; //"$"

    var res = parseFloat(price.slice(1,-1)) / parseFloat(num); //price.slice(1,-1) = '3.99'
    var perPrice = res.toFixed(3); 
    var unitPrice = document.createElement('span');
    unitPrice.innerHTML = "(" + moneyUnit + perPrice + " / " + unit + ")";
    unitPrice.style = "color:red";
    pricePart.appendChild(unitPrice);
    console.log(i);

}

