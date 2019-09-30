
// queue().defer(....).await() <-- this is an illustrated example

/*global queue*/ 
/*global crossfilter*/
/*global d3*/
/*global dc*/
/*global uvIndexData*/

queue()
// file type        // the relative filepath to the .json file
.defer(d3.json, "data/uv-index-reference.json" ) // load in the json file with uv-index references

.await(makeGraphs);

function makeGraphs(error, uvIndexData){
 
 // Step 1 - create a cross filter
 let transactionCrossFilter = crossfilter(uvIndexData);  //data from .csv stored as uvIndexData
 console.log(uvIndexData);
 
 show_uv_readings(transactionCrossFilter);
 
 dc.renderAll();
 
}


function show_uv_readings(transactionCrossFilter){
 
   //Step 2 - 
   // Creating a dimension based on the 'month' property of each data point
   let month_dim = transactionCrossFilter.dimension(dc.pluck('month.num'));
   let uv_dim = transactionCrossFilter.dimension(dc.pluck('uv.index'))
   
   let min_month = month_dim.bottom(1)[0].month.num;
   let max_month = month_dim.top(1)[0].month.num;
   
   // STEP 3 - Do the grouping of dimension by month
   // "Grouping" --> summarizing each data point
   let uv_index_group = uv_dim.group();
   
    dc.lineChart("#line-graph")
    .width(500)
    .height(400)
    .margins({top: 10, right: 50, bottom: 30, left: 50})
    .dimension(month_dim)
    .group(uv_index_group)
    .transitionDuration(500)
    .x(d3.time.scale().domain([min_month,max_month]))
    .xAxisLabel("Month")
    .yAxisLabel("UV Index")
    .yAxis().ticks(4);
   
   //below for bar chart appears, but with wrong presentation of data
   // dc.barChart("#line-graph")
   //  .width(800)
   //  .height(400)
   //  .margins({top:10, right:50, bottom:30, left:50})
   //  .dimension(month_dim)
   //  .group(uv_index_group)
   //  .transitionDuration(500)
   //  .x(d3.scale.ordinal())
   //  .xUnits(dc.units.ordinal)
   //  .elasticY(true)
   //  .xAxisLabel("Month")
   //  .yAxisLabel("UV Index")
   //  .yAxis().ticks(13);
        

}
   
