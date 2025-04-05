
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
    //const sHoldAllUntilFinish = 'holdAllUntilFinish';
    //const sUseForTaxes = 'useForTaxes';

const sInstrumentNames = ['home', 'mortgage', 'monthlyIncome', 'usBond', 'corpBond', 'bank', 'taxFreeEquity',  'taxDeferredEquity', 'taxableEquity', 'cash', 'debt', 'monthlyExpense'];
const sInstrumentSortOrder = ['home', 'mortgage', 'monthlyIncome', 'usBond', 'corpBond', 'bank', 'taxFreeEquity',  'taxDeferredEquity', 'taxableEquity', 'cash', 'debt', 'monthlyExpense'];
const sIntrumentDisplayNames = ['🏡 House', '💸🏡 Mortgage', '💲💰 Monthly Income', '🏛️ US Treasury', '🏛️ Corporate Bond', '🏦 Savings', '📈 Tax Free Account', '⏳📈 Tax Deferred Account', '🧾📈 Taxable Account', '💰 Cash',  '💳 Debt', '💸💰 Monthly Expense'];
const sInstrumentsIDs = Object.freeze({
    home: 0,
    mortgage: 1,
    monthlyIncome: 2,  
    usBond: 3,
    corpBond: 4,
    bank: 5,
    taxFreeEquity: 6,
    taxDeferredEquity: 7,
    taxableEquity: 8,
    cash: 9,
    debt: 10,
    monthlyExpense: 11
});

class CapitalGainsResult {
    constructor(principal, earnings) {
        this.principal = new Currency();
        if (principal)
            this.principal.add(principal);
        this.earnings = new Currency();
        if (earnings)
            this.earnings.add(earnings);
    }
}

class MortgageResult {
    constructor(payment, principal, interest, escrow) {
        this.payment = new Currency();
        if (payment)
            this.payment.add(payment);
        this.principal = new Currency();
        if (principal)
            this.principal.add(principal);
        this.interest = new Currency();
        if (interest)
            this.interest.add(interest);
        this.escrow = new Currency();
        if (escrow)
            this.escrow.add(escrow);
    }
}

class IncomeResult {
    constructor(selfIncome, employedIncome) {
        this.selfIncome = new Currency();
        if (selfIncome)
            this.selfIncome.add(selfIncome);
        this.employedIncome = new Currency();
        if (employedIncome)
            this.employedIncome.add(employedIncome);
    }
}

class ExpenseResult {
    constructor(expense, nextExpense) {
        this.expense = new Currency();
        if (expense)
            this.expense.add(expense);
        this.nextExpense = new Currency();
        if (nextExpense)
            this.nextExpense.add(nextExpense);
    }
}

class WithholdingResult {
    constructor(medicare, socialSecurity, income) {
        this.medicare = new Currency();
        if (medicare)
            this.medicare.add(medicare);
        this.socialSecurity = new Currency();
        if (socialSecurity)
            this.socialSecurity.add(socialSecurity);
        this.income = new Currency();
        if (income)
            this.income.add(income);
    }

    fica() {
        return new Currency(this.medicare.amount + this.socialSecurity.amount);
    }

    flipSigns() {
        this.medicare.flipSign();
        this.socialSecurity.flipSign();
        this.income.flipSign();
    }
}

class InterestResult {
    constructor(income) {
        this.income = new Currency();
        if (income)
            this.income.add(income);
    }
}

class ModelAsset {
    constructor(instrument, displayName, startDateInt, startCurrency, finishDateInt, monthsRemaining, annualReturnRate) {
        this.instrument = instrument;
        this.displayName = displayName;
        this.startDateInt = startDateInt;
        this.startCurrency = startCurrency;
        this.finishDateInt = finishDateInt;
        if (Number.isInteger(monthsRemaining))
            this.monthsRemaining = monthsRemaining;
        else
            this.monthsRemaining = 0;
        this.annualReturnRate = annualReturnRate;
        this.fundingSource = null;
        this.colorId = 0;
    }

