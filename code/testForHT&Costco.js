(function() {
    var host = window.location.host.toLowerCase();
    window.priceTipEnabled = true;
    console.log(host)
    if(host === 'www.harristeeter.com'){
        try{
            addPriceTipListener('kds-Price kds-Price--alternate',addListPriceTipS,1000);
        }catch(e){
            console.log(e);
            //call for each time it is harristeeter
        }
        
        try{
            addPriceTipListener('kds-Price kds-Price--alternate',addPriceTip,1000);
        }catch(e){
            console.log(e);
        }
    }else if(host ==='www.costco.com'){
        addPriceTipListener('',addListPriceTipForCostco,1000);
    }
})();

function addPriceTipListener(tag, func, time) {
    //console.log(func.call());
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
function addListPriceTipForCostco(){
    console.log('addListPriceTipsForCostco is called');
    var totalPrices = document.getElementsByClassName('price');
    console.log(totalPrices);
    var productInfos = document.getElementsByClassName('description');
    console.log(productInfos);
    for(let i=0;i<totalPrices.length;i++){
        var price = totalPrices[i].textContent;
        console.log('price: '+price+'type: '+typeof(price));
        var convertPrice = parseFloat(price.trim().substring(1));
        //why convertPrice is Nan?
        console.log('after convert: '+ convertPrice);
        var product = matchProduct(productInfos[i].textContent,price);
        if(product==null){
            continue;
        }
        addTipsHelperForCostco(product.price,product.unit,i);
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

function addTipsHelperForCostco(unitPrice,unit,index){
    console.log('unit price:'+unitPrice,'unit: '+unit)
    var priceSpan = "["+unitPrice+" / "+unit+"]";
    document.getElementsByClassName('price')[index].append(priceSpan);
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
            return {
                finalPrice: itemPriceByUnit,
                finalUnit: itemFinalUnit
            };
        }
    }
}

function matchProduct(title, price){
    title = title.trim().toLowerCase();

    console.log('title: '+title);
    price = parseFloat(price.trim().substring(1));
    var regQuant = "ct|pack|count";
    var regWeigh = "g|kg|lb|fl oz|oz|qt|lbs|fl. oz";
    var regFloat = "\\d+\\.?\\d*?(?:\\s*-\\s*\\d+\\.?\\d*?)?";

    var reg1 = new RegExp('([a-zA-Z\\s]*),?\\s*('+regFloat+')\\s*('+regWeigh+')(?:\\s*\\/*,?\\s*)(\\d*)-?((?:\\s*('+regQuant+')\\s*)*)?') 
    var pos1 = {i: 3, pCap: 2, pUnit: 3, pCount: 4}
    var reg = reg1;
    var pos = pos1;
    var match = null;
    var cap = 0, count = 0, lastMul = 1;
    var un = '', tip = '';
    var productName = null;
    reg.lastIndex = 0;
    match = reg.exec(title);
    console.log(match);
    //No count and capacity: no need to convert
    if(match==null||match.length==1){
        return null;
    }
    var capacity;
    var caps = match[pos.pCap].split('-');
    productName = match[1];
    var count = match[3];
    if (caps.length == 2) {
        capacity = (parseFloat(caps[0].trim()) + parseFloat(caps[1].trim()))/2;
    } else {
        capacity = parseFloat(match[pos.pCap].trim());
    }

    if (match.length > 3 && match[pos.pCount]) {
        var multiple = match[pos.pCount].match(/\d+/g);
        if (multiple) for (var i=0; i<multiple.length; ++i) {
            lastMul = parseInt(multiple[i]);
            capacity *= lastMul;
        }
    }
    
    var unit = match[pos.pUnit].toLowerCase();

    if (unit === 'g') {
        capacity /= 1000;
        unit = 'kg';
    }else if (unit === 'ml') {
        capacity /= 1000;
        unit = 'L';
    } else if (unit === 'l') {
        unit = 'L';
    }
    
    var unitPrice = parseFloat(price) / capacity;
    return {
        productName: productName,
        capacity: Math.round(capacity * 10000) / 10000,
        unit: unit,
        price: Math.round(unitPrice * 100) / 100,
    };

}
