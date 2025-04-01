function summary_setStartDate(startDateInt) {
    let summaryStartDateElement = document.getElementById("summaryStartDate");
    if (startDateInt)
        summaryStartDateElement.value = startDateInt.toHTML();
    else
    summaryStartDateElement.value = '';
}

function summary_setStartValue(startCurrency) {
    let summaryStartValueElement = document.getElementById("summaryStartValue");
    if (startCurrency)
        summaryStartValueElement.value = startCurrency.toHTML();
    else
        summaryStartValueElement.value = '';
}

function summary_setFinishDate(finishDateInt) {
    let summaryFinishDateElement = document.getElementById("summaryFinishDate");
    if (finishDateInt)
        summaryFinishDateElement.value = finishDateInt.toHTML();
    else
        summaryFinishDateElement.value = '';
}

function summary_setAccruedMonths(accruedMonths) {
    let summaryAccruedMonthsElement = document.getElementById("summaryAccruedMonths");
    if (accruedMonths)
        summaryAccruedMonthsElement.value = accruedMonths.toString();
    else
        summaryAccruedMonthsElement.value = '';
}

function summary_setFinishValue(finishCurrency) {
    let summaryFinishValueElement = document.getElementById("summaryFinishValue");
    if (finishCurrency)
        summaryFinishValueElement.value = finishCurrency.toHTML();
    else
        summaryFinishValueElement.value = '';
}

function summary_setAccumulatedValue(accumulatedCurrency) {
    let summaryAccumulatedValueElement = document.getElementById("summaryAccumulatedValue");
    if (accumulatedCurrency) {
        summaryAccumulatedValueElement.value = accumulatedCurrency.toHTML();
    }
    else {
        summaryAccumulatedValueElement.value = '';
    }
    summary_setBackgroundColor(accumulatedCurrency);
}

function summary_setBackgroundColor(accumulatedCurrency) {
    let summaryFormElement = document.getElementById('rollup');
    if (accumulatedCurrency && accumulatedCurrency.amount > 0)
        summaryFormElement.style.backgroundColor = positiveBackgroundColor;
    else if (accumulatedCurrency && accumulatedCurrency.amount < 0)
        summaryFormElement.style.backgroundColor = negativeBackgroundColor;
    else
        summaryFormElement.style.backdropFilter = 'white';
}

function summary_computeCAGR() {
    let summaryStartDateElement = document.getElementById("summaryStartDate");
    let summaryStartValueElement = document.getElementById("summaryStartValue");
    let summaryFinishDateElement = document.getElementById("summaryFinishDate");
    let summaryFinishValueElement = document.getElementById("summaryFinishValue");

    let dateStart = DateInt.parse(summaryStartDateElement.value);
    let valueStart = Currency.parse(summaryStartValueElement.value);
    let dateFinish = DateInt.parse(summaryFinishDateElement.value);
    let valueFinish = Currency.parse(summaryFinishValueElement.value);

    let startYearMonth = dateStart.year + ((dateStart.month -1)/12);
    let finishYearMonth = dateFinish.year + ((dateFinish.month -1)/12);
    let years = finishYearMonth - startYearMonth;
    let summaryAnnualReturnRateElement = document.getElementById("summaryAnnualReturnRate");
    let cagr = 0.0;

    let step1 = (valueFinish.toCurrency() / valueStart.toCurrency());
    let step2 = (1 / years);
    let step3 = Math.pow(step1, step2) - 1;
    cagr = parseFloat(step3.toFixed(4));
    cagr *= 100.0;
    
    summaryAnnualReturnRateElement.value = cagr;
}