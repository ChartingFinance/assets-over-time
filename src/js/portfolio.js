class FinancialPackage {
    constructor() {

        this.employedIncome = new Currency();
        this.selfIncome = new Currency();
        this.socialSecurity = new Currency();        
        this.assetAppreciation = new Currency();
        this.expense = new Currency();
        this.fica = new Currency();
        this.incomeTax = new Currency();
        this.estimatedTaxes = new Currency();
        this.iraContribution = new Currency();
        this.four01KContribution = new Currency();
        this.rothContribution = new Currency();
        this.iraDistribution = new Currency();
        this.four01KDistribution = new Currency();
        this.rothDistribution = new Currency();
        this.mortgageInterest = new Currency();
        this.mortgagePrincipal = new Currency();
        this.mortgageEscrow = new Currency();
        this.propertyTaxes = new Currency();
        this.shortTermCapitalGains = new Currency();
        this.longTermCapitalGains = new Currency();
        this.nonQualifiedDividends = new Currency();
        this.qualifiedDividends = new Currency();
        this.interestIncome = new Currency();
        this.longTermCapitalGainsTax = new Currency();

    }

    add(financialPackage) {

        this.employedIncome.add(financialPackage.employedIncome);
        this.selfIncome.add(financialPackage.selfIncome);
        this.socialSecurity.add(financialPackage.socialSecurity);
        this.assetAppreciation.add(financialPackage.assetAppreciation);
        this.expense.add(financialPackage.expense);
        this.fica.add(financialPackage.fica);
        this.incomeTax.add(financialPackage.incomeTax);
        this.estimatedTaxes.add(financialPackage.estimatedTaxes);
        this.iraContribution.add(financialPackage.iraContribution);
        this.four01KContribution.add(financialPackage.four01KContribution);
        this.rothContribution.add(financialPackage.rothContribution);
        this.iraDistribution.add(financialPackage.iraDistribution);
        this.four01KDistribution.add(financialPackage.four01KDistribution);
        this.rothDistribution.add(financialPackage.rothDistribution);
        this.mortgageInterest.add(financialPackage.mortgageInterest);
        this.mortgagePrincipal.add(financialPackage.mortgagePrincipal);
        this.mortgageEscrow.add(financialPackage.mortgageEscrow);
        this.propertyTaxes.add(financialPackage.propertyTaxes);
        this.shortTermCapitalGains.add(financialPackage.shortTermCapitalGains);
        this.longTermCapitalGains.add(financialPackage.longTermCapitalGains);
        this.nonQualifiedDividends.add(financialPackage.nonQualifiedDividends);
        this.qualifiedDividends.add(financialPackage.qualifiedDividends);
        this.interestIncome.add(financialPackage.interestIncome);
        this.longTermCapitalGainsTax.add(financialPackage.longTermCapitalGainsTax);
        return this;

    }

    subtract(financialPackage) {

        this.employedIncome.subtract(financialPackage.employedIncome);
        this.selfIncome.subtract(financialPackage.selfIncome);
        this.socialSecurity.subtract(financialPackage.socialSecurity);
        this.assetAppreciation.subtract(financialPackage.assetAppreciation);
        this.expense.subtract(financialPackage.expense);
        this.fica.subtract(financialPackage.fica);
        this.incomeTax.subtract(financialPackage.incomeTax);
        this.estimatedTaxes.subtract(financialPackage.estimatedTaxes);
        this.iraContribution.subtract(financialPackage.iraContribution);
        this.four01KContribution.subtract(financialPackage.four01KContribution);
        this.rothContribution.subtract(financialPackage.rothContribution);
        this.iraDistribution.subtract(financialPackage.iraDistribution);
        this.four01KDistribution.subtract(financialPackage.four01KDistribution);
        this.rothDistribution.subtract(financialPackage.rothDistribution);
        this.mortgageInterest.subtract(financialPackage.mortgageInterest);
        this.mortgagePrincipal.subtract(financialPackage.mortgagePrincipal);
        this.mortgageEscrow.subtract(financialPackage.mortgageEscrow);
        this.propertyTaxes.subtract(financialPackage.propertyTaxes);
        this.shortTermCapitalGains.subtract(financialPackage.shortTermCapitalGains);
        this.longTermCapitalGains.subtract(financialPackage.longTermCapitalGains);
        this.nonQualifiedDividends.subtract(financialPackage.nonQualifiedDividends);
        this.qualifiedDividends.subtract(financialPackage.qualifiedDividends);
        this.interestIncome.subtract(financialPackage.interestIncome);
        this.longTermCapitalGainsTax.subtract(financialPackage.longTermCapitalGainsTax);
        return this;

    }

    multiply(amount) {

        this.employedIncome.multiply(amount);
        this.selfIncome.multiply(amount);
        this.socialSecurity.multiply(amount);
        this.assetAppreciation.multiply(amount);
        this.interestIncome.multiply(amount);
        this.expense.multiply(amount);        
        this.estimatedTaxes.multiply(amount);
        this.iraContribution.multiply(amount);
        this.four01KContribution.multiply(amount);
        this.rothContribution.multiply(amount);
        this.iraDistribution.multiply(amount);
        this.four01KDistribution.multiply(amount);
        this.rothDistribution.multiply(amount);
        this.mortgageInterest.multiply(amount);
        this.mortgagePrincipal.multiply(amount);
        this.mortgageEscrow.multiply(amount);
        this.propertyTaxes.multiply(amount);
        this.shortTermCapitalGains.multiply(amount);
        this.longTermCapitalGains.multiply(amount);
        this.nonQualifiedDividends.multiply(amount);
        this.qualifiedDividends.multiply(amount);
        this.fica.multiply(amount);
        this.incomeTax.multiply(amount);
        this.longTermCapitalGainsTax.multiply(amount);
        return this;

    }

    limitDeductions(activeUser) {

        let maxIRADeduction = activeTaxTable.iraContributionLimit(activeUser);
        if (this.iraContribution.amount > maxIRADeduction.amount)
            this.iraContribution.amount = maxIRADeduction.amount;
        
        let max401KDeduction = activeTaxTable.four01KContributionLimit(activeUser);
        if (this.four01KContribution.amount > max401KDeduction)
            this.four01KContribution.amount = max401KDeduction.amount;

        if (this.propertyTaxes.amount > global_propertyTaxDeductionMax)
            this.propertyTaxes.amount = global_propertyTaxDeductionMax;

    }

    totalIncome() {

        let income = this.wageIncome().copy();
        income.add(this.ordinaryIncome());
        income.add(this.nontaxableIncome());
        income.add(this.longTermCapitalGains);
        return income;

    }

    wageIncome() {

        let income = this.employedIncome.copy();
        income.add(this.selfIncome);
        return income;
    }

    ordinaryIncome() {

        let income = this.socialSecurity.copy().multiply(0.85); // maximum allowed for social security
        income.add(this.interestIncome);
        income.add(this.shortTermCapitalGains);
        income.add(this.iraDistribution);
        income.add(this.four01KDontribution);
        income.add(this.nonQualifiedDividends);
        return income;

    }

    nontaxableIncome() {

        let income = this.rothDistribution.copy();
        income.add(this.qualifiedDividends);
        return income;

    }

    deductiblePropertyTaxes() {

        let ptDeduction = this.propertyTaxes.copy().flipSign();
        if (ptDeduction.amount > global_propertyTaxDeductionMax)
            ptDeduction.amount = global_propertyTaxDeductionMax;
        return ptDeduction.flipSign();
    
    }

    nonDeductiblePropertyTaxes() {

        return this.propertyTaxes.copy().subtract(this.deductiblePropertyTaxes());

    }

    deductions() {

        let d = this.iraContribution.copy().flipSign();
        d.subtract(this.four01KContribution);
        d.add(this.mortgageInterest);
        d.add(this.deductiblePropertyTaxes());
        return d;

    }

    totalTaxes() {

        let taxes = this.incomeTax.copy();
        taxes.add(this.fica);
        taxes.add(this.longTermCapitalGainsTax);
        taxes.add(this.propertyTaxes);
        taxes.add(this.estimatedTaxes);
        return taxes;

    }

    afterTaxIncome() {

        let income = this.totalIncome();
        let taxes = this.totalTaxes();
        return income.add(taxes);
    }

    effectiveTaxRate() {

        let income = this.totalIncome();
        let taxes = this.totalTaxes().flipSign();
        let ratio = taxes.amount / income.amount;
        return ratio;        

    }

    copy() {

        let aCopy = new FinancialPackage();
        aCopy.add(this);
        return aCopy;

    }

    zero() {

        this.employedIncome.zero();
        this.selfIncome.zero();
        this.socialSecurity.zero();
        this.iraDistribution.zero();
        this.assetAppreciation.zero();
        this.expense.zero();
        this.fica.zero();
        this.incomeTax.zero();
        this.estimatedTaxes.zero();
        this.iraContribution.zero();
        this.four01KContribution.zero();
        this.rothContribution.zero();
        this.iraDistribution.zero();
        this.four01KDistribution.zero();
        this.rothDistribution.zero();
        this.mortgageInterest.zero();
        this.mortgagePrincipal.zero();
        this.mortgageEscrow.zero();
        this.propertyTaxes.zero();
        this.shortTermCapitalGains.zero();
        this.longTermCapitalGains.zero();
        this.nonQualifiedDividends.zero();
        this.qualifiedDividends.zero();
        this.interestIncome.zero();
        this.longTermCapitalGainsTax.zero();
        return this;

    }

    report() {

        logger.log('income:                      ' + this.totalIncome().toString());
        logger.log('  employedIncome:            ' + this.employedIncome.toString());
        logger.log('  selfIncome:                ' + this.selfIncome.toString());
        logger.log('  ordinaryIncome:            ' + this.ordinaryIncome().toString());
        logger.log('    socialSecurity (taxed):  ' + this.socialSecurity.toString());
        logger.log('    iraDistribution:         ' + this.iraDistribution.toString());
        logger.log('    401KDistribution:        ' + this.four01KDistribution.toString());                       
        logger.log('    shortTermCapitalGains:   ' + this.shortTermCapitalGains.toString());
        logger.log('    interestIncome:          ' + this.interestIncome.toString());
        logger.log('    nonQualifiedDividends:   ' + this.nonQualifiedDividends.toString());        
        logger.log('  longTermCapitalGains:      ' + this.longTermCapitalGains.toString());        
        logger.log('  nonTaxableIncome:          ' + this.nontaxableIncome().toString());
        logger.log('    qualifiedDividends       ' + this.qualifiedDividends.toString());
        logger.log('    rothDistribution:        ' + this.rothDistribution.toString());
        logger.log('deductions:                  ' + this.deductions().toString());
        logger.log('  iraContribution:           ' + this.iraContribution.toString());
        logger.log('  401KContribution:          ' + this.four01KContribution.toString());
        logger.log('  mortgageInterest:          ' + this.mortgageInterest.toString());
        logger.log('  propertyTaxes:             ' + this.deductiblePropertyTaxes().toString());
        logger.log('taxes:                       ' + this.totalTaxes().toString());
        logger.log('  fica:                      ' + this.fica.toString());
        logger.log('  incomeTax:                 ' + this.incomeTax.toString());
        logger.log('  longTermCapitalGainsTax:   ' + this.longTermCapitalGainsTax.toString());
        logger.log('  propertyTaxes:             ' + this.propertyTaxes.toString());
        logger.log('  estimatedTaxes:            ' + this.estimatedTaxes.toString());
        logger.log('rothContribution:            ' + this.rothContribution.toString());
        logger.log('assetAppreciation:           ' + this.assetAppreciation.toString());
        logger.log('mortgagePrincipal:           ' + this.mortgagePrincipal.toString());        
        logger.log('afterTaxIncome:              ' + this.afterTaxIncome().toString());
        logger.log('effectTaxRate:               ' + this.effectiveTaxRate().toFixed(2));
        logger.log('expenses:                    ' + this.expense.toString());      
    }

    reportHTML(currentDateInt) {

        let html = '<div>';
        html += ('<h3>' + currentDateInt.toString() + '</h3>');
        html += "<ul>";
        html += '<li>income:                      ' + this.totalIncome().toString() + '<ul>';
        html += '  <li>employedIncome:            ' + this.employedIncome.toString() + '</li>';
        html += '  <li>selfIncome:                ' + this.selfIncome.toString() + '</li>';
        html += '  <li>ordinaryIncome:            ' + this.ordinaryIncome().toString() + '<ul>';
        html += '    <li>socialSecurity:          ' + this.socialSecurity.toString() + '</li>';
        html += '    <li>iraDistribution:         ' + this.iraDistribution.toString() + '</li>';
        html += '    <li>401KDistribution:        ' + this.four01KDistribution.toString() + '</li>';                       
        html += '    <li>shortTermCapitalGains:   ' + this.shortTermCapitalGains.toString() + '</li>';
        html += '    <li>interestIncome:          ' + this.interestIncome.toString() + '</li>';
        html += '    <li>nonQualifiedDividends:   ' + this.nonQualifiedDividends.toString() + '</li></ul>';        
        html += '  <li>longTermCapitalGains:      ' + this.longTermCapitalGains.toString() + '</li>';        
        html += '  <li>nonTaxableIncome:          ' + this.nontaxableIncome().toString() + '<ul>';
        html += '    <li>qualifiedDividends       ' + this.qualifiedDividends.toString() + '</li>';
        html += '    <li>rothDistribution:        ' + this.rothDistribution.toString() + '</li></ul></ul>';
        html += '<li>deductions:                  ' + this.deductions().toString() + '<ul>';
        html += '  <li>iraContribution:           ' + this.iraContribution.toString() + '</li>';
        html += '  <li>401KContribution:          ' + this.four01KContribution.toString() + '</li>';
        html += '  <li>mortgageInterest:          ' + this.mortgageInterest.toString() + '</li>';
        html += '  <li>propertyTaxes:             ' + this.deductiblePropertyTaxes().toString() + '</li></ul>';
        html += '<li>taxes:                       ' + this.totalTaxes().toString() + '<ul>';
        html += '  <li>fica:                      ' + this.fica.toString() + '</li>';
        html += '  <li>incomeTax:                 ' + this.incomeTax.toString() + '</li>';
        html += '  <li>longTermCapitalGainsTax:   ' + this.longTermCapitalGainsTax.toString() + '</li>';
        html += '  <li>propertyTaxes:             ' + this.propertyTaxes.toString() + '</li>';
        html += '  <li>estimatedTaxes:            ' + this.estimatedTaxes.toString() + '</li></ul>';
        html += '<li>rothContribution:            ' + this.rothContribution.toString() + '</li>';
        html += '<li>assetAppreciation:           ' + this.assetAppreciation.toString() + '</li>';
        html += '<li>mortgagePrincipal:           ' + this.mortgagePrincipal.toString() + '</li>';        
        html += '<li>afterTaxIncome:              ' + this.afterTaxIncome().toString() + '</li>';
        html += '<li>effectiveTaxRate:            ' + this.effectiveTaxRate().toFixed(2) + '</li>';
        html += '<li>expenses:                    ' + this.expense.toString() + '</li>'; 
        html += '</ul>';
        html += '</div>';

        return html;

    }

    addResult(result) {
        if (result instanceof AssetAppreciationResult)
            this.addAssetAppreciationResult(result);
        else if (result instanceof CapitalGainsResult)
            this.addCapitalGainsResult(result);
        else if (result instanceof MortgageResult)
            this.addMortgageResult(result);
        else if (result instanceof IncomeResult)
            this.addIncomeResult(result);
        else if (result instanceof ExpenseResult)
            this.addExpenseResult(result);
        else if (result instanceof InterestResult)
            this.addInterestResult(result);
        else if (result instanceof WithholdingResult)
            this.addWithholdingResult(result);
    }

    addAssetAppreciationResult(assetAppreciationResult) {
        this.assetAppreciation.add(assetAppreciationResult.earnings);
    }

    addCapitalGainsResult(capitalGainsResult) {
        this.shortTermCapitalGains.add(capitalGainsResult.shortTerm);
        this.longTermCapitalGains.add(capitalGainsResult.longTerm);
    }

    addMortgageResult(mortgageResult) {
        this.mortgageInterest.add(mortgageResult.interest);
        this.mortgagePrincipal.add(mortgageResult.principal);
        this.mortgageEscrow.add(mortgageResult.escrow);
    }

    addIncomeResult(incomeResult) {
        this.selfIncome.add(incomeResult.selfIncome);
        this.employedIncome.add(incomeResult.employedIncome);
    }

    addExpenseResult(expenseResult) {
        this.expense.add(expenseResult.expense);
    }

    addInterestResult(interestResult) {
        this.interestIncome.add(interestResult.income);
    }

    addWithholdingResult(withholdingResult) { 
        this.fica.add(withholdingResult.fica());
        this.incomeTax.add(withholdingResult.income);        
    }
}

