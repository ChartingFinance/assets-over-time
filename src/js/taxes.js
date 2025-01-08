class TaxRow {
    constructor(rate, from, to) {

    }
}

class TaxTable {
    constructor(year) {
        this.taxes = null;
        fetch('/src/json/us_2024.json')
            .then(response => response.json())
            .then(data => {
                this.taxes = data;
                console.log(this.taxes);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }

    applyAnnualTaxes(modelAssets) {
        if (!modelAssets) {
            console.log('TaxTable.applyAnnualTaxes has null modelAssets');
            return;
        }

        let taxableIncome = new Currency();
        let mortgageDeduction = new Currency();
        let shortTermCapitalGains = new Currency();
        let longTermCapitalGains = new Currency();
        // todo - qualified vs non-qualified dividends

        for (const modelAsset of modelAssets) {
            taxableIncome.add(activeTaxTable.calculateIncome(modelAsset));
            shortTermCapitalGains.add(activeTaxTable.calculateShortTermCapitalGains(modelAsset));
            longTermCapitalGains.add(activeTaxTable.calculateLongTermCaptialGains(modelAsset));
            mortgageDeduction.add(activeTaxTable.calculateMortgageDeduction(modelAsset));
        }   
    }

    calculateIncome(modelAsset) {
        if (isMonthlyIncome(modelAsset)) {
            return modelAsset.lastTwelveMonthsTotal();
        }
        else
            return new Currency(0);
    }

    calculateShortTermCapitalGains(modelAsset) {
        return new Currency(0);
    }

    calculateLongTermCaptialGains(modelAsset) {
        return new Currency(0);
    }

    calculateMortgageDeduction(modelAsset) {
        return new Currency(0);
    }
}