const stackedBarChartConfig = {
    type: 'bar',
    data: null,
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Financial Simulation Charted'
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true
        }
      }
    }
  };

const stackedBarChartData = {
    labels: '',
    datasets: []
};

const stackedBarChartDataSet = {
    label: null,
    data: null
 };

const assetStackedBarChartExclusions = ['monthlyExpense', 'monthlyIncome'];

const lineChartConfig = {
  type: 'line',
  data: null,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: ''
      }
    }
  },
};

const lineChartData = {
  labels: '',
  datasets: []
};

const lineChartDataSet = {
  label: '',
  data: []
};

const flowLineChartExclusions = ['home','mortgage'];

var charting_jsonAssetsChartData = null;
var charting_jsonEarningsChartData = null;
var charting_jsonCashFlowChartData = null;

function charting_buildMonthsSpan(firstDateInt, lastDateInt) {
  let totalMonths = util_totalMonths(firstDateInt, lastDateInt);
  let combineMonths = 1;
  let offsetMonths = 0;
  if (totalMonths > 36 && totalMonths <= 96) {
    combineMonths = 3;
    if (firstDateInt.month == 2 || firstDateInt.month == 5 || firstDateInt.month == 8 || firstDateInt.month == 11)
      offsetMonths = 2;
    else if (firstDateInt.month == 3 || firstDateInt.month == 6 || firstDateInt.month == 9 || firstDateInt.month == 12)
      offsetMonths = 1;
  }
  else if (totalMonths > 96 && totalMonths <= 264) {
    combineMonths = 6;
    if (firstDateInt.month > 1 && firstDateInt.month < 7)
      offsetMonths = 7 - firstDateInt.month;
    else if (firstDateInt.month > 7 && firstDateInt.month < 13)
      offsetMonths = 13 - firstDateInt.month;
  }
  else if (totalMonths > 264) {
    combineMonths = 12;
    if (firstDateInt.month > 1)
      offsetMonths = 13 - firstDateInt.month;
  }

  return new MonthsSpan(totalMonths, combineMonths, offsetMonths);
}

function charting_buildDisplayData(firstDateInt, lastDateInt, modelAssets) {
    let monthsSpan = charting_buildMonthsSpan(firstDateInt, lastDateInt);
    for (modelAsset of modelAssets) {
      modelAsset.monthlyAssetDataToDisplayAssetData(monthsSpan);
      modelAsset.monthlyEarningsDataToDisplayEarningsData(monthsSpan);
      modelAsset.monthlyRMDDataToDisplayRMDData(monthsSpan);
    }    
}

function charting_buildDisplayLabels(firstDateInt, lastDateInt) {
  let monthsSpan = charting_buildMonthsSpan(firstDateInt, lastDateInt);
  let runnerDateInt = new DateInt(firstDateInt.toInt());
  runnerDateInt.addMonths(monthsSpan.offsetMonths);
  let labels = [];
  while (runnerDateInt.toInt() <= lastDateInt.toInt()) {
    let label = '';
    
    if (monthsSpan.combineMonths == 3) {
      if (runnerDateInt.month >= 1 && runnerDateInt.month < 4) {
        label = 'Q1 ';
      }
      else if (runnerDateInt.month >= 4 && runnerDateInt.month < 7) {
        label = 'Q2 ';
      }
      else if (runnerDateInt.month >= 7 && runnerDateInt.month < 10) {
        label = 'Q3 '; 
      }
      else {
        label = 'Q4 ';
      }
      label += runnerDateInt.year.toString();
    }
    
    else if (monthsSpan.combineMonths == 6) {
      if (runnerDateInt.month >= 1 && runnerDateInt.month < 7) {
        label = 'H1 ';
      }
      else {
        label = 'H2 ';
      }
      label += runnerDateInt.year.toString();
    }
    
    else if (monthsSpan.combineMonths == 12) {
      label = runnerDateInt.year.toString();
    }

    else { // monthsSpan.combineMonths == 1
      console.assert(monthsSpan.combineMonths == 1, 'monthsSpan.combineMonths != 1 for Monthly');
      label = runnerDateInt.toString();
    }

    labels.push(label);      

    runnerDateInt.addMonths(monthsSpan.combineMonths);
  }

  return labels;
}

