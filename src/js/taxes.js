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
    }
}; 

class TaxTable {
    constructor(year) {
        this.taxes = null;
        this.activeTaxTables = us_2024_taxtables;
        this.activeIncomeTable = this.activeTaxTables.income.tables[0];
        this.activeCapitalGainsTable = this.activeTaxTables.capitalGains.tables[0];

        /*
        fetch('/src/json/us_2024.json')
            .then(response => response.json())
            .then(data => {
                this.taxes = data;
                this.activeTable = this.taxes.income.tables[0];
                console.log(this.taxes);
                initialize();
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
        */

        this.yearlyTaxableIncomeAccumulator = new Currency();
        this.yearlyMortgageDeductionAccumulator = new Currency();
        this.yearyShortTermCapitalGainsAccumulator = new Currency();
        this.yearlyLongTermCapitalGainsAccumulator = new Currency();
        this.yearlyPropertyTaxDeductionAccumulator = new Currency();
        this.yearlyTaxes = [];
        this.startMonthCalls = 0;
    }

    startMonth() {
        this.startMonthCalls = 1;
        this.yearlyTaxes = [];
    }

    startYear() {
        this.yearlyTaxableIncomeAccumulator = new Currency();
        this.yearlyMortgageDeductionAccumulator = new Currency();
        this.yearyShortTermCapitalGainsAccumulator = new Currency();
        this.yearlyLongTermCapitalGainsAccumulator = new Currency();
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

    applyMonthlyTaxes(currentDateInt, modelAssets) {
        if (!this.startMonthCalls) {
            console.log('TaxTable.applyMonthlyTaxes called before TaxTable.startMonth initialization');
            return;
        }

        if (!modelAssets) {
            console.log('TaxTable.applyMonthlyTaxes has null modelAssets');
            return;
        }
        // todo - qualified vs non-qualified dividends

        for (const modelAsset of modelAssets) {
            this.yearlyTaxableIncomeAccumulator.add(activeTaxTable.calculateIncome(currentDateInt, modelAsset, modelAssets));
            this.yearlyLongTermCapitalGainsAccumulator.add(activeTaxTable.calculateLongTermCaptialGains(currentDateInt, modelAsset));
            this.yearlyMortgageDeductionAccumulator.add(activeTaxTable.calculateMortgageDeduction(currentDateInt, modelAsset));
            this.yearlyPropertyTaxDeductionAccumulator.add(activeTaxTable.calculatePropertyTaxDeduction(currentDateInt, modelAsset));
        }   
    }

    applyYearlyTaxes(currentDateInt, modelAssets) {
        if (!modelAssets) {
            console.log('TaxTable.applyYearlyTaxes has null modelAssets');
            return;
        }

        // todo - qualified vs non-qualified dividends
        this.calculateIncomeTax(modelAssets);

        this.startYear();
    }

    payYearlyTaxes(currentDateInt, modelAssets) {
        // scan through model assets and check for 'useForTaxes' property
        for (modelAsset of modelAssets) {
            if (modelAsset.useForTaxes) {
                let c = new Currency(this.yearlyTaxes[this.yearlyTaxes.length -1]);
                modelAsset.finishCurrency.subtract(c);
                return;
            }
        }
    }

    calculateIncome(currentDateInt, modelAsset, modelAssets) {
        if (isMonthlyIncome(modelAsset.instrument)) {
            if (modelAsset.startDateInt.toInt() <= currentDateInt.toInt() && modelAsset.finishDateInt.toInt() > currentDateInt.toInt())
                return modelAsset.finishCurrency;
            else
                return new Currency(0);
        }
        else if (isMonthlyExpense(modelAsset.instrument)) {
            // find the funding model asset and determine income
            let fundingAsset = findModelAssetByDisplayName(modelAssets, modelAsset.fundingSource);
            if (fundingAsset) {
                if (isTaxDeferred(fundingAsset.instrument)) {
                    let asIncome = new Currency(modelAsset.finishCurrency.amount);
                    asIncome.flipSign();                    
                    return asIncome;                    
                }
            }
            return new Currency(0);
        }
        else if (isTaxableAccount(modelAsset.instrument)) {
            return this.calculateShortTermCapitalGains(currentDateInt, modelAsset);            
        }
        else
            return new Currency(0);
    }

    calculateShortTermCapitalGains(currentDateInt, modelAsset) {
        if (isTaxableAccount(modelAsset.instrument)) {
            let c = modelAsset.earningCurrency;
            // TODO: assume 20% short time for time being. Make it configurable
            return c.multiply(0.2);
        }
        else
            return new Currency(0);
    }

    calculateLongTermCaptialGains(currentDateInt, modelAsset) {
        if (isTaxableAccount(modelAsset.instrument)) {
            let c = modelAsset.earningCurrency;
            // TODO: assume 80% long time for time being. Make it configurable
            return c.multiply(0.8);
        }
        else
            return new Currency(0);
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

    calculateIncomeTax() {
        // quick deductions
        this.yearlyTaxableIncomeAccumulator.add(this.yearlyMortgageDeductionAccumulator);
        this.yearlyTaxableIncomeAccumulator.subtract(this.yearlyPropertyTaxDeductionAccumulator);

        let tax = 0.0;
        for (const taxRow of this.activeIncomeTable.taxRows) {
            if (this.yearlyTaxableIncomeAccumulator.amount >= taxRow.fromAmount && this.yearlyTaxableIncomeAccumulator.amount >= taxRow.toAmount)
                tax += (taxRow.toAmount - taxRow.fromAmount) * taxRow.rate;
            else if (this.yearlyTaxableIncomeAccumulator.amount >= taxRow.fromAmount && this.yearlyTaxableIncomeAccumulator.amount < taxRow.toAmount)
                tax += (this.yearlyTaxableIncomeAccumulator.amount - taxRow.fromAmount) * taxRow.rate;
        }
        let c = new Currency(tax);
        this.yearlyTaxes.push(c.toCurrency());
    }
}