    static parseJSON(jsonObject) {
        let instrument = jsonObject.instrument;
        let displayName = jsonObject.displayName;
        let startDateInt = DateInt.parse(jsonObject['startDate']);
        let startCurrency = Currency.parse(jsonObject['startValue']);
        let finishDateInt = DateInt.parse(jsonObject['finishDate']);
        let monthsRemaining = parseInt(jsonObject['monthsRemaining']);
        let annualReturnRate = ARR.parse(jsonObject['annualReturnRate']);
        return new ModelAsset(instrument, displayName, startDateInt, startCurrency, finishDateInt, monthsRemaining, annualReturnRate);
    }

    static parseHTML(htmlElements, colorElement) {
        let instrument = null;
        let displayName = null;
        let startDateInt = null;
        let startCurrency = null;
        let finishDateInt = null;
        let monthsRemaining = null;
        let annualReturnRate = null;
        let fundingSource = null;
        
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
            else if (element.name == sAnnualReturnRate)
                annualReturnRate = ARR.parse(element.value);
            else if (element.name == sFundingSource)
                fundingSource = element.value;
        }

        let modelAsset = new ModelAsset(instrument, displayName, startDateInt, startCurrency, finishDateInt, monthsRemaining, annualReturnRate);

        // because fundingSource is usually null, let's set it outside the constructor in case we want to do anything interesting
        modelAsset.fundingSource = fundingSource;

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

    sortIndex() {
        return sInstrumentSortOrder.indexOf(this.instrument);
    }

    isSocialSecurity() {
        return this.displayName == 'SSN';
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

        console.log('credit: ' + this.displayName + ' ' + currency.toString());
        this.finishCurrency.add(currency);
        this.monthlyCredits.add(currency);

    }

    debit(currency) {

        console.log('debit: ' + this.displayName + ' ' + currency.toString());
        this.finishCurrency.subtract(currency);
        this.monthlyCredits.subtract(currency);

    }

    initializeChron() {
        
        this.monthlyCredits = new Currency();
        this.monthlyIRAContribution = new Currency();
        this.monthlyIRADistribution = new Currency();

        // earningCurrency
        this.earningCurrency = new Currency();
        this.monthlyEarning = [];
        
        // finishCurrency
        this.finishCurrency = new Currency();
        this.monthlyValue = [];

        this.accumulatedCurrency = new Currency();
        this.monthlyAccumulated = [];

        this.shortTermCapitalGainsCurrency = new Currency();
        this.monthlyShortTermCapitalGains = [];

        this.longTermCapitalGainsCurrency = new Currency();
        this.monthlyLongTermCapitalGains = [];

        // charting
        this.rmdCurrency = new Currency();
        this.monthlyRMDs = [];

        this.monthlyWithholding = [];
        this.monthlyFICA = [];

        this.socialSecurityCurrency = new Currency();
        this.monthlySocialSecurity = [];

        this.medicareCurrency = new Currency();
        this.monthlyMedicare = [];

        this.incomeTaxCurrency = new Currency();
        this.monthlyIncomeTax = [];

        this.estimatedTaxCurrency = new Currency();
        this.monthlyEstimatedTax = [];

        this.monthsRemainingDynamic = this.monthsRemaining;   

        // seed the first month with the start currency
        this.finishCurrency = new Currency(this.startCurrency.amount);

    }

