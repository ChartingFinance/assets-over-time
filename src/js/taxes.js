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
            this.iraContributionLimit50AndOver = 16000;
        }

        this.yearlySocialSecurityAccumulator = new Currency();

        /*

        this.yearlyMedicareAccumulator = new Currency();
        this.yearlyFICAAccumulator = new Currency();
        this.yearlyIncomeTaxWithholdingAccumulator = new Currency();
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
        */

    }

    monthlyChron() {

    }

    yearlyChron() {

        this.yearlySocialSecurityAccumulator.zero();

        /*
        
        this.yearlyMedicareAccumulator.zero();
        this.yearlyIncomeTaxWithholdingAccumulator.zero();
        this.yearlyTaxableIncomeAccumulator.zero();
        this.yearlyRMDsAccumulator.zero();
        this.yearlyShortTermCapitalGainsAccumulator.zero();
        this.yearlyLongTermCapitalGainsAccumulator.zero();    
        this.yearlyMortgageDeductionAccumulator.zero();
        this.yearlyPropertyTaxDeductionAccumulator.zero();
        */

        // apply inflation to the tax rows
        this.inflateTaxes();

    }

    finalizeChron() {

    }

    /*
    funcYearlyWithholding() {

        let yearlyWithholding = new Currency(this.yearlySocialSecurityAccumulator.amount);
        yearlyWithholding.add(this.yearlyMedicareAccumulator);
        yearlyWithholding.add(this.yearlyIncomeTaxWithholdingAccumulator.amount);
        return yearlyWithholding;
        
    }
    */

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

    calculateMonthlyWithholding(isSelfEmployed, income) {

        let result = this.calculateFICATax(isSelfEmployed, income);
        result.income.add(this.calculateMonthlyIncomeTax(income, new Currency()));                        
        return result;

    }

    calculateFICATax(isSelfEmployed, income) {

        /*
        if (modelAsset.displayName == 'SSN') {
            // social security is not taxed for FICA
            console.log('TaxTable.calculateMonthlyFICAWithholding - SSN is not taxed for FICA');
            return;
        }
        */

        let result = new WithholdingResult(new Currency(), new Currency(), new Currency());
        result.socialSecurity.add(this.calculateSocialSecurityTax(isSelfEmployed, income));
        result.medicare.add(this.calculateMedicareTax(isSelfEmployed, income));
        return result;

    }

    calculateSocialSecurityTax(isSelfEmployed, income) {

        let c = null;
        let maxC = null;
        if (isSelfEmployed) {
            c = new Currency(income.amount * this.activeTaxTables.fica.ssFullRate);
            maxC = new Currency(this.activeTaxTables.fica.maxSSEarnings * this.activeTaxTables.fica.ssFullRate);
        }
        else {
            c = new Currency(income.amount * this.activeTaxTables.fica.ssHalfRate);
            maxC = new Currency(this.activeTaxTables.fica.maxSSEarnings * this.activeTaxTables.fica.ssHalfRate);
        }
            
        if (this.yearlySocialSecurityAccumulator.amount + c.amount > maxC.amount) {
            c.amount = maxC.amount - this.yearlySocialSecurityAccumulator.amount;
        }

        //modelAsset.addMonthlySocialSecurity(c);
        return c;

    }

    calculateMedicareTax(isSelfEmployed, income) {        

        let c = new Currency();
        if (isSelfEmployed)
            c = new Currency(income.amount * this.activeTaxTables.fica.medicareFullRate);
        else
            c = new Currency(income.amount * this.activeTaxTables.fica.medicareHalfRate);

        //modelAsset.addMonthlyMedicare(c);
        return c;

    }

    calculateMonthlyIncomeTax(income, deduction) {

        let yearlyIncome = new Currency(income.amount * 12.0);
        let yearlyDeduction = new Currency();;
        if (deduction)
            yearlyDeduction = new Currency(deduction.amount * 12.0);

        let yearlyTax = this.calculateYearlyIncomeTax(yearlyIncome, yearlyDeduction);
        let monthlyTax = new Currency(yearlyTax.amount / 12.0);
        return monthlyTax;

    }

    calculateYearlyIncomeTax(income, deduction) {

        let adjusted = new Currency(income.amount);
        if (deduction)
            adjusted.subtract(deduction.amount);

        let tax = 0.0;
        for (const taxRow of this.activeIncomeTable.taxRows) {
            if (adjusted.amount >= taxRow.fromAmount && adjusted.amount >= taxRow.toAmount)
                tax += (taxRow.toAmount - taxRow.fromAmount) * taxRow.rate;
            else if (adjusted.amount >= taxRow.fromAmount && adjusted.amount < taxRow.toAmount)
                tax += (adjusted.amount - taxRow.fromAmount) * taxRow.rate;
        }

        return new Currency(tax);

    }

    estimateMonthlyLongTermCapitalGainsTax(taxableIncome, capitalGains) {

        let yearlyIncome = new Currency(income.amount * 12.0);
        let yearlyCapitalGains = new Currency(capitalGains.amount * 12.0);
        
        let yearlyTax = this.calculateYearlyLongTermCapitalGainsTax(yearlyIncome, yearlyCapitalGains);
        let monthlyTax = new Currency(yearlyTax.amount / 12.0);
        return monthlyTax;

    }

    calculateYearlyLongTermCapitalGainsTax(taxableIncome, capitalGains) {          
        
        let tax = 0.0;
        for (const taxRow of this.activeCapitalGainsTable.taxRows) {
            let fromAdjusted = new Currency(taxRow.fromAmount).subtract(taxableIncome);
            let toAdjusted = new Currency(taxRow.toAmount).subtract(taxableIncome);
            if (capitalGains.amount >= fromAdjusted.amount && capitalGains.amount >= toAdjusted.amount)
                tax += (toAdjusted.amount - fromAdjusted.amount) * taxRow.rate;
            else if (capitalGains.amount >= fromAdjusted.amount && capitalGains.amount < toAdjusted.amount)
                tax += (capitalGains.amount - fromAdjusted.amount) * taxRow.rate;               
        }
        return new Currency(tax);

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

    applyYearlyDeductions(yearly, taxableIncome) {

        let propertyTaxDeduction = new Currency(yearly.propertyTaxes.amount);
        
        if (propertyTaxDeduction.amount < 0)
            propertyTaxDeduction.flipSign();

        // maximum property tax deduction
        if (propertyTaxDeduction.amount > global_propertyTaxDeductionMax)
            propertyTaxDeduction.amount = global_propertyTaxDeductionMax;

        if (propertyTaxDeduction.amount > 0)
            propertyTaxDeduction.flipSign();

        let totalDeduction = new Currency(yearly.mortgageInterest.amount + propertyTaxDeduction.amount);
        totalDeduction.flipSign();

        if (totalDeduction.amount > this.activeStandardDeduction) {
            taxableIncome.subtract(totalDeduction);
        }
        else {
            let c = new Currency(this.activeStandardDeduction);;            
            taxableIncome.subtract(c);
        }
        return taxableIncome;

    }

    reconcileYearlyTax(yearly) {

        let yearlyFICA = this.calculateYearlyFICATax(yearly);
        if (yearlyFICA.amount != yearly.fica.amount)
            console.log('computed yearly FICA != portfolio yearly FICA')
        else
            console.log('computed yearly FICA check PASSED');

        let yearlyTaxableIncome = this.calculateYearlyTaxableIncome(yearly);
        if (yearlyTaxableIncome.amount != (yearly.selfIncome.amount + yearly.employedIncome.amount))
            console.log('computed yearly taxable income != portfolio yearly taxable income');
        else
            console.log('computed yearly taxable income check PASSED');

        let yearlyIncomeTax = this.calculateYearlyIncomeTax(yearlyTaxableIncome, new Currency());
        if (yearlyIncomeTax.amount != yearly.incomeTax.amount)
            console.log('computed yearly income tax != portfolio yearly income tax');
        else
            console.log('computed yearly income tax check PASSED');

        return new Currency();

    }

    calculateYearlyFICATax(yearly) {
        
        let ficaTaxSelf = this.calculateFICATax(true, yearly.selfIncome);
        let ficaTaxEmployed = this.calculateFICATax(false, yearly.employedIncome);        
        return new Currency(ficaTaxSelf.amount + ficaTaxEmployed.amount);

    }

    calculateYearlyTaxableIncome(yearly) {

        let taxableIncome = new Currency(yearly.selfIncome.amount + yearly.employedIncome.amount);
        taxableIncome.add(yearly.iraDistribution);
        taxableIncome.add(yearly.shortTermCapitalGains);   
        taxableIncome.add(yearly.interest);
        return this.applyYearlyDeductions(yearly, taxableIncome);

    }

    /*
    calculateYearlyNonFICATaxableIncome(yearly) {

        let nonFICATaxableIncome = new Currency(yearly.selfIncome.amount + yearly.employedIncome.amount);
        nonFICATaxableIncome.add(yearly.iraDistribution);
        nonFICATaxableIncome.add(yearly.shortTermCapitalGains);   
        nonFICATaxableIncome.add(yearly.interest);
        return this.applyYearlyDeductions(yearly, nonFICATaxableIncome);

    }
    */

    applyYear(yearly) {
        this.reconcileYearlyTax(yearly);

        let yearlyFICATax = this.calculateYearlyFICATax(yearly);
        let yearlyTaxableIncome = this.calculateYearlyTaxableIncome(yearly);
        let yearlyIncomeTax = this.calculateYearlyIncomeTax(yearlyTaxableIncome);        
        
        let yearlyLongTermCapitalGainsAndQualifiedDividends = new Currency(yearly.longTermCapitalGains.amount + yearly.qualifiedDividends.amount);
        let yearlyLongTermCapitalGainsAndQualifiedDividendsTax = this.calculateYearlyLongTermCapitalGainsTax(yearlyTaxableIncome, yearlyLongTermCapitalGainsAndQualifiedDividends);
        console.log('Taxes.applyYear|yearlyLongTermCapitalGainsAndQualifiedDividendsTax: ' + yearlyLongTermCapitalGainsAndQualifiedDividendsTax.toString());
    }

    iraContributionLimit(activeUser) {
        if (activeUser.age < 50)
            return new Currency(this.iraContributionLimitBelow50);
        else
            return new Currency(this.iraContributionLimit50AndOver);
    }
}