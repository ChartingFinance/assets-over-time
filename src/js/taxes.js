const us_2024_taxtables = {
    "year": 2024,
    "fica": {
        "url": "https://www.irs.gov/taxtopics/tc751",
        "ssHalfRate": 0.062,
        "ssFullRate": 0.124,
        "medicareHalfRate": 0.0145,
        "medicareFullRate": 0.0290,
        "maxSSEarnings": 168600.0
    },
    "income": {
        "url": "https://www.irs.gov/newsroom/irs-provides-tax-inflation-adjustments-for-tax-year-2024",
        "tables": [
            { 
                "filingType": "single",
                "taxRows": [
                    {"rate": 0.10, "fromAmount": 0.0, "toAmount": 11600.0},
                    {"rate": 0.12, "fromAmount": 11601.0, "toAmount": 47150.0},
                    {"rate": 0.22, "fromAmount": 47151.0, "toAmount": 100525.0},
                    {"rate": 0.24, "fromAmount": 100526.0, "toAmount": 191950.0},
                    {"rate": 0.32, "fromAmount": 191951.0, "toAmount": 243725.0},
                    {"rate": 0.35, "fromAmount": 243726.0, "toAmount": 609350.0},
                    {"rate": 0.37, "fromAmount": 609351.0, "toAmount": -1.0 }
                ]
            },
            {
                "filingType": "married",
                "taxRows": [
                    {"rate": 0.10, "fromAmount": 0.0, "toAmount": 23200.0},
                    {"rate": 0.12, "fromAmount": 23201.0, "toAmount": 94300.0},
                    {"rate": 0.22, "fromAmount": 94301.0, "toAmount": 201050.0},
                    {"rate": 0.24, "fromAmount": 201051.0, "toAmount": 383900.0},
                    {"rate": 0.32, "fromAmount": 383901.0, "toAmount": 487450.0},
                    {"rate": 0.35, "fromAmount": 487451.0, "toAmount": 731200.0},
                    {"rate": 0.37, "fromAmount": 731201.0, "toAmount": -1.0}
                ]
            }
        ]
    },
    "capitalGains": {
        "url": "https://www.irs.gov/taxtopics/tc409",
        "tables": [
            {
                "filingType": "single",
                "taxRows": [
                {"rate": 0.0, "fromAmount": 0.0, "toAmount": 47025.0 },
                {"rate": 0.15, "fromAmount": 47026.0, "toAmount": 518900.0 },
                {"rate": 0.2, "fromAmount": 518901.0, "toAmount": -1.0 }
                ]
            },
            {
                "filingType": "married",
                "taxRows": [
                    {"rate": 0.0, "fromAmount": 0.0, "toAmount": 94050.0 },
                    {"rate": 0.15, "fromAmount": 94051.0, "toAmount": 583750.0 },
                    {"rate": 0.2, "fromAmount": 583751.0, "toAmount": -1.0 }                    
                ]
            }
        ]
    },
    "standardDeduction": {
        "url": "https://www.irs.gov/newsroom/irs-provides-tax-inflation-adjustments-for-tax-year-2024",
        "single": 14600.0,
        "married": 29200.0        
    }
}; 

