function membrane_jsonObjectToModelAsset(jsonObject) {
    var modelAsset = ModelAsset.parseJSON(jsonObject);
    return modelAsset;
}

function membrane_jsonObjectsToModelAssets(jsonObjects) {
    var modelAssets = [];
    for (const jsonObject of jsonObjects) {
        modelAssets.push(membrane_jsonObjectToModelAsset(jsonObject));
    };    
    return modelAssets;
}

function membrane_modelAssetToHTML(modelAssets, modelAsset) {
    let html = html_buildRemovableAssetElement(modelAssets, modelAsset);
    return html;
}

function membrane_modelAssetsToHTML(modelAssets) {
    let html = '';
    let colorId = 0;
    for (let modelAsset of modelAssets) {
        if (colorId >= colorRange.length)
            colorId = 0;
        modelAsset.colorId = colorId++;
        html += membrane_modelAssetToHTML(modelAssets, modelAsset);
    };
    return html;
}

/* This is required in order to turn data objects into object instances-- like Month-Year data to DateInt objects */
function membrane_rawDataToModelAssets(rawModelAssets) {
    let result = [];
    if (rawModelAssets) {
        for (let ii = 0; ii < rawModelAssets.length; ii++) {
            result.push(membrane_rawModelDataToModelAsset(rawModelAssets[ii]));
        }
    }
    return result;
}

function membrane_rawModelDataToModelAsset(rawModelData) {
    let startDateInt = new DateInt((rawModelData.startDateInt.year * 100) + rawModelData.startDateInt.month);
    let startCurrency = new Currency(rawModelData.startCurrency.amount);
    let basisCurrency = new Currency();
    if (rawModelData.basisCurrency)
        basisCurrency = new Currency(rawModelData.basisCurrency.amount);
    let finishDateInt = new DateInt((rawModelData.finishDateInt.year * 100) + rawModelData.finishDateInt.month);
    let arr = new ARR(rawModelData.annualReturnRate.annualReturnRate);
    let fundTransfers = [];
    if (rawModelData.fundTransfers)
        fundTransfers = rawModelData.fundTransfers.map(transfer => new FundTransfer(transfer.toDisplayName, transfer.moveOnFinishDate, transfer.moveValue));
    let modelAsset = new ModelAsset(rawModelData.instrument, rawModelData.displayName, startDateInt, startCurrency, basisCurrency, finishDateInt, rawModelData.monthsRemaining, arr, fundTransfers);
    return modelAsset;
}

function membrane_htmlElementToAssetModel (assetElement) {
    const inputElements = assetElement.querySelectorAll('input, select');
    const colorElement = assetElement.querySelector('.card-chart-color');
    return ModelAsset.parseHTML(inputElements, colorElement);
}

function membrane_htmlElementsToAssetModels (assetsContainerElement) {
    var assetModels = [];
    const assetElements = assetsContainerElement.querySelectorAll('form');
    for (const assetElement of assetElements) {
        // kind of weird to stringify and parse, but matches the pattern
        assetModels.push(membrane_htmlElementToAssetModel(assetElement));
    }
    return assetModels;
}

function membrane_htmlElementsToFundTransfers(currentDisplayName, scrollableYElement) {
    var fundTransfers = [];
    const fundTransferElements = scrollableYElement.querySelectorAll('.fund-transfer');
    for (const fundTransferElement of fundTransferElements) {
        let fundTransfer = FundTransfer.parseHTML(fundTransferElement);        
        if (fundTransfer.moveValue) {
            fundTransfers.push(fundTransfer);
        }
    }
    return fundTransfers;
}

function JSONObjectToAsset(assetObject, id) {
    assetElement = document.getElementById("asset");
    for (const [key, value] of Object.entries(assetObject)) {
        if (key.length > 0) {
            let inputElement = assetElement.querySelector('#' + key);
            if (inputElement != null)
                inputElement.value = value;
        }
    }
}

function JSONObjectArrayToAssets(assetObjects) {
    assetsContainerElement.innerHTML = '';
    let count = 1;
    for (const assetObject of assetObjects) {
        JSONObjectToAsset(assetObject, count++);
    }
}
