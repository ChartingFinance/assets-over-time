
const sInstrument = 'instrument';
const sDisplayName = 'displayName';
const sStartDate = 'startDate';
const sStartValue = 'startValue';
const sFinishDate = 'finishDate';
const sMonthsRemaining = 'monthsRemaining';
const sFinishValue = 'finishValue';
const sAnnualReturnRate = 'annualReturnRate';
const sFundingSource = 'fundingSource';
const sTaxChoice = 'taxChoice';
    // taxChoice radio values
    const sHoldAllUntilFinish = 'holdAllUntilFinish';
    const sUseForTaxes = 'useForTaxes';

const sInstrumentNames = ['monthlyIncome', 'monthlyExpense', 'home', 'mortgage', 'debt', 'taxableEquity', 'taxDeferredEquity', 'taxFreeEquity', 'usBond', 'corpBond', 'bank', 'cash'];
const sIntrumentDisplayNames = ['💲💰 Monthly Income', '💸💰 Monthly Expense', '🏡 House', '💸🏡 Mortgage', '💳 Debt', '🧾📈 Taxable Account', '⏳📈 Tax Deferred Account', '📈 Tax Free Account', '🏛️ US Treasury', '🏛️ Corporate Bond', '🏦 Savings', '💰 Cash'];
const sInstrumentsIDs = Object.freeze({
    monthlyIncome: 0,    
    monthlyExpense: 1,   
    home: 2,
    mortgage: 3,
    debt: 4,
    taxableEquity: 5,
    taxDeferredEquity: 6,
    taxFreeEquity: 7,
    usBond: 8,
    corpBond: 9,
    bank: 10,
    cash: 11
});

class ModelAsset {
    constructor(instrument, displayName, startDateInt, startCurrency, finishDateInt, monthsRemaining, finishCurrency, annualReturnRate) {
        this.instrument = instrument;
        this.displayName = displayName;
        this.startDateInt = startDateInt;
        this.startCurrency = startCurrency;
        this.finishDateInt = finishDateInt;
        this.finishCurrency = finishCurrency;
        if (Number.isInteger(monthsRemaining))
            this.monthsRemaining = monthsRemaining;
        else
            this.monthsRemaining = 0;
        this.annualReturnRate = annualReturnRate;
        this.earningCurrency = new Currency(0.0);
        this.accumulatedCurrency = new Currency(0.0);
        this.monthlyEarning = [];
        this.monthlyValue = [];
        this.fundingSource = null;
        this.holdAllUntilFinish = true;
        this.useForTaxes = false;
        this.colorId = 0;
    }

    static parseJSON(jsonObject) {
        let instrument = jsonObject.instrument;
        let displayName = jsonObject.displayName;
        let startDateInt = DateInt.parse(jsonObject['startDate']);
        let startCurrency = Currency.parse(jsonObject['startValue']);
        let finishDateInt = DateInt.parse(jsonObject['finishDate']);
        let monthsRemaining = parseInt(jsonObject['monthsRemaining']);
        let finishCurrency = Currency.parse(jsonObject['finishValue']);
        let annualReturnRate = ARR.parse(jsonObject['annualReturnRate']);
        return new ModelAsset(instrument, displayName, startDateInt, startCurrency, finishDateInt, monthsRemaining, finishCurrency, annualReturnRate);
    }

    static parseHTML(htmlElements, colorElement) {
        let instrument = null;
        let displayName = null;
        let startDateInt = null;
        let startCurrency = null;
        let finishDateInt = null;
        let monthsRemaining = null;
        let finishCurrency = new Currency(0.0);
        let annualReturnRate = null;
        let fundingSource = null;
        let holdAllUntilFinish = true;
        let useForTaxes = false;
        
        for (const element of htmlElements) {
            if (element.name == sInstrument)
                instrument = element.value;
            else if (element.name == sDisplayName)
                displayName = element.value;
            else if (element.name == sStartDate)
                startDateInt = DateInt.parse(element.value);
            else if (element.name == sStartValue)
                startCurrency = Currency.parse(element.value);
            else if (element.name == sFinishDate)
                finishDateInt = DateInt.parse(element.value);
            else if (element.name == sMonthsRemaining)
                monthsRemaining = parseInt(element.value);
            else if (element.name == sFinishValue)
                finishCurrency = Currency.parse(element.value);
            else if (element.name == sAnnualReturnRate)
                annualReturnRate = ARR.parse(element.value);
            else if (element.name == sFundingSource)
                fundingSource = element.value;
            else if (element.name == sTaxChoice) {
                if (element.checked) {
                    holdAllUntilFinish = (element.value == sHoldAllUntilFinish);
                    useForTaxes = (element.value == sUseForTaxes);
                }
                else {
                    holdAllUntilFinish = (element.value != sHoldAllUntilFinish);
                    useForTaxes = (element.value != sUseForTaxes);
                }
            }
        }

        let modelAsset = new ModelAsset(instrument, displayName, startDateInt, startCurrency, finishDateInt, monthsRemaining, finishCurrency, annualReturnRate);
        // because fundingSource is usually null, let's set it outside the constructor in case we want to do anything interesting
        modelAsset.fundingSource = fundingSource;
        modelAsset.holdAllUntilFinish = holdAllUntilFinish;
        modelAsset.useForTaxes = useForTaxes;

        if (colorElement) {
            let colorHex = rgb2hex(colorElement.style.backgroundColor)
            for (let ii = 0; ii < colorRange.length; ii++) {
                if (colorHex == colorRange[ii]) {
                    this.colorId = ii;
                    break;
                }
            }
        }

        return modelAsset;
    }

