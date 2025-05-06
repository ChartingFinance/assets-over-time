
const htmlPlus = '➕';
const htmlMinus = '➖';

const htmlAssetHeader = 
`<form class="asset" style="background-color: $BACKGROUND-COLOR$">
    <div style="overflow: hidden; padding: 10px;">
        <div class="card-chart-color" style="background-color: $BACKGROUNDCOLOR$"></div>
        <div class="width-full" style="float: left; padding-top: 10px;">
            <label for="instrument">Financial Instrument</label><br />
            <select class="width-full" name="instrument">
                $INSTRUMENTOPTIONS$
            </select><br />
            <label for="displayName">Familiar Name</label><br />
            <input type="text" class="width-full" name="displayName" value="$DISPLAYNAME$" placeholder="familiar name" /><br />
        </div>
        $ASSETPROPERTIES$
    </div>
    <br />
    <div class="width-full" style="float: left; padding: 10px;">
        <div style="float: left; width: 50%">
            <input type="submit" class="remove" value="Remove" title="Remove this card from the active card set and recalculate" />        
        </div>
        <div style="float: left; width: 50%; text-align: right">
            <input type="submit" class="inputOutput" name="fundTransfers" value="Transfers" title="Define how to transfer funds among the cards" data-fundtransfers="$FUNDTRANSFERS$" />
        </div>
    </div>    
</form>`;

const htmlAssetBody = 
`<div class="width-full" style="float: left; padding-top: 10px;">
    <div style="float: left; width: 55%">
        <label for="startDate">Start Date</label><br />
        <input type="month" class="width-full" name="startDate" value="$STARTDATE$" required />
    </div>
    <div style="float: left; width: 45%">
        <label for="startValue">Start Value</label><br />
        <input type="number" class="width-full" name="startValue" value="$STARTVALUE$" step="0.01" placeholder="dollar amount at start date" required />
    </div>
</div>
<div class="width-full" style="float: left; padding-top: 10px;">
    <div style="float: left; width: 55%">
        <label for="finishDate">Finish Date</label><br />
        <input type="month" class="width-full" name="finishDate" value="$FINISHDATE$" required />
    </div>
    <div style="float: left; width: 45%">
        <label for="finishValue">Finish Value</label><br />
        <input type="number" class="width-full" name="finishValue" value="$FINISHVALUE$" step="0.01" placeholder="computed" readonly />
    </div>
</div>
<div class="width-full" style="float: left; padding-top: 10px">
    <div style="float: left; width: 55%">    
        <label for="annualReturnRate">Annual Return %</label><br />
        <input type="number" class="width-full" name="annualReturnRate" step="0.01" value="$ANNUALRETURNRATE$" placeholder="annual return rate" required />        
    </div>
    <div name="slot1" style="float: left; width: 45%; text-align: center">
        $SLOT1$
    </div>
</div>
<div class="width-full" style="float: left; padding-top: 10px">
    <div style="float: left; width: 55%">    
        <label for="accumulatedValue">Accumulated Value</label><br />
        <input type="number" class="width-full" name="accumulatedValue" step="0.01" value="$ACCUMULATEDVALUE$" placeholder="accumulated value" />
    </div>
    <div name="slot2" style="float: left; width: 45%; text-align: center">
        $SLOT2$
    </div>
</div>`;

const htmlInvisibleDisplay = `<label class="invisible" for="invisiblePlaceholder">Invisible</label><br class="invisible" />
    <input class="invisible" type="number" style=""width: 125px" name="invisiblePlaceholder" placeholder="invisible" />`;

const htmlInvisibleHidden = `<label class="invisible" style="display: none" for="invisiblePlaceholder">Invisible</label><br class="invisible" style="display: none" />
    <input class="invisible" type="number" style="display: none; width: 125px" name="invisiblePlaceholder" placeholder="invisible" />`;

const htmlMonthsRemainingDisplay = `<label for="monthsRemaining">Months Remaining</label><br />
    <input type="number" style="width: 125px" name="monthsRemaining" value="$MONTHSREMAINING$" placeholder="months" />`;

const htmlBasisValueDisplay = `<label for="basisValue">Basis Value</label><br />
    <input type="number" style="width: 125px" name="basisValue" value="$BASISVALUE$" placeholder="original asset cost" />`;

/*
const htmlMonthsRemainingHidden = `<label class="hidable" for="monthsRemaining" style="display: none">Months Remaining</label><br class="hidable" style="display: none" />
    <input class="hidable" type="number" style="display: none; width: 125px" name="monthsRemaining" value="$MONTHSREMAINING$" placeholder="months" />`;
*/

const htmlUseForTaxesDisplayUnchecked = `<label for="taxChoice">Use for Taxes</label><br />
        <input type="radio" name="taxChoice" value="useForTaxes" />`;

const htmlUseForTaxesDisplayChecked = `<label for="taxChoice">Use for Taxes</label><br />
        <input type="radio" name="taxChoice" value="useForTaxes" checked />`;

