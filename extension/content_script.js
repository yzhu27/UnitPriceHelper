(function() {
    var host = window.location.host.toLowerCase();
    window.priceTipEnabled = true;
    console.log(host)
    if(host === 'www.harristeeter.com'){
        try{
            addPriceTipListener('kds-Price kds-Price--alternate',addListPriceTipS,1000);
        }catch(e){
            console.log(e);
        }
        
        try{
            addPriceTipListener('kds-Price kds-Price--alternate',addPriceTip,1000);
        }catch(e){
            console.log(e);
        }
    }
})();

function addPriceTipListener(tag, func, time) {
    console.log(func.call());
    var onModifiedFunc = function() {
        $(this).unbind("DOMSubtreeModified");
        func.call(this);
        $(this).bind("DOMSubtreeModified", onModifiedFunc);
    };
    var eachCallFunc = function() {
        $(tag).each(function() {
            if (!$(this).attr('priceTip')) {
                $(this).attr('priceTip', '1');
                onModifiedFunc.call(this);
            }
        });
    };
    eachCallFunc();
    if (time) {
        setInterval(eachCallFunc, time);
    }
}
function addListPriceTipS(){
    console.log('addListPriceTips is called');
    if (!window.priceTipEnabled) return;
    var totalPrice = document.getElementsByClassName('kds-Price kds-Price--alternate');
    console.log(totalPrice);
    var totalVolumn = document.getElementsByClassName('kds-Text--s text-neutral-more-prominent');
    console.log(totalVolumn);
    for(let i =0;i<totalPrice.length;i++){
        addTipsHelper(totalPrice[i].value,totalVolumn[i].textContent,i);
    }
}
function addPriceTip(){
    console.log('addListPriceTips is called');
    if (!window.priceTipEnabled) return;
    var totalPrice = document.getElementsByClassName('kds-Price kds-Price--alternate mb-8');
    console.log(totalPrice);
    var totalVolumn = document.getElementsByClassName('kds-Text--l mr-8 text-primary ProductDetails-sellBy');
    console.log(totalVolumn);
    addTipsHelper(totalPrice[0].value,totalVolumn[0].textContent,0);
}
function addTipsHelper(totalPrice, totalVolumn,index){
    var testResult = getUnit(totalPrice, totalVolumn);
    console.log('testResult: '+testResult);
    //insert content to page
    var priceSpan = document.createElement('span');
    priceSpan.innerHTML = "["+testResult.finalPrice+" / "+testResult.finalUnit+"]";
    priceSpan.className = 'kds-Price-promotional-dropCaps';
    //left border/margin fails to work
    priceSpan.style = "font-size: 16px; left-margin: 20px";

    //following line is originally working
    //document.getElementsByClassName('kds-Price-promotional kds-Price-promotional--decorated')[index].appendChild(priceSpan);

    //following is trying to solve discount item issue, still require testing
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
        var insertedTag = document.getElementsByClassName('kds-Price-promotional kds-Price-promotional--decorated')[index];
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
    
}

//from unitPrice.js
function getUnit(totalPrice, totalVolumn){
    //solve if the price/unit is already provided by the website
    
    if (totalVolumn[0] == '$'){
        var itemFinalUnit = totalVolumn;
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
}