// The reduction keeps the modelAssets positionally in the array. This is so the colorId value is consistent across chart views.
function charting_reducedModelAssetsForAssets(modelAssets) {
  let results = [];
  for (const modelAsset of modelAssets) {
      if (assetStackedBarChartExclusions.includes(modelAsset.instrument))
          results.push(null);
      else
          results.push(modelAsset);
  }
  return results;
}

function charting_buildDisplayAssetsFromModelAssets(firstDateInt, lastDateInt, modelAssets, buildNewDataSet) {
  if (firstDateInt == null) {
    console.log('charting_buildDisplayAssetsFromModelAssets - null firstDateInt provided');
    return null;
  }  
  else if (lastDateInt == null) {
    console.log('charting_buildDisplayAssetsFromModelAssets - null lastDateInt provided');
    return null;
  }
  
  let chartingAssetConfig = null;
  let chartingAssetData = null;

  if (!buildNewDataSet && charting_jsonAssetsChartData == null) {
    console.log('charting_buildDisplayAssetsFromModelAssets - attempting to reuse null charting_jsonAssetsChartData. Building new data set.');
    buildNewDataSet = true;
  }

  if (buildNewDataSet) {  
    chartingAssetConfig = JSON.parse(JSON.stringify(stackedBarChartConfig));
    chartingAssetData = JSON.parse(JSON.stringify(stackedBarChartData));

    let labels = charting_buildDisplayLabels(firstDateInt, lastDateInt);
    chartingAssetData.labels = labels;  
  }
  else {    
    chartingAssetConfig = charting_jsonAssetsChartData;
    chartingAssetData = chartingAssetConfig.data;    
  }

  let reducedModelAssets = charting_reducedModelAssetsForAssets(modelAssets);
  let colorId = -1;
  let dataIndex = -1;

  for (const modelAsset of reducedModelAssets) {
    ++colorId;
    if (modelAsset == null)
        continue;
    else
      modelAsset.colorId = colorId;
    ++dataIndex;

    let chartingAssetDataSet = null;
    
    if (buildNewDataSet) {
      chartingAssetDataSet = JSON.parse(JSON.stringify(stackedBarChartDataSet));
      chartingAssetDataSet.label = modelAsset.displayName;
      chartingAssetDataSet.data = modelAsset.displayAssetData;
    }
    else
      chartingAssetDataSet = chartingAssetData.datasets[dataIndex];
    
    if (highlightDisplayName != null) {
        if (highlightDisplayName == modelAsset.displayName)
            chartingAssetDataSet.backgroundColor = colorRange[modelAsset.colorId];
        else
            chartingAssetDataSet.backgroundColor = 'whitesmoke'; 
    }
    else {
      chartingAssetDataSet.backgroundColor = colorRange[modelAsset.colorId];       
    }
  
    if (buildNewDataSet)
      chartingAssetData.datasets.push(chartingAssetDataSet);
  }

  chartingAssetConfig.data = chartingAssetData;
  return chartingAssetConfig;
}

// The reduction keeps the modelAssets positionally in the array. This is so the colorId value is consistent across chart views.
function charting_reducedModelAssetsForEarnings(modelAssets) {
  let results = [];
  for (const modelAsset of modelAssets) {
      if (flowLineChartExclusions.includes(modelAsset.instrument))
          results.push(null);
      else
          results.push(modelAsset);
  }
  return results;
}