const uniformLifetimeTable = [
    { age: 70, divisor: 27.4 },
    { age: 71, divisor: 26.5 },
    { age: 72, divisor: 25.6 },
    { age: 73, divisor: 24.7 },
    { age: 74, divisor: 23.8 },
    { age: 75, divisor: 22.9 },
    { age: 76, divisor: 22.0 },
    { age: 77, divisor: 21.2 },
    { age: 78, divisor: 20.3 },
    { age: 79, divisor: 19.5 },
    { age: 80, divisor: 18.7 },
    { age: 81, divisor: 17.9 },
    { age: 82, divisor: 17.1 },
    { age: 83, divisor: 16.3 },
    { age: 84, divisor: 15.5 },
    { age: 85, divisor: 14.8 },
    { age: 86, divisor: 14.1 },
    { age: 87, divisor: 13.4 },
    { age: 88, divisor: 12.7 },
    { age: 89, divisor: 12.0 },
    { age: 90, divisor: 11.4 },
    { age: 91, divisor: 10.8 },
    { age: 92, divisor: 10.2 },
    { age: 93, divisor: 9.6 },
    { age: 94, divisor: 9.1 },
    { age: 95, divisor: 8.6 },
    { age: 96, divisor: 8.1 },
    { age: 97, divisor: 7.6 },
    { age: 98, divisor: 7.1 },
    { age: 99, divisor: 6.7 },
    { age: 100, divisor: 6.3 },
    { age: 101, divisor: 5.9 },
    { age: 102, divisor: 5.5 },
    { age: 103, divisor: 5.2 },
    { age: 104, divisor: 4.9 },
    { age: 105, divisor: 4.5 },
    { age: 106, divisor: 4.2 },
    { age: 107, divisor: 3.9 },
    { age: 108, divisor: 3.7 },
    { age: 109, divisor: 3.4 },
    { age: 110, divisor: 3.1 },
    { age: 111, divisor: 2.9 },
    { age: 112, divisor: 2.6 },
    { age: 113, divisor: 2.4 },
    { age: 114, divisor: 2.1 },
    { age: 115, divisor: 1.9 },
    { age: 116, divisor: 1.7 },
    { age: 117, divisor: 1.5 },
    { age: 118, divisor: 1.3 },
    { age: 119, divisor: 1.1 },
    { age: 120, divisor: 1.0 }
];

class TaxTable {
    constructor() {
        this.taxes = null;     
        this.initializeChron();
        this.singleContributionLimitBelow50
    }

    initializeChron() {
        this.activeTaxTables = JSON.parse(JSON.stringify(us_2024_taxtables));
        if (global_filingAs == 'Single') {
            this.activeIncomeTable = this.activeTaxTables.income.tables[0];
            this.activeCapitalGainsTable = this.activeTaxTables.capitalGains.tables[0];
            this.activeStandardDeduction = this.activeTaxTables.standardDeduction.single;
            this.iraContributionLimitBelow50 = 7000;
            this.iraContributionLimit50AndOver = 8000;
        }
        else {
            this.activeIncomeTable = this.activeTaxTables.income.tables[1];
            this.activeCapitalGainsTable = this.activeTaxTables.capitalGains.tables[1];
            this.activeStandardDeduction = this.activeTaxTables.standardDeduction.married;
            this.iraContributionLimitBelow50 = 14000;
            this.iraContributionLimit50AndOver = 16000;        }

        this.yearlySocialSecurityAccumulator = new Currency();
        this.yearlyMedicareAccumulator = new Currency();
        this.yearlyFICAAccumulator = new Currency();
        this.yearlyIncomeTaxAccumulator = new Currency();
        this.yearlyTaxableIncomeAccumulator = new Currency();
        this.yearlyRMDsAccumulator = new Currency();
        this.yearlyWithholdingsAccumulator = new Currency();
        this.yearlyShortTermCapitalGainsAccumulator = new Currency();
        this.yearlyLongTermCapitalGainsAccumulator = new Currency();    
        this.yearlyMortgageDeductionAccumulator = new Currency();
        this.yearlyPropertyTaxDeductionAccumulator = new Currency();

        this.yearlyFICATaxes = [];
        this.yearlyWithholding = [];
        this.yearlyFederalTaxes = [];
        this.yearlyPayments = [];

    }

    monthlyChron() {

    }

    yearlyChron() {

        this.yearlySocialSecurityAccumulator.zero();
        this.yearlyMedicareAccumulator.zero();
        this.yearlyIncomeTaxAccumulator.zero();
        this.yearlyTaxableIncomeAccumulator.zero();
        this.yearlyRMDsAccumulator.zero();
        this.yearlyShortTermCapitalGainsAccumulator.zero();
        this.yearlyLongTermCapitalGainsAccumulator.zero();    
        this.yearlyMortgageDeductionAccumulator.zero();
        this.yearlyPropertyTaxDeductionAccumulator.zero();

        // apply inflation to the tax rows
        this.inflateTaxes();

    }

    finalizeChron() {

    }

