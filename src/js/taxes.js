const us_2024_taxtables = {
    "year": 2024,
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
    constructor(year) {
        this.taxes = null;     
        this.initializeChron();
    }

    initializeChron() {
        this.activeTaxTables = us_2024_taxtables;
        if (global_filingAs == 'Single') {
            this.activeIncomeTable = Object.assign({}, this.activeTaxTables.income.tables[0]);
            this.activeCapitalGainsTable = Object.assign({}, this.activeTaxTables.capitalGains.tables[0]);
            this.activeStandardDeduction = this.activeTaxTables.standardDeduction.single;
        }
        else {
            this.activeIncomeTable = Object.assign({}, this.activeTaxTables.income.tables[1]);
            this.activeCapitalGainsTable = Object.assign({}, this.activeTaxTables.capitalGains.tables[1]);
            this.activeStandardDeduction = this.activeTaxTables.standardDeduction.married;
        }

        this.yearlyTaxableIncomeAccumulator = new Currency();
        this.yearlyShortTermCapitalGainsAccumulator = new Currency();
        this.yearlyLongTermCapitalGainsAccumulator = new Currency();    
        this.yearlyMortgageDeductionAccumulator = new Currency();
        this.yearlyPropertyTaxDeductionAccumulator = new Currency();

        this.yearlyTaxes = [];
        this.estimatedTaxPayments = [];
        this.yearlyPayments = [];
    
    }

    startYear() {
        this.yearlyTaxableIncomeAccumulator = new Currency();
        this.yearlyShortTermCapitalGainsAccumulator = new Currency();
        this.yearlyLongTermCapitalGainsAccumulator = new Currency();    
        this.yearlyMortgageDeductionAccumulator = new Currency();
        this.yearlyPropertyTaxDeductionAccumulator = new Currency();

        // apply inflation to the tax rows
        this.inflateTaxes();
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
        this.inflateTaxRows(this.activeTaxTables.income.tables);
        this.inflateTaxRows(this.activeTaxTables.capitalGains.tables);
    }

    isEstimatedTaxPaymentDue(currentDateInt) {
        return (currentDateInt.month == 1 || currentDateInt.month == 4 || currentDateInt.month == 6 || currentDateInt.month == 9);
    }

    isYearlyTaxPaymentDue(currentDateInt) {
        return (currentDateInt.month == 4);
    }

    addEstimatedTaxPayment(amount) {
        let mostRecent = this.estimatedTaxPayments.length -1;
        if (mostRecent == -1)
            this.estimatedTaxPayments.push(amount);            
        else
            this.estimatedTaxPayments[mostRecent] += amount;
    }

    applyMonthlyTaxes(currentDateInt, modelAssets, activeUser) {
        console.log('TaxTable.applyMonthlyTaxes');

        if (!modelAssets) {
            console.log('TaxTable.applyMonthlyTaxes has null modelAssets');
            return;
        }
        // todo - qualified vs non-qualified dividends

        for (const modelAsset of modelAssets) {
            this.yearlyTaxableIncomeAccumulator.add(activeTaxTable.calculateIncome(currentDateInt, modelAsset, modelAssets, activeUser));
            this.yearlyShortTermCapitalGainsAccumulator.add(activeTaxTable.calculateShortTermCapitalGains(currentDateInt, modelAsset));
            this.yearlyLongTermCapitalGainsAccumulator.add(activeTaxTable.calculateLongTermCaptialGains(currentDateInt, modelAsset));
            this.yearlyMortgageDeductionAccumulator.add(activeTaxTable.calculateMortgageDeduction(currentDateInt, modelAsset));
            this.yearlyPropertyTaxDeductionAccumulator.add(activeTaxTable.calculatePropertyTaxDeduction(currentDateInt, modelAsset));
        }
    }

    applyYearlyTaxes(currentDateInt, modelAssets) {
        console.log('TaxTable.applyYearlyTaxes');

        if (!modelAssets) {
            console.log('TaxTable.applyYearlyTaxes has null modelAssets');
            return;
        }

        // todo - qualified vs non-qualified dividends
        this.calculateIncomeTax(modelAssets);
        this.calculateCapitalGainsTax(modelAssets);

        this.startYear();
    }

    payEstimatedTaxes(currentDateInt, modelAssets) {
        // see what the estimated total is for this period
        let totalEstimatedTax = new Currency(this.estimatedTaxPayments[this.estimatedTaxPayments.length -1]);

        console.log('TaxTable.payEstimatedTaxes: ' + totalEstimatedTax.toCurrency());

        // find the modelAssets to be used for the estimated tax payments
        let modelAssetsForEstimatedTaxes = util_findAssetModelsToUseForTaxes(modelAssets);
        
        if (modelAssetsForEstimatedTaxes.length > 0) {
            let partialEstimatedTax = new Currency(totalEstimatedTax.amount / modelAssetsForEstimatedTaxes.length);
            for (modelAsset of modelAssetsForEstimatedTaxes) {
                modelAsset.finishCurrency.subtract(partialEstimatedTax);
            }
        }

        this.estimatedTaxPayments.push(0.0);
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
        if (this.yearlyTaxes.length == 0) { // means we are at a payment date, but no data. So pay $0
            this.yearlyTaxes.push(0);
        }

        // see what the total is for this period
        let totalTax = new Currency(this.yearlyTaxes[this.yearlyTaxes.length -1]);

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

    calculateIncome(currentDateInt, modelAsset, modelAssets, activeUser) {
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
                let rmd = activeTaxTable.calculateMonthlyRMD(null, modelAsset, activeUser);
                console.log('RMD for ' + modelAsset.displayName + ' is ' + rmd.toCurrency());

                let monthlyExpenses = computeMonthlyExpensesFor(modelAssets, modelAsset.displayName);
                
                if (rmd.amount > monthlyExpenses.amount)
                    return rmd;
                else
                    return monthlyExpenses;
            }
        }        
        
        return new Currency(0);
    }

    calculateShortTermCapitalGains(currentDateInt, modelAsset) {
        if (isTaxableAccount(modelAsset.instrument) && !modelAsset.holdAllUntilFinish) {
            let c = modelAsset.earningCurrency;
            // TODO: assume 20% short time for time being. Make it configurable
            c.multiply(0.2);
            this.addEstimatedTaxPayment(c.amount * 0.2);
            return c;
        }
        else
            return new Currency(0);
    }

    calculateLongTermCaptialGains(currentDateInt, modelAsset) {
        if (isTaxableAccount(modelAsset.instrument) && !modelAsset.holdAllUntilFinish) {
            let c = modelAsset.earningCurrency;
            // TODO: assume 80% long time for time being. Make it configurable
            c.multiply(0.8);
            this.addEstimatedTaxPayment(c.amount * 0.15);
            return c;
        }
        else
            return new Currency(0);
    }

    addLongTermCapitalGains(currency) {
        this.yearlyLongTermCapitalGainsAccumulator.add(currency);
    }

    calculateMortgageDeduction(currentDateInt, modelAsset) {
        if (isMortgage(modelAsset.instrument)) {
            return modelAsset.earningCurrency;
        }
        else
            return new Currency(0);
    }

    calculatePropertyTaxDeduction(currentDateInt, modelAsset) {
        if (isHome(modelAsset.instrument)) {
            let oneMonthRate = global_propertyTaxRate / 12.0;
            let c = new Currency(modelAsset.finishCurrency.amount * oneMonthRate);
            if (c.amount > (global_propertyTaxDeductionMax / 12.0))
                c.amount = global_propertyTaxDeductionMax / 12.0;
            return c;
        }
        return new Currency(0);
    }

    calculateMonthlyRMD(currentDateInt, modelAsset, activeUser) {
        if (isTaxDeferred(modelAsset.instrument) && activeUser.age >= 73) {
            let divisor = 0;
            for (const table of uniformLifetimeTable) {
                if (table.age == activeUser.age) {
                    divisor = table.divisor;
                    break;
                }
            }
            if (divisor == 0) {
                console.log('TaxTable.calculateRMD: could not find divisor for age ' + modelAsset.age);
                return new Currency(0);
            }

            let rmd = modelAsset.finishCurrency.amount / divisor;
            rmd /= 12.0;
            return new Currency(rmd);
        }
        return new Currency(0);
    }

    applyDeductions() {
        // deductions
        if (this.yearlyMortgageDeductionAccumulator.amount < 0.0 && this.yearlyPropertyTaxDeductionAccumulator.amount > 0.0) {
            this.yearlyTaxableIncomeAccumulator.add(this.yearlyMortgageDeductionAccumulator);
            this.yearlyTaxableIncomeAccumulator.subtract(this.yearlyPropertyTaxDeductionAccumulator);
        }
        else {
            let c = new Currency(this.activeStandardDeduction);;            
            this.yearlyTaxableIncomeAccumulator.subtract(c);
        }
    }

    calculateIncomeTax() {
        this.yearlyTaxableIncomeAccumulator.add(this.yearlyShortTermCapitalGainsAccumulator);

        this.applyDeductions();        

        let tax = 0.0;
        let adjusted = this.yearlyTaxableIncomeAccumulator.amount;
        for (const taxRow of this.activeIncomeTable.taxRows) {
            if (adjusted >= taxRow.fromAmount && adjusted >= taxRow.toAmount)
                tax += (taxRow.toAmount - taxRow.fromAmount) * taxRow.rate;
            else if (adjusted >= taxRow.fromAmount && adjusted < taxRow.toAmount)
                tax += (adjusted - taxRow.fromAmount) * taxRow.rate;
        }
        let c = new Currency(tax);
        this.yearlyTaxes.push(c.toCurrency());
    }

    calculateCapitalGainsTax() {          
        let tax = 0.0;
        let adjusted = this.yearlyLongTermCapitalGainsAccumulator.amount; // + this.yearlyTaxableIncomeAccumulator.amount;
        for (const taxRow of this.activeCapitalGainsTable.taxRows) {
            if (adjusted >= taxRow.fromAmount && adjusted >= taxRow.toAmount)
                tax += (taxRow.toAmount - taxRow.fromAmount) * taxRow.rate;
            else if (adjusted >= taxRow.fromAmount && adjusted < taxRow.toAmount)
                tax += (adjusted - taxRow.fromAmount) * taxRow.rate;
        }
        let c = new Currency(tax);
        this.yearlyTaxes[this.yearlyTaxes.length -1] += c.toCurrency();
    }
}