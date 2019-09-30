
// queue().defer(....).await() <-- this is an illustrated example

/*global queue*/ 
/*global crossfilter*/
/*global d3*/
/*global dc*/

queue()
// file type        // the relative filepath to the .json file
.defer(d3.json, "data/uv-index-reference.json" ) // load in the json file with uv-index references


.await(function(error, transactionData){

      // STEP 1 - create a cross filter
      let transactionCrossFilter = crossfilter(transactionData);
        console.log(transactionData);
       
    //     //STEP 2 - Define 'month' to be the x axis
    //   // Creating a dimension based on the 'month' property of each data point
    //   let month_dim = transactionCrossFilter.dimension(dc.pluck('month'));
       
    //     // STEP 3 - Do the grouping
    //     // "Grouping" --> summarizing each data point
    //     let uv_month = uv_dim.group().reduceSum(dc.pluck('month'));
       
    //     // create a dimension with x axis being the date 
    //     let uv_dim = transactionCrossFilter.dimension(dc.pluck("month"));
     
    //     let min_month = month_num_dim.bottom(1)[0].date;
    //     let max_month = month_num_dim.top(1)[0].date;
     
        
    //     // STEP 5 - Draw the barchart
    //     dc.renderAll();
    });
   
