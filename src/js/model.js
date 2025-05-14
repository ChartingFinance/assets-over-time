
const sInstrument = 'instrument';
const sDisplayName = 'displayName';
const sStartDate = 'startDate';
const sStartValue = 'startValue';
const sBasisValue = 'basisValue';
const sFinishDate = 'finishDate';
const sMonthsRemaining = 'monthsRemaining';
const sFinishValue = 'finishValue';
const sAnnualReturnRate = 'annualReturnRate';
const sFundTransfers = 'fundTransfers';
const sTaxChoice = 'taxChoice';

const sInstrumentNames = ['home', 'mortgage', 'monthlySalary', 'monthlySocialSecurity', 'usBond', 'corpBond', 'bank', 'rothIRA',  'ira', '401K', 'taxableEquity', 'cash', 'debt', 'monthlyExpense'];
const sInstrumentSortOrder = ['home', 'mortgage', 'monthlySalary', 'monthlySocialSecurity', 'usBond', 'corpBond', 'bank', 'rothIRA', 'ira', '401K', 'taxableEquity', 'cash', 'debt', 'monthlyExpense'];
const sIntrumentDisplayNames = ['🏡 House', '💸🏡 Mortgage', '💲💰 Monthly Income', '💲🏛️ Social Security', '🏛️ US Treasury', '🏛️ Corporate Bond', '🏦 Savings', '📈 Roth IRA', '⏳📈 IRA', '⏳📈 401K', '🧾📈 Taxable Account', '💰 Cash',  '💳 Debt', '💸💰 Monthly Expense'];
const sInstrumentsIDs = Object.freeze({
    home: 0,
    mortgage: 1,
    monthlyIncome: 2,
    monthlySocialSecurity: 3,
    usBond: 4,
    corpBond: 5,
    bank: 6,
    rothIRA: 7,
    ira: 8,
    four01K: 9,
    taxableEquity: 10,
    cash: 11,
    debt: 12,
    monthlyExpense: 13
});


