class DateInt {
    constructor(yyyyMM) {
        this.year = parseInt(yyyyMM / 100);
        this.month = yyyyMM - (this.year * 100);
        this.day = 1;
    }

    static parse(yyyyMM) {
        let segments = yyyyMM.split('-');
        let year = parseInt(segments[0]);
        let month = parseInt(segments[1]);
        return new DateInt((year * 100) + month);
    }

    toTwoMonth() {
        let result = '';
        if (this.month < 10)
            result += '0';
        return result + this.month.toString();
    }

    toInt() {
        return (this.year * 100) + this.month;
    }

    toString() {
        return this.year.toString() + '-' + this.toTwoMonth();
    }

    toLastDate() {
        let dt = new Date(this.year, this.month, 1);
        dt.setDate(0);
        return dt.getDate();
    }

    toISOString(endOfMonth) {
        if (endOfMonth)
            return this.year.toString() + '-' + this.toTwoMonth() + '-' + this.toLastDate().toString();
        else
            return this.year.toString() + '-' + this.toTwoMonth() + '-01';
    }

    toHTML() {
        let html = this.year.toString() + '-';
        if (this.month < 10) html += '0';
        html += this.month.toString();
        return html;
    }

    prev() {
        if (this.day == 5)
            this.day -= 4;
        else
            this.day -= 5;

        if (this.day < 1) {
            this.day = 30;
            --this.month;
        }

        if (this.month < 1) {
            this.month = 12;
            --this.year;
        }
    }

    next() {
        if (this.day == 1)
            this.day += 4;
        else
            this.day += 5;

        if (this.day > 30) {
            this.day = 1;
            ++this.month;
        }

        if (this.month > 12) {
            this.month = 1;
            ++this.year;
        }
    }

    prevMonth() {
        --this.month;
        if (this.month < 1) {
            this.month = 12;
            --this.year;
        }
    }

    nextMonth() {
        ++this.month;
        if (this.month > 12) {
            this.month = 1;
            ++this.year;
        }
    }

    addMonths(num) {
        while (num > 0) {
            this.nextMonth();
            --num;
        }
    }

    isNewYearsDay() {
        return this.month == 1 && this.day == 1;
    }
}

class MonthsSpan {
    constructor(totalMonths, combineMonths, offsetMonths) {
        this.totalMonths = totalMonths;
        this.combineMonths = combineMonths;
        this.offsetMonths = offsetMonths;
    }

    static build(firstDateInt, lastDateInt) {

        let totalMonths = util_totalMonths(firstDateInt, lastDateInt);
        let combineMonths = 1;
        let offsetMonths = 0;
        if (totalMonths > 36 && totalMonths <= 84) {
          combineMonths = 3;
          if (firstDateInt.month == 2 || firstDateInt.month == 5 || firstDateInt.month == 8 || firstDateInt.month == 11)
            offsetMonths = 2;
          else if (firstDateInt.month == 3 || firstDateInt.month == 6 || firstDateInt.month == 9 || firstDateInt.month == 12)
            offsetMonths = 1;
        }
        else if (totalMonths > 84 && totalMonths <= 216) {
          combineMonths = 6;
          if (firstDateInt.month > 1 && firstDateInt.month < 7)
            offsetMonths = 7 - firstDateInt.month;
          else if (firstDateInt.month > 7 && firstDateInt.month < 13)
            offsetMonths = 13 - firstDateInt.month;
        }
        else if (totalMonths > 216) {
          combineMonths = 12;
          if (firstDateInt.month > 1)
            offsetMonths = 13 - firstDateInt.month;
        }
      
        return new MonthsSpan(totalMonths, combineMonths, offsetMonths);
    }

}

class Currency {
    constructor(amount) {
        if (amount) {
            this.amount = parseFloat(amount.toFixed(2));
        }
        else
            this.amount = 0.0;
    }

    static parse(currency) {
        if (currency) {
            var currency = currency.replace("$", "");
            return new Currency(parseFloat(currency));
        }
        else
            return new Currency(0.0);
    }

    zero() {
        this.amount = 0.0;
    }

    flipSign() {
        this.amount *= -1.0;
    }

    add(currency) {
        if (currency && currency.amount)
            this.amount += currency.amount;
        return this;
    }

    subtract(currency) {
        if (currency && currency.amount)
            this.amount -= currency.amount;
        return this;
    }

    multiply(m) {
        this.amount *= m;
        return this;
    }

    divide(d) {
        if (d == 0)
            console.error('Currency.divide - divide by zero!!');
        else
            this.amount /= d;
        return this;
    }

