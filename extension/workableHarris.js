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
    console.log("addPriceTipListener is called");
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
    // console.log(totalPrice);
    var totalVolumn = document.getElementsByClassName('kds-Text--s text-neutral-more-prominent');
    // console.log(totalVolumn);
    for(let i =0;i<totalPrice.length;i++){
        addTipsHelper(totalPrice[i].value,totalVolumn[i].textContent,i);
    }
}
function addPriceTip(){
    console.log('addListPriceTips is called');
    if (!window.priceTipEnabled) return;
    var totalPrice = document.getElementsByClassName('kds-Price kds-Price--alternate mb-8');
    // console.log(totalPrice);
    var totalVolumn = document.getElementsByClassName('kds-Text--l mr-8 text-primary ProductDetails-sellBy');
    // console.log(totalVolumn);
    addTipsHelper(totalPrice[0].value,totalVolumn[0].textContent,0);
}
function addTipsHelper(totalPrice, totalVolumn,index){
    var testResult = getUnit(totalPrice, totalVolumn);
    // console.log('testResult length is: '+Object.keys(testResult).length);

    var priceSpan = document.createElement('span');
    if(Object.keys(testResult).length == 1){
        return;
    }else{
        priceSpan.innerHTML = "["+testResult.finalPrice+" / "+testResult.finalUnit+"]";
        priceSpan.className = 'kds-Price-promotional-dropCaps';
        //left border/margin fails to work
        priceSpan.style = "font-size: 16px; left-margin: 20px";

        //insert content to page
        var priceSpan = document.createElement('span');
        priceSpan.innerHTML = "["+testResult.finalPrice+" / "+testResult.finalUnit+"]";
        priceSpan.className = 'kds-Price-promotional-dropCaps';
        //left border/margin fails to work
        priceSpan.style = "font-size: 16px; left-margin: 20px";

        document.getElementsByClassName('kds-Price-promotional kds-Price-promotional--decorated')[index].appendChild(priceSpan);        
    }
    
}
function getUnit(totalPrice, totalVolumn){
    // console.log("The volumn starts with: "+totalVolumn[0]);
    if (totalVolumn[0] == '$'){
        var itemFinalUnit = totalVolumn;
        return {
            finalPrice: itemFinalUnit
        }
    }else{
        //quantity cannot solve 1/2 yet
        //quantity can already solve 0.5 by yZhu
        var itemQuantity = totalVolumn.match(/([1-9]\d*\.?\d*)|(0\.\d*[1-9])/)[0];
        // console.log(itemQuantity);
        //optimize to solve special cases as '20 ct 0.85'
        var itemUnit = totalVolumn.match(/\s((([a-zA-Z]*\s?[a-zA-Z]+)*))/)[1];
        // console.log(itemUnit);
        var itemPriceByUnit = parseFloat(totalPrice) / parseFloat(itemQuantity);
        //cut long tails after digit
        itemPriceByUnit = itemPriceByUnit.toFixed(3);
        // console.log(itemPriceByUnit);
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
            case 'cans': itemFinalUnit = 'can';
            break;
            case 'L': itemFinalUnit = 'L';
            break;
            //may be some other units else?

            default: itemFinalUnit = 'unknown unit';
        }

        if(itemPriceByUnit > 1000 || itemPriceByUnit < 0){
            return null;
        } 
        else {
            // console.log("Hihi");
            return {
                finalPrice: itemPriceByUnit,
                finalUnit: itemFinalUnit
            };
        }
    }    
}