    funcYearlyWithholding() {

        let withholding = this.yearlySocialSecurityAccumulator.amount;
        withholding += this.yearlyMedicareAccumulator.amount;
        withholding += this.yearlyIncomeTaxAccumulator.amount;
        return withholding;
        
    }

    inflateTaxRows(taxTables) {
        for (let taxTable of taxTables) {
            for (let taxRow of taxTable.taxRows) {
                taxRow.fromAmount *= (1.0 + global_inflationRate);
                taxRow.toAmount *= (1.0 + global_inflationRate);
            }
        }
    }

    inflateTaxes() {
        this.activeTaxTables.fica.ssHalfRate *= (1.0 + global_inflationRate);
        this.activeTaxTables.fica.ssfFullRate *= (1.0 + global_inflationRate);
        this.activeTaxTables.fica.maxSSEarnings *= (1.0 + global_inflationRate);

        this.inflateTaxRows(this.activeTaxTables.income.tables);
        this.inflateTaxRows(this.activeTaxTables.capitalGains.tables);
    }

    isEstimatedTaxPaymentDue(currentDateInt) {
        return (currentDateInt.month == 1 || currentDateInt.month == 4 || currentDateInt.month == 6 || currentDateInt.month == 9);
    }

    isYearlyTaxPaymentDue(currentDateInt) {
        return (currentDateInt.month == 4);
    }    

    /*
    payEstimatedTaxes(currentDateInt, modelAssets) {        

        let estimatedTaxesPaid = new Currency(0.0);

        for (let modelAsset of modelAssets) {
            if (modelAsset.hasEstimatedTax()) {
                estimatedTaxesPaid.add(new Currency(modelAsset.getEstimatedTax()));
                modelAsset.debitAndClearEstimatedTax();
            }
        }

        console.log('TaxTable.payEstimatedTaxes: ' + estimatedTaxesPaid.toCurrency());

        this.estimatedTaxPayments.push(estimatedTaxesPaid.amount);
    }

    lastYearsEstimatedTaxPayments() {
        // get the previous years 4 estimated tax payments. REMEMBER: the last two are the current year, so adjust the index
        let total = 0.0;
        let count = 0;
        for (let ii = this.estimatedTaxPayments.length -3; ii >= 0 && count < 4 ; ii--) {
            total += this.estimatedTaxPayments[ii];
            ++count;
        }
        return total;
    }

    payYearlyTaxes(currentDateInt, modelAssets) {
        // see what the total is for this period
        let totalTax = new Currency(this.yearlyFederalTaxes[this.yearlyFederalTaxes.length -1]);

        // compute the estimated tax payments
        let estimatedTaxesPaid = new Currency(this.lastYearsEstimatedTaxPayments());

        // compute the difference
        let difference = new Currency(totalTax.amount - estimatedTaxesPaid.amount);
        this.yearlyPayments.push(difference.toCurrency());

        console.log('TaxTable.payYearlyTaxes (totalToPay - estimatedPaid = remainderToPay): ' + totalTax.toCurrency() + ' - ' + estimatedTaxesPaid.toCurrency() + ' = ' + difference.toCurrency());

        // find the modelAssets to be used for the tax payments
        let modelAssetsForTaxes = util_findAssetModelsToUseForTaxes(modelAssets);

        // TAX CALCULATION REMAINS THE SAME
        // scan through model assets and check for 'useForTaxes' property
        if (modelAssetsForTaxes.length > 0) {
            let partialTax = new Currency(difference.amount / modelAssetsForTaxes.length);
            let count = 0;
            for (modelAsset of modelAssetsForTaxes) {
                let message = 'TaxTable.payYearlyTaxes (' + (++count).toString() + ' of ' + modelAssetsForTaxes.length.toString() + '): ' + modelAsset.displayName + ' ' + partialTax.toCurrency();
                console.log(message);
                modelAsset.finishCurrency.subtract(partialTax);
            }
        }
    }
    */

    calculateMonthlyWithholding(modelAsset) {

        let amount = new Currency();
        if (isMonthlyIncome(modelAsset.instrument)) {
            amount.add(this.calculateMonthlyFICAWithholding(modelAsset));
            amount.add(this.calculateMonthlyIncomeWithholding(modelAsset.finishCurrency));                
        }        
        return amount;

    }