    toCurrency() {
        return parseFloat(this.amount.toFixed(2));
    }

    toString() {
        return '$' + String(this.toCurrency());
    }

    toHTML() {
        return String(this.toCurrency());
    }
}

class ARR {
    constructor(annualReturnRate) {
        this.annualReturnRate = annualReturnRate;
    }

    static parse(annualReturnRate) {
        annualReturnRate = annualReturnRate.replace("%", "");
        let annualReturnRateFloat = parseFloat(annualReturnRate);
        annualReturnRateFloat /= 100.0;
        return new ARR(annualReturnRateFloat);
    }

    hasMonthly() {
        return this.annualReturnRate != 0.0;
    }

    hasMonthlyAmount() {
        return false;
    }

    asMonthly() {
        return this.annualReturnRate / 12.0;
    }

    toString() {
        return String(this.annualReturnRate * 100.0) + '%';
    }

    toHTML() {
        return String(this.annualReturnRate * 100.0);
    }
}

function util_firstDateInt(modelAssets) {
    let firstDateInt = null;
    for (const modelAsset of modelAssets) {
        if (firstDateInt == null)
            firstDateInt = modelAsset.startDateInt;
        else if (firstDateInt.toInt() > modelAsset.startDateInt.toInt())
            firstDateInt = modelAsset.startDateInt;
    };
    return firstDateInt;
}

function util_lastDateInt(modelAssets) {
    let lastDateInt = null;
    for (const modelAsset of modelAssets) {
        if (lastDateInt == null)
            lastDateInt = modelAsset.finishDateInt;
        else if (lastDateInt.toInt() < modelAsset.finishDateInt.toInt())
            lastDateInt = modelAsset.finishDateInt;  
    };  
    return lastDateInt;
}

function util_totalMonths(startDateInt, finishDateInt) {
    let runnerDateInt = new DateInt(startDateInt.toInt());
    let totalMonths = 0;
    while (runnerDateInt.toInt() <= finishDateInt.toInt()) {
        ++totalMonths;
        runnerDateInt.nextMonth();
    }
    return totalMonths;
}

function computeMonthsRemainingFromStartDateChange(finishDateValue, startDateValue) {
    console.log('computecomputeMonthsRemainingFromFinishDateChange(' + startDateValue + ', ' + finishDateValue + ')');
    if (startDateValue == null || startDateValue.length < 10) // 10 characters in yyyy-MM-dd format
        startDateValue = new Date().toISOString();
    if (finishDateValue == null || finishDateValue.length < 10)
        finishDateValue = new Date().toISOString();

    return computeMonthsRemainingFromStartDateToFinishDate(startDateValue, finishDateValue);
}

function computeMonthsRemainingFromFinishDateChange(startDateValue, finishDateValue) {
    console.log('computecomputeMonthsRemainingFromFinishDateChange(' + startDateValue + ', ' + finishDateValue + ')');
    if (startDateValue == null || startDateValue.length < 10) // 10 characters in yyyy-MM-dd format
        startDateValue = new Date().toISOString();
    if (finishDateValue == null || finishDateValue.length < 10)
        finishDateValue = new Date().toISOString();

    return computeMonthsRemainingFromStartDateToFinishDate(startDateValue, finishDateValue);
}

function computeMonthsRemainingFromStartDateToFinishDate(startDateValue, finishDateValue) {
    let startDate = DateInt.parse(startDateValue);
    let finishDate = DateInt.parse(finishDateValue);
    let monthsRemaining = 0;
    while (startDate.toInt() <= finishDate.toInt()) {
        startDate.nextMonth();
        ++monthsRemaining;
    }
    return monthsRemaining;
}

function computeFinishDateFromMonthsRemainingChange(startDateValue, monthsRemainingValue) {
    console.log('computeFinishDateFromMonthsRemainingChange(' + startDateValue + ', ' + monthsRemainingValue + ')');
    if (startDateValue == null || startDateValue.length < 10) // 10 characters in yyyy-MM-dd format
        startDateValue = new Date().toISOString();
    if (monthsRemainingValue == null || monthsRemainingValue < 0)
        monthsRemainingValue = 0;

    let finishDate = DateInt.parse(startDateValue);
    while (monthsRemainingValue > 0) {
        finishDate.nextMonth();
        --monthsRemainingValue;
    }

    return finishDate.toISOString(true);
}