    monthlyChron() {

        this.monthlyCredits.zero();
        this.monthlyIRAContribution.zero();
        this.monthlyIRADistribution.zero();

        this.accumulatedCurrency.add(this.earningCurrency);
        this.monthlyAccumulated.push(this.accumulatedCurrency.toCurrency());
        
        if (isMonthlyIncome(this.instrument) || isMonthlyExpense(this.instrument))
            this.monthlyEarning.push(this.finishCurrency.toCurrency());
        else
            this.monthlyEarning.push(this.earningCurrency.toCurrency());
        this.earningCurrency.zero();

        this.monthlyValue.push(this.finishCurrency.toCurrency());
        // DO NOT ZERO FINISH CURRENCY!

        this.monthlyShortTermCapitalGains.push(this.shortTermCapitalGainsCurrency.toCurrency());
        this.shortTermCapitalGainsCurrency.zero();

        this.monthlyLongTermCapitalGains.push(this.longTermCapitalGainsCurrency.toCurrency());
        this.longTermCapitalGainsCurrency.zero();

        // charting
        this.monthlyRMDs.push(this.rmdCurrency.toCurrency());
        this.rmdCurrency.zero();

        this.monthlyWithholding.push(this.funcMonthlyWithholding().toCurrency());
        this.monthlyFICA.push(this.funcMonthlyFICA().toCurrency());

        this.monthlySocialSecurity.push(this.socialSecurityCurrency.toCurrency());
        this.socialSecurityCurrency.zero();

        this.monthlyMedicare.push(this.medicareCurrency.toCurrency());
        this.medicareCurrency.zero();

        this.monthlyIncomeTax.push(this.incomeTaxCurrency.toCurrency());
        this.incomeTaxCurrency.zero();

        this.monthlyEstimatedTax.push(this.estimatedTaxCurrency.toCurrency());
        this.estimatedTaxCurrency.zero();

    }

    yearlyChron() {

    }

    funcMonthlyWithholding() {

        let amount = new Currency();
        amount.add(this.funcMonthlyFICA());
        amount.add(this.incomeTaxWithholdingCurrency);
        return amount;
    }

    funcMonthlyFICA() {

        let amount = new Currency();
        amount.add(this.socialSecurityCurrency);
        amount.add(this.medicareCurrency);
        return amount;

    }

    addMonthlyShortTermCapitalGains(amount) {
        this.shortTermCapitalGainsCurrency.add(amount);
        this.monthlyEarningsCurrency.add(amount);
        return new Currency(this.shortTermCapitalGainsCurrency.amount);
    }

    addMonthlyLongTermCapitalGains(amount) {
        this.longTermCapitalGainsCurrency.add(amount);
        this.monthlyEarningsCurrency.add(amount);
        return new Currency(this.longTermCapitalGainsCurrency.amount);
    }

    addMonthlySocialSecurity(amount) {
        this.socialSecurityCurrency.add(amount);
        return new Currency(this.socialSecurityCurrency.amount);
    }

    addMonthlyMedicare(amount) {
        this.medicareCurrency.add(amount);        
        return new Currency(this.medicareCurrency.amount);
    }

    addMonthlyIncomeTax(amount) {
        this.incomeTaxCurrency.add(amount);
        return new Currency(this.incomeTaxCurrency.amount);
    }

    addMonthlyEstimatedTax(amount) {        
        this.estimatedTaxCurrency.add(amount);
        return new Currency(this.estimatedTaxCurrency.amount);
    }

    addMonthlyEarning(amount) {
        this.earningCurrency.add(amount);
        return new Currency(this.earningCurrency.amount);
	}

	addMonthlyValue(amount) {
        this.finishCurrency.add(amount);
        return new Currency(this.finishCurrency.amount);
	}

    addIRAContribution(amount) {
        this.monthlyIRAContribution.add(amount);
        return new Currency(this.monthlyIRAContribution.amount);
    }

    addIRADistribution(amount) {
        this.monthlyIRADistribution.add(amount);
        return new Currency(this.monthlyIRADistribution.amount);
    }

    deductWithholding(withholdingIn) {

        let withholding = new WithholdingResult(withholdingIn.medicare, withholdingIn.socialSecurity, withholdingIn.income);

        console.log(this.displayName + ' add socialSecurity: ' + withholding.socialSecurity.toString());
        this.addMonthlySocialSecurity(withholding.socialSecurity);
        this.earningCurrency.add(withholding.socialSecurity);

        console.log(this.displayName + ' add medicare: ' + withholding.medicare.toString());
        this.addMonthlyMedicare(withholding.medicare);
        this.earningCurrency.add(withholding.medicare);

        console.log(this.displayName + ' add income withholding: ' + withholding.income.toString());
        this.addMonthlyIncomeTax(withholding.income);
        this.earningCurrency.add(withholding.income);

        return new Currency(this.earningCurrency.amount);

    }