class Portfolio {
    constructor(modelAssets, reports) {
        this.modelAssets = this.sortModelAssets(modelAssets);
        if (reports)
            this.reports = reports;
        else
            this.reports = false;
        this.activeUser = new User(global_user_startAge);

        this.firstDateInt = util_firstDateInt(this.modelAssets);
        this.lastDateInt = util_lastDateInt(this.modelAssets);

        this.monthly = new FinancialPackage();
        this.yearly = new FinancialPackage();
        this.total = new FinancialPackage();

        this.monthlyIncomeTaxes = [];
        this.monthlyCapitalGainsTaxes = [];

        this.displayCapitalGainsTaxes = [];
    }

    sortModelAssets(modelAssets) {
        logger.log('Portfolio.sortModelAssets');
    
        modelAssets.sort(function (a, b) {
            if (a.sortIndex() < b.sortIndex())
                return -1;
            else if (b.sortIndex() < a.sortIndex())
                return 1;
            else
                return a.displayName.localeCompare(b.displayName);
        });
    
        return modelAssets;
    }

    copy() {

        let modelAssets = this.modelAssets.map(modelAsset => modelAsset.copy());
        let portfolio = new Portfolio(modelAssets);

        portfolio.monthly = this.monthly.copy();
        portfolio.yearly = this.yearly.copy();
        portfolio.total = this.total.copy();
        return portfolio;

    }