function charting_buildDisplayEarningsFromModelAssets(firstDateInt, lastDateInt, modelAssets, buildNewDataSet) {
  if (firstDateInt == null) {
    console.log('charting_buildDisplayEarningsFromModelAssets - null firstDateInt provided');
    return null;
  }  
  else if (lastDateInt == null) {
    console.log('charting_buildDisplayEarningsFromModelAssets - null lastDateInt provided');
    return null;
  }
  
  let chartingEarningsConfig = null;
  let chartingEarningsData = null;

  if (!buildNewDataSet && charting_jsonEarningsChartData == null) {
    console.log('charting_buildDisplayEarningsFromModelAssets - attempting to reuse null charting_jsonEarningsChartData. Building new data set.');
    buildNewDataSet = true;
  }

  if (buildNewDataSet) {
    chartingEarningsConfig = JSON.parse(JSON.stringify(lineChartConfig));    
    chartingEarningsData = JSON.parse(JSON.stringify(lineChartData));
    let labels = charting_buildDisplayLabels(firstDateInt, lastDateInt);
    chartingEarningsData.labels = labels;  
  }
  else {
    chartingEarningsConfig = charting_jsonEarningsChartData;
    chartingEarningsData = chartingEarningsConfig.data;
  }
  
  let reducedModelAssets = charting_reducedModelAssetsForEarnings(modelAssets);
  let colorId = -1;
  let dataIndex = -1;

  for (const modelAsset of reducedModelAssets) {
    ++colorId;
    if (modelAsset == null)
      continue;
    else
      modelAsset.colorId = colorId;
    ++dataIndex;

    let chartingEarningsDataSet = null;
    
    if (buildNewDataSet) {
      chartingEarningsDataSet = JSON.parse(JSON.stringify(lineChartDataSet));
      chartingEarningsDataSet.label = modelAsset.displayName;
      chartingEarningsDataSet.data = modelAsset.displayEarningsData;
    }
    else
      chartingEarningsDataSet = chartingEarningsData.datasets[dataIndex];

    if (highlightDisplayName != null) {
      if (highlightDisplayName == modelAsset.displayName)
        chartingEarningsDataSet.backgroundColor = colorRange[modelAsset.colorId];
      else
        chartingEarningsDataSet.backgroundColor = 'whitesmoke'; 
    }
    else {
      chartingEarningsDataSet.backgroundColor = colorRange[modelAsset.colorId];       
    }

    if (buildNewDataSet)
      chartingEarningsData.datasets.push(chartingEarningsDataSet);
  }

  chartingEarningsConfig.data = chartingEarningsData;
  return chartingEarningsConfig;
}

function charting_buildCashFlowDataSet(modelAssets, label, sign) {
  let cashFlowDataSet = JSON.parse(JSON.stringify(lineChartDataSet));
  cashFlowDataSet.label = label;

  let firstModelAsset = true;
  for (const modelAsset of modelAssets) {
    if (modelAsset == null)
      continue;
    else if (flowLineChartExclusions.includes(modelAsset.instrument))
      continue;

    for (let ii = 0; ii < modelAsset.displayEarningsData.length; ii++) {

      if (firstModelAsset)
        cashFlowDataSet.data.push(0.0);

      let displayData = modelAsset.displayEarningsData[ii];
      if (displayData == null)
        displayData = 0.0;

      if (sign > 0 && displayData > 0.0)
        cashFlowDataSet.data[ii] += displayData;
      else if (sign < 0 && displayData < 0.0)
        cashFlowDataSet.data[ii] += displayData;
      else if (sign == 0)
        cashFlowDataSet.data[ii] += displayData;
    }

    firstModelAsset = false;
  }

  if (sign > 0)
    cashFlowDataSet.backgroundColor = positiveBackgroundColor;
  else if (sign < 0)
    cashFlowDataSet.backgroundColor = negativeBackgroundColor;
  else
    cashFlowDataSet.backgroundColor = '#000';

  return cashFlowDataSet;
}

function charting_buildCashFlowDataSet_rmds(firstDateInt, lastDateInt, modelAssets) {
  let cashFlowDataSet = JSON.parse(JSON.stringify(lineChartDataSet));
  cashFlowDataSet.label = 'RMDs';

  let firstModelAsset = true;
  for (const modelAsset of util_findModelAssetsByInstrument(modelAssets, sInstrumentNames[sInstrumentsIDs.taxDeferredEquity])) {
    
    for (let ii = 0; ii < modelAsset.displayRMDData.length; ii++) {

      if (firstModelAsset)
        cashFlowDataSet.data.push(0.0);

      let displayData = modelAsset.displayRMDData[ii];
      if (displayData == null)
        displayData = 0.0;

      cashFlowDataSet.data[ii] += displayData;      
    }

    firstModelAsset = false;
  }

  cashFlowDataSet.backgroundColor = '#0000ff';
  
  return cashFlowDataSet;
}