    hasMonthlyRate() {
        if (this.annualReturnRate != null)
            return this.annualReturnRate.hasMonthly();
        else
            return false;
    }

    hasMonthlyAmount() {
        if (this.annualReturnRate != null)
            return this.annualReturnRate.hasMonthlyAmount();
        else
            return false;
    }

    credit(currency) {
        console.log('credit: ' + this.displayName + ' ' + currency.amount);
        this.finishCurrency.add(currency);
        this.accumulatedCurrency.add(currency);
    }

    debit(currency) {
        console.log('debit: ' + this.displayName + ' ' + currency.amount);
        this.finishCurrency.subtract(currency);
        this.accumulatedCurrency.subtract(currency);
    }

    initializeChron() {
        this.monthlyEarning = [];
        this.monthlyValue = [];
        this.monthlyRMDs = [];
        this.monthsRemainingDynamic = this.monthsRemaining;
        this.earningCurrency.zero();
        this.finishCurrency.zero();
    }

    applyMonth_common(isInMonth) {

        if (isInMonth) {
            this.earningCurrency = new Currency(0.0);

            if (this.hasMonthlyRate())
                this.earningCurrency = new Currency(this.finishCurrency.amount * this.annualReturnRate.asMonthly());
            
            this.credit(this.earningCurrency);        
        }

    }

    applyMonth_mortgageOrDebt(isInMonth) {

        if (this.startCurrency.amount > 0) {
            this.startCurrency.amount *= -1;
            this.finishCurrency.amount *= -1;
        }

        if (isInMonth) {                	
	        let monthlyMortgagePayment = (this.finishCurrency.amount * this.annualReturnRate.asMonthly()) * Math.pow(1.0 + this.annualReturnRate.asMonthly(), this.monthsRemainingDynamic)
	        monthlyMortgagePayment /= Math.pow(1.0 + this.annualReturnRate.asMonthly(), this.monthsRemainingDynamic) - 1.0
            this.earningCurrency = new Currency(this.finishCurrency.amount * this.annualReturnRate.asMonthly());
	        let monthlyMortgagePrincipal = new Currency(monthlyMortgagePayment - this.earningCurrency.amount);            
            --this.monthsRemainingDynamic;

            this.finishCurrency.subtract(monthlyMortgagePrincipal);
            this.accumulatedCurrency.add(new Currency(monthlyMortgagePayment));            	
        }

    }

    /*
    applyMonth_debt(isInMonth) {

        if (this.startCurrency.amount > 0) {
            this.startCurrency.amount *= -1;
            this.finishCurrency.amount *= -1;
        }

        if (isInMonth) {                	
	        let monthlyPayment = (this.finishCurrency.amount * this.annualReturnRate.asMonthly()) * Math.pow(1.0 + this.annualReturnRate.asMonthly(), this.monthsRemainingDynamic)
	        monthlyPayment /= Math.pow(1.0 + this.annualReturnRate.asMonthly(), this.monthsRemainingDynamic) - 1.0
            let monthlyInterest = new Currency(this.finishCurrency.amount * this.annualReturnRate.asMonthly());
	        let monthlyPrincipal = new Currency(monthlyPayment - monthlyInterest.amount);            
            --this.monthsRemainingDynamic;
            
            this.finishCurrency.subtract(monthlyPrincipal);
            this.accumulatedCurrency.add(new Currency(monthlyPayment));
            this.monthlyEarnings.push(monthlyInterest.toCurrency())            	
        }

    }
    */

