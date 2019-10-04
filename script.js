/*global queue*/ 
/*global crossfilter*/
/*global d3*/
/*global dc*/
/* global mapboxgl*/
/*global axios*/
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

 
 show_discipline_selector(transactionCrossFilter);
 show_line_graphs(transactionCrossFilter);
 
 
 dc.renderAll();
 
}    // end of makeGraphs function


function show_discipline_selector(transactionCrossFilter){
 
   let city_dim = transactionCrossFilter.dimension(dc.pluck("city"));
   let group = city_dim.group();
   dc.selectMenu("#discipline-selector")
    .dimension(city_dim)
    .group(group)
    .multiple(true);
}


// function show_graphs_by_city(transactionCrossFilter){
// }


 //function to allow user to select city to view data for
// function show_discipline_selector(transactionCrossFilter){


//    let city_dim = transactionCrossFilter.dimension(dc.pluck("city"));
//    let group = city_dim.group();
   
//    dc.selectMenu("#discipline-selector")
//     .dim(city_dim)
//     .group(group);


//    let parseDate = d3.time.format("%b").parse;
//    uvIndexData.forEach(function(d){
//       d.month = parseDate(d.month);
//    });
// }

function show_line_graphs(transactionCrossFilter){

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
   
}  //end of show_line_graphs function


/*Displaying the map */
mapboxgl.accessToken = 'pk.eyJ1IjoiYW1jYWxpIiwiYSI6ImNrMHl4ZXdzcDA4c3czY3BlcWttc2k3YzkifQ.apM6qnRNX442RufrpJjbyA';

// adding map from Mapbox
let map = new mapboxgl.Map({
  container: 'map', // #1 HTML container id
  style: 'mapbox://styles/mapbox/streets-v9', // style URL
  center: [0, 0], // #2 starting position as [lng, lat]
  zoom: 0.7,
  
  tileLayer: {
    // this map option disables world wrapping. by default, it is false.
    continuousWorld: false,
    // this option disables loading tiles outside of the world bounds.
    noWrap: true
  }
 });
 
// map.addLayer({
//   id: 'trees-point',
//   type: 'circle',
//   source: 'trees',
//   paint: {
//     'circle-radius': 3,
//     'circle-color': '#223b53',
//     'circle-stroke-color': 'white',
//     'circle-stroke-width': 1,
//     'circle-opacity': 0.5
//   }
// });



    
// map.addControl(new mapboxgl.FullscreenControl());

  // // create the marker
  //   new mapboxgl.Marker()
  //   .setLngLat([-21.9270884, 64.1436456])
  //   .addTo(map);

/*Importing the API for today's Index readings of the cities*/

const API_URL = "http://api.weatherbit.io/v2.0/current";
const API_LAT = "?&lat=";
const API_LON = "&lon=";
const API_KEY = "&key=0ca43393266643c4b87e8df01b8c6496";

//pseudo code function to return longitude and latitude of city
// function to_get_long_lat_of_city(city, long, lat){
    
//     let long_lat_of_cities = [];
    
//     // for city of cityArray
    
// };


function testAPI()
{
    axios.get("https://api.weatherbit.io/v2.0/current?&lat=38.123&lon=-78.543&key=0ca43393266643c4b87e8df01b8c6496")
        .then(function(response){
            console.log(response);
        })
    
}