    finalizeChron() {

    }

    applyMonthly() {
        if (isMonthlyIncome(this.instrument))
            return this.applyMonthlyIncomeSalary();
        else if (isMonthlyExpense(this.instrument))
            return this.applyMonthlyExpense();
        else if (isMortgage(this.instrument))
            return this.applyMonthlyMortgage();
        else if (isCapital(this.instrument))
            return this.applyMonthlyCapital();
        else if (isIncomeAccount(this.instrument))
            return this.applyMonthlyIncomeHoldings();
        else {
            console.log('Model.applyMonthly: unsupported instrument ' + this.instrument);
            return null;
        }
    }

    applyMonthlyIncomeSalary() {
        
        if (!isMonthlyIncome(this.instrument)) {
            console.log('Model.applyMonthlyIncome - model not income');
            return new Currency();
        }

        if (this.startCurrency.amount < 0) {
            this.startCurrency.amount *= -1;
            this.finishCurrency.amount *= -1;
        }

        console.log('monthly income: ' + this.displayName + ' ' + this.finishCurrency.toString());

        this.earningCurrency = new Currency(this.finishCurrency.amount);
        if (this.isSelfEmployed)
            return new IncomeResult(new Currency(this.earningCurrency.amount), new Currency());
        else
            return new IncomeResult(new Currency(), new Currency(this.earningCurrency.amount));      

    }

    applyMonthlyIncomeHoldings() {

        if (!isIncomeAccount(this.instrument)) {
            console.log('Model.applyMonthlyIncome - model not income');
            return new Currency();
        }

        if (this.startCurrency.amount < 0) {
            this.startCurrency.amount *= -1;
            this.finishCurrency.amount *= -1;
        }        

        this.earningCurrency = new Currency(this.finishCurrency.amount * this.annualReturnRate.asMonthly());

        console.log('monthly income holding: ' + this.displayName + ' ' + this.earningCurrency.toString());

        this.finishCurrency.add(this.earningCurrency);        
        
        if (this.isSelfEmployed)
            return new IncomeResult(new Currency(this.earningCurrency.amount), new Currency());
        else
            return new IncomeResult(new Currency(), new Currency(this.earningCurrency.amount));

    }

    applyMonthlyExpense() {
        
        if (!isMonthlyExpense(this.instrument)) {
            console.log('Model.applyMonth_expense - model not an expense');
            return new Currency();
        }

        if (this.startCurrency.amount > 0) {
            this.startCurrency.amount *= -1;
            this.finishCurrency.amount *= -1;
        }

        console.log('monthly expense: ' + this.displayName + ' ' + this.finishCurrency.toString());

        this.earningCurrency = new Currency(this.finishCurrency.amount);            
        this.finishCurrency = new Currency(this.finishCurrency.amount * (1+this.annualReturnRate.asMonthly()));
        return new ExpenseResult(new Currency(this.earningCurrency.amount), new Currency(this.finishCurrency.amount));
        
    }

    applyMonthlyMortgage() {

        if (this.startCurrency.amount > 0) {
            this.startCurrency.amount *= -1;
            this.finishCurrency.amount *= -1;
        }

        let monthlyMortgagePayment = (this.finishCurrency.amount * this.annualReturnRate.asMonthly()) * Math.pow(1.0 + this.annualReturnRate.asMonthly(), this.monthsRemainingDynamic);
	    monthlyMortgagePayment /= Math.pow(1.0 + this.annualReturnRate.asMonthly(), this.monthsRemainingDynamic) - 1.0
        let monthlyMortgageInterest = new Currency(this.finishCurrency.amount * this.annualReturnRate.asMonthly());
	    let monthlyMortgagePrincipal = new Currency(monthlyMortgagePayment - monthlyMortgageInterest.amount);            
        --this.monthsRemainingDynamic;

        let c = new Currency(monthlyMortgagePayment);
        this.earningCurrency = new Currency(monthlyMortgagePrincipal.amount);
        this.earningCurrency.flipSign();
        console.log('mortgage payment: ' + this.displayName + ' ' + c.toString() + ', interest payment: ' + monthlyMortgageInterest.toString() + ' principal payment: ' + monthlyMortgagePrincipal.toString());

        this.finishCurrency.subtract(monthlyMortgagePrincipal);
        return new MortgageResult(c, monthlyMortgagePrincipal, monthlyMortgageInterest, new Currency());
        
    }