const htmlSlotHidden = '';

const htmlHoldAllUntilFinishDisplayUnchecked = `<label for="taxChoice">Hold All Until Finish</label><br />
        <input type="radio" name="taxChoice" value="holdAllUntilFinish" />`;

const htmlHoldAllUntilFinishDisplayChecked = `<label for="taxChoice">Hold All Until Finish</label><br />
        <input type="radio" name="taxChoice" value="holdAllUntilFinish" checked />`;

const htmlAssetExpense = '';

const htmlAssets = '<div class="scrollable-x" id="assets"></div>';

const assetBase = 'asset';

const positiveBackgroundColor = '#76ad76';
const negativeBackgroundColor = '#ad7676';

//const colorRange = ['#33cc00','#cc3300','#0033cc','#cc9900','#00cc99','#9900cc','#cc33cc','#cc3333','#556B2F','#8FBC8B'];
const colorRange = ['#3366cc', '#dc3912', '#ff9900', '#109618', '#990099', '#3b3eac', '#0099c6','#dd4477', '#66aa00', '#b82e2e', '#316395', '#994499', '#22aa99', '#aaaa11','#6633cc', '#e67300', '#8b0707', '#329262', '#5574a6', '#651067'];

function html_buildInstrumentOptions(instrument) {

    let html = '';
    for (let i = 0; i < sInstrumentNames.length; i++) {
        html += '<option value="' + sInstrumentNames[i] + '"';
        if (sInstrumentNames[i] == instrument)
            html += ' selected';
        html += '>' + sIntrumentDisplayNames[i] + '</option>';
    }
    return html;

}

function html_buildStoryNameOptionsFromLocalStorage() {

    let storyArcNamesKey = util_buildStoryArcKey(activeStoryArc, storyNamesKey);
    let storyNamesAsString = localStorage.getItem(storyArcNamesKey);
    if (!storyNamesAsString)
        storyNamesAsString = '[]';

    let storyNames = JSON.parse(storyNamesAsString);
    let html = '';
    for (const storyName of storyNames) {
        html += '<option value="' + storyName + '"';
        if (storyName == activeStoryName)
            html += ' selected';
        html += '>' + util_YYYYmmToDisplay(storyName) + '</option>';
    }
    return html;

}

function html_buildAssetHeader(modelAsset) {

    let html = htmlAssetHeader;
    html = html.replace("$BACKGROUNDCOLOR$", colorRange[modelAsset.colorId]);
    html = html.replace('$INSTRUMENTOPTIONS$', html_buildInstrumentOptions(modelAsset.instrument));     
    return html;

}

function html_buildSlotElement(instrument, modelAsset) {
    
    let html = htmlInvisibleDisplay;
    
    if (isMonthsRemainingAble(instrument)) {
        html = htmlMonthsRemainingDisplay;
        if (modelAsset)
            html = html.replace('$MONTHSREMAINING$', modelAsset.monthsRemaining);            
        else
            html = html.replace('$MONTHSREMAINING$', '0');
    }
    else if (isBasisable(instrument)) {
        html = htmlBasisValueDisplay;
        if (modelAsset)
            html = html.replace('$BASISVALUE$', modelAsset.basisCurrency.toHTML());
        else
            html = html.replace('$BASISVALUE$', '0');
    }

    return html;

}

function html_handleSlot1(modelAsset, html) {

    if (isMortgage(modelAsset.instrument) || isDebt(modelAsset.instrument)) {
        html = html.replace('$SLOT1$', htmlMonthsRemainingDisplay);
        html = html.replace('$MONTHSREMAINING$', modelAsset.monthsRemaining);
    }
    else if (isBasisable(modelAsset.instrument)) {
        html = html.replace('$SLOT1$', htmlBasisValueDisplay);
        html = html.replace('$BASISVALUE$', modelAsset.basisCurrency.toHTML());
    }
    else {
        html = html.replace('$SLOT1$', htmlSlotHidden);    
    }
    return html;

}

function html_handleSlot2(modelAsset, html) {

    html = html.replace('$SLOT2$', htmlSlotHidden);
    return html;

}


