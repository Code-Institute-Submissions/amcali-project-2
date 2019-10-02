
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
  
  //require 3 arrays. 1: contain over 20 colours; 2: contain all the cities; 3: an array to push all the colours according to each city.
  let cityArray = [
                   "Buenos Aires", 
                   "Darwin", 
                   "Melbourne", 
                   "Sydney", 
                   "Rio de Janeiro", 
                   "Vancouver", 
                   "Havana", 
                   "Port Stanley", 
                   "Paris", 
                   "Berlin", 
                   "Iraklion", 
                   "Tokyo",
                   "Nairobi", 
                   "Tananarive",
                   "Maputo",
                   "Ulan Bator",
                   "Wellington",
                   "Panama",
                   "St Petersbourg",
                   "Singapore",
                   "Cape Town",
                   "Palma de Mallorca",
                   "Colombo",
                   "Bangkok",
                   "Los Angeles",
                   "New York",
                   "Hanoi"
                   ];
   
   let colorArray = [
                  '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
              		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
              		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
              		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
              		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
              		  '#66664D', '#991AFF',
                    ];
                
   // function assignColorToCity (cityArray,colorArray){                 
   //              let count = 1;
   //              for(var i = 0; i < colorArray.length; i++){
   //              if(count <= 27){
   //              count++;
                
   //              }
   //              else{
   //              console.log(count + cityArray[0] + " choice is " + colorArray[i]);
   //              count++;
   //              }
   //              }
                
   // }
               
                    
   console.log(cityArray);                 
   console.log(colorArray);
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
      // dc.lineChart(compositeChart)
      //     .colors('green')
      //     .group(uvOfBuenosAires, 'Buenos Aires'),
      // dc.lineChart(compositeChart)
      //     .colors('red')
      //     .group(uvofDarwin, 'Darwin'),
      
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
   