    calculateMonthlyFICAWithholding(modelAsset) {

        if (modelAsset.displayName == 'SSN') {
            // social security is not taxed for FICA
            console.log('TaxTable.calculateMonthlyFICAWithholding - SSN is not taxed for FICA');
            return;
        }

        let amount = new Currency();
        amount.add(this.calculateMonthlySocialSecurityWithholding(modelAsset));
        amount.add(this.calculateMonthlyMedicareWithholding(modelAsset));
        return amount;

    }

    calculateMonthlySocialSecurityWithholding(modelAsset) {

        let c = null;
        let maxC = null;
        if (modelAsset.isSelfEmployed) {
            c = new Currency(modelAsset.finishCurrency.amount * this.activeTaxTables.fica.ssFullRate);
            maxC = new Currency(this.activeTaxTables.fica.maxSSEarnings * this.activeTaxTables.fica.ssFullRate);
        }
        else {
            c = new Currency(modelAsset.finishCurrency.amount * this.activeTaxTables.fica.ssHalfRate);
            maxC = new Currency(this.activeTaxTables.fica.maxSSEarnings * this.activeTaxTables.fica.ssHalfRate);
        }
            
        if (this.yearlySocialSecurityAccumulator.amount + c.amount > maxC.amount) {
            c.amount = maxC.amount - this.yearlySocialSecurityAccumulator.amount;
        }

        modelAsset.addMonthlySocialSecurity(c);
        return c;

    }

    calculateMonthlyMedicareWithholding(modelAsset) {        

        let c = new Currency();
        if (modelAsset.isSelfEmployed)
            c = new Currency(modelAsset.finishCurrency.amount * this.activeTaxTables.fica.medicareFullRate);
        else
            c = new Currency(modelAsset.finishCurrency.amount * this.activeTaxTables.fica.medicareHalfRate);

        modelAsset.addMonthlyMedicare(c);
        return c;

    }

    calculateMonthlyIncomeWithholding(modelAsset, income) {

        let yearlyIncome = income.amount * 12;
        let adjusted = yearlyIncome - this.activeStandardDeduction;
        let tax = 0.0;

        for (const taxRow of this.activeIncomeTable.taxRows) {
            if (adjusted >= taxRow.fromAmount && adjusted >= taxRow.toAmount)
                tax += (taxRow.toAmount - taxRow.fromAmount) * taxRow.rate;
            else if (adjusted >= taxRow.fromAmount && adjusted < taxRow.toAmount)
                tax += (adjusted - taxRow.fromAmount) * taxRow.rate;
        }

        let monthlyIncomeTax = new Currency(tax / 12);
        if (modelAsset)
            modelAsset.addMonthlyIncomeTax(monthlyIncomeTax);
        return monthlyIncomeTax;        

    }

    /*
    calculateMonthlyIncome(currentDateInt, modelAsset, modelAssets, activeUser) {
        if (isMonthlyIncome(modelAsset.instrument)) {
            if (modelAsset.startDateInt.toInt() <= currentDateInt.toInt() && modelAsset.finishDateInt.toInt() > currentDateInt.toInt())
            {
                // SSN is never more than 85% taxable
                if (modelAsset.displayName == 'SSN')
                    return new Currency(modelAsset.finishCurrency.amount * 0.85);
                else
                    return modelAsset.finishCurrency;
            }
        }
        else if (isMonthlyExpense(modelAsset.instrument)) {
            // find the funding model asset and determine income
            let monthlyExpense = new Currency(modelAsset.finishCurrency.amount);
            let fundingAsset = util_findModelAssetByDisplayName(modelAssets, modelAsset.fundingSource);
            if (fundingAsset) {
                if (isTaxDeferred(fundingAsset.instrument) && activeUser.getAge() < 73) { // if over 73 will be handled by RMD
                    let asIncome = new Currency(modelAsset.finishCurrency.amount);
                    asIncome.flipSign();
                    return asIncome;                    
                }
            }
        }
        else if (isTaxDeferred(modelAsset.instrument)) {
            if (activeUser.getAge() >= 73) {
                // if the user is 73 or older, then they must take RMDs
                let rmd = activeTaxTable.calculateMonthlyRMD(currentDateInt, modelAsset, activeUser);
                console.log('RMD for ' + modelAsset.displayName + ' is ' + rmd.toCurrency());

                let monthlyExpenses = computeMonthlyExpensesFor(modelAssets, modelAsset.displayName);
                
                if (rmd.amount > monthlyExpenses.amount)
                    return rmd;
                else
                    return monthlyExpenses;
            }
        }
        else if (isSavingsAccount(modelAsset.instrument)) {
            return modelAsset.earningCurrency;
        }       
        
        return new Currency(0);
    }
    */

