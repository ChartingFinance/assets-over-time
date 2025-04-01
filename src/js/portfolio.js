class FinancialPackage {
    constructor() {
        this.employedIncome = new Currency();
        this.selfIncome = new Currency();
        this.taxableEarning = new Currency();
        this.nontaxableEarning = new Currency();
        this.expense = new Currency();
        this.fica = new Currency();
        this.incomeTax = new Currency();
        this.estimatedTaxes = new Currency();
        this.iraContribution = new Currency();
        this.mortgage = new Currency();
        this.mortgageInterest = new Currency();
        this.mortgagePrincipal = new Currency();
        this.propertyTaxes = new Currency();
        this.shortTermCapitalGains = new Currency();
        this.longTermCapitalGains = new Currency();
        this.interest = new Currency();
    }

    add(financialPackage) {
        this.employedIncome.add(financialPackage.employedIncome);
        this.selfIncome.add(financialPackage.selfIncome);
        this.taxableEarning.add(financialPackage.taxableEarning);
        this.nontaxableEarning.add(financialPackage.nontaxableEarning);
        this.expense.add(financialPackage.expense);
        this.fica.add(financialPackage.fica);
        this.incomeTax.add(financialPackage.incomeTax);
        this.estimatedTaxes.add(financialPackage.estimatedTaxes);
        this.iraContribution.add(financialPackage.iraContribution);
        this.mortgage.add(financialPackage.mortgage);
        this.mortgageInterest.add(financialPackage.mortgageInterest);
        this.mortgagePrincipal.add(financialPackage.mortgagePrincipal);
        this.propertyTaxes.add(financialPackage.propertyTaxes);
        this.shortTermCapitalGains.add(financialPackage.shortTermCapitalGains);
        this.longTermCapitalGains.add(financialPackage.longTermCapitalGains);
        this.interest.add(financialPackage.interest);
    }

    subtract(financialPackage) {
        this.employedIncome.subtract(financialPackage.employedIncome);
        this.selfEmployedIncome.subtract(financialPackage.selfIncome);
        this.taxableEarning.subtract(financialPackage.taxableEarning);
        this.nontaxableEarning.subtract(financialPackage.nontaxableEarning);
        this.expense.subtract(financialPackage.expense);
        this.fica.subtract(financialPackage.fica);
        this.incomeTax.subtract(financialPackage.incomeTax);
        this.estimatedTaxes.subtract(financialPackage.estimatedTaxes);
        this.iraContribution.subtract(financialPackage.iraContribution);
        this.mortgage.subtract(financialPackage.mortgage);
        this.mortgageInterest.subtract(financialPackage.mortgageInterest);
        this.mortgagePrincipal.subtract(financialPackage.mortgagePrincipal);
        this.propertyTaxes.subtract(financialPackage.propertyTaxes);
        this.shortTermCapitalGains.subtract(financialPackage.shortTermCapitalGains);
        this.longTermCapitalGains.subtract(financialPackage.longTermCapitalGains);
        this.interest.subtract(financialPackage.interest);
    }

    zero() {
        this.employedIncome.zero();
        this.selfIncome.zero();
        this.taxableEarning.zero();
        this.nontaxableEarning.zero();
        this.expense.zero();
        this.fica.zero();
        this.incomeTax.zero();
        this.estimatedTaxes.zero();
        this.iraContribution.zero();
        this.mortgage.zero();
        this.mortgageInterest.zero();
        this.mortgagePrincipal.zero();
        this.propertyTaxes.zero();
        this.shortTermCapitalGains.zero();
        this.longTermCapitalGains.zero();
        this.interest.zero();
    }

    report() {

        console.log('  employedIncome:        ' + this.employedIncome.toString());
        console.log('  selfIncome:            ' + this.selfIncome.toString());
        console.log('  taxableEarning:        ' + this.taxableEarning.toString());
        console.log('  nontaxableEarning:     ' + this.nontaxableEarning.toString());
        console.log('  expense:               ' + this.expense.toString());
        console.log('  fica:                  ' + this.fica.toString());
        console.log('  incomeTax:             ' + this.incomeTax.toString());
        console.log('  estimatedTaxes:        ' + this.estimatedTaxes.toString());
        console.log('  iraContribution:       ' + this.iraContribution.toString());
        console.log('  mortgage:              ' + this.mortgage.toString());
        console.log('  mortgageInterest:      ' + this.mortgageInterest.toString());
        console.log('  mortgagePrincipal:     ' + this.mortgagePrincipal.toString());
        console.log('  propertyTaxes:         ' + this.propertyTaxes.toString());
        console.log('  shortTermCapitalGains: ' + this.shortTermCapitalGains.toString());
        console.log('  longTermCapitalGains:  ' + this.longTermCapitalGains.toString());
        console.log('  interest:              ' + this.interest.toString());
    }

    addCapitalGainsResult(capitalGainsResult) {
        this.shortTermCapitalGains.add(capitalGainsResult.shortTerm);
        this.longTermCapitalGains.add(capitalGainsResult.longTerm);
    }

    addMortgageResult(mortgageResult) {
        this.mortgage.add(mortgageResult.payment);
        this.mortgageInterest.add(mortgageResult.interest);
        this.mortgagePrincipal.add(mortgageResult.principal);
    }
}

