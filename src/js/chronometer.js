function chronometer_run(summaryContainerElement, portfolio) {
    
    if (portfolio.modelAssets == null || portfolio.modelAssets.length == 0) {
        logger.log('chronometer_run - no modelAssets');
        return;
    }

    if (portfolio.firstDateInt == null || portfolio.lastDateInt == null) {
        logger.log('chronometer_run - non firstDateInt or lastDateInt');
        return;
    }

    let totalMonths = 0;    

    activeTaxTable.initializeChron();
    portfolio.initializeChron();

    let currentDateInt = new DateInt(portfolio.firstDateInt.toInt());
    while (currentDateInt.toInt() <= portfolio.lastDateInt.toInt()) {

        totalMonths += portfolio.applyMonth(currentDateInt);     
        
        currentDateInt.next();

        if (currentDateInt.day == 1) {
            portfolio.monthlyChron(currentDateInt);
            activeTaxTable.monthlyChron(currentDateInt);
        }

        if (currentDateInt.isNewYearsDay()) {
            portfolio.applyYear(currentDateInt);
            activeTaxTable.applyYear(portfolio.yearly);
            
            portfolio.yearlyChron(currentDateInt);
            activeTaxTable.yearlyChron(currentDateInt);
        }

        portfolio.totalMonths = totalMonths;

        if (summaryContainerElement)
            buildSummary(summaryContainerElement, portfolio);

    }    

    portfolio.finalizeChron();
    activeTaxTable.finalizeChron();

}

function chronometer_applyMonths(modelAssets) {
    if (modelAssets == null || modelAssets.length == 0) {
        logger.log('chronometer_applyMonths - no modelAssets');
        return;
    }    

    if (activeTaxTable != null)
        activeTaxTable.initializeChron();

    for (let modelAsset of modelAssets) {
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

function chronometer_applyMonth_accumulate(firstDateInt, lastDateInt, currentDateInt, modelAsset, activeUser) {
    let startTotal = new Currency(0.0);
    let finishTotal = new Currency(0.0);
    let accumulatedValue = new Currency(0.0);

    if (modelAsset.applyMonth(currentDateInt, activeUser)) {
        if (firstDateInt.toInt() == currentDateInt.toInt())
            startTotal.add(modelAsset.startCurrency);
        if (lastDateInt.toInt() == currentDateInt.toInt())
            finishTotal.add(modelAsset.finishCurrency);
        accumulatedValue.add(modelAsset.accumulatedCurrency);
    }
    
    let result = { startTotal: startTotal, finishTotal: finishTotal, accumulatedValue: accumulatedValue };
    return result;
}

function chronometer_applyTaxesBeforeComputationsThisMonth(currentDateInt, modelAssets, activeUser) {
    logger.log('chronometer_applyTaxesBeforeComputationsThisMonth');

    if (!activeTaxTable) {
        logger.log('chronometer_applyTaxesBeforeComputationsThisMonth - activeTaxTable not set');
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
    logger.log('chronometer_applyTaxesAfterComputationsThisMonth');

    if (!activeTaxTable) {
        logger.log('chronometer_applyTaxesAfterComputationsThisMonth - activeTaxTable not set');
        return;
    }

    activeTaxTable.applyMonthlyTaxes(currentDateInt, modelAssets, activeUser);
}