    calculateMonthlyShortTermCapitalGains(currentDateInt, modelAssets, modelAsset) { 
        
        // TODO: add in qualified and non qualified dividends

        if (isMonthlyExpense(modelAsset.instrument)) {
            let fundingAsset = util_findModelAssetByDisplayName(modelAssets, modelAsset.fundingSource);
            if (fundingAsset) {
                if (isTaxableAccount(fundingAsset.instrument)) {
                    fundingAsset.creditsThisMonth.subtract(modelAsset.finishCurrency);
                    if (fundingAsset.creditsThisMonth.amount < 0) {
                        // we will assume that 20% of money drawn from a taxable account is short term capital gains
                        let asShortTermCapitalGains = new Currency(fundingAsset.creditsThisMonth.amount * 0.2);
                        asShortTermCapitalGains.flipSign();
                        // estimate an income tax payment of 10%
                        let estimatedTax = new Currency(asShortTermCapitalGains.toCurrency() * 0.1);
                        fundingAsset.addEstimatedTax(estimatedTax.amount);
                        return asShortTermCapitalGains;
                    }
                }
            }
        }
        
        return new Currency(0);
    }

    calculateMonthlyLongTermCaptialGains(modelAsset) {

        // TODO: add in qualified and non qualified dividends

        if (isMonthlyExpense(modelAsset.instrument)) {
            let fundingAsset = util_findModelAssetByDisplayName(modelAssets, modelAsset.fundingSource);
            if (fundingAsset) {
                if (isTaxableAccount(fundingAsset.instrument)) {
                    // fundingAsset.creditsThisMonth was subtracted in calculatedMonthlyShortTermCapitalGains. Must guarantee this call is next
                    // we will assume that 80% of money drawn from a taxable account is long term capital gains
                    let asLongTermCapitalGains = new Currency(fundingAsset.creditsThisMonth.amount * 0.8);
                    asLongTermCapitalGains.flipSign();
                    // estimate a long term capital gains tax payment of 10%
                    let estimatedTax = new Currency(asLongTermCapitalGains.toCurrency() * 0.1);
                    fundingAsset.addEstimatedTax(estimatedTax.amount);

                    // zero out the creditsThisMonth so that the next pass will catch another expense drawing from this asset
                    fundingAsset.creditsThisMonth.zero();

                    return asLongTermCapitalGains;                    
                }
            }
        }
        
        return new Currency(0);
    }

    calculateMonthlyEstimatedTaxes(modelAsset) {
        return new Currency();
    }

    addLongTermCapitalGains(currency) {
        this.yearlyLongTermCapitalGainsAccumulator.add(currency);
    }

    calculateMonthlyMortgageDeduction(currentDateInt, modelAsset) {
        if (isMortgage(modelAsset.instrument)) {
            let c = new Currency(modelAsset.earningCurrency.amount * -1.0);
            return c;
        }
        else
            return new Currency(0);
    }

    calculateMonthlyPropertyTaxDeduction(currentDateInt, modelAsset) {
        if (isHome(modelAsset.instrument)) {
            let oneMonthRate = global_propertyTaxRate / 12.0;
            let c = new Currency(modelAsset.finishCurrency.amount * oneMonthRate);            
            return c;
        }
        return new Currency(0);
    }

