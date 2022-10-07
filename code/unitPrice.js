//some key part of the JavaScript file
var totalPrice = document.getElementsByClassName('kds-Price kds-Price--alternate mb-8')[0].value;
console.log(totalPrice);
var totalVolumn = document.getElementsByClassName('kds-Text--l mr-8 text-primary ProductDetails-sellBy')[0].textContent;
console.log(totalVolumn);
//notice that there is possibility that UNIT PRICE is already given
//but here we just focus on those which are not yet provided
//if the UNIT PRICE is give, the string should start with '$', in the form of  '$[number]/[unit]'


function getUnit(totalPrice, totalVolumn){
    //solve if the price/unit is already provided by the website
    var itemFinalUnit = '';

    if (totalVolumn[0] == '$'){
        itemFinalUnit = totalVolumn;
        return {
            finalPrice: itemFinalUnit
        }
    }else{
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
}

var testResult = getUnit(totalPrice, totalVolumn);

//insert content to page
var priceSpan = document.createElement('span');

//use the length of testResult to check whether the price/unit is already provided by the website
//if it is provided, the length should be 1 - only has finalPrice as the result
//otherwise, the length is 2 - finalPrice and finalUnit
if(Object.keys(testResult).length == 2){
    priceSpan.innerHTML = "[$"+testResult.finalPrice+" / "+testResult.finalUnit+"]";

    priceSpan.className = 'kds-Price-promotional-dropCaps';
    //left border/margin fails to work
    priceSpan.style = "font-size: 16px; left-margin: 20px";

    //not elegant, but works
    //use the length of class name to determine whether the item is having discount
    //if the item is having discount, the length should be 54
    //if the item is not having discount, the length should be 83
    var insertedTag = document.getElementsByClassName('kds-Price-promotional kds-Price-promotional--decorated')[0];
    if(insertedTag.className.length == 54){
        insertedTag.appendChild(priceSpan);
    }else if(insertedTag.className.length == 83){
        insertedTag.appendChild(priceSpan);
    }else{
        alert("ERROR: not tag to insert span");
    }


    //try to change CSS, this need to use append(), but failed because is regarded as string
    // var priceSpan = "<span class=\"kds-Price-promotional-dropCaps\">"+testResult.finalPrice+" / "+testResult.finalUnit+"</span>";
    // document.getElementsByClassName('kds-Price-promotional kds-Price-promotional--plain kds-Price-promotional--decorated')[0].append(priceSpan);

}else{
    console.log("Price/unit is already provided.")
}