function computeMonthlyExpensesFor(modelAssets, displayName) {
    let expenseSum = new Currency(0);
    let expenseModelAssets = util_findModelAssetsByFundingSource(modelAssets, sInstrumentNames[sInstrumentsIDs.monthlyExpense], displayName);
    for (let expenseModelAsset of expenseModelAssets) {
        expenseSum.add(expenseModelAsset.finishCurrency);
    }
    return expenseSum;
}

function util_findModelAssetByDisplayName(modelAssets, displayName) {    
    for (const modelAsset of modelAssets) {
        if (modelAsset.displayName == displayName)
            return modelAsset;
    }
    return null;
}

function util_findModelAssetsByFundingSource(modelAssets, instrument, fundingSource) {
    let results = [];
    for (const modelAsset of util_findModelAssetsByInstrument(modelAssets, instrument)) {
        if (modelAsset.fundingSource == fundingSource)
            results.push(modelAsset);
    }
    return results;
}

function util_findExpenseModelAssetsTotal(modelAssets, sourceDisplayName) {
    let total = 0.0;
    for (const modelAsset of modelAssets) {
        if (isMonthlyExpense(modelAsset.instrument) && modelAsset.fundingSource == sourceDisplayName)
            total += modelAsset.finishCurrency.amount;
    }
    return total;
}

function util_findModelAssetsByInstrument(modelAssets, instrument) {
    let results = [];
    for (const modelAsset of modelAssets) {
        if (modelAsset.instrument == instrument || instrument == null)
            results.push(modelAsset);
    }
    return results;
}

function isHome(value) { // should be distinct from 2nd property and rentals
    return value == sInstrumentNames[sInstrumentsIDs.home];
}

function isMortgage(value) {
    return value == sInstrumentNames[sInstrumentsIDs.mortgage];
}

function isDebt(value) {
    return value == sInstrumentNames[sInstrumentsIDs.debt];
}

function isMonthlyExpense(value) {
    return value == sInstrumentNames[sInstrumentsIDs.monthlyExpense];
}

function isMonthlyIncome(value) {
    if (value == sInstrumentNames[sInstrumentsIDs.monthlyIncome])
        return true;
    else
        return false;
}

function isTaxableAccount(value) {
    return value == sInstrumentNames[sInstrumentsIDs.taxableEquity];
}

function isCapital(value) {
    if (value == sInstrumentNames[sInstrumentsIDs.taxableEquity])
        return true;
    else if (value == sInstrumentNames[sInstrumentsIDs.taxDeferredEquity])
        return true;
    else if (value == sInstrumentNames[sInstrumentsIDs.taxFreeEquity])
        return true;
    else if (value == sInstrumentNames[sInstrumentsIDs.home])
        return true;
    else
        return false;
}

function isIncomeAccount(value) {
    if (value == sInstrumentNames[sInstrumentsIDs.bank])
        return true;
    else if (value == sInstrumentNames[sInstrumentsIDs.usBond])
        return true;
    else if (value == sInstrumentNames[sInstrumentsIDs.corpBond])
        return true;
    else
        return false;
}

function isLiquidAccount(value) {
    return value == sInstrumentNames[sInstrumentsIDs.taxableEquity] || value == sInstrumentNames[sInstrumentsIDs.cash] || value == sInstrumentNames[sInstrumentsIDs.bank];
}

function isTaxDeferred(value) {
    return value == sInstrumentNames[sInstrumentsIDs.taxDeferredEquity];
}

function isTaxFree(value) {
    return value == sInstrumentNames[sInstrumentsIDs.taxFreeEquity];
}

function isSavingsAccount(value) {
    return value == sInstrumentNames[sInstrumentsIDs.bank];
}

function isFundableAsset(value) {
    if (value == sInstrumentNames[sInstrumentsIDs.cash])
        return true;
    else if (value == sInstrumentNames[sInstrumentsIDs.bank])
        return true;
    else if (value == sInstrumentNames[sInstrumentsIDs.taxableEquity])
        return true;
    else if (value == sInstrumentNames[sInstrumentsIDs.taxDeferredEquity])
        return true;
    else if (value == sInstrumentNames[sInstrumentsIDs.taxFreeEquity])
        return true;
    else if (value == sInstrumentNames[sInstrumentsIDs.usBond])
        return true;
    else if (value == sInstrumentNames[sInstrumentsIDs.corpBond])
        return true;
    else if (value == sInstrumentNames[sInstrumentsIDs.debt])
        return true;
    else
        return false;
}

function isAsset(value) {
    if (isFundableAsset(value))
        return true;
    else if (isHome(value))
        return true;
    else if (isMortgage(value))
        return true;
    else
        return false;
}

