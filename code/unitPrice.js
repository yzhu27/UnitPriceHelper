//some key part of the JavaScript file
var totalPrice = document.getElementsByClassName('kds-Price kds-Price--alternate mb-8')[0].value;
console.log(totalPrice);
var totalVolumn = document.getElementsByClassName('kds-Text--l mr-8 text-primary ProductDetails-sellBy')[0].textContent;
console.log(totalVolumn);
//notice that there is possibility that UNIT PRICE is already given
//but here we just focus on those which are not yet provided
//if the UNIT PRICE is give, the string should start with '$', in the form of  '$[number]/[unit]'

function getUnit(totalPrice, totalVolumn){
    //quantity cannot solve 1/2 yet
    //quantity can already solve 0.5 by yZhu
    var itemQuantity = totalVolumn.match(/([1-9]\d*\.?\d*)|(0\.\d*[1-9])/)[0];
    console.log(itemQuantity);
    
    //optimize to solve special cases as '20 ct 0.85'
    var itemUnit = totalVolumn.match(/\s((([a-zA-Z]*\s?[a-zA-Z]+)*))/)[1];
    console.log(itemUnit);
    var itemPriceByUnit = parseFloat(totalPrice) / parseFloat(itemQuantity);
    //cut long tails after digit
    itemPriceByUnit = itemPriceByUnit.toFixed(3);
    console.log(itemPriceByUnit);
    var itemFinalUnit = '';
    switch(itemUnit){
        case 'gal': itemFinalUnit = 'gal';
        break;
        case 'oz': itemFinalUnit = 'oz';
        break;
        case 'fl oz': itemFinalUnit = 'oz';
        break;
        case 'ct': itemFinalUnit = 'item';
        break;
        case 'lb': itemFinalUnit = 'lb';
        break;
        case 'bag': itemFinalUnit = 'Bag';
        break;
        case 'pack': itemFinalUnit = 'Pack';
        break;
        case 'bottles': itemFinalUnit = 'Bottle';
        break;
        case 'pk': itemFinalUnit = 'Pack';
        break;
        //may be some other units else?

        default: itemFinalUnit = 'unknown unit';
    }

    if(itemPriceByUnit > 1000 || itemPriceByUnit < 0){
        return null;
    } 
    else {
        console.log("Hihi");
        return {
            finalPrice: itemPriceByUnit,
            finalUnit: itemFinalUnit
        };
    }
}

var testResult = getUnit(totalPrice, totalVolumn);

//insert content to page
var priceSpan = document.createElement('span');
priceSpan.innerHTML = "["+testResult.finalPrice+" / "+testResult.finalUnit+"]";
priceSpan.className = 'kds-Price-promotional-dropCaps';
//left border/margin fails to work
priceSpan.style = "font-size: 16px; left-margin: 20px";

document.getElementsByClassName('kds-Price-promotional kds-Price-promotional--plain kds-Price-promotional--decorated')[0].appendChild(priceSpan);

//try to change CSS, this need to use append(), but failed because is regarded as string
// var priceSpan = "<span class=\"kds-Price-promotional-dropCaps\">"+testResult.finalPrice+" / "+testResult.finalUnit+"</span>";
// document.getElementsByClassName('kds-Price-promotional kds-Price-promotional--plain kds-Price-promotional--decorated')[0].append(priceSpan);
