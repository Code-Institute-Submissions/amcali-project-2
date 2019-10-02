
// queue().defer(....).await() <-- this is an illustrated example

/*global queue*/ 
/*global crossfilter*/
/*global d3*/
/*global dc*/
/*global $*/



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
   // let city_dim = transactionCrossFilter.dimension(dc.pluck("city")); <-- not in use


   
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

 
   
   // STEP 4 - Do the grouping of dimension by city and color

  let compositeChart = dc.compositeChart('#line-graph');
  
  //require 3 arrays. 1: contain over 20 colours; 2: contain all the cities; 3: an array to push all the colours according to each city.
  let cityArray = [
                   //testing the following 3 cities first before adding subsequent cities
                   {"city": "Buenos Aires", "color": '#FF6633'},
                   {"city": "Darwin", "color": '#FFB399'},
                   {"city": "Melbourne", "color": '#FF33FF'},
                   
                   // {"city": "Sydney", "color": '#FFFF99'},
                   // {"city": "Rio de Janeiro", "color": '#00B3E6'},
                   // {"city": "Vancouver", "color": '#E6B333'},
                   // {"city": "Havana", "color": '#3366E6'},
                   // {"city": "Port Stanley", "color": '#999966'},
                   // {"city": "Paris", "color": "#99FF99"},
                   // {"city": "Berlin", "color": "#80B300"},
                   // {"city": "Iraklion", "color": "#B34D4D"},
                   // {"city": "Tokyo", "color": "#809900"},
                   // {"city": "Nairobi", "color": "#E6B3B3"},
                   // {"city": "Tananarive", "color": "#6680B3"},
                   // {"city": "Maputo", "color": "#66991A"},
                   // {"city": "Ulan Bator", "color": "#FF99E6"},
                   // {"city": "Wellington", "color": "#CCFF1A"},
                   // {"city": "Panama", "color": "#FF1A66"},
                   // {"city": "St Petersbourg", "color": "#E6331A"},
                   // {"city": "Singapore", "color": "#33FFCC"},
                   // {"city": "Cape Town", "color": "#66994D"},
                   // {"city": "Palma de Mallorca", "color": "#B366CC"},
                   // {"city": "Colombo", "color": "#4D8000"},
                   // {"city": "Bangkok", "color": "#B33300"},
                   // {"city": "Los Angeles", "color": "#CC80CC"},
                   // {"city": "New York", "color": "#66664D"},
                   // {"city": "Hanoi", "color": "#991AFF"}
                ];  //declaring an array to use when drawing the composite chart
                
      
   // let uvOfBuenosAires = month_dim.group().reduceSum(uv_by_city('Buenos Aires'));
   // let uvofDarwin = month_dim.group().reduceSum(uv_by_city('Darwin'));
   


    
     let chartsOfLineCharts = [];
     for (each_city of cityArray){
     let uvOfCities = month_dim.group().reduceSum(uv_by_city(each_city.city)); //pushes the reduceSum of uv index for each city into the array, and grouped by month
     let c = dc.lineChart(compositeChart)  
           .colors(each_city.color)         
           .group(uvOfCities, each_city.city);
         
         chartsOfLineCharts.push(c);
     
     }

    console.log(chartsOfLineCharts);
    

   //STEP 5 - drawing the graph scales

   // let charts = [
   //    dc.lineChart(compositeChart)
   //        .colors('green')
   //        .group(uvOfBuenosAires, 'Buenos Aires'),
   //    dc.lineChart(compositeChart)
   //        .colors('red')
   //        .group(uvofDarwin, 'Darwin'),
      
           // ];
    
    
   
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
    .compose(chartsOfLineCharts)     //    .compose(charts)
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
   