    calculateMonthlyRMD(currentDateInt, activeUser, modelAsset) {
        if (isTaxDeferred(modelAsset.instrument)) {
            let divisor = 0;
            for (const table of uniformLifetimeTable) {
                if (table.age == activeUser.age) {
                    divisor = table.divisor;
                    break;
                }
            }
            if (divisor == 0) {
                console.log('TaxTable.calculateRMD: could not find divisor for age ' + activeUser.age);
                return new Currency(0);
            }

            let index = modelAsset.monthlyValue.length - currentDateInt.month;
            if (index < 0)
                index = 0;
            let value = modelAsset.monthlyValue[index];
            let rmd = value / divisor;

            rmd /= 12.0;
            return new Currency(rmd);
        }
        return new Currency(0);
    }

    applyYearlyDeductions() {
        // deductions
        if (this.yearlyPropertyTaxDeductionAccumulator.amount > global_propertyTaxDeductionMax)
            this.yearlyPropertyTaxDeductionAccumulator.amount = global_propertyTaxDeductionMax;

        if (this.yearlyMortgageDeductionAccumulator.amount + this.yearlyPropertyTaxDeductionAccumulator.amount > this.activeStandardDeduction) {
            this.yearlyTaxableIncomeAccumulator.subtract(this.yearlyMortgageDeductionAccumulator);
            this.yearlyTaxableIncomeAccumulator.subtract(this.yearlyPropertyTaxDeductionAccumulator);
        }
        else {
            let c = new Currency(this.activeStandardDeduction);;            
            this.yearlyTaxableIncomeAccumulator.subtract(c);
        }
    }

    calculateYearlyTax(financialPackage) {

        /*
        let yearlyFICATaxes = new Currency(0.0);
        yearlyFICATaxes += this.calculateFICATax();
        this.yearlyFICATaxes.push(yearlyFICATaxes);

        let yearlyFederalTax = 0.0;
        this.applyYearlyDeductions();
        yearlyFederalTax += this.calculateIncomeTax();
        yearlyFederalTax += this.calculateCapitalGainsTax();
        yearlyFederalTax += this.lastYearsEstimatedTaxPayments();
        this.yearlyFederalTaxes.push(yearlyFederalTax);
        return yearlyFederalTax;
        */

        return new Currency();

    }

    calculateFICATax() {
        let ficaTax = this.yearlyFICAAccumulator.amount;        
        return ficaTax;
    }

    calculateIncomeTax(taxableIncome, shortTermCapitalGains) {
        let yearlyTaxableIncome = new Currency(taxableIncome);
        yearlyTaxableIncome.add(shortTermCapitalGains);   

        let tax = 0.0;        
        for (const taxRow of this.activeIncomeTable.taxRows) {
            if (yearlyTaxableIncome.amount >= taxRow.fromAmount && yearlyTaxableIncome.amount >= taxRow.toAmount)
                tax += (taxRow.toAmount - taxRow.fromAmount) * taxRow.rate;
            else if (yearlyTaxableIncome.amount >= taxRow.fromAmount && yearlyTaxableIncome.amount < taxRow.toAmount)
                tax += (yearlyTaxableIncome.amount - taxRow.fromAmount) * taxRow.rate;
        }
        return new Currency(tax);
    }

    calculateCapitalGainsTax() {          
        let tax = 0.0;
        let adjusted = this.yearlyLongTermCapitalGainsAccumulator.amount + this.yearlyTaxableIncomeAccumulator.amount;
        for (const taxRow of this.activeCapitalGainsTable.taxRows) {
            if (adjusted >= taxRow.fromAmount && adjusted >= taxRow.toAmount)
                tax += (taxRow.toAmount - taxRow.fromAmount) * taxRow.rate;
            else if (adjusted >= taxRow.fromAmount && adjusted < taxRow.toAmount)
                tax += (adjusted - taxRow.fromAmount) * taxRow.rate;
        }
        return tax;
    }

    applyYear(portfolio) {
        this.calculateIncomeTax();
        this.calculateCapitalGainsTax();
    }

    iraContributionLimit(activeUser) {
        if (activeUser.age < 50)
            return new Currency(this.iraContributionLimitBelow50);
        else
            return new Currency(this.iraContributionLimit50AndOver);
    }
}