    zeroFundTransfersMoveValues() {

        for (let modelAsset of this.modelAssets) {
            modelAsset.zeroFundTransfersMoveValues();
        }

    }

    dnaFundTransfers() {

        let result = '';
        for (let modelAsset of this.modelAssets) {
            result += modelAsset.dnaFundTransfers();
        }
        return result;

    }

    initializeChron() {

        this.monthly = new FinancialPackage();
        this.yearly = new FinancialPackage();
        this.total = new FinancialPackage();

        this.monthlyIncomeTaxes = [];
        this.monthlyCapitalGainsTaxes = [];

        this.displayCapitalGainsTaxes = [];

        for (let modelAsset of this.modelAssets) {
            modelAsset.initializeChron();
        }
    }

    monthlyChron(currentDateInt) {

        this.reportMonthly(currentDateInt);

        this.monthlyIncomeTaxes.push(this.monthly.incomeTax.toCurrency());
        this.monthlyCapitalGainsTaxes.push(this.monthly.longTermCapitalGainsTax.toCurrency());

        this.yearly.add(this.monthly);
        this.total.add(this.monthly);
        this.monthly.zero();
        
        for (let modelAsset of this.modelAssets) {
            modelAsset.monthlyChron();
        }        
    }

    yearlyChron(currentDateInt) {

        this.reportYearly(currentDateInt);
        this.yearly.zero();
        this.activeUser.addYears(1);

    }