class Portfolio {
    constructor(modelAssets) {
        this.modelAssets = this.sortModelAssets(modelAssets);
        this.activeUser = new User(global_user_startAge);

        this.firstDateInt = util_firstDateInt(this.modelAssets);
        this.lastDateInt = util_lastDateInt(this.modelAssets);

        this.monthly = new FinancialPackage();
        this.yearly = new FinancialPackage();
        this.total = new FinancialPackage();
    }

    sortModelAssets(modelAssets) {
        console.log('Portfolio.sortModelAssets');
    
        modelAssets.sort(function (a, b) {
            if (isMonthlyIncome(a.instrument)) {
                if (isMonthlyIncome(b.instrument))
                    return a.displayName.localeCompare(b.displayName);
                else
                    return -1;
            }
            else if (isMonthlyIncome(b.instrument)) {
                if (isMonthlyIncome(a.instrument))
                    return b.displayName.localeCompare(a.displayName);
                else
                    return 1;
            }
            else if (isMonthlyExpense(a.instrument)) {
                if (isMonthlyExpense(b.instrument))
                    return a.displayName.localeCompare(b.displayName);
                else
                    return 1;
            }
            else if (isMonthlyExpense(b.instrument)) {
                if (isMonthlyExpense(a.instrument))
                    return b.displayName.localeCompare(a.displayName);
                else
                    return -1;
            }
            else if (isHome(a.instrument)) {
                if (isHome(b.instrument))
                    return a.displayName.localeCompare(b.displayName);
                else if (isMonthlyIncome(b.instrument))
                    return 1;
                else if (isMonthlyExpense(b.instrument))
                    return -1;
                else
                    return a.displayName.localeCompare(b.displayName);
            }
            else if (isMortgage(a.instrument)) {
                if (isMortgage(b.instrument))
                    a.displayName.localeCompare(b.displayName);
                else if (isMonthlyIncome(b.instrument))
                    return 1;
                else if (isMonthlyExpense(b.instrument))
                    return -1;
                else
                    return a.displayName.localeCompare(b.displayName);
            }
            else
                return a.displayName.localeCompare(b.displayName);
        });
    
        return modelAssets;
    }

    initializeChron() {

        this.monthly = new FinancialPackage();
        this.yearly = new FinancialPackage();
        this.total = new FinancialPackage();

        for (modelAsset of this.modelAssets) {
            modelAsset.initializeChron();
        }
    }

    monthlyChron(currentDateInt) {

        this.report(currentDateInt);

        this.yearly.add(this.monthly);
        this.total.add(this.monthly);
        this.monthly.zero();
        
        for (modelAsset of this.modelAssets) {
            modelAsset.monthlyChron();
        }        
    }