class AssetAppreciationResult {
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
    constructor(principal, interest, escrow) {
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

    payment() {
        return new Currency(this.principal.amount + this.interest.amount + this.escrow.amount);
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

    total() {
        return this.fica().add(this.income);
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

class CapitalGainsResult {
    constructor(shortTerm, longTerm) {

        this.shortTerm = new Currency();
        if (shortTerm)
            this.shortTerm.add(shortTerm);
        this.longTerm = new Currency();
        if (longTerm)
            this.longTerm.add(longTerm);

    }

    total() {
        return this.shortTerm.copy.add(this.longTerm);
    }

    flipSigns() {
        this.shortTerm.flipSign();
        this.longTerm.flipSign();
    }
}

class FundTransferResult {
    constructor(fromAssetChange, toAssetChange) {
        this.fromAssetChange = new Currency();
        if (fromAssetChange)
            this.fromAssetChange = fromAssetChange;
        this.toAssetChange = new Currency();
        if (toAssetChange)
            this.toAssetChange = toAssetChange;
    }
}

class FundTransfer {
    constructor(toDisplayName, moveOnFinishDate, moveValue) {

        this.toDisplayName = toDisplayName;
        this.moveOnFinishDate = moveOnFinishDate;
        this.moveValue = moveValue;

    }

    static parseJSON(jsonObject) {

        let toDisplayName = jsonObject.toDisplayName;
        let moveOnFinishDate = jsonObject.moveOnFinishDate;
        let moveValue = jsonObject.moveValue;
        return new FundTransfer(toDisplayName, moveOnFinishDate, moveValue);

    }

    static parseHTML(htmlElements) {

        let toDisplayName = null;
        let moveOnFinishDate = false;
        let moveValue = null;
        
        for (const element of htmlElements) {
            if (element.name == 'toDisplayName')
                toDisplayName = element.value;
            else if (element.name == 'moveOnFinishDate')
                moveOnFinishDate = element.checked;
            else if (element.name == 'moveValue')
                moveValue = parseInt(element.value);
        }

        if (isNaN(moveValue))
            moveValue = 0.0;

        return new FundTransfer(toDisplayName, moveOnFinishDate, moveValue);

    }

    copy() {
        let fundTransfer = new FundTransfer(this.toDisplayName, this.moveOnFinishDate, this.moveValue);
        return fundTransfer;
    }

    bind(fromModel, models) {

        this.fromModel = fromModel;
        this.toModel = util_findModelAssetByDisplayName(models, this.toDisplayName);
        if (this.toModel == null) {
            logger.log('FundTransfer.bind: to model not found: ' + this.toDisplayName);
        }

    }

    calculate() {
        
        if (this.fromModel == null) {
            logger.log('FundTransfer.calculate: make sure to call bind() because from model not found: ' + this.fromDisplayName);
            return new Currency(0.0);
        }

        let amount = null;
        let percentage = this.moveValue / 100.0;
        amount = new Currency(this.fromModel.finishCurrency.amount * percentage);
        if (this.approvedAmount) {
            if (amount.amount > this.approvedAmount.amount) {
                logger.log('FundTransfer.calculate: reducing amount ' + amount.toString() + ' to approved amount: ' + this.approvedAmount.toString());
                amount = this.approvedAmount.copy();
            }
        }

        return amount;

    }

    execute() {

        if (this.fromModel == null) {
            logger.log('FundTransfer.execute: make sure to call bind() because from model not found: ' + this.fromDisplayName);
            return;
        }

        if (this.toModel == null) {
            logger.log('FundTransfer.execute: make sure to call bind() because to model not found: ' + this.toDisplayName);
            return;
        }

        if (this.moveOnFinishDate && !this.fromModel.onFinishDate) {
            logger.log('FundTransfer.execute: moveOnFinishDate is true but fromModel not on finish date: ' + this.fromDisplayName);
            return;            
        }
        
        let amount = this.calculate();
        
        let fromAssetChange = this.fromModel.debit(amount);
        let toAssetChange = this.toModel.credit(amount);

        return new FundTransferResult(fromAssetChange, toAssetChange);
        
    }
}

class ModelAsset {
    constructor(instrument, displayName, startDateInt, startCurrency, basisCurrency, finishDateInt, monthsRemaining, annualReturnRate, fundTransfers) {
        this.instrument = instrument;
        this.displayName = displayName;
        this.startDateInt = startDateInt;
        this.startCurrency = startCurrency;
        this.basisCurrency = new Currency();
        if (basisCurrency)
            this.basisCurrency = basisCurrency;
        this.finishDateInt = finishDateInt;
        if (Number.isInteger(monthsRemaining))
            this.monthsRemaining = monthsRemaining;
        else
            this.monthsRemaining = 0;
        this.annualReturnRate = annualReturnRate;
        this.colorId = 0;
        this.fundTransfers = fundTransfers;
        this.onFinishDate = false;
    }

    static parseJSON(jsonObject) {
        let instrument = jsonObject.instrument;
        let displayName = jsonObject.displayName;
        let startDateInt = new DateInt(jsonObject.startDateInt.year * 100 + jsonObject.startDateInt.month);
        let startCurrency = new Currency(jsonObject.startCurrency.amount);
        let basisCurrency = new Currency(jsonObject.basisCurrency.amount);
        let finishDateInt = new DateInt(jsonObject.finishDateInt.year * 100 + jsonObject.finishDateInt.month);
        let monthsRemaining = jsonObject.monthsRemaining;
        let annualReturnRate = new ARR(jsonObject.annualReturnRate.annualReturnRate);
        let fundTransfers = [];
        for (let ii = 0; ii < jsonObject.fundTransfers.length; ii++) {
            fundTransfers.push(FundTransfer.parseJSON(jsonObject.fundTransfers[ii]));
        }
        return new ModelAsset(instrument, displayName, startDateInt, startCurrency, basisCurrency, finishDateInt, monthsRemaining, annualReturnRate, fundTransfers);
    }

    static parseHTML(htmlElements, colorElement) {
        let instrument = null;
        let displayName = null;
        let startDateInt = null;
        let startCurrency = null;
        let basisCurrency = null;
        let finishDateInt = null;
        let monthsRemaining = null;
        let annualReturnRate = null;
        let fundTransfers = null;
        
        for (const element of htmlElements) {
            if (element.name == sInstrument)
                instrument = element.value;
            else if (element.name == sDisplayName)
                displayName = element.value;
            else if (element.name == sStartDate)
                startDateInt = DateInt.parse(element.value);
            else if (element.name == sStartValue)
                startCurrency = Currency.parse(element.value);
            else if (element.name == sBasisValue)
                basisCurrency = Currency.parse(element.value);
            else if (element.name == sFinishDate)
                finishDateInt = DateInt.parse(element.value);
            else if (element.name == sMonthsRemaining)
                monthsRemaining = parseInt(element.value);
            else if (element.name == sAnnualReturnRate)
                annualReturnRate = ARR.parse(element.value);
            else if (element.name == sFundTransfers) {
                fundTransfers = element.getAttribute('data-fundtransfers');
                if (fundTransfers) {
                    let dataset = util_unescapedJSONParse(fundTransfers);
                    fundTransfers = [];
                    for (let ii = 0; ii < dataset.length; ii++) {
                        fundTransfers.push(FundTransfer.parseJSON(dataset[ii]));
                    }
                }
            }
        }
                    
        let modelAsset = new ModelAsset(instrument, displayName, startDateInt, startCurrency, basisCurrency, finishDateInt, monthsRemaining, annualReturnRate, fundTransfers);

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

    copy() {

        // copy the fund transfers
        let fundTransfers = [];
        for (let fundTransfer of this.fundTransfers) {
            fundTransfers.push(fundTransfer.copy());
        }
        let modelAsset = new ModelAsset(this.instrument, this.displayName, this.startDateInt, this.startCurrency, this.basisCurrency, this.finishDateInt, this.monthsRemaining, this.annualReturnRate, this.fundTransfers);
        modelAsset.finishCurrency = this.finishCurrency.copy();
        modelAsset.colorId = this.colorId;
        modelAsset.fundTransfers = fundTransfers;

        return modelAsset;

    }

    // remember you cannot take both ira and 401K deduction
    takeIRATaxDeduction() {
        if (this.isIRA(this.instrument))
            return true;
        else
            return false;
    }

    takeFour01KDeduction() {
        if (is401K(this.instrument))
            return true;
        else
            return false;
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
    
    hasFundTransfer(displayName) {
        for (let fundTransfer of this.fundTransfers) {
            if (fundTransfer.toDisplayName == displayName)
                return true;
        }
        return false;
    }

    bindFundTransfers(models) {

        for (let fundTransfer of this.fundTransfers) {
            fundTransfer.bind(this, models);
        }

    }

    fundTransferMoveValueFor(displayName) {

        let moveValue = 0.0;
        for (let fundTransfer of this.fundTransfers) {
            if (fundTransfer.toDisplayName == displayName) {
                moveValue = fundTransfer.moveValue;
                break;
            }
        }
        return moveValue;

    }

    zeroFundTransfersMoveValues() {

        for (let fundTransfer of this.fundTransfers) {
            fundTransfer.moveValue = 0.0;
        }

    }

    combinedFundTransfersMoveValue() {

        let moveValue = 0.0;
        for (let fundTransfer of this.fundTransfers) {
            moveValue += fundTransfer.moveValue;
        }
        return moveValue;

    }

    updateFundTransfers(fundTransferStepping) {        

        while (this.updateFundTransfer(0, fundTransferStepping)) {

            if (this.combinedFundTransfersMoveValue() <= 100.0)
                return true;

        }

        return false;

    }

    updateFundTransfer(index, fundTransferStepping) {

        if (index >= this.fundTransfers.length)
            return false;
        else if (this.fundTransfers[index].moveOnFinishDate)
            return false;

        if (this.updateFundTransfer(index + 1, fundTransferStepping))
            return true;
        else {
            if (this.fundTransfers[index].moveValue < 100.0) {
                this.fundTransfers[index].moveValue += fundTransferStepping;
                if (this.fundTransfers[index].moveValue >= 100.0)
                    this.fundTransfers[index].moveValue = 100.0;                    
                return true;
            }
            else {
                this.fundTransfers[index].moveValue = 0.0;
                return false;
            }
        }

    }

    dnaFundTransfers() {

        let result = '';
        for (let fundTransfer of this.fundTransfers) {
            result += this.displayName + '=>' + fundTransfer.toDisplayName + ' (' + fundTransfer.moveOnFinishDate + ') ' + fundTransfer.moveValue + '%\n';
        }
        return result;

    }

    cagr() {

        let years = this.monthlyValues.length / 12.0;        
        let cagr = 0.0;
        let step1 = (this.monthlyValues[0] / this.monthlyValues[this.monthlyValues.length - 1]);
        let step2 = (1 / years);
        let step3 = Math.pow(step1, step2) - 1;
        cagr = parseFloat(step3.toFixed(4));
        cagr *= 100.0;
        return cagr;

    }

    credit(currency) {

        if (isMonthlyIncome(this.instrument)) {
            //logger.log('credit: ' + this.displayName + ' ' + ' is monthly income so ignoring');
            return new Currency(0.0);
        }
        else if (isMonthlyExpense(this.instrument)) {
            //logger.log('credit: ' + this.displayName + ' ' + ' is monthly expense so ignoring');
            return new Currency(0.0);
        }

        logger.log('credit: ' + this.displayName + ' ' + currency.toString());
        this.creditCurrency.add(currency);        

        return this.reconcileCredit();
    }

    debit(currency) {
        
        if (isMonthlyIncome(this.instrument)) {
            //logger.log('debit: ' + this.displayName + ' ' + ' is monthly income so ignoring');
            return new Currency(0.0);
        }
        else if (isMonthlyExpense(this.instrument)) {
            //logger.log('debit: ' + this.displayName + ' ' + ' is monthly expense so ignoring');
            return new Currency(0.0);
        }

        logger.log('debit: ' + this.displayName + ' ' + currency.toString());
        this.creditCurrency.subtract(currency);
        
        return this.reconcileCredit();

    }

    reconcileCredit() {

        if (this.creditCurrency.amount < 0.0) {

            let toDebit = this.creditCurrency.copy().flipSign();
            this.creditCurrency.zero();

            logger.log('ModelAsset.reconcileCredit: ' + this.displayName + ' will debit ' + toDebit.toString() + ' from asset value');
            this.finishCurrency.subtract(toDebit);            

            if (isTaxableAccount(this.instrument)) {
                this.addMonthlyLongTermCapitalGains(toDebit);
            }
            else if (isTaxDeferred(this.instrument)) {
                if (isIRA(this.instrument))
                    this.addIRADistribution(toDebit);
                else if (is401K(this.instrument))
                    this.addFour01KDistribution(toDebit);
                else
                    logger.log('reconcileCredit: ERROR - cannot handle instrument ' + this.instrument);
            }
            else if (isTaxFree(this.instrument)) {
            }
            else
                logger.log('reconcileCredit: unsupported asset type -- ' + this.displayName);

            return toDebit;
        }

        return new Currency();
    }

    initializeChron() {
      
        // finishCurrency
        this.finishCurrency = new Currency();
        this.monthlyValues = [];

        // earningCurrency
        this.earningCurrency = new Currency();
        this.monthlyEarnings = [];

        // incomeCurrency
        this.incomeCurrency = new Currency();
        this.monthlyIncomes = [];
        
        // afterTaxCurrency
        this.afterTaxCurrency = new Currency();
        this.monthlyAfterTaxes = [];

        // afterExpensesCurrency
        this.afterExpenseCurrency = new Currency();
        this.monthlyAfterExpenses = [];

        // all earnings or all after tax?
        this.accumulatedCurrency = new Currency();
        this.monthlyAccumulateds = [];

        this.shortTermCapitalGainCurrency = new Currency();
        this.monthlyShortTermCapitalGains = [];

        this.longTermCapitalGainCurrency = new Currency();
        this.monthlyLongTermCapitalGains = [];

        // charting
        this.rmdCurrency = new Currency();
        this.monthlyRMDs = [];

        this.monthlyWithholdings = [];
        this.monthlyFICAs = [];

        this.socialSecurityCurrency = new Currency();
        this.monthlySocialSecurities = [];

        this.medicareCurrency = new Currency();
        this.monthlyMedicares = [];

        this.incomeTaxCurrency = new Currency();
        this.monthlyIncomeTaxes = [];

        this.mortgagePaymentCurrency = new Currency();
        this.monthlyMortgagePayments = [];

        this.mortgageInterestCurrency = new Currency();
        this.monthlyMortgageInterests = [];

        this.mortgagePrincipalCurrency = new Currency();
        this.monthlyMortgagePrincipals = [];

        this.mortgageEscrowCurrency = new Currency();
        this.monthlyMortgageEscrows = [];

        this.estimatedTaxCurrency = new Currency();
        this.monthlyEstimatedTaxes = [];

        this.monthsRemainingDynamic = this.monthsRemaining;   

        this.iraContributionCurrency = new Currency();
        this.monthlyIRAContributions = [];

        this.four01KContributionCurrency = new Currency();
        this.monthlyFour01KContributions = [];

        this.iraDistributionCurrency = new Currency();
        this.monthlyIRADistributions = [];

        this.four01KDistributionCurrency = new Currency();
        this.monthlyFour01KDistributions = [];

        this.interestIncomeCurrency = new Currency();
        this.monthlyInterestIncomes = [];

        this.capitalGainsTaxCurrency = new Currency();
        this.monthlyCapitalGainsTaxes = [];

        // This is treated like a cash pile that income adds to, and expenses subtract from
        // When the cash pile drops below zero, then the asset value is debitted to make up the difference
        this.creditCurrency = new Currency();
        this.monthlyCredits = [];
        // Conversely, if credit is left at the end of the month, then it is added to the asset value
        

        // seed the first month with the start currency
        this.finishCurrency = new Currency(this.startCurrency.amount);

    }

    monthlyChron() {

        this.accumulatedCurrency.add(this.earningCurrency);
        this.monthlyAccumulateds.push(this.accumulatedCurrency.toCurrency());

        this.monthlyAfterExpenses.push(this.afterExpenseCurrency.toCurrency());
        this.afterExpenseCurrency.zero();
        
        this.monthlyAfterTaxes.push(this.afterTaxCurrency.toCurrency());
        this.afterTaxCurrency.zero();

        this.monthlyIncomes.push(this.incomeCurrency.toCurrency());
        this.incomeCurrency.zero();

        this.monthlyEarnings.push(this.earningCurrency.toCurrency());
        this.earningCurrency.zero();

        this.monthlyShortTermCapitalGains.push(this.shortTermCapitalGainCurrency.toCurrency());
        this.shortTermCapitalGainCurrency.zero();

        this.monthlyLongTermCapitalGains.push(this.longTermCapitalGainCurrency.toCurrency());
        this.longTermCapitalGainCurrency.zero();

        // charting
        this.monthlyRMDs.push(this.rmdCurrency.toCurrency());
        this.rmdCurrency.zero();

        this.monthlyWithholdings.push(this.funcMonthlyWithholding().toCurrency());
        this.monthlyFICAs.push(this.funcMonthlyFICA().toCurrency());

        this.monthlySocialSecurities.push(this.socialSecurityCurrency.toCurrency());
        this.socialSecurityCurrency.zero();

        this.monthlyMedicares.push(this.medicareCurrency.toCurrency());
        this.medicareCurrency.zero();

        this.monthlyIncomeTaxes.push(this.incomeTaxCurrency.toCurrency());
        this.incomeTaxCurrency.zero();

        this.monthlyMortgagePayments.push(this.mortgagePaymentCurrency.toCurrency());
        this.mortgagePaymentCurrency.zero();

        this.monthlyMortgageInterests.push(this.mortgageInterestCurrency.toCurrency());
        this.mortgageInterestCurrency.zero();;

        this.monthlyMortgagePrincipals.push(this.mortgagePrincipalCurrency.toCurrency());
        this.mortgagePrincipalCurrency.zero();;

        this.monthlyMortgageEscrows.push(this.mortgageEscrowCurrency.toCurrency());
        this.mortgageEscrowCurrency.zero();

        this.monthlyEstimatedTaxes.push(this.estimatedTaxCurrency.toCurrency());
        this.estimatedTaxCurrency.zero();

        this.monthlyIRAContributions.push(this.iraContributionCurrency.toCurrency());
        this.iraContributionCurrency.zero();

        this.monthlyFour01KContributions.push(this.four01KContributionCurrency.toCurrency());
        this.four01KContributionCurrency.zero();

        this.monthlyIRADistributions.push(this.iraDistributionCurrency.toCurrency());
        this.iraDistributionCurrency.zero();

        this.monthlyFour01KDistributions.push(this.four01KDistributionCurrency.toCurrency());
        this.four01KDistributionCurrency.zero();

        this.monthlyInterestIncomes.push(this.interestIncomeCurrency.toCurrency());
        this.interestIncomeCurrency.zero();

        this.monthlyCapitalGainsTaxes.push(this.capitalGainsTaxCurrency.toCurrency());
        this.capitalGainsTaxCurrency.zero();
        
        // if our credit is not zero, then add to the finish currency
        if (this.creditCurrency.amount > 0.0) {
            this.finishCurrency.add(this.creditCurrency);
        }
        else if (this.creditCurrency.amount < 0.0) {
            logger.log('ModelAsset.monthlyChron: negative creditCurrency indicates credits where not properly reconciled');
        }

        this.monthlyCredits.push(this.creditCurrency.toCurrency());
        this.creditCurrency.zero(); 
        
        this.monthlyValues.push(this.finishCurrency.toCurrency());
        // DO NOT ZERO FINISH CURRENCY!     

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

        logger.log(this.displayName + ' add shortTermCapitalGains: ' + amount.toString());
        this.shortTermCapitalGainCurrency.add(amount);
        this.incomeCurrency.add(amount);
        return this.shortTermCapitalGainCurrency.copy();

    }

    addMonthlyLongTermCapitalGains(amount) {

        logger.log(this.displayName + ' add longTermCapitalGains: ' + amount.toString());
        this.longTermCapitalGainCurrency.add(amount);
        return this.longTermCapitalGainCurrency.copy();

    }

    addMonthlySocialSecurity(amount) {

        logger.log(this.displayName + ' add socialSecurity: ' + amount.toString());
        this.socialSecurityCurrency.add(amount);
        return this.socialSecurityCurrency.copy();

    }

    addMonthlyMedicare(amount) {

        logger.log(this.displayName + ' add medicare: ' + amount.toString());
        this.medicareCurrency.add(amount);  
        return this.medicareCurrency.copy;

    }

    addMonthlyIncomeTax(amount) {

        logger.log(this.displayName + ' add incomeTax: ' + amount.toString());
        this.incomeTaxCurrency.add(amount);
        return this.incomeTaxCurrency.copy();

    }

    addMonthlyMortgagePayment(amount) {
            
        logger.log(this.displayName + ' add mortgagePayment: ' + amount.toString());
        this.mortgagePaymentCurrency.add(amount);
        return this.mortgagePaymentCurrency.copy();

    }

    addMonthlyMortgageInterest(amount) {
            
        logger.log(this.displayName + ' add mortgageInterest: ' + amount.toString());
        this.mortgageInterestCurrency.add(amount);
        return this.mortgageInterestCurrency.copy();

    }

    addMonthlyMortgagePrincipal(amount) {

        logger.log(this.displayName + ' add mortgagePrincipal: ' + amount.toString());
        this.mortgagePrincipalCurrency.add(amount);
        return this.mortgagePrincipalCurrency.copy();

    }

    addMonthlyMortgageEscrow(amount) {
                
        logger.log(this.displayName + ' add mortgageEscrow: ' + amount.toString());
        this.mortgageEscrowCurrency.add(amount);
        return this.mortgageEscrowCurrency.copy();

    }

    addMonthlyRMD(amount) {

        logger.log(this.displayName + ' add RMD: ' + amount.toString());
        this.rmdCurrency.add(amount);
        return this.rmdCurrency.copy();

    }

    addMonthlyEstimatedTax(amount) {

        logger.log(this.displayName + ' add estimatedTax: ' + amount.toString());
        this.estimatedTaxCurrency.add(amount);
        return this.estimatedTaxCurrency.copy();

    }

    addMonthlyAfterTax(amount) {

        logger.log(this.displayName + ' add afterTax: ' + amount.toString());
        this.afterTaxCurrency.add(amount);
        return this.afterTaxCurrency.copy();

    }

    addMonthlyIncome(amount) {
            
        logger.log(this.displayName + ' add income: ' + amount.toString());
        this.incomeCurrency.add(amount);
        return this.incomeCurrency.copy();

    }

    addMonthlyInterestIncome(amount) {

        logger.log(this.displayName + ' add interest income: ' + amount.toString());
        this.incomeCurrency.add(amount);
        this.interestIncomeCurrency.add(amount);
        return this.incomeCurrency.copy();

    }

    addMonthlyEarning(amount) {

        logger.log(this.displayName + ' add earning: ' + amount.toString());
        this.earningCurrency.add(amount);
        return this.earningCurrency.copy();

	}

	addMonthlyValue(amount) {

        logger.log(this.displayName + ' add value: ' + amount.toString());
        this.finishCurrency.add(amount);
        return this.finishCurrency.copy();

	}

    addIRAContribution(amount) {

        logger.log(this.displayName + ' add iraContribution: ' + amount.toString());
        this.iraContributionCurrency.add(amount);
        return this.iraContributionCurrency.copy();

    }

    addFour01KContribution(amount) {

        logger.log(this.displayName + ' add 401KContribution: ' + amount.toString());
        this.iraContributionCurrency.add(amount);
        return this.iraContributionCurrency.copy();

    }

    addIRADistribution(amount) {

        logger.log(this.displayName + ' add iraDistribution: ' + amount.toString());
        this.iraDistributionCurrency.add(amount);
        return this.iraDistributionCurrency.copy();

    }

    addFour01KDistribution(amount) {

        logger.log(this.displayName + ' add 401KDistribution: ' + amount.toString());
        this.four01KDistributionCurrency.add(amount);
        return this.four01KDistributionCurrency.copy();

    }

    deductWithholding(withholding) {
        
        logger.log(this.displayName + ' deduct withholding');
        this.afterTaxCurrency = this.earningCurrency.copy();
        
        this.addMonthlySocialSecurity(withholding.socialSecurity);
        this.addMonthlyMedicare(withholding.medicare);
        this.addMonthlyIncomeTax(withholding.income);
        this.afterTaxCurrency.add(withholding.total());

        return this.afterTaxCurrency.copy();

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
            logger.log('Model.applyMonthly: unsupported instrument ' + this.instrument);
            return null;
        }

    }

    applyMonthlyIncomeSalary() {
        
        if (!isMonthlyIncome(this.instrument)) {
            logger.log('Model.applyMonthlyIncome - model not income');
            return new Currency();
        }

        if (this.startCurrency.amount < 0) {
            this.startCurrency.amount *= -1;
            this.finishCurrency.amount *= -1;
        }

        logger.log('monthly income: ' + this.displayName + ' ' + this.finishCurrency.toString());
        this.earningCurrency = new Currency(this.finishCurrency.amount);
        this.incomeCurrency = new Currency(this.finishCurrency.amount);

        if (this.isSelfEmployed)
            return new IncomeResult(new Currency(this.incomeCurrency.amount), new Currency());
        else
            return new IncomeResult(new Currency(), new Currency(this.incomeCurrency.amount));      

    }

    applyMonthlyIncomeHoldings() {

        if (!isIncomeAccount(this.instrument)) {
            logger.log('Model.applyMonthlyIncome - model not income');
            return new Currency();
        }

        if (this.startCurrency.amount < 0) {
            this.startCurrency.amount *= -1;
            this.finishCurrency.amount *= -1;
        }        

        this.earningCurrency = new Currency(this.finishCurrency.amount * this.annualReturnRate.asMonthly());
        // interest income is taxed as ordinary income so report it
        this.incomeCurrency = this.earningCurrency.copy();
        this.finishCurrency.add(this.earningCurrency); 

        logger.log('monthly interest income: ' + this.displayName + ' ' + this.earningCurrency.toString());               
        
        return new InterestResult(this.incomeCurrency.copy());
        
    }

    applyMonthlyExpense() {
        
        if (!isMonthlyExpense(this.instrument)) {
            logger.log('Model.applyMonth_expense - model not an expense');
            return new Currency();
        }

        if (this.startCurrency.amount > 0) {
            this.startCurrency.amount *= -1;
            this.finishCurrency.amount *= -1;
        }

        this.earningCurrency = new Currency(this.finishCurrency.amount);        
        this.finishCurrency.multiply(1+this.annualReturnRate.asMonthly());

        logger.log('monthly expense: ' + this.displayName + ' inflation ' + this.finishCurrency.toString());

        return new ExpenseResult(this.earningCurrency.copy(), this.finishCurrency.copy);
        
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
        this.earningCurrency = monthlyMortgagePrincipal.copy();
        this.earningCurrency.flipSign();                
        logger.log('mortgage payment: ' + this.displayName + ' ' + c.toString() + ', interest payment: ' + monthlyMortgageInterest.toString() + ' principal payment: ' + monthlyMortgagePrincipal.toString());

        this.finishCurrency.subtract(monthlyMortgagePrincipal);
        return new MortgageResult(monthlyMortgagePrincipal, monthlyMortgageInterest, new Currency());
        
    }

    applyMonthlyCapital() {

        if (!isCapital(this.instrument)) {
            logger.log('Model.applyMonthlyCapital - model not capital');
            return;
        }

        if (this.onFinishDate) {

            this.earningCurrency = new Currency(this.finishCurrency.amount - this.basisCurrency.amount);
            this.incomeCurrency = this.earningCurrency.copy();
            this.afterTaxCurrency = new Currency();
            logger.log('close capital account: ' + this.displayName + ' finishAmount: ' + this.finishCurrency.toString() + " total capitalGains: " + this.earningCurrency.toString());

        }
        else {

            // don't report the capital gains here. the portfokio will handle sale of equity
            this.earningCurrency = new Currency(this.finishCurrency.amount * this.annualReturnRate.asMonthly());
            this.afterTaxCurrency = new Currency(this.earningCurrency.amount);
            this.finishCurrency.add(this.earningCurrency);
            logger.log('monthly capital appreciation: ' + this.displayName + ' ' + this.earningCurrency.toString());

        }

        // principal, earnings
        return new AssetAppreciationResult(this.finishCurrency.copy(), this.earningCurrency.copy());

    }

    applyExpense(expense) {        

        if (expense.amount > 0.0) {

        }
        else if (expense.amount < 0.0) {

        }

        return expense;

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

    close() {

        if (this.finishCurrency.amount != 0) {
            logger.log('Model.close: ' + this.displayName + ' finishCurrency: ' + this.finishCurrency.toString());
        }
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
            logger.log('model.isFinishDateInt passed null test');
            return false;
        }

        return this.finishDateInt.year == aDateInt.year && this.finishDateInt.month == aDateInt.month;
    }

    monthlyAssetDataToDisplayAssetData(monthsSpan) {

        this.displayAssetData = [];
        for (let ii = monthsSpan.offsetMonths; ii < this.monthlyValues.length; ii += monthsSpan.combineMonths) {
            this.displayAssetData.push(this.monthlyValues[ii]);
        }

    }

    monthlyEarningDataToDisplayEarningData(monthsSpan) {

        this.displayEarningData = [];
        for (let ii = monthsSpan.offsetMonths; ii < this.monthlyEarnings.length; ii += monthsSpan.combineMonths) {
            let total = 0.0;
            for (let jj = 0; jj < monthsSpan.combineMonths && ii+jj < this.monthlyEarnings.length; jj++) {
                total += this.monthlyEarnings[ii+jj];
            }
            this.displayEarningData.push(total);
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

    mostRecentMonthlyEarning() {
        if (this.monthlyEarning && this.monthlyEarning.length > 0) {
            let spot = this.monthlyEarning.length -1;
            return Currency.parse(this.monthlyEarning[spot]);
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