    finalizeChron() {
        for (let modelAsset of this.modelAssets) {
            modelAsset.finalizeChron();
        }
    }
    
    startValue() {

        let amount = new Currency(0.0);

        for (let modelAsset of this.modelAssets) {

            // just assets
            if (isAsset(modelAsset.instrument))
                amount.add(modelAsset.startCurrency);
        }

        return amount;

    }

    finishValue() {

        let amount = new Currency(0.0);

        for (let modelAsset of this.modelAssets) {

            // just assets
            if (isAsset(modelAsset.instrument))
                amount.add(modelAsset.finishCurrency);
        }

        return amount;

    }

    accumulatedValue() {
        
        let amount = new Currency(0.0);

        for (let modelAsset of this.modelAssets) {

            // just assets
            if (isAsset(modelAsset.instrument))
                amount.add(modelAsset.accumulatedCurrency);
        }

        return amount;

    }
    
    applyMonth(currentDateInt) {
        
        if (currentDateInt.day == 1) {

            this.applyFirstDayOfMonth(currentDateInt);
            return this.modelAssets.length; 

        }

        
        else if (currentDateInt.day == 15) {       

            /*
            // potentially pay taxes
            for (let modelAsset of this.modelAssets) {
                if (modelAsset.inMonth(currentDateInt))
                    this.totalTaxesPaid.add(modelAsset.applyMonthlyTaxPayments());
            }
            */

        }
        

        else if (currentDateInt.day == 30) {

            this.applyLastDayOfMonth(currentDateInt);            

        }

        return 0;

    }

    applyFirstDayOfMonth(currentDateInt) {
        
        // recognize priority calculations (income, mortgages, taxableEquity, taxDeferredEquity)
        for (let modelAsset of this.modelAssets) {
            if (modelAsset.inMonth(currentDateInt)) {
                
                this.applyFirstDayOfMonthCalculations(modelAsset);                  

            }
        }

        // calculate fixed taxes like fica and property taxes
        for (let modelAsset of this.modelAssets) {
            if (modelAsset.inMonth(currentDateInt)) {

                this.applyFirstDayOfMonthTaxes(modelAsset);                   
     
            }
        }
        
        // 401K or ira required minimum distribution
        for (let modelAsset of this.modelAssets) {
            if (modelAsset.inMonth(currentDateInt)) {

                this.calculateFirstDayOfMonthRMDs(currentDateInt, modelAsset);
        
            }
        }

        // apply credits/debits
        for (let modelAsset of this.modelAssets) {
            if (modelAsset.inMonth(currentDateInt)) {
                
                this.applyFirstDayOfMonthIncomeFundTransfers(modelAsset);                            
                 
            }
        }
    }

    applyFirstDayOfMonthCalculations(modelAsset) {
        
        // assert mortgage happens before income happens before taxDeferredEquity happens before taxableEquity
        if (isMonthlyIncome(modelAsset.instrument)) {

            modelAsset.applyMonthly();

            let taxableIncome = modelAsset.incomeCurrency.copy();
            if (isSocialSecurity(modelAsset.instrument)) {
                //taxableIncome.multiply(0.85); // maximum allowed for social security
                this.monthly.socialSecurity.add(taxableIncome);
            }
            else if (modelAsset.isSelfEmployed)
                this.monthly.selfIncome.add(taxableIncome);
            else
                this.monthly.employedIncome.add(taxableIncome);            

            modelAsset.addFour01KContribution(this.calculateFirstDayOfMonthIncomeFour01KContribution(modelAsset));
            modelAsset.addIRAContribution(this.calculateFirstDayOfMonthIncomeIRAContribution(modelAsset));            

        }
        else if (isMortgage(modelAsset.instrument)) {

            let result = modelAsset.applyMonthly();
            this.monthly.addResult(result);        

        }
        
    }