function displayElementSet(sourceElement, startIndex) {
    // hide invisible placeholders
    sourceElement.parentElement.children[0].style.display = 'none';
    sourceElement.parentElement.children[1].style.display = 'none';
    sourceElement.parentElement.children[2].style.display = 'none';

    // show the element set
    sourceElement.parentElement.children[startIndex].style.display = '';
    sourceElement.parentElement.children[startIndex+1].style.display = '';
    sourceElement.style.display = '';
}

const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

const storyArcsKey = 'storyArcs';
function util_buildStoryArcKey(storyArc, storyName) {
    if (!storyArc)
        console.log('util_buildStoryArcKey - null storyArc');
    if (!storyName)
        console.log('util_buildStoryArcKey - null storyName');

    if (storyName == 'default') {
        console.log('util_buildStoryArcKey - default passed to function. Did you call util_ensureStoryNames first?');
        storyName = util_YYYYmm();
    }

    return storyArc + '+' + storyName;
}

const storyNamesKey = 'storyNames';
function util_removeStoryName(storyArc, storyName) {
    let asString = localStorage.getItem(util_buildStoryKey(storyArc, storyNamesKey));
    if (!asString)
        asString = '[]';

    let storyNames = JSON.parse(asString);

    let ii = 0;
    for (; ii < storyNames.length; ++ii) {
        if (storyNames[ii] == storyName)
            break;
    }

    if (ii < storyNames.length) {
        storyNames = storyNames.splice(ii, 1);
        asString = JSON.stringify(storyNames);
        localStorage.setItem(storyNamesKey, asString);
    }
}

// this function will ensure both the existence of a storyName key and, if necessary, copy the most recent associated dataset for the new key
function util_ensureStoryNames(storyArc, storyName) {
    let storyArcNamesKey = util_buildStoryArcKey(storyArc, storyNamesKey);
    let asString = localStorage.getItem(storyArcNamesKey);
    if (!asString)
        asString = '[]';

    let storyNames = JSON.parse(asString);

    let ii = 0;
    for (; ii < storyNames.length; ++ii) {
        if (storyNames[ii] == storyName)
            break;
    }

    if (ii == storyNames.length) {
        storyNames.push(storyName);
        localStorage.setItem(storyArcNamesKey, JSON.stringify(storyNames));

        // copy the most recent dataset, if available
        if (ii > 0) {
            let storyArcNameKey = util_buildStoryArcKey(storyArc, storyName)
            console.log('util-ensureStoryNames - copy most recent dataset to ' + storyArcNameKey);
            let previousStoryArcNameKey = util_buildStoryArcKey(storyArc, storyNames[ii -1]);
            console.log('util-ensureStoryNames - previous key to use ' + previousStoryArcNameKey);
            let previousStoryArcNameData = localStorage.getItem(previousStoryArcNameKey);
            localStorage.setItem(storyArcNameKey, previousStoryArcNameData);
        }
    }
}

function util_saveLocalAssetModels(storyArc, storyName, assetModels) {
    let key = util_buildStoryArcKey(storyArc, storyName);
    localStorage.setItem(key, JSON.stringify(assetModels));
}

function util_loadLocalAssetModels(storyArc, storyName) {
    let key = util_buildStoryArcKey(storyArc, storyName);
    let assetModelsAsString = localStorage.getItem(key);
    if (assetModelsAsString)
        return JSON.parse(assetModelsAsString);
    else
        return null;
}

function util_YYYYmm() {
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];
    const segments = formattedDate.split('-');
    const resultDate = segments[0] + '-' + segments[1];
    return resultDate;
}

function util_YYYYmmToDisplay(YYYYmm) {
    // use '-02' so that the second day is used this avoiding local/utc time conversion
    const date = new Date(YYYYmm + '-02');
    let options = { year: 'numeric', month: 'long' };
    return date.toLocaleDateString('en-US', options);
}

function util_findAssetModelsToUseForTaxes(assetModels) {
    let result = [];
    for (const modelAsset of assetModels) {
        if (isMonthlyExpense(modelAsset.instrument) && modelAsset.fundingSource)
        {
            let fundingSourceModelAsset = util_findModelAssetByDisplayName(assetModels, modelAsset.fundingSource);
            if (fundingSourceModelAsset)
                result.push(fundingSourceModelAsset);
        }
        else if (isSavingsAccount(modelAsset.instrument)) {
            result.push(modelAsset);
        }
    }
    return result;
}
