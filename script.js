
// queue().defer(....).await() <-- this is an illustrated example

/*global queue*/ 
/*global crossfilter*/
/*global d3*/
/*global dc*/
/*global uvIndexData*/

queue()
// file type        // the relative filepath to the .json file
.defer(d3.csv, "data/uv-index-data.csv" ) // load in the json file with uv-index references

.await(makeGraphs);

function makeGraphs(error, uvIndexData){
 
 // create a cross filter
 let transactionCrossFilter = crossfilter(uvIndexData);
 
 show_uv_readings(transactionCrossFilter);
 
 dc.renderAll();
 
}


function show_uv_readings(transactionCrossFilter){
 
   // Define 'month' to be the x axis
   // Creating a dimension based on the 'month' property of each data point
   let month_dim = transactionCrossFilter.dimension(dc.pluck('month.num'));
   
   // STEP 3 - Do the grouping of dimension by month
   // "Grouping" --> summarizing each data point
   let month_group = month_dim.group();
   
   dc.barChart("#line-graph")
    .width(500)
    .height(400)
    .margins({top:10, right:50, bottom:30, left:50})
    .dimension(month_dim)
    .group(month_group)
    .transitionDuration(500)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .xAxisLabel("Month")
    .yAxis().ticks(13);
        

}
   