    applyFirstDayOfMonthTaxes(modelAsset) {

        // assert mortgage happens before income happens before taxDeferredEquity happens before taxableEquity
        if (isHome(modelAsset.instrument)) {
            // we do have property taxes
            let propertyTaxes = new Currency(modelAsset.finishCurrency.amount * (global_propertyTaxRate / 12.0));
            this.monthly.propertyTaxes.subtract(propertyTaxes);            
        }
        else if (isMonthlyIncome(modelAsset.instrument)) {
            if (!isSocialSecurity(modelAsset.instrument)) {                
                let withholding = activeTaxTable.calculateFICATax(modelAsset.isSelfEmployed, modelAsset.incomeCurrency.copy());
                activeTaxTable.addYearlySocialSecurity(withholding.socialSecurity);

                withholding.flipSigns();
                modelAsset.addMonthlyMedicare(withholding.medicare);
                modelAsset.addMonthlySocialSecurity(withholding.socialSecurity);                
                this.monthly.addWithholdingResult(withholding);
            }
        }

    }

    calculateFirstDayOfMonthRMDs(currentDateInt, modelAsset) {

        if (!isTaxDeferred(modelAsset.instrument))
            return;
    
        if (this.activeUser.rmdRequired()) {
            // if the user is 73 or older, then they must take RMDs
            let rmd = activeTaxTable.calculateMonthlyRMD(currentDateInt, this.activeUser, modelAsset);
            modelAsset.addMonthlyRMD(rmd);
        }

    }

    applyFirstDayOfMonthIncomeFundTransfers(modelAsset) {
        if (!isMonthlyIncome(modelAsset.instrument)) {
            return;
        }
    
        const modelAssetIncome = modelAsset.finishCurrency.copy();
        let runningIncomeAmount = new Currency(0.0);
    
        if (modelAsset.fundTransfers?.length > 0) {
            for (const fundTransfer of modelAsset.fundTransfers) {
                fundTransfer.bind(modelAsset, this.modelAssets);
                const incomeAmount = fundTransfer.calculate();
                fundTransfer.execute();
    
                this.handleFundTransferContribution(fundTransfer, incomeAmount);
                runningIncomeAmount.subtract(incomeAmount);
            }
        }
    
        const extraAmount = new Currency(modelAssetIncome.amount + runningIncomeAmount.amount);
        if (extraAmount.amount > 0) {
            this.creditToFirstExpensableAccount(extraAmount);
        }
    }
    
    handleFundTransferContribution(fundTransfer, incomeAmount) {
        const targetInstrument = fundTransfer.toModel.instrument;
    
        if (isTaxDeferred(targetInstrument)) {
            if (isIRA(targetInstrument)) {
                this.monthly.iraContribution.add(incomeAmount);
            } else if (is401K(targetInstrument)) {
                this.monthly.four01KContribution.add(incomeAmount);
            }
        } else if (isTaxFree(targetInstrument)) {
            this.monthly.rothContribution.add(incomeAmount);
        }
    }

    calculateFirstDayOfMonthIncomeIRAContribution(modelAsset) {

        if (!isMonthlyIncome(modelAsset.instrument)) {
            logger.log('Portfolio.calculateFirstDayOfMonthIncomeIRAContribution - not a monthly income model asset');
            return new Currency();
        }        
        
        let totalIRAContribution = new Currency(0.0);
        let totalIRAContributionLimit = activeTaxTable.iraContributionLimit(this.activeUser);
        for (let fundTransfer of modelAsset.fundTransfers) {
            delete fundTransfer.approvedAmount;
            fundTransfer.bind(modelAsset, this.modelAssets);
            if (isTaxDeferred(fundTransfer.toModel.instrument) && isIRA(fundTransfer.toModel.instrument)) {
                let iraContribution = fundTransfer.calculate();            
                if (this.yearly.iraContribution.amount + this.yearly.rothContribution.amount + iraContribution.amount > totalIRAContributionLimit.amount) {
                    iraContribution = new Currency(totalIRAContributionLimit.amount - this.yearly.iraContribution.amount);
                }
                fundTransfer.approvedAmount = iraContribution;
                totalIRAContribution.add(iraContribution);
            }
            else if (isRothIRA(fundTransfer.toModel.instrument)) {
                let rothContribution = fundTransfer.calculate();            
                if (this.yearly.iraContribution.amount + this.yearly.rothContribution.amount + rothContribution.amount > totalIRAContributionLimit.amount) {
                    rothContribution = new Currency(totalIRAContributionLimit.amount - this.yearly.rothContribution.amount);
                }
                fundTransfer.approvedAmount = rothContribution;
                totalIRAContribution.add(rothContribution);
            }
        }

        if (totalIRAContribution.amount == 0) {
            // todo: look for ira or rothIRA and contribute
        }

        return totalIRAContribution

    }

    calculateFirstDayOfMonthIncomeFour01KContribution(modelAsset) {

        if (!isMonthlyIncome(modelAsset.instrument)) {
            logger.log('Portfolio.calculateFirstDayOfMonthIncomeFour01KContribution - not a monthly income model asset');
            return new Currency();
        }        
        
        let totalFour01KContribution = new Currency(0.0);
        let totalFour01KContributionLimit = activeTaxTable.four01KContributionLimit(this.activeUser);
        for (let fundTransfer of modelAsset.fundTransfers) {
            delete fundTransfer.approvedAmount;
            fundTransfer.bind(modelAsset, this.modelAssets);
            if (isTaxDeferred(fundTransfer.toModel.instrument) && is401K(fundTransfer.toModel.instrument)) {
                let four01KContribution = fundTransfer.calculate();            
                if (this.yearly.four01KContribution.amount + four01KContribution.amount > totalFour01KContributionLimit.amount) {
                    four01KContribution = new Currency(contributionLimit.amount - this.yearly.iraContribution.amount);
                }
                fundTransfer.approvedAmount = four01KContribution;
                totalFour01KContribution.add(four01KContribution);
            }        
        }

        if (totalFour01KContribution.amount == 0) {
            // todo: look for 401K and contribute
        }

        return totalFour01KContribution

    }

