const global_default_inflationRate = 0.031;

const global_default_taxYear = 2024;

const global_default_filingAs = 'Single';

const global_default_propertyTaxRate = 0.01;

const global_default_propertyTaxDeductionMax = 10000.0;

const global_default_user_startAge = 30;
const gobal_default_user_retirementAge = 67;
const global_default_user_finishAge = 85;

const global_default_fica = 7.65;

var global_inflationRate = global_default_inflationRate;

var global_taxYear = global_default_taxYear;

var global_filingAs = global_default_filingAs;

var global_propertyTaxRate = global_default_propertyTaxRate;

var global_propertyTaxDeductionMax = global_default_propertyTaxDeductionMax;

var global_user_startAge = global_default_user_startAge;
var global_user_retirementAge = gobal_default_user_retirementAge;
var global_user_finishAge = global_default_user_finishAge;

function global_reset() {
    global_inflationRate = global_default_inflationRate;
    global_taxYear = global_default_taxYear;    
    global_filingAs = global_default_filingAs;    
    global_propertyTaxRate = global_default_propertyTaxRate;    
    global_propertyTaxDeductionMax = global_default_propertyTaxDeductionMax;
    global_user_startAge = global_default_user_startAge;
    global_user_retirementAge = gobal_default_user_retirementAge;
    global_user_finishAge = global_default_user_finishAge;

    global_setInflationRate(global_inflationRate);
    global_setTaxYear(global_taxYear);
    global_setFilingAs(global_filingAs);
    global_setPropertyTaxRate(global_propertyTaxRate);
    global_setPropertyTaxDeductionMax(global_propertyTaxDeductionMax);
    global_setUserStartAge(global_user_startAge);
    global_setUserRetirementAge(global_user_retirementAge);
    global_setUserFinishAge(global_user_finishAge);
}

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
    let localPTDM = localStorage.getItem('propertyTaxDeductionMax');
    if (localPTDM == null)
        localPTDM = global_propertyTaxDeductionMax.toFixed(2);

    global_propertyTaxDeductionMax = parseFloat(localPTDM);
}

function global_setUserStartAge(value) {
    localStorage.setItem('userStartAge', value.toString());
}

function global_getUserStartAge() {
    let localUA = localStorage.getItem('userStartAge');
    if (localUA == null)
        localUA = global_user_startAge.toString();

    global_user_startAge = parseInt(localUA);
}

function global_setUserRetirementAge(value) {
    localStorage.setItem('userRetirementAge', value.toString());
}

function global_getUserRetirementAge() {
    let localUA = localStorage.getItem('userRetirementAge');
    if (localUA == null)
        localUA = global_user_retirementAge.toString();

    global_user_retirementAge = parseInt(localUA);
}

function global_setUserFinishAge(value) {
    localStorage.setItem('userFinishAge', value.toString());
}

function global_getUserFinishAge() {
    let localUA = localStorage.getItem('userFinishAge');
    if (localUA == null)
        localUA = global_user_finishAge.toString();

    global_user_finishAge = parseInt(localUA);
}

function global_initialize() {
    global_getInflationRate();
    global_getTaxYear();
    global_getFilingAs();
    global_getPropertyTaxRate();
    global_getPropertyTaxDeductionMax();
    global_getUserStartAge();
    global_getUserRetirementAge();
    global_getUserFinishAge();
}