function html_buildRemovableAssetElement(modelAssets, modelAsset) {
    let html = (html_buildAssetHeader(modelAsset)).slice();
    html = html.replace('$ASSETPROPERTIES$', htmlAssetBody);
    html = html.replace('$DISPLAYNAME$', modelAsset.displayName);
    html = html.replace('$STARTDATE$', modelAsset.startDateInt.toHTML());
    html = html.replace('$STARTVALUE$', modelAsset.startCurrency.toHTML());
    html = html.replace('$FINISHDATE$', modelAsset.finishDateInt.toHTML());

    if ('finishCurrency' in modelAsset )
        html = html.replace('$FINISHVALUE$', modelAsset.finishCurrency.toHTML());
    else
        html = html.replace("$FINISHVALUE$", '0.0');

    html = html.replace('$ANNUALRETURNRATE$', modelAsset.annualReturnRate.toHTML());

    if ('accumulatedCurrency' in modelAsset)
        html = html.replace('$ACCUMULATEDVALUE$', modelAsset.accumulatedCurrency.toHTML());
    else
        html = html.replace('$ACCUMULATEDVALUE$', '0.0');   

    html = html_handleSlot1(modelAsset, html);
    html = html_handleSlot2(modelAsset, html); 

    if (modelAsset.fundTransfers)
        html = html.replace('$FUNDTRANSFERS$', util_escapedJSONStringify(modelAsset.fundTransfers));
    else
        html = html.replace('$FUNDTRANSFERS$', '');

        if ('accumulatedCurrency' in modelAsset && modelAsset.accumulatedCurrency.amount != 0) {
        if (modelAsset.accumulatedCurrency.amount > 0)
            html = html.replace('$BACKGROUND-COLOR$', positiveBackgroundColor + ';');
        else if (modelAsset.accumulatedCurrency.amount < 0)
            html = html.replace('$BACKGROUND-COLOR$', negativeBackgroundColor + ';');
    }
    else
        html = html.replace('$BACKGROUND-COLOR$', 'white');

    return html;
}

function html_buildAssetsElement() {
    return htmlAssets.slice();
}


// BEGIN TRANSFER ASSETS

const htmlTransferAsset = 
`<form class="fund-transfer" style="background-color: $BACKGROUND-COLOR$">
    <div style="padding: 10px;">
        <div class="width-full">
            <label for="toDisplayName">Familiar Name</label><br />
            <input type="text" class="width-full" name="toDisplayName" value="$TODISPLAYNAME$" readonly />
        </div>
        <div class="width-full" style="padding-top: 10px;">
            <div style="float: left; width: 50%">
                <label for="moveOnFinishDate">Move on Finish</label><br />
                &nbsp;<input type="checkbox" style="text-align: right" name="moveOnFinishDate" $MOVEONFINISHDATE$ />
            </div>
            <div style="float: left; width: 50%; text-align: right;">
                <label for="moveValue">Move %</label><br />
                <input type="number" style="width: 75px" name="moveValue" value="$MOVEVALUE$" step="0.1" />
            </div>
        </div>
    </div>    
</form>`;

function html_applyModelAssetToPopupTransfers(modelAsset, popupFormsTransfersElement) {
    popupFormsTransfersElement.querySelector('#popupFormTransfers-title').innerHTML = modelAsset.displayName;
    popupFormsTransfersElement.querySelector('#popupFormTransfers-monthlyEarning').value = modelAsset.monthlyEarnings[0];
    popupFormsTransfersElement.querySelector('#popupFormTransfers-monthlyAfterTax').value = modelAsset.monthlyAfterTaxes[0];
    popupFormsTransfersElement.querySelector('#popupFormTransfers-monthlyCredits').value = modelAsset.monthlyCredits[0];
    //popupFormsTransfersElement.querySelector('#popupFormTransfers-monthlyDebits').value = modelAsset.monthlyDebits[0];
}

function html_buildTransferrableAssets(modelAssets, currentDisplayName) {

    let currentModelAsset = util_findModelAssetByDisplayName(modelAssets, currentDisplayName);

    let html = '';
    for (const modelAsset of modelAssets) {
        if (isFundableAsset(modelAsset.instrument)) {
            if (modelAsset.displayName != currentDisplayName) {
                html += html_buildTransferrableAsset(currentModelAsset, modelAsset);
            }
        }
    }
    return html;

}

function html_buildTransferrableAsset(currentModelAsset, transferrableModelAsset) {

    let html = htmlTransferAsset;
    html = html.replace('$TODISPLAYNAME$', transferrableModelAsset.displayName);

    let moveOnFinishDate = '';
    let moveValue = 0;
    for (const fundTransfer of currentModelAsset.fundTransfers) {
        if (fundTransfer.toDisplayName == transferrableModelAsset.displayName) {
            moveValue = fundTransfer.moveValue;
            if (fundTransfer.moveOnFinishDate) {
                moveOnFinishDate = 'checked';
            }
            break;
        }
    }

    html = html.replace('$MOVEONFINISHDATE$', moveOnFinishDate);
    html = html.replace('$MOVEVALUE$', moveValue.toString());
    return html;

}

function html_setAssetElementFundTransfers(currentDisplayName, fundTransfers) {
    const assetElements = assetsContainerElement.querySelectorAll('form');
    for (const assetElement of assetElements) {
        const displayName = assetElement.querySelector('[name="displayName"]').value;
        if (displayName == currentDisplayName) {
            fundTransfersElement = assetElement.querySelector('[name="fundTransfers"]');
            fundTransfersElement.setAttribute('data-fundtransfers', util_escapedJSONStringify(fundTransfers));
        }
    }
}