    applyLastDayOfMonth(currentDateInt) {

        // apply expenses
        for (let modelAsset of this.modelAssets) {
            if (modelAsset.inMonth(currentDateInt)) {

                this.applyLastDayOfMonthExpenseFundTransfers(modelAsset);
            }
        }

        // ensure RMDs are handled
        for (let modelAsset of this.modelAssets) {
            if (modelAsset.inMonth(currentDateInt)) {

                this.ensureRMDDistributions(modelAsset);

            }
        }

        // recognize asset gains
        // Doing this after applying expenses is pessimistic
        // Maybe an optimistic option to do this prior to expenses?
        for (let modelAsset of this.modelAssets) {
            if (modelAsset.inMonth(currentDateInt)) {        
                
                this.applyLastDayOfMonthCalculations(modelAsset);
                
            }
        }

        this.applyMonthlyTaxes();

        // sale of assets and proceeds transferred to taxable account
        for (let modelAsset of this.modelAssets) {
            if (modelAsset.finishDateInt.year == currentDateInt.year && modelAsset.finishDateInt.month == currentDateInt.month && currentDateInt.toInt() < this.lastDateInt.toInt()) {
                
                this.closeAsset(modelAsset);
            
            }
        }

    }

    applyLastDayOfMonthCalculations(modelAsset) {

        if (isCapital(modelAsset.instrument) || isIncomeAccount(modelAsset.instrument) || isMonthlyExpense(modelAsset.instrument)) {
            let result = modelAsset.applyMonthly();
            this.monthly.addResult(result);
        }

    }

    applyLastDayOfMonthExpenseFundTransfers(modelAsset) {
        if (!isMonthlyExpense(modelAsset.instrument)) {
            return;
        }
    
        const modelAssetExpense = modelAsset.finishCurrency.copy();
        let runningExpenseAmount = new Currency(0.0);
    
        if (modelAsset.fundTransfers?.length > 0) {
            for (const fundTransfer of modelAsset.fundTransfers) {
                fundTransfer.bind(modelAsset, this.modelAssets);
                const expenseAmount = fundTransfer.calculate();
                const fundTransferResult = fundTransfer.execute();
    
                this.handleFundTransferExpense(fundTransfer, fundTransferResult, modelAsset.displayName);
                runningExpenseAmount.add(expenseAmount);
            }
    
            const extraAmount = new Currency(runningExpenseAmount.amount - modelAssetExpense.amount);
            if (extraAmount.amount > 0) {
                logger.log(`Portfolio.applyFundTransfersForExpense: ${modelAsset.displayName} expensing ${extraAmount.toString()} from first taxable account`);
                const assetChange = this.debitFromFirstTaxableAccount(extraAmount);
                this.applyCapitalGainsToFirstExpensableAccount(assetChange);
            }
        } else {
            logger.log(`Portfolio.applyFundTransfersForExpense: ${modelAsset.displayName} expensing ${modelAssetExpense.toString()} from first taxable account`);
            const assetChange = this.debitFromFirstTaxableAccount(modelAssetExpense.flipSign());
            this.applyCapitalGainsToFirstExpensableAccount(assetChange);
        }
    }
    
    handleFundTransferExpense(fundTransfer, fundTransferResult, modelAssetName) {
        const targetInstrument = fundTransfer.toModel.instrument;
    
        if (isTaxableAccount(targetInstrument)) {
            if (fundTransferResult.toAssetChange.amount !== 0) {
                logger.log(`Portfolio.applyFundTransfersForExpense: ${modelAssetName} expensing ${fundTransfer.toModel.displayName} generated longTermCapitalGains of ${fundTransferResult.toAssetChange.toString()}`);
                this.monthly.longTermCapitalGains.add(fundTransferResult.toAssetChange);
            }
        } else if (isTaxDeferred(targetInstrument)) {
            if (fundTransferResult.toAssetChange.amount !== 0) {
                logger.log(`Portfolio.applyFundTransfersForExpense: ${modelAssetName} expensing ${fundTransfer.toModel.displayName} generated ordinaryIncome of ${fundTransferResult.toAssetChange.toString()}`);
                if (isIRA(targetInstrument)) {
                    this.monthly.iraDistribution.add(fundTransferResult.toAssetChange);
                } else if (is401K(targetInstrument)) {
                    this.monthly.four01KDistribution.add(fundTransferResult.toAssetChange);
                } else {
                    logger.log(`Portfolio.applyLastDayOfMonthExpenseFundTransfers: unhandled isTaxDeferred ${fundTransfer.toDisplayName}`);
                }
            }
        } else if (isTaxFree(targetInstrument)) {
            logger.log(`Portfolio.applyFundTransfersForExpense: ${modelAssetName} expensing ${fundTransfer.toModel.displayName} generated no tax impact`);
            this.monthly.rothDistribution.add(fundTransferResult.toAssetChange);
        }
    }

    ensureRMDDistributions(modelAsset) {

        if (!isTaxDeferred(modelAsset.instrument))
            return;

        let rmd = modelAsset.rmdCurrency.copy();
        let distributions = new Currency();

        if (this.activeUser.rmdRequired()) {
            
            if (isIRA(modelAsset.instrument))
                distributions = modelAsset.iraDistributionCurrency.copy();
            else if (is401K(modelAsset.instrument))
                distributions = modelAsset.four01KDistributionCurrency.copy();            
            else
                logger.log('Portfolio.ensureRMDDistributions: should not be here!');

        }

        if (rmd.amount > distributions.amount) {

            let remains = new Currency(rmd.amount - distributions.amount);

            if (isIRA(modelAsset.instrument))
                modelAsset.addIRADistribution(remains);
            else
                modelAsset.addFour01KDistribution(remains);

            modelAsset.debit(remains);
            this.creditToFirstExpensableAccount(remains);

        }

    }