function charting_buildCashFlowDataSet_taxes(firstDateInt, lastDateInt, modelAssets) {
  let cashFlowDataSet = JSON.parse(JSON.stringify(lineChartDataSet));
  cashFlowDataSet.label = 'Federal Income Tax';

  let monthsSpan = charting_buildMonthsSpan(firstDateInt, lastDateInt);
  let fills = (12 / monthsSpan.combineMonths) -1;

  for (let c of activeTaxTable.yearlyTaxes) {
    cashFlowDataSet.data.push(c);
    for (let ii = 0; ii < fills; ++ii)
      cashFlowDataSet.data.push(0.0);
  }

  cashFlowDataSet.backgroundColor = '#ffff00';
  
  return cashFlowDataSet;
}

function charting_buildDisplayCashFlowFromModelAssets(firstDateInt, lastDateInt, modelAssets) {
  if (firstDateInt == null) {
    console.log('charting_buildDisplayCashFlowFromModelAssets - null firstDateInt provided');
    return null;
  }  
  else if (lastDateInt == null) {
    console.log('charting_buildDisplayCashFlowFromModelAssets - null lastDateInt provided');
    return null;
  }
  
  let chartingCashFlowConfig = JSON.parse(JSON.stringify(lineChartConfig));
  let chartingCashFlowData = JSON.parse(JSON.stringify(lineChartData));
  chartingCashFlowData.labels = charting_buildDisplayLabels(firstDateInt, lastDateInt);

  let reducedModelAssets = charting_reducedModelAssetsForEarnings(modelAssets);

  let chartingCashFlowDataSet_credits = charting_buildCashFlowDataSet(reducedModelAssets, 'Credits', 1);
  let chartingCashFlowDataSet_debits = charting_buildCashFlowDataSet(reducedModelAssets, 'Debits', -1);
  let chartingCashFlowDataSet_cash = charting_buildCashFlowDataSet(reducedModelAssets, 'Cash', 0);
  let chartingCashFlowDataSet_rmds = charting_buildCashFlowDataSet_rmds(firstDateInt, lastDateInt, modelAssets);
  let chartingCashFlowDataSet_taxes = charting_buildCashFlowDataSet_taxes(firstDateInt, lastDateInt, modelAssets);
    
  chartingCashFlowData.datasets.push(chartingCashFlowDataSet_credits);
  chartingCashFlowData.datasets.push(chartingCashFlowDataSet_debits);
  chartingCashFlowData.datasets.push(chartingCashFlowDataSet_cash);
  chartingCashFlowData.datasets.push(chartingCashFlowDataSet_rmds);
  chartingCashFlowData.datasets.push(chartingCashFlowDataSet_taxes);

  chartingCashFlowConfig.data = chartingCashFlowData;
  return chartingCashFlowConfig;
}

function charting_buildFromModelAssets(modelAssets, buildNewDataSet) {
  if (modelAssets == null || modelAssets.length == 0) {
    console.log('charting_buildFromModelAssets - null or zero length array provided');
    charting_jsonAssetsChartData = null;
    charting_jsonEarningsChartData = null;
    charting_jsonCashFlowChartData = null;
  }
  else {
    let firstDateInt = util_firstDateInt(modelAssets);
    let lastDateInt = util_lastDateInt(modelAssets);

    charting_buildDisplayData(firstDateInt, lastDateInt, modelAssets);

    charting_jsonAssetsChartData = charting_buildDisplayAssetsFromModelAssets(firstDateInt, lastDateInt, modelAssets, buildNewDataSet);
    charting_jsonEarningsChartData = charting_buildDisplayEarningsFromModelAssets(firstDateInt, lastDateInt, modelAssets, buildNewDataSet);
    charting_jsonCashFlowChartData = charting_buildDisplayCashFlowFromModelAssets(firstDateInt, lastDateInt, modelAssets, buildNewDataSet);
  }
}