    yearlyChron(currentDateInt) {

        this.yearly.zero();

    }

    finalizeChron() {
        for (modelAsset of this.modelAssets) {
            modelAsset.finalizeChron();
        }
    }
    
    startValue() {

        let amount = new Currency(0.0);

        for (modelAsset of this.modelAssets) {

            // just assets
            if (isAsset(modelAsset.instrument))
                amount.add(modelAsset.startCurrency);
        }

        return amount;

    }

    finishValue() {

        let amount = new Currency(0.0);

        for (modelAsset of this.modelAssets) {

            // just assets
            if (isAsset(modelAsset.instrument))
                amount.add(modelAsset.finishCurrency);
        }

        return amount;

    }

    accumulatedValue() {
        
        let amount = new Currency(0.0);

        for (modelAsset of this.modelAssets) {

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

        /*
        else if (currentDateInt.day == 15) {
            
            // potentially pay taxes
            for (modelAsset of this.modelAssets) {
                if (modelAsset.inMonth(currentDateInt))
                    this.totalTaxesPaid.add(modelAsset.applyMonthlyTaxPayments());
            }

        }
        */

        else if (currentDateInt.day == 30) {

            this.applyLastDayOfMonth(currentDateInt);            

        }

        return 0;

    }

    applyFirstDayOfMonth(currentDateInt) {
        // recognize income
        for (modelAsset of this.modelAssets) {
            if (modelAsset.inMonth(currentDateInt)) {
                if (isMonthlyIncome(modelAsset.instrument)) {

                    this.applyFirstDayOfMonthIncome(modelAsset);
                    
                }
                else if (isTaxDeferred(modelAsset.instrument)) {

                    this.applyFirstDayOfMonthTaxDeferred(modelAsset);
                    
                }          
                else if (isMortgage(modelAsset.instrument)) {

                    this.monthly.addMortgageResult(modelAsset.applyMonthlyMortgage());
                
                }
            }
        }
    }

    applyFirstDayOfMonthIncome(modelAsset) {

        let originalIncome = modelAsset.applyMonthlyIncome();
        let taxableIncome = new Currency(originalIncome.amount);
        if (modelAsset.isSelfEmployed)
            this.monthly.selfIncome.add(taxableIncome);
        else
            this.monthly.employedIncome.add(taxableIncome);                                

        let withholding = activeTaxTable.calculateFICATax(modelAsset.isSelfEmployed, taxableIncome);
        this.monthly.fica.subtract(withholding.fica());

        let iraContribution = this.calculateFirstDayOfMonthIncomeIRAContribution(modelAsset, taxableIncome, withholding.fica());
    
        let incomeTax = activeTaxTable.calculateMonthlyIncomeTax(taxableIncome, new Currency());                            
        this.monthly.incomeTax.subtract(incomeTax);

        withholding.income = incomeTax;
        modelAsset.deductWithholding(withholding);
              
        if (iraContribution.amount > 0) {
            let cleanup = new Currency((iraContribution.amount + withholding.fica().amount + incomeTax.amount) - originalIncome.amount);
            if (cleanup.amount < 0) {
                cleanup.flipSign();
                this.creditToFirstTaxableAccount(cleanup);
            }
            else if (cleanup.amount > 0) {
                iraContribution.subtract(cleanup);
                modelAsset.earningCurrency.subtract(cleanup);
            }
            this.monthly.iraContribution.add(iraContribution);
        }

        this.monthly.taxableEarning.add(modelAsset.earningCurrency);

        if (iraContribution.amount > 0)
            this.applyFundingSource(modelAsset, iraContribution);
        else
            this.applyFundingSource(modelAsset);

    }

    // NOTE -- this function can change taxableIncome
    calculateFirstDayOfMonthIncomeIRAContribution(modelAsset, taxableIncome, fica) {

        let fundingSourceAsset = util_findModelAssetByDisplayName(this.modelAssets, modelAsset.fundingSource);
        if (fundingSourceAsset && isTaxDeferred(fundingSourceAsset.instrument)) {
            let iraContribution = new Currency(taxableIncome.amount - fica.amount);
            let contributionLimit = activeTaxTable.iraContributionLimit(this.activeUser);
            if (this.yearly.iraContribution.amount + iraContribution.amount > contributionLimit.amount) {
                iraContribution = new Currency(contributionLimit.amount - this.yearly.iraContribution.amount);                            
                taxableIncome.subtract(iraContribution);                                                   
            }
            return iraContribution
        }
        else
            return new Currency();

    }

    applyFirstDayOfMonthTaxDeferred(modelAsset) {
        
        let income = new Currency();
        let expense = new Currency();  

        if (this.activeUser.age >= 73) {
            income = activeTaxTable.calculateMonthlyRMD(modelAsset);                        
        }
        
        let expenseAssets = util_findModelAssetsByFundingSource(this.modelAssets, sInstrumentNames[sInstrumentsIDs.taxDeferredEquity], modelAsset.displayName);
        if (expenseAssets.length > 0) {
            for (expenseAsset of expenseAssets) {
                expense.add(potentialExpenseAsset.finishCurrency);
            }
            this.monthly.expense.add(expense);            
        }

        expense.flipSign();
        if (income.amount < expense.amount) {
            // take additional from modelAsset
            let extraWithdrawn = new Currency(expense.amount - income.amount);
            income.amount.add(extraWithdrawn);
        }
        else if (income.amount > expense.amount) {
            // send excess to the first taxable account
            let excessAvailable = new Currency(income.amount - expense.amount);
            this.creditToFirstTaxableAccount(excessAvailable)
        }

        if (income.amount > 0) {
            modelAsset.debit(income);
            this.monthly.income.add(income);               

            let incomeTax = activeTaxTable.calculateMonthlyIncomeTax(income);

            let penalty = 0.0; 
            if (income.amount > 0 && this.activeUser.age < 60)
                penalty = 0.1; // 10%                                        

            if (penalty > 0.0) {
                console.log('Portfolio.applyFirstMonth|TaxDeferred - 10% penalty for withdrawing ' + income.toString() + ' before age of 60');
                incomeTax.add(income.multiply(1 + penalty)); 
            }

            this.monthly.incomeTax.add(incomeTax);
            
            if (incomeTax.amount > 0) {
                this.deductFromFirstTaxableAccount(incomeTax);
            }
        }

    }

    applyLastDayOfMonth(currentDateInt) {

        // apply expenses
        // recognize asset gains
        for (modelAsset of this.modelAssets) {
            if (modelAsset.inMonth(currentDateInt)) {                                    
                if (isCapital(modelAsset.instrument)) {
                    let capitalGainsResult = modelAsset.applyMonthlyCapitalGains();

                    // no tax on capital gains until realized
                    this.monthly.nontaxableEarning.add(capitalGainsResult.earnings);

                    // if it's a house, we do have property taxes
                    if (isHome(modelAsset.instrument)) {
                        let propertyTaxes = new Currency(capitalGainsResult.principal.amount * (global_propertyTaxRate / 12.0));
                        propertyTaxes.flipSign();
                        this.monthly.propertyTaxes.add(propertyTaxes);
                    }
                }
                else if (isSavingsAccount(modelAsset.instrument)) {
                    this.monthly.income.add(this.applyMonthlyIncome());
                    this.monthly.estimatedTaxes.add(activeTaxTable.calculateMonthlyEstimatedTaxes(modelAsset));
                }
                else if (isMonthlyExpense(modelAsset.instrument)) {
                    // if the fundingSource is Tax Deferred, we handle that in applyFirstDayOfMonth
                    let skip = false;
                    if (modelAsset.fundingSource) {
                        let fundingSourceAsset = util_findModelAssetByDisplayName(this.modelAssets, modelAsset.fundingSource);
                        if (fundingSourceAsset && isTaxDeferred(fundingSourceAsset.instrument))
                            skip = true;
                    }

                    if (!skip) {
                        this.monthly.expense.add(modelAsset.applyMonthlyExpense());
                        this.applyFundingSource(modelAsset);
                    }
                }
            }
        }

    }

    creditToFirstTaxableAccount(amount) {

        for (modelAsset of this.modelAssets) {
            if (isTaxableAccount(modelAsset.instrument)) {
                modelAsset.credit(amount);
                break;
            }
        }
    
    }

    deductFromFirstTaxableAccount(amount) {

        for (modelAsset of this.modelAssets) {
            if (isTaxableAccount(modelAsset.instrument)) {
                modelAsset.debit(amount);
                break;
            }
        }

    }

    applyYear(currentDateInt) {

        for (modelAsset of this.modelAssets) {
            if (modelAsset.inMonth(currentDateInt)) {
                if (isMonthlyIncome(modelAsset.instrument))
                    modelAsset.applyYearlyIncome(); // a raise!
            }
        }

    }

    applyFundingSource(modelAsset, amount) {
        if (modelAsset.fundingSource) {
            let fundingAsset = util_findModelAssetByDisplayName(this.modelAssets, modelAsset.fundingSource);
            if (fundingAsset) {
                return modelAsset.applyFundingSource(fundingAsset, amount);
            }
        }
        return new Currency();
    }

    applyTaxDeferredFundingSource(modelAsset) {

    }

    monthlyDataArrayToDisplayData(monthsSpan, monthlyArrayName, displayArrayName) {
        
        this[displayArrayName] = null;
        for (modelAsset of this.modelAssets) {

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

        for (modelAsset of this.modelAssets) {
            modelAsset.monthlyAssetDataToDisplayAssetData(monthsSpan);
            modelAsset.monthlyEarningsDataToDisplayEarningsData(monthsSpan);
        }  

        this.monthlyDataArrayToDisplayData(monthsSpan, 'monthlyEarning', 'displayEarning');
        this.monthlyDataArrayToDisplayData(monthsSpan, 'monthlyValue', 'displayValue');
        this.monthlyDataArrayToDisplayData(monthsSpan, 'monthlyAccumulated', 'displayAccumulated');
        this.monthlyDataArrayToDisplayData(monthsSpan, 'monthlyRMDs', 'displayRMDs');
        this.monthlyDataArrayToDisplayData(monthsSpan, 'monthlyFICA', 'displayFICA');
        this.monthlyDataArrayToDisplayData(monthsSpan, 'monthlySocialSecurity', 'displaySocialSecurity');
        this.monthlyDataArrayToDisplayData(monthsSpan, 'monthlyMedicare', 'displayMedicare');
        this.monthlyDataArrayToDisplayData(monthsSpan, 'monthlyIncomeTax', 'displayIncomeTax');
        this.monthlyDataArrayToDisplayData(monthsSpan, 'monthlyEstimatedTax', 'displayEstimatedTax');

        this.assertions();

    }

    report(currentDateInt) {

        console.log(' -------  Begin Monthly (' + currentDateInt.toString() + ' ) Report -------');
        this.monthly.report();
        console.log(' -------   End Monthly (' + currentDateInt.toString() + ' ) Report  -------');

    }

    sumDisplayData(displayArrayName) {
        let result = new Currency();
        for (let ii = 0; ii < this[displayArrayName].length; ++ii)
            result.amount += this[displayArrayName][ii];
        return result;
    }

    assertions() {

        let assertion1 = this.sumDisplayData('displayValue');
        if (assertion1.amount == (this.total.selfIncome.amount + this.total.employedIncome.amount))
            console.log('assert summed monthly income == total income is TRUE');
        else
            console.log('assert summed monthly income == total incomme is FALSE');
        
        let assertion2 = this.sumDisplayData('displayEarning');
        if (assertion2.amount == this.total.taxableEarning.amount)
            console.log('assert summed monthly earnings == total taxableEarnings is TRUE');
        else
            console.log('assert summed monthly earnings == total taxableEarnings is FALSE');

    }

}