    closeAsset(modelAsset) {

        modelAsset.onFinishDate = true;
        if (!isCapital(modelAsset.instrument)) {

            if (isMortgage(modelAsset.instrument)) {
                this.applyAssetCloseFundTransfers(modelAsset);    
                modelAsset.close();
            }

            return;
        }            
    
        const amountToTransfer = new Currency(modelAsset.finishCurrency.amount);
        logger.log('close capital asset: ' + modelAsset.displayName + ' valued at ' + amountToTransfer.toString());    

        const capitalGains = new Currency(modelAsset.finishCurrency.amount - modelAsset.basisCurrency.amount);
        logger.log('close capital asset: ' + modelAsset.displayName + ' capital gains of ' + capitalGains.toString());

        // we need to do the calculations for this transaction since the monthly taxation routine multiplies by 12
        let amountToTax = new Currency();

        if (!isTaxFree(modelAsset.instrument)) {
            const monthsSpan = MonthsSpan.build(modelAsset.startDateInt, modelAsset.finishDateInt);
            const isLongTerm = monthsSpan.totalMonths > 12;
        
            if (isLongTerm) {

                if (monthsSpan.totalMonths > 24 && isHome(modelAsset.instrument)) {
                    capitalGains.amount -= global_home_sale_capital_gains_discount;
                    if (capitalGains.amount < 0) {
                        capitalGains.zero();
                    }
                }

                let income = this.monthly.totalIncome().copy().multiply(12);
                this.monthly.longTermCapitalGains.add(capitalGains);                
                amountToTax.add(activeTaxTable.calculateYearlyLongTermCapitalGainsTax(income, capitalGains));
                this.monthly.longTermCapitalGainsTax.add(amountToTax.flipSign());    

            } else {

                this.monthly.shortTermCapitalGains.add(capitalGains);
                amountToTax.add(activeTaxTable.calculateYearlyIncomeTax(capitalGains));
                this.monthly.incomeTax.add(amountToTax.flipSign());

            }
        }
        
        logger.log('Portfolio.closeAsset: ' + modelAsset.displayName + ' generated tax of ' + amountToTax.toString() + ' to deduct from closure');
        modelAsset.finishCurrency.add(amountToTax);        
   
        this.applyAssetCloseFundTransfers(modelAsset);    
        modelAsset.close();

    }

    applyAssetCloseFundTransfers(modelAsset) {

        if (!isCapital(modelAsset.instrument) && !isMortgage(modelAsset.instrument)) {
            return;                     
        }

        let modelAssetValue = modelAsset.finishCurrency.copy();

        if (modelAsset.fundTransfers && modelAsset.fundTransfers.length > 0) {
        
            let runningTransferAmount = new Currency(0.0);        
            for (let fundTransfer of modelAsset.fundTransfers) {
                fundTransfer.bind(modelAsset, this.modelAssets);

                // can only send money to an expensable account
                if (!isExpensableAsset(fundTransfer.toModel.instrument)) {
                    logger.log('Portfolio.applyAssetCloseFundTransfers: cannot transfer to ' + fundTransfer.toModel.displayName + ' because not an expensable account');
                    continue;
                }

                let transferAmount = fundTransfer.calculate();
                fundTransfer.execute(); // goes to fundTransfer.toModel.creditCurrency
                //logger.log('Portfolio.applyAssetCloseFundTransfers: ' + modelAsset.displayName + ' transferred ' + transferAmount.toString() + ' to ' + fundTransfer.toModel.displayName);
                
                runningTransferAmount.add(transferAmount);
            }
            
            let extraAmount = new Currency(modelAssetValue.amount - runningTransferAmount.amount);
            if (extraAmount.amount > 0) {
                logger.log('Portfolio.applyAssetCloseFundTransfers: ' + modelAsset.displayName + ' funding ' + extraAmount.toString() + ' to first expensable account');                
                this.creditToFirstExpensableAccount(extraAmount);
            }

        }
        else {
            
            logger.log('Portfolio.applyAssetCloseFundTransfers: ' + modelAsset.displayName + ' funding ' + modelAssetValue.toString() + ' to first expensable account');
            this.creditToFirstExpensableAccount(modelAssetValue);            
                        
        }

    }

    applyMonthlyTaxes() {

        let yearly = this.monthly.copy().multiply(12.0);
        yearly.limitDeductions(this.activeUser);
        let yearlyIncome = activeTaxTable.calculateYearlyTaxableIncome(yearly);

        let incomeTax = activeTaxTable.calculateYearlyIncomeTax(yearlyIncome);
        let longTermCapitalGainsTax = activeTaxTable.calculateYearlyLongTermCapitalGainsTax(yearlyIncome, yearly.longTermCapitalGains);
        
        incomeTax.divide(12.0).flipSign();
        longTermCapitalGainsTax.divide(12.0).flipSign();

        this.monthly.incomeTax.add(incomeTax);
        this.monthly.longTermCapitalGainsTax.add(longTermCapitalGainsTax);

        logger.log('monthlyTaxes.fica: ' + this.monthly.fica.toString());
        this.creditToFirstExpensableAccount(this.monthly.fica);

        logger.log('monthlyTaxes.incomeTax: ' + this.monthly.incomeTax.toString());
        this.creditToFirstExpensableAccount(this.monthly.incomeTax);

        logger.log('monthlyTaxes.longTermCapitalGains: ' + this.monthly.longTermCapitalGainsTax.toString());
        this.creditToFirstExpensableAccount(longTermCapitalGainsTax);                                  
        
    }

    applyCapitalGainsToFirstExpensableAccount(amount) {

        // todo: mix short term and long term capital gains
        for (let modelAsset of this.modelAssets) {
            if (isExpensableAsset(modelAsset.instrument)) {                
                this.monthly.longTermCapitalGains.add(amount);
                break;
            }
        }

    }

