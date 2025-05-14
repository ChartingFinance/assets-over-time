// Simulator class to run Portfolio test cases

importScripts('chronometer.js', 'globals.js', 'logger.js', 'membrane.js', 'model.js', 'portfolio.js', 'taxes.js', 'user.js', 'util.js');

var activeTaxTable = null; // Global variable to hold the active tax table

self.onmessage = function(event) {

    //global_initialize();
    activeTaxTable = new TaxTable();
    
    console.log('Received message from main thread:', event.data);
    let assetModels = membrane_jsonObjectsToModelAssets(event.data);
    let portfolio = new Portfolio(assetModels, false);
    let simulator = new Simulator(portfolio);

    simulator.runTestCases(10, function(assetModels) {
        console.log('Simulation Update');
        self.postMessage(assetModels);
    });

}

class Simulator {
    constructor(portfolio) {

        this.portfolio = portfolio; // Portfolio object to simulate
        this.bestPortfolio = null; // Best observed portfolio

        this.fundTransfers = [];        
        this.bestFundTransfers = null;;        

        this.generateAllFundTransfers(); // Generate fund transfers for all model assets

    }

    generateAllFundTransfers() {

        for (let modelAsset of this.portfolio.modelAssets) {
            if (isMonthlyIncome(modelAsset.instrument) || isMonthlyExpense(modelAsset.instrument))
                this.generateAssetFundTransfers(modelAsset);            
        }

    }

    ensureFundTransfer(fromModel, toModel) {

        if (!fromModel.hasFundTransfer(toModel.displayName)) {
            let fundTransfer = new FundTransfer(toModel.displayName, false, 0.0);
            fromModel.fundTransfers.push(fundTransfer);
            this.fundTransfers.push(fundTransfer);
        }

    }

    generateAssetFundTransfers(anchorAsset) {

        // first version -- only do income and expense assets
        if (!isMonthlyIncome(anchorAsset.instrument) && !isMonthlyExpense(anchorAsset.instrument)) return;

        for (let modelAsset of this.portfolio.modelAssets) {
            if (anchorAsset == modelAsset) continue;
        
            if (isMonthlyIncome(anchorAsset.instrument)) {

                if (isFundableAsset(modelAsset.instrument))
                    this.ensureFundTransfer(anchorAsset, modelAsset);


            }
            else if (isMonthlyExpense(anchorAsset.instrument)) {

                if (isExpensableAsset(modelAsset.instrument))
                    this.ensureFundTransfer(anchorAsset, modelAsset);

            }        
        
        }

    }

    updateFundTransfers(index, fundTransferStepping) {

        if (index >= this.portfolio.modelAssets.length)
            return false; // No more fund transfers to update
        else if (!this.portfolio.modelAssets[index].updateFundTransfers(fundTransferStepping))
            return this.updateFundTransfers(index + 1, fundTransferStepping);
        else
            return true;              

    }

    // Method to run a single test case
    runTestCase(iteration) {
        
        console.log('Running test case: ${iteration} ' + this.portfolio.dnaFundTransfers())
        chronometer_run(null, this.portfolio);

    }

    // Method to run multiple test cases
    runTestCases(fundTransferStepping, callback) {       
        
        logger.log('Replicating current assets...');
        chronometer_run(null, this.portfolio);
        this.bestPortfolio = this.portfolio.copy(); // Copy the current portfolio as the best portfolio

        if (this.fundTransfers?.length > 0) {

            this.portfolio.zeroFundTransfersMoveValues();

            let iteration = 0;

            do {
                
                this.runTestCase(++iteration);
                this.evaluateResults(callback);            

            }
            while (this.updateFundTransfers(0, fundTransferStepping));

        }
    }

    evaluateResults(callback) {

        if (this.bestPortfolio == null || this.portfolio.finishValue() > this.bestPortfolio.finishValue()) {
            this.bestPortfolio = this.portfolio.copy();
            callback(this.portfolio.modelAssets);
        }   
             

    }

    updateFundTransferBindings() {

        // do this because when we use the modelAssets to html transform, it removes the toModel and fromModel references
        for (let modelAsset of this.portfolio.modelAssets) {
            modelAsset.bindFundTransfers(this.portfolio.modelAssets);
        } 

    }

}

