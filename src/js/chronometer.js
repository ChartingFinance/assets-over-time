function chronometer_applyMonths(modelAssets) {
    if (activeTaxTable != null)
        activeTaxTable.initializeChron();

    if (modelAssets != null && modelAssets.length > 0) {
        for (modelAsset of modelAssets) {
            modelAsset.initializeChron();
        }

        const firstDateInt = util_firstDateInt(modelAssets);
        const lastDateInt = util_lastDateInt(modelAssets);

        summary_setStartDate(firstDateInt);
        summary_setFinishDate(lastDateInt);
        let totalMonths = 0;

        let currentDateInt = new DateInt(firstDateInt.toInt());
        while (currentDateInt.toInt() <= lastDateInt.toInt()) {
            totalMonths += chronometer_applyMonth(firstDateInt, lastDateInt, currentDateInt, modelAssets);
            currentDateInt.next();
        }

        summary_setAccruedMonths(totalMonths);
        summary_computeCAGR()
    }
}

function chronometer_applyMonth(firstDateInt, lastDateInt, currentDateInt, modelAssets) {
    console.log('chronometer_applyMonth');

    this.chronometer_applyTaxesBeforeComputationsThisMonth(currentDateInt, modelAssets);

    let startTotal = new Currency(0.0);
    let finishTotal = new Currency(0.0);
    let accumulatedValue = new Currency(0.0);
    let totalMonths = 0;

    for (const modelAsset of modelAssets) {
        if (modelAsset.applyMonth(currentDateInt)) {
            if (firstDateInt.toInt() == currentDateInt.toInt())
                startTotal.add(modelAsset.startCurrency);
            if (lastDateInt.toInt() == currentDateInt.toInt())
                finishTotal.add(modelAsset.finishCurrency);
            accumulatedValue.add(modelAsset.accumulatedCurrency);
            ++totalMonths;
        }
    };

    for (const modelAsset of modelAssets) {
        if (isMonthlyExpense(modelAsset.instrument) || isMonthlyIncome(modelAsset.instrument)) {
            if (modelAsset.inMonth(currentDateInt)) {
                let fundingSourceAsset = findModelAssetByDisplayName(modelAssets, modelAsset.fundingSource);
                if (fundingSourceAsset) {
                    console.log(modelAsset.displayName + ' ' + modelAsset.finishCurrency.toCurrency() + ' to ' + fundingSourceAsset.displayName);
                    fundingSourceAsset.finishCurrency.add(modelAsset.finishCurrency);                    
                }
            }
        }
        else if (modelAsset.isFinishDateInt(currentDateInt)) {
            let fundingSourceAsset = findModelAssetByDisplayName(modelAssets, modelAsset.fundingSource);
            if (fundingSourceAsset) {
                console.log(modelAsset.displayName + ' ' + modelAsset.finishCurrency.toCurrency() + ' to ' + fundingSourceAsset.displayName);
                fundingSourceAsset.finishCurrency.add(modelAsset.finishCurrency);
                // add the accumulated value to this year's capital gains
                activeTaxTable.addLongTermCapitalGains(modelAsset.accumulatedCurrency);
            }
        }
    }

    this.chronometer_applyTaxesAfterComputationsThisMonth(currentDateInt, modelAssets);

    if (firstDateInt.toInt() == currentDateInt.toInt())
        summary_setStartValue(startTotal);

    if (lastDateInt.toInt() == currentDateInt.toInt())
        summary_setFinishValue(finishTotal);  
    
    summary_setAccumulatedValue(accumulatedValue);

    return totalMonths;
}

function chronometer_applyTaxesBeforeComputationsThisMonth(currentDateInt, modelAssets) {
    console.log('chronometer_applyTaxesBeforeComputationsThisMonth');

    if (!activeTaxTable) {
        console.log('chronometer_applyTaxesBeforeComputationsThisMonth - activeTaxTable not set');
        return;
    }

    // first things first, compute last year's taxes in January
    // think about quarterly tax estimates
    if (currentDateInt.month == 1)
        activeTaxTable.applyYearlyTaxes(currentDateInt, modelAssets);        

    if (activeTaxTable.isEstimatedTaxPaymentDue(currentDateInt))
        activeTaxTable.payEstimatedTaxes(currentDateInt, modelAssets);

    if (activeTaxTable.isYearlyTaxPaymentDue(currentDateInt))
        activeTaxTable.payYearlyTaxes(currentDateInt, modelAssets);
}

function chronometer_applyTaxesAfterComputationsThisMonth(currentDateInt, modelAssets) {
    console.log('chronometer_applyTaxesAfterComputationsThisMonth');

    if (!activeTaxTable) {
        console.log('chronometer_applyTaxesAfterComputationsThisMonth - activeTaxTable not set');
        return;
    }

    activeTaxTable.applyMonthlyTaxes(currentDateInt, modelAssets);
}