    creditToFirstExpensableAccount(amount) {

        for (let modelAsset of this.modelAssets) {
            if (isExpensableAsset(modelAsset.instrument)) {
                return modelAsset.credit(amount);
            }
        }
        return new FundTransferResult();
    
    }

    debitFromFirstExpensableAccount(amount) {

        for (let modelAsset of this.modelAssets) {
            if (isExpensableAsset(modelAsset.instrument)) {
                return modelAsset.debit(amount);
            }
        }
        return new FundTransferResult();

    }

    debitFromFirstTaxableAccount(amount) {

        for (let modelAsset of this.modelAssets) {
            if (isTaxableAccount(modelAsset.instrument)) {
                return modelAsset.debit(amount);
            }
        }
        return new FundTransferResult();

    }

    applyYear(currentDateInt) {

        for (let modelAsset of this.modelAssets) {
            if (modelAsset.inMonth(currentDateInt)) {
                if (isMonthlyIncome(modelAsset.instrument))
                    modelAsset.applyYearly();
            }
        }

    }

    portfolioMonthlyDataArrayToDisplayData(monthsSpan, monthlyArrayName, displayArrayName) {

        this[displayArrayName] = [];
        for (let ii = monthsSpan.offsetMonths; ii < this[monthlyArrayName].length; ii += monthsSpan.combineMonths) {
            let total = 0.0;
            for (let jj = 0; jj < monthsSpan.combineMonths && ii+jj < this[monthlyArrayName].length; jj++) {
                total += this[monthlyArrayName][ii+jj];
            }
            this[displayArrayName].push(total);
        }

    }

    modelMonthlyDataArrayToDisplayData(monthsSpan, monthlyArrayName, displayArrayName) {
        
        this[displayArrayName] = null;
        for (let modelAsset of this.modelAssets) {

            modelAsset.monthlyDataArrayToDisplayData(monthsSpan, monthlyArrayName, displayArrayName);
            
            if (this[displayArrayName] == null)
                this[displayArrayName] = modelAsset[displayArrayName];
            else {
                for (let ii = 0; ii < this[displayArrayName].length; ++ii)
                    this[displayArrayName] [ii] += modelAsset[displayArrayName] [ii];
            
            }            
        }    

    }

    buildChartingDisplayData() {
        // asset and earning data will be handled by charting
        // portfolio will coelsece cashflow data

        let monthsSpan = MonthsSpan.build(this.firstDateInt, this.lastDateInt);

        this.portfolioMonthlyDataArrayToDisplayData(monthsSpan, 'monthlyIncomeTaxes', 'displayIncomeTaxes');
        this.portfolioMonthlyDataArrayToDisplayData(monthsSpan, 'monthlyCapitalGainsTaxes', 'displayCapitalGainsTaxes');


        for (let modelAsset of this.modelAssets) {
            modelAsset.monthlyAssetDataToDisplayAssetData(monthsSpan);
            modelAsset.monthlyEarningDataToDisplayEarningData(monthsSpan);
        }  

        this.modelMonthlyDataArrayToDisplayData(monthsSpan, 'monthlyEarnings', 'displayEarning');
        this.modelMonthlyDataArrayToDisplayData(monthsSpan, 'monthlyValues', 'displayValue');
        this.modelMonthlyDataArrayToDisplayData(monthsSpan, 'monthlyAccumulateds', 'displayAccumulated');
        this.modelMonthlyDataArrayToDisplayData(monthsSpan, 'monthlyRMDs', 'displayRMDs');
        this.modelMonthlyDataArrayToDisplayData(monthsSpan, 'monthlyFICAs', 'displayFICAs');
        this.modelMonthlyDataArrayToDisplayData(monthsSpan, 'monthlySocialSecurities', 'displaySocialSecurity');
        this.modelMonthlyDataArrayToDisplayData(monthsSpan, 'monthlyMedicares', 'displayMedicare');
        //this.monthlyDataArrayToDisplayData(monthsSpan, 'monthlyIncomeTaxes', 'displayIncomeTaxes');
        this.modelMonthlyDataArrayToDisplayData(monthsSpan, 'monthlyEstimatedTaxes', 'displayEstimatedTax');

        this.assertions();

    }

    reportMonthly(currentDateInt) {

        if (this.reports) {
            
            logger.log(' -------  Begin Monthly (' + currentDateInt.toString() + ' ) Report -------');
            this.monthly.report();
            logger.log(' -------   End Monthly (' + currentDateInt.toString() + ' ) Report  -------');

        }

    }

    reportYearly(currentDateInt) {

        if (this.reports) {
            
            logger.log(' -------  Begin Yearly (' + currentDateInt.toString() + ' ) Report -------');
            this.yearly.report();
            logger.log(' -------   End Yearly  (' + currentDateInt.toString() + ' ) Report  -------');

            reportsElement.innerHTML += this.yearly.reportHTML(currentDateInt);

        }

    }

    sumDisplayData(displayArrayName) {
        let result = new Currency();
        if (this[displayArrayName] != null) {
            for (let ii = 0; ii < this[displayArrayName].length; ++ii)
                result.amount += this[displayArrayName][ii];
        }
        return result;
    }

    assertions() {

        let assertion1 = this.sumDisplayData('displayValue');
        if (assertion1.amount == (this.total.selfIncome.amount + this.total.employedIncome.amount))
            logger.log('assert summed monthly income == total income is TRUE');
        else
            logger.log('assert summed monthly income == total incomme is FALSE');
        
        let assertion2 = this.sumDisplayData('displayEarning');
        if (assertion2.amount == this.total.ordinaryIncome.amount)
            logger.log('assert summed monthly earnings == total taxableIncome is TRUE');
        else
            logger.log('assert summed monthly earnings == total taxableIncome is FALSE');

    }

}