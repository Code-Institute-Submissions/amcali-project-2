
// queue().defer(....).await() <-- this is an illustrated example

/*global queue*/ 
/*global crossfilter*/
/*global d3*/
/*global dc*/



queue()
// file type        // the relative filepath to the .json file
.defer(d3.json, "data/uv-index-reference.json" ) // load in the json file with uv-index references

.await(makeGraphs);

function makeGraphs(error, uvIndexData){
 
 // Step 1 - create a cross filter
 let transactionCrossFilter = crossfilter(uvIndexData);  //data from .json stored as uvIndexData
 console.log(uvIndexData);
 
   let parseDate = d3.time.format("%b").parse;
  uvIndexData.forEach(function(d){
      d.month = parseDate(d.month);
   });
 
 // show_uv_readings(transactionCrossFilter);
 
    //Step 2 - 
   // Creating a dimension based on the 'month' property of each data point
   


   let month_dim = transactionCrossFilter.dimension(dc.pluck("month"));
   
   let uv_reading_per_month = month_dim.group().reduce(
    
     //Add a fact or data entry
      function(p, v) {
       p.count++;
       p.total += v.uvIndex;
       p.average = p.total / p.count;
       return p;
      },
      
     //Remove a fact or data entry
      function(p, v) {
      p.count--;
      if (p.count == 0) {
          p.total = 0;
          p.average = 0;
      } else {
          p.total -= v.uvIndex;
          p.average = p.total / p.count;
      }
      return p;
      },     
     
      //Initialise the Reducer
      function () {
      return { count: 0, total: 0, average: 0};
      }
   );
   
   
   let min_month = month_dim.bottom(1)[0].month;
   let max_month = month_dim.top(1)[0].month;
   
   // STEP 3 - Do the grouping of dimension by city
   // "Grouping" --> summarizing each data point

    function uv_by_city(city) {
     return function(d) {
         if (d.city === city) {
             return +d.uvIndex;
         } 
         else {
             return 0;
         }
     };
    }
    
   let uvOfBuenosAires = month_dim.group().reduceSum(uv_by_city('Buenos Aires'));
   let uvofDarwin = month_dim.group().reduceSum(uv_by_city('Darwin'));
 
   
   //STEP 4 - drawing the graph scales

  let compositeChart = dc.compositeChart('#line-graph');
  
  compositeChart
    .width(500)
    .height(400)
    .margins({top: 10, right: 50, bottom: 30, left: 50})
    .dimension(month_dim)  
    .group(uv_reading_per_month)
    .valueAccessor(function (d) {
         return d.value.average;
     })
    .transitionDuration(500)    
    .x(d3.time.scale().domain([min_month,max_month]))
    .xAxisLabel("Month")
    .yAxisLabel("UV Index")
    .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
    .renderHorizontalGridLines(true)    
    .compose([
      dc.lineChart(compositeChart)
          .colors('green')
          .group(uvOfBuenosAires, 'Buenos Aires'),
      dc.lineChart(compositeChart)
          .colors('red')
          .group(uvofDarwin, 'Darwin'),
          ])
    .brushOn(false)
    .render();          
          
    // dc.lineChart("#line-graph")
    // .width(500)
    // .height(400)
    // .margins({top: 10, right: 50, bottom: 30, left: 50})
    // .dimension(month_dim)
    // .group(uv_reading_per_month)
    // .valueAccessor(function (d) {
    //      return d.value.average;
    //  })
    // .transitionDuration(500)
    // .x(d3.time.scale().domain([min_month,max_month]))
    // .xAxisLabel("Month")
    // .yAxisLabel("UV Index")
    // .yAxis().ticks(4);
   
   // below for bar chart appears, but with wrong presentation of data
   // dc.barChart("#line-graph")
   //  .width(800)
   //  .height(400)
   //  .margins({top:10, right:50, bottom:30, left:50})
   //  .dimension(month_dim)
   //  .group(uv_reading_per_month)
   //  .valueAccessor(function (d) {
   //       return d.value.average;
   //   })
   //  .transitionDuration(500)
   //  .x(d3.scale.ordinal())
   //  .xUnits(dc.units.ordinal)
   //  .elasticY(true)
   //  .xAxisLabel("Month")
   //  .yAxisLabel("UV Index")
   //  .yAxis().ticks(13);
 
 dc.renderAll();
 
}


// function show_uv_readings(transactionCrossFilter){
// }
   