    applyMonth_expenseOrIncome(isInMonth) {

        // the customization here will be which buckets to debit from

        if (isMonthlyExpense(this.instrument) && this.startCurrency.amount > 0) {
            this.startCurrency.amount *= -1;
            this.finishCurrency.amount *= -1;
        }

        if (isMonthlyIncome(this.instrument) && this.startCurrency.amount < 0) {
            this.startCurrency.amount *= -1;
            this.finishCurrency.amount *= -1;
        }

        if (isInMonth) {
            //this.earningCurrency = new Currency(this.finishCurrency.amount * this.annualReturnRate.asMonthly());
            this.earningCurrency = new Currency(this.finishCurrency.amount * (1+this.annualReturnRate.asMonthly()));
            //this.finishCurrency.add(this.earningCurrency);
            this.finishCurrency = new Currency(this.earningCurrency.amount);
            this.accumulatedCurrency.add(this.finishCurrency);
        }
    }

    inMonth(dateInt) {
        let isStartDate = false;
        let isFinishDate = false;

        if (dateInt.toInt() >= this.startDateInt.toInt()) {
            isStartDate = true;           
        }
        
        if (dateInt.toInt() > this.finishDateInt.toInt()) {
            isFinishDate = true;
        }
        
        return (isStartDate && !isFinishDate);
    }

    applyMonth(currentDateInt, activeUser) {
        let isInMonth = this.inMonth(currentDateInt);
        
        if (currentDateInt.toInt() == this.startDateInt.toInt())
            this.finishCurrency = new Currency(this.startCurrency.amount);

        let preFinishCurrency = null;
        if (isInMonth)
            preFinishCurrency = new Currency(this.finishCurrency.amount);

        if (isMortgage(this.instrument) || isDebt(this.instrument)) {
            this.applyMonth_mortgageOrDebt(isInMonth);
        }
        else if (isMonthlyExpense(this.instrument) || isMonthlyIncome(this.instrument)) {
            this.applyMonth_expenseOrIncome(isInMonth);
        }
        else {
            this.applyMonth_common(isInMonth);
        }

        if (isInMonth) {
            this.monthlyEarning.push(this.earningCurrency.toCurrency());
            this.monthlyValue.push(this.finishCurrency.toCurrency());
        }
        else {
            this.monthlyEarning.push(0.0);
            this.monthlyValue.push(0.0);
        }

        return isInMonth;
    }

    isFinishDateInt(aDateInt) {
        if (aDateInt == null) {
            console.log('model.isFinishDateInt passed null test');
            return false;
        }

        return this.finishDateInt.year == aDateInt.year && this.finishDateInt.month == aDateInt.month;
    }

    monthlyAssetDataToDisplayAssetData(monthsSpan) {
        this.displayAssetData = [];
        for (let ii = monthsSpan.offsetMonths; ii < this.monthlyValue.length; ii += monthsSpan.combineMonths) {
            this.displayAssetData.push(this.monthlyValue[ii]);
        }
    }

    monthlyLiquidityDataToDisplayLiquidityData(monthsSpan) {
        this.displayLiquidityData = [];
        for (let ii = monthsSpan.offsetMonths; ii < this.monthlyEarning.length; ii += monthsSpan.combineMonths) {
            this.displayLiquidityData.push(this.monthlyEarning[ii]);
        }
    }

    monthlyRMDDataToDisplayRMDData(monthsSpan) {
        this.displayRMDData = [];
        for (let ii = monthsSpan.offsetMonths; ii < this.monthlyRMDs.length; ii += monthsSpan.combineMonths) {
            this.displayRMDData.push(this.monthlyRMDs[ii]);
        }
    }

    getFinishCurrencyForRollup() {
        if (isMortgage(this.instrument) || isDebt(this.instrument))
            return this.accumulatedCurrency;
        else if (isMonthlyExpense(this.instrument) || isMonthlyIncome(this.instrument))
            return this.accumulatedCurrency;
        else
            return this.finishCurrency;
    }

    isPositive() {
        return this.accumulatedCurrency.amount > 0.0;
    }

    isNegative() {
        return this.accumulatedCurrency.amount < 0.0;
    }

    mostRecentMonthlyEarnings() {
        if (this.monthlyEarnings && this.monthlyEarnings.length > 0) {
            let spot = this.monthlyEarnings.length -1;
            return Currency.parse(this.monthlyEarnings[spot]);
        }
        else
            return new Currency(0.0);
    }

    getEmoji() {
        if (this.instrument == sInstruments[0])
            return '🏡';
        else if (this.instrument == 'mortgage')
            return '💸🏡';
        else if (this.instrument == 'taxableEquity')
            return '🧾📈';
        else if (this.instrument == 'taxDeferredEquity')
            return '⏳📈';
        else if (this.instrument == 'taxFreeEquity')
            return '📈';
        else if (this.instrument == 'usBond')
            return '🏛️';
        else if (this.instrument == 'corpBond')
            return '🏛️';
        else if (this.instrument == 'cash')
            return '💰';
        else if (this.instrument == 'monthlyIncome')
            return '💲💰';
        else if (this.instrument == 'monthlyExpense')
            return '💸💰';
    }
}

// Common interface

