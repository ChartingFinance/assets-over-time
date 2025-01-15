var global_inflationRate = 0.031;

var global_taxYear = 2024;

var global_filingAs = 'Single';

var global_propertyTaxRate = 0.01;

var global_propertyTaxDeductionMax = 10000.0;

function global_divBy100(strValue) {
    let asFloat = parseFloat(strValue);
    asFloat /= 100.0;
    return asFloat;
}

function global_multBy100(value) {
    return value * 100.0;
}

function global_setInflationRate(value) {
    localStorage.setItem('inflationRate', value.toFixed(4));
}

function global_getInflationRate() {
    let localIR = localStorage.getItem('inflationRate');
    if (localIR == null)
        localIR = global_inflationRate.toFixed(4);
    
    global_inflationRate = parseFloat(localIR);
}

function global_setTaxYear(value) {
    localStorage.setItem('taxYear', value.toString());
}

function global_getTaxYear() {
    let localTY = localStorage.getItem('taxYear');
    if (localTY == null)
        localTY = global_taxYear.toString();

    global_taxYear = parseInt(localTY);
}

function global_setFilingAs(value) {
    localStorage.setItem('filingAs', value);
}

function global_getFilingAs() {
    let localFA = localStorage.getItem('filingAs');
    if (localFA == null)
        localFA = global_filingAs;

    global_filingAs = localFA;
}

function global_setPropertyTaxRate(value) {
    localStorage.setItem('propertyTaxRate', value.toFixed(4));
}

function global_getPropertyTaxRate(value) {
    let localPTR = localStorage.getItem('propertyTaxRate');
    if (localPTR == null)
        localPTR = global_propertyTaxRate.toFixed(4);

    global_propertyTaxRate = parseFloat(localPTR);
}

function global_setPropertyTaxDeductionMax(value) {
    localStorage.setItem('propertyTaxDeductionMax', value.toFixed(2));
}

function global_getPropertyTaxDeductionMax() {
    let localPTDM = localStorage.getItem('properTaxDeductionMax');
    if (localPTDM == null)
        localPTDM = global_propertyTaxDeductionMax.toFixed(2);

    global_getPropertyTaxDeductionMax = parseFloat(localPTDM);
}

function global_initialize() {
    global_getInflationRate();
    global_getTaxYear();
    global_getFilingAs();
    global_getPropertyTaxRate();
    global_getPropertyTaxDeductionMax();
}
