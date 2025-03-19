function chronometer_applyMonths(modelAssets) {
    if (modelAssets == null || modelAssets.length == 0) {
        console.log('chronometer_applyMonths - no modelAssets');
        return;
    }

    modelAssets = chronometer_sortModelAssets(modelAssets);

    let activeUser = new User(global_user_startAge);

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
            totalMonths += chronometer_applyMonth(firstDateInt, lastDateInt, currentDateInt, modelAssets, activeUser);
            currentDateInt.next();
        }

        summary_setAccruedMonths(totalMonths);
        summary_computeCAGR()
    }
}

function chronometer_sortModelAssets(modelAssets) {
    console.log('chronometer_sortModelAssets');

    modelAssets.sort(function (a, b) {
        if (isMonthlyIncome(a.instrument)) {
            if (isMonthlyIncome(b.instrument))
                return a.displayName.localeCompare(b.displayName);
            else
                return -1;
        }
        else if (isMonthlyIncome(b.instrument)) {
            if (isMonthlyIncome(a.instrument))
                return a.displayName.localeCompare(b.displayName);
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
                return a.displayName.localeCompare(b.displayName);
            else
                return -1;
        }
        else
            return a.displayName.localeCompare(b.displayName);
    });

    return modelAssets;
}

function chronometer_applyMonth_accumulate(firstDateInt, lastDateInt, currentDateInt, modelAsset, activeUser) {
    let startTotal = new Currency(0.0);
    let finishTotal = new Currency(0.0);
    let accumulatedValue = new Currency(0.0);

    //for (const modelAsset of modelAssets) {
        if (modelAsset.applyMonth(currentDateInt, activeUser)) {
            if (firstDateInt.toInt() == currentDateInt.toInt())
                startTotal.add(modelAsset.startCurrency);
            if (lastDateInt.toInt() == currentDateInt.toInt())
                finishTotal.add(modelAsset.finishCurrency);
            accumulatedValue.add(modelAsset.accumulatedCurrency);
        }
    //};

    let result = { startTotal: startTotal, finishTotal: finishTotal, accumulatedValue: accumulatedValue };
    return result;
}


function chronometer_applyMonth(firstDateInt, lastDateInt, currentDateInt, modelAssets, activeUser) {
    console.log('chronometer_applyMonth');

    chronometer_applyTaxesBeforeComputationsThisMonth(currentDateInt, modelAssets, activeUser);

    //let result = chronometer_applyMonth_accumulate(firstDateInt, lastDateInt, currentDateInt, modelAssets, activeUser);
    let summary = { startTotal: new Currency(0.0), finishTotal: new Currency(0.0), totalMonths: 0, accumulatedValue: new Currency(0.0) };

    for (const modelAsset of modelAssets) {

        let result = chronometer_applyMonth_accumulate(firstDateInt, lastDateInt, currentDateInt, modelAsset, activeUser);
        summary.startTotal.add(result.startTotal);
        summary.finishTotal.add(result.finishTotal);
        summary.totalMonths += 1;
        summary.accumulatedValue.add(result.accumulatedValue);

        if (isMonthlyExpense(modelAsset.instrument) || isMonthlyIncome(modelAsset.instrument)) {
            if (modelAsset.inMonth(currentDateInt)) {
                let fundingSourceAsset = util_findModelAssetByDisplayName(modelAssets, modelAsset.fundingSource);
                if (fundingSourceAsset) {
                    console.log(modelAsset.displayName + ' ' + modelAsset.finishCurrency.toCurrency() + ' to ' + fundingSourceAsset.displayName);
                    fundingSourceAsset.finishCurrency.add(modelAsset.finishCurrency);                    
                }
            }
        }
        else if (modelAsset.isFinishDateInt(currentDateInt)) {
            let fundingSourceAsset = util_findModelAssetByDisplayName(modelAssets, modelAsset.fundingSource);
            if (fundingSourceAsset) {
                console.log(modelAsset.displayName + ' ' + modelAsset.finishCurrency.toCurrency() + ' to ' + fundingSourceAsset.displayName);
                fundingSourceAsset.finishCurrency.add(modelAsset.finishCurrency);
                // add the accumulated value to this year's capital gains
                activeTaxTable.addLongTermCapitalGains(modelAsset.accumulatedCurrency);
            }
        }
        else if (isTaxDeferred(modelAsset.instrument)) {
            if (activeUser.getAge() >= 73) {
                // if the user is 73 or older, then they must take RMDs
                let rmd = activeTaxTable.calculateMonthlyRMD(currentDateInt, modelAsset, activeUser);
                console.log('RMD for ' + modelAsset.displayName + ' is ' + rmd.toCurrency());
                modelAsset.monthlyRMDs.push(rmd.toCurrency());

                // adjust the monthly expenses for the RMD, sending the remainder to the funding source
                let monthlyExpenses = computeMonthlyExpensesFor(modelAssets, modelAsset.displayName);

                rmd.add(monthlyExpenses);
                
                if (rmd.amount > 0) {
                    let fundingSourceAsset = util_findModelAssetByDisplayName(modelAssets, modelAsset.fundingSource);
                    if (fundingSourceAsset) {
                        console.log(modelAsset.displayName + ' depositing ' + rmd.toCurrency() + ' from RMD to ' + fundingSourceAsset.displayName);
                        fundingSourceAsset.finishCurrency.add(rmd);                        
                        modelAsset.finishCurrency.subtract(rmd);
                    }
                    else {
                        console.log(modelAsset.displayName + ' needs a fundingSource in order to deposit RMD value');
                    }
                }
            }
            else
                modelAsset.monthlyRMDs.push(0.0);
        }       
    }

    this.chronometer_applyTaxesAfterComputationsThisMonth(currentDateInt, modelAssets, activeUser);

    if (firstDateInt.toInt() == currentDateInt.toInt())
        summary_setStartValue(summary.startTotal);

    if (lastDateInt.toInt() == currentDateInt.toInt())
        summary_setFinishValue(summary.finishTotal);  
    
    summary_setAccumulatedValue(summary.accumulatedValue);

    activeUser.addMonths(1);

    return summary.totalMonths;
}

function chronometer_applyTaxesBeforeComputationsThisMonth(currentDateInt, modelAssets, activeUser) {
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

function chronometer_applyTaxesAfterComputationsThisMonth(currentDateInt, modelAssets, activeUser) {
    console.log('chronometer_applyTaxesAfterComputationsThisMonth');

    if (!activeTaxTable) {
        console.log('chronometer_applyTaxesAfterComputationsThisMonth - activeTaxTable not set');
        return;
    }

    activeTaxTable.applyMonthlyTaxes(currentDateInt, modelAssets, activeUser);
}