    applyMonthlyCapital() {

        if (!isCapital(this.instrument)) {
            console.log('Model.applyMonthlyCapital - model not capital');
            return;
        }

        this.earningCurrency = new Currency(this.finishCurrency.amount * this.annualReturnRate.asMonthly());

        console.log('capital gains: ' + this.displayName + ' ' + this.earningCurrency.toString());

        this.finishCurrency.add(this.earningCurrency);

        // principal, earnings
        return new CapitalGainsResult(new Currency(this.finishCurrency.amount), new Currency(this.earningCurrency.amount));

    }

    applyMonthlyCredits(expense) {

        console.log('apply credits: ' + this.displayName + ' expense ' + expense.toString() + ' to monthly credit of ' + this.monthlyCredits.toString());
        let test = new Currency(this.monthlyCredits.amount + expense.amount);
        if (test.amount >= 0) {            
            this.credit(expense);
            return new Currency();
        }
        else {
            console.log('apply credits: ' + this.displayName + ' expense exeeded credits by ' + test.toString());
            let credits = new Currency(this.monthlyCredits.amount);
            this.debit(credits);
            return test;
        }

    }

    applyYearly() {
        if (isMonthlyIncome(this.instrument)) {
            this.applyYearlyIncome(); // a raise!!
        }
    }
    applyYearlyIncome() {
        
        this.finishCurrency = new Currency(this.finishCurrency.amount * (1+this.annualReturnRate.annualReturnRate));        
        return new Currency(this.finishCurrency.amount);

    }

    applyYearlyTaxPayments() {

        return new Currency();

    }

    applyFundingSource(fundingAsset, amount) {

        if (amount) {
            fundingAsset.credit(amount);
            return new Currency(amount.amount);
        }
        else {
            fundingAsset.credit(this.earningCurrency);
            return new Currency(this.earningCurrency.amount);
        }

    }

    close() {

        this.earningCurrency.zero();
        this.finishCurrency.zero();

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

    hasEstimatedTax() {
        if (this.estimatedTax)
            return this.estimatedTax != 0.0;
        else
            return false;
    }

    getEstimatedTax() {
        if (this.estimatedTax)
            return this.estimatedTax;
        else
            return 0.0;
    }

    addEstimatedTax(amount) {
        if (!this.estimatedTax)
            this.estimatedTax = amount;
        else
            this.estimatedTax += amount;
    }

    debitAndClearEstimatedTax() {
        if (this.estimatedTax)
            this.finishCurrency.amount -= this.estimatedTax;
        this.clearEstimatedTax();
    }

    clearEstimatedTax() {
        if (this.estimatedTax)
            delete this.estimatedTax;
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

    monthlyEarningsDataToDisplayEarningsData(monthsSpan) {

        this.displayEarningsData = [];
        for (let ii = monthsSpan.offsetMonths; ii < this.monthlyEarning.length; ii += monthsSpan.combineMonths) {
            let total = 0.0;
            for (let jj = 0; jj < monthsSpan.combineMonths && ii+jj < this.monthlyEarning.length; jj++) {
                total += this.monthlyEarning[ii+jj];
            }
            this.displayEarningsData.push(total);
        }
    }    

    monthlyDataArrayToDisplayData(monthsSpan, monthlyArrayName, displayArrayName) {

        this[displayArrayName] = [];
        for (let ii = monthsSpan.offsetMonths; ii < this[monthlyArrayName].length; ii += monthsSpan.combineMonths) {
            let total = 0.0;
            for (let jj = 0; jj < monthsSpan.combineMonths && ii+jj < this[monthlyArrayName].length; jj++) {
                total += this[monthlyArrayName][ii+jj];
            }
            this[displayArrayName].push(total);
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

