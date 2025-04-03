class FinancialPackage {
    constructor() {
        this.employedIncome = new Currency();
        this.selfIncome = new Currency();
        this.iraDistribution = new Currency();
        this.taxableIncome = new Currency();
        this.nontaxableIncome = new Currency();
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
        this.qualifiedDividends = new Currency();
        this.interestIncome = new Currency();
    }

    add(financialPackage) {
        this.employedIncome.add(financialPackage.employedIncome);
        this.selfIncome.add(financialPackage.selfIncome);
        this.iraDistribution.add(financialPackage.iraDistribution);
        this.taxableIncome.add(financialPackage.taxableIncome);
        this.nontaxableIncome.add(financialPackage.nontaxableIncome);
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
        this.qualifiedDividends.add(financialPackage.qualifiedDividends);
        this.interestIncome.add(financialPackage.interestIncome);
    }

    subtract(financialPackage) {
        this.employedIncome.subtract(financialPackage.employedIncome);
        this.selfIncome.subtract(financialPackage.selfIncome);
        this.iraDistribution.subtract(financialPackage.iraDistribution);
        this.taxableIncome.subtract(financialPackage.taxableIncome);
        this.nontaxableIncome.subtract(financialPackage.nontaxableIncome);
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
        this.qualifiedDividends.subtract(financialPackage.qualifiedDividends);
        this.interestIncome.subtract(financialPackage.interestIncome);
    }

    multiply(amount) {
        this.employedIncome.multiply(amount);
        this.selfIncome.multiply(amount);
        this.iraDistribution.multiply(amount);
        this.taxableIncome.multiply(amount);
        this.nontaxableIncome.multiply(amount);
        this.expense.multiply(amount);
        this.fica.multiply(amount);
        this.incomeTax.multiply(amount);
        this.estimatedTaxes.multiply(amount);
        this.iraContribution.multiply(amount);
        this.mortgage.multiply(amount);
        this.mortgageInterest.multiply(amount);
        this.mortgagePrincipal.multiply(amount);
        this.propertyTaxes.multiply(amount);
        this.shortTermCapitalGains.multiply(amount);
        this.longTermCapitalGains.multiply(amount);
        this.qualifiedDividends.multiply(amount);
        this.interestIncome.multiply(amount);
    }

    copy() {
        let aCopy = new FinancialPackage();
        aCopy.add(this);
        return aCopy;
    }

    zero() {
        this.employedIncome.zero();
        this.selfIncome.zero();
        this.iraDistribution.zero();
        this.taxableIncome.zero();
        this.nontaxableIncome.zero();
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
        this.qualifiedDividends.zero();
        this.interestIncome.zero();
    }

    report() {

        console.log('  employedIncome:        ' + this.employedIncome.toString());
        console.log('  selfIncome:            ' + this.selfIncome.toString());
        console.log('  iraDistribution:       ' + this.iraDistribution.toString());
        console.log('  taxableIncome:         ' + this.taxableIncome.toString());
        console.log('  nontaxableIncome:      ' + this.nontaxableIncome.toString());
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
        console.log('  qualifiedDividends     ' + this.qualifiedDividends.toString());
        console.log('  interestIncome:        ' + this.interestIncome.toString());
    }

    addResult(result) {
        if (result instanceof CapitalGainsResult)
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

    addCapitalGainsResult(capitalGainsResult) {
        //this.shortTermCapitalGains.add();
        // TODO: handle short term capital gains
        this.nontaxableIncome.add(capitalGainsResult.earnings);
        this.longTermCapitalGains.add(capitalGainsResult.earnings);
    }

    addMortgageResult(mortgageResult) {
        this.mortgage.add(mortgageResult.payment);
        this.mortgageInterest.add(mortgageResult.interest);
        this.mortgagePrincipal.add(mortgageResult.principal);
    }

    addIncomeResult(incomeResult) {
        this.selfIncome.add(incomeResult.selfIncome);
        this.employedIncome.add(incomeResult.employedIncome);
        this.taxableIncome.add(incomeResult.selfIncome);
        this.taxableIncome.add(incomeResult.employedIncome);
    }

    addExpenseResult(expenseResult) {
        this.expense.add(expenseResult.expense);
    }

    addInterestResult(interestResult) {
        this.interest.add(interestResult.interest);
    }

    addWithholdingResult(withholdingResult) { 
        this.fica.add(withholdingResult.fica());
        this.incomeTax.add(withholdingResult.income);
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
            if (a.sortIndex() < b.sortIndex())
                return -1;
            else if (b.sortIndex() < a.sortIndex())
                return 1;
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

        this.reportMonthly(currentDateInt);

        this.yearly.add(this.monthly);
        this.total.add(this.monthly);
        this.monthly.zero();
        
        for (modelAsset of this.modelAssets) {
            modelAsset.monthlyChron();
        }        
    }

    yearlyChron(currentDateInt) {

        this.reportYearly(currentDateInt);
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

        
        else if (currentDateInt.day == 15) {       

            /*
            // potentially pay taxes
            for (modelAsset of this.modelAssets) {
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
        for (modelAsset of this.modelAssets) {
            if (modelAsset.inMonth(currentDateInt)) {
                
                this.applyFirstDayOfMonthCalculations(modelAsset);                  

            }
        }

        // apply taxes
        for (modelAsset of this.modelAssets) {
            if (modelAsset.inMonth(currentDateInt)) {

                this.applyFirstDayOfMonthTaxes(modelAsset);                   
     
            }
        }

        // apply credits/debits
        for (modelAsset of this.modelAssets) {
            if (modelAsset.inMonth(currentDateInt)) {
                
                this.applyFirstDayOfMonthCredits(modelAsset);                            
                 
            }
        }
    }

    applyFirstDayOfMonthCalculations(modelAsset) {
        
        // assert mortgage happens before income happens before taxDeferredEquity happens before taxableEquity
        if (isMonthlyIncome(modelAsset.instrument) || isMortgage(modelAsset.instrument)) {
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
        if (isMonthlyIncome(modelAsset.instrument)) {
            let taxableIncome = new Currency(modelAsset.finishCurrency.amount);
            
            let withholding = new WithholdingResult();
            if (!modelAsset.isSocialSecurity()) {
                withholding = activeTaxTable.calculateFICATax(modelAsset.isSelfEmployed, taxableIncome);
                activeTaxTable.addYearlySocialSecurity(withholding.socialSecurity);
            }

            let iraContribution = this.calculateFirstDayOfMonthIncomeIRAContribution(modelAsset, taxableIncome, withholding.fica());
    
            if (modelAsset.isSocialSecurity()) {
                taxableIncome.multiply(0.85); // maximum allowed for social security
            }
        
            let incomeTax = activeTaxTable.estimateMonthlyIncomeTax(this.monthly, taxableIncome);                            

            withholding.income = incomeTax;
            withholding.flipSigns();
            modelAsset.deductWithholding(withholding);
            this.monthly.addWithholdingResult(withholding);
              
            if (iraContribution.amount > 0) {
                let cleanup = new Currency((iraContribution.amount - withholding.fica().amount - incomeTax.amount) - originalIncome.amount);
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
        }

    }

    applyFirstDayOfMonthCredits(modelAsset) {

        if (isMonthlyIncome(modelAsset.instrument)) {

            if (modelAsset.monthlyIRAContribution.amount > 0) {
                this.applyFundingSource(modelAsset, monthlyIRAContribution);
                this.monthly.taxableIncome.subtract(monthlyIRAContribution);
            }
            else
                this.applyFundingSource(modelAsset); // no argument means use the modelAsset.earningCurrency
        }
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
            else {
                taxableIncome.zero();
            }

            modelAsset.addIRAContribution(iraContribution);
            return iraContribution;
        }
        else
            return new Currency();

    }

    applyLastDayOfMonth(currentDateInt) {

        // apply expenses
        // recognize asset gains
        for (modelAsset of this.modelAssets) {
            if (modelAsset.inMonth(currentDateInt)) {        
                
                this.applyLastDayOfMonthCalculations(modelAsset);
                
            }
        }

        for (modelAsset of this.modelAssets) {
            if (modelAsset.inMonth(currentDateInt)) {

                this.applyLastDayOfMonthTaxes(modelAsset);
            }
        }

        // sale of assets and proceeds transferred to fundingSource
        for (modelAsset of this.modelAssets) {
            if (modelAsset.finishDateInt.year == currentDateInt.year && modelAsset.finishDateInt.month == currentDateInt.month && currentDateInt.toInt() < this.lastDateInt.toInt()) {
                if (modelAsset.fundingSource) {

                    this.closeAsset(modelAsset);

                }
            }
        }

    }

    applyLastDayOfMonthCalculations(modelAsset) {

        if (isCapital(modelAsset.instrument)) {
            let result = modelAsset.applyMonthly();
            this.monthly.addResult(result);
        }

    }

    applyLastDayOfMonthTaxes(modelAsset) {

        if (isCapital(modelAsset.instrument)) {
    
            // if it's taxable, see how much we need to draw and handle for taxes
            if (isTaxableAccount(modelAsset.instrument)) {
                this.applyLastDayOfMonthTaxable(modelAsset);
            }

            // if it's taxDeferred, see if we need to take a distribution or if an expense is tied to it
            else if (isTaxDeferred(modelAsset.instrument)) {
                this.applyLastDayOfMonthTaxDeferred(modelAsset);
            }
        }
        /*
        else if (isIncomeAccount(modelAsset.instrument)) {
            let taxableIncome = this.applyMonthlyIncome(modelAsset);
            this.monthly.taxableIncome.add(taxableIncome);
            this.monthly.estimatedTaxes.add(activeTaxTable.calculateMonthlyEstimatedTaxes(taxableIncome));
        }
        */
        else if (isMonthlyExpense(modelAsset.instrument)) {
            // if the fundingSource is Taxable, we handle that in applyLastDayOfMonthTaxable
            // if the fundingSource is Tax Deferred, we handle that in applyLastDayOfMonthTaxDeferred
            // TaxFree will go through

            let expense = modelAsset.applyMonthlyExpense();

            let fundingSourceAsset = util_findModelAssetByDisplayName(this.modelAssets, modelAsset.fundingSource);
            if (fundingSourceAsset && isTaxFree(modelAsset)) {
                this.monthly.expense.add(expense);
                this.applyFundingSource(modelAsset);    
            }

        }
    
    }

    closeAsset(modelAsset) {
        if (!isCapital(modelAsset.instrument)) return;
    
        console.log('close capital asset: ' + modelAsset.displayName + ' valued at ' + modelAsset.finishCurrency.toString());
    
        const amountToTransfer = new Currency(modelAsset.finishCurrency.amount);
        const capitalGains = new Currency(modelAsset.finishCurrency.amount - modelAsset.startCurrency.amount);
        let amountToTax = new Currency();
    
        const monthsSpan = MonthsSpan.build(modelAsset.startDateInt, modelAsset.finishDateInt);
        const isLongTerm = monthsSpan.totalMonths > 12;
    
        if (isLongTerm) {
            if (monthsSpan.totalMonths > 24 && isHome(modelAsset.instrument)) {
                capitalGains.amount -= global_home_sale_capital_gains_discount;
            }
    
            modelAsset.addMonthlyLongTermCapitalGains(capitalGains);
            this.monthly.longTermCapitalGains.add(capitalGains);
    
            const yearlyIncome = activeTaxTable.calculateYearlyTaxableIncome(this.monthly.copy().multiply(12.0));
            amountToTax = activeTaxTable.calculateYearlyLongTermCapitalGainsTax(yearlyIncome, capitalGains);
        } else {
            modelAsset.addMonthlyShortTermCapitalGains(capitalGains);
            this.monthly.shortTermCapitalGains.add(capitalGains);
    
            amountToTax = activeTaxTable.calculateMonthlyIncomeTax(capitalGains);
        }
    
        amountToTax.flipSign();
        modelAsset.addMonthlyIncomeTax(amountToTax);
        this.monthly.incomeTax.add(amountToTax);
    
        console.log('capital asset tax: ' + modelAsset.displayName + ' taxed at ' + amountToTax.toString());
    
        amountToTransfer.add(amountToTax);
        this.applyFundingSource(modelAsset, amountToTransfer);
    
        modelAsset.close();
    }

    applyLastDayOfMonthTaxable(modelAsset) {

        let expense = new Currency();  
        
        let expenseAssets = util_findModelAssetsByFundingSource(this.modelAssets, sInstrumentNames[sInstrumentsIDs.monthlyExpense], modelAsset.displayName);
        if (expenseAssets.length > 0) {
            for (let expenseAsset of expenseAssets) {
                expense.add(expenseAsset.finishCurrency);
            }
            this.monthly.expense.add(expense);            
        }

        expense = modelAsset.applyMonthlyCredits(expense);
    
        if (expense.amount < 0) {
            expense.flipSign();
            modelAsset.debit(expense);
            
            let qDividends = new Currency(modelAsset.finishCurrency.amount * global_equity_dividend_allocation);
            let gStocks = new Currency(modelAsset.finishCurrency.amount * global_equity_growth_allocation);

            let monthlyQDividends = new Currency(qDividends.amount * (global_equity_dividend_average_annual_rate / 12.0));
            let monthlyGStocks = new Currency(gStocks.amount / 12.0);
            if (monthlyQDividends.amount < expense.amount) {
                let test = new Currency(expense.amount - monthlyQDividends.amount);
                if (monthlyGStocks.amount < test.amount)
                    console.log('Portfolio.applyLastDayOfMonthTaxable - exceeding monthly withdrawal boundary');
                else
                    monthlyGStocks.amount = test.amount;
            }
            else {
                monthlyQDividends.amount = expense.amount;
                monthlyGStocks.zero();
            }

            let asYearly = this.monthly.copy();
            asYearly.multiply(12.0);
            let yearlyIncome = activeTaxTable.calculateYearlyTaxableIncome(asYearly);
            
            let capitalGains = new Currency(monthlyQDividends.amount + monthlyGStocks.amount);
            capitalGains.multiply(12.0);
            
            let amountToTax = activeTaxTable.calculateYearlyLongTermCapitalGainsTax(yearlyIncome, capitalGains);
            amountToTax.divide(12.0);
            amountToTax.flipSign();

            modelAsset.credit(amountToTax);
            modelAsset.addMonthlyIncomeTax(amountToTax);                            
            this.monthly.incomeTax.add(amountToTax);

            this.monthly.qualifiedDividends.add(monthlyQDividends);
            this.monthly.longTermCapitalGains.add(monthlyGStocks);
        }

    }

    applyLastDayOfMonthTaxDeferred(modelAsset) {

        let income = new Currency();
        let expense = new Currency();  

        if (this.activeUser.age >= 73) {
            income = activeTaxTable.calculateMonthlyRMD(modelAsset);                        
        }
        
        let expenseAssets = util_findModelAssetsByFundingSource(this.modelAssets, sInstrumentNames[sInstrumentsIDs.monthlyExpense], modelAsset.displayName);
        if (expenseAssets.length > 0) {
            for (let expenseAsset of expenseAssets) {
                expense.add(expenseAsset.finishCurrency);
            }
            this.monthly.expense.add(expense);            
        }

        expense.flipSign();
        if (income.amount < expense.amount) {
            // take additional from modelAsset
            let extraWithdrawn = new Currency(expense.amount - income.amount);
            income.add(extraWithdrawn);
        }
        else if (income.amount > expense.amount) {
            // send excess to the first taxable account
            let excessAvailable = new Currency(income.amount - expense.amount);
            this.creditToFirstTaxableAccount(excessAvailable)
        }

        if (income.amount > 0) {
            modelAsset.debit(income);
            this.monthly.iraDistribution.add(income);               

            let incomeTax = activeTaxTable.calculateMonthlyIncomeTax(income, new Currency());

            // TODO: inherited IRA exclusion
            let penalty = 0.0; 
            //if (income.amount > 0 && this.activeUser.age < 60)
            //    penalty = 0.1; // 10%                                        

            if (penalty > 0.0) {
                console.log('Portfolio.applyFirstMonth|TaxDeferred - 10% penalty for withdrawing ' + income.toString() + ' before age of 60');
                incomeTax.add(income.multiply(penalty)); 
            }

            incomeTax.flipSign();
            this.monthly.incomeTax.add(incomeTax);
            
            let withholding = new WithholdingResult( new Currency(), new Currency(), incomeTax);
            modelAsset.deductWithholding(withholding);

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
                    modelAsset.applyYearly();
            }
        }

    }

    applyFundingSource(modelAsset, amount) {
        if (modelAsset.fundingSource) {
            let fundingAsset = util_findModelAssetByDisplayName(this.modelAssets, modelAsset.fundingSource);
            if (fundingAsset) {
                let result = modelAsset.applyFundingSource(fundingAsset, amount);
                return result;
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

    reportMonthly(currentDateInt) {

        console.log(' -------  Begin Monthly (' + currentDateInt.toString() + ' ) Report -------');
        this.monthly.report();
        console.log(' -------   End Monthly (' + currentDateInt.toString() + ' ) Report  -------');

    }

    reportYearly(currentDateInt) {

        console.log(' -------  Begin Yearly (' + currentDateInt.toString() + ' ) Report -------');
        this.yearly.report();
        console.log(' -------   End Yearly  (' + currentDateInt.toString() + ' ) Report  -------');

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
        if (assertion2.amount == this.total.taxableIncome.amount)
            console.log('assert summed monthly earnings == total taxableIncome is TRUE');
        else
            console.log('assert summed monthly earnings == total taxableIncome is FALSE');

    }

}