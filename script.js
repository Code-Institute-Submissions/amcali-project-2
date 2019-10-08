/*global queue*/
/*global crossfilter*/
/*global d3*/
/*global dc*/
/* global mapboxgl*/
/*global axios*/
/*global $*/
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
 

  //require 3 arrays. 1: contain over 20 colours; 2: contain all the cities; 3: an array to push all the colours according to each city.
  let cityArray = [
                   //testing the following 3 cities first before adding subsequent cities
                   {"city": "Buenos Aires", "color": '#FF6633', "longitude": -58.3816, "latitude": -34.6037}, //"coordinates": [ -151.5129, 63.1016, 0.0 ]
                   {"city": "Darwin", "color": '#FFB399', "longitude": 130.8456, "latitude": -12.4634},
                   {"city": "Melbourne", "color": '#FF33FF', "longitude": 144.9631, "latitude": -37.8136},

                   // {"city": "Sydney", "color": '#FFFF99', "lngLat": [151.2093, 33.8688]},
                   // {"city": "Rio de Janeiro", "color": '#00B3E6', "lngLat": [43.1729, 22.9068]},
                   // {"city": "Vancouver", "color": '#E6B333', "longitude": 123.1207, "latitude": 49.2827},
                   // {"city": "Havana", "color": '#3366E6', "longitude": 82.3666, "latitude": 23.1136},
                   // {"city": "Port Stanley", "color": '#999966', "longitude": 57.8517, "latitude": 51.6977},
                   // {"city": "Paris", "color": "#99FF99", "longitude": 2.3522, "latitude": 48.8566},
                   // {"city": "Berlin", "color": "#80B300", "longitude": 13.4050, "latitude": 52.5200},
                   // {"city": "Heraklion", "color": "#B34D4D", "longitude": 25.1442, "latitude": 35.3387},
                   // {"city": "Tokyo", "color": "#809900", "longitude": 139.6503, "latitude": 35.6762},
                   // {"city": "Nairobi", "color": "#E6B3B3", "longitude": 36.8219, "latitude": 1.2921},
                   // {"city": "Antananarivo", "color": "#6680B3", "longitude": 47.5079, "latitude": 18.8792},
                   // {"city": "Maputo", "color": "#66991A", "longitude": 32.5732, "latitude": 25.9692},
                   // {"city": "Ulaanbaatar", "color": "#FF99E6", "longitude": 106.9057, "latitude": 47.8864},
                   // {"city": "Wellington", "color": "#CCFF1A", "longitude": 174.7762, "latitude": 41.2865},
                   // {"city": "Panama", "color": "#FF1A66", "longitude": 80.7821, "latitude": 8.5380},
                   // {"city": "St Petersbourg", "color": "#E6331A", "longitude": 30.3351, "latitude": 59.9343},
                   // {"city": "Singapore", "color": "#33FFCC", "longitude": 103.8198, "latitude": 1.3521},
                   // {"city": "Cape Town", "color": "#66994D", "longitude": 18.4241, "latitude": 33.9249},
                   // {"city": "Palma de Mallorca", "color": "#B366CC", "longitude": 2.6502, "latitude": 39.5696},
                   // {"city": "Colombo", "color": "#4D8000", "longitude": 79.8612, "latitude": 6.9271},
                   // {"city": "Bangkok", "color": "#B33300", "longitude": 13.7563, "latitude": 100.5018},
                   // {"city": "Los Angeles", "color": "#CC80CC", "longitude": 118.2437, "latitude": 34.0522},
                   // {"city": "New York", "color": "#66664D", "longitude": 74.0060, "latitude": 40.7128},
                   // {"city": "Hanoi", "color": "#991AFF", "longitude": 105.8342, "latitude": 21.0278}
                ];  //declaring an array to use when drawing the composite chart



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
    
    console.log(city_dim);
    console.log(group);
}




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


}  //end of show_line_graphs function





/*Importing the API for today's Index readings of the cities*/

const API_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "74384801b390bc25a0a33dfef5c3d862";
var API_LAT = cityArray.latitude;
var API_LON = cityArray.longitude;


//sample API format: "https://api.openweathermap.org/data/2.5/uvi?appid=74384801b390bc25a0a33dfef5c3d862&lat=37.75&lon=-122.37"
// Testing of following code returned undefined values. Intention is to extract longitude and latitude coordinates to place as parameters to fetch API data
// let longArray = [];
// let latArray = [];
//  for (i=0; i < cityArray.length; i++)
//     {
//         // extract out the current place object by index i
//         let lo = cityArray.longitude;
//         let la = cityArray.latitude;
        
//         longArray.push(lo);
//         latArray.push(la);
//     }


// console.log(longArray);
// console.log(latArray);



function testAPI()
{
    axios.get("https://api.openweathermap.org/data/2.5/uvi?appid=74384801b390bc25a0a33dfef5c3d862&lat=-34.6037&lon=-58.3816")
        .then(function(response){
            console.log(response);
        })
    
}    
    
//     $(function(){
//     $("#discipline-selector").click(function(){
//         let searchTerms = $("#search").val();
    
//         axios.get(API_URL + /uvi? + appid + API_KEY + &lat= + -34.6037 + &lon= + -58.3816)
//         .then(function(response){
//             let uv_reading_for_today = response.data;
//             console.log(uv_reading_for_today)
//         });
//     })
// })



/* example of API format
"https://api.openweathermap.org/data/2.5/uvi?appid=74384801b390bc25a0a33dfef5c3d862&lat=37.75&lon=-122.37"
*/
/*constructing the format of the API URL end point
axios.get(API_URL + "/uvi?" + "appid" + API_KEY + "&lat=" + API_LAT + "&lon=" + API_LON)*/






// Save all the markers into an array
// to be used for later according to drop down selection
let long_lat_of_cities = [];

// for (let p of cityArray) {

//     // Place a marker for each place into created array
//     let m = new mapboxgl.Marker()
//     .setLngLat({lng: p.longitude, lat: p.latitude})       //{lng: <lng>, lat: <lat>}
//     .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
//     .setHTML(`<h3>${p.city}</h3><p>${p.longitude}${p.latitude}</p>'`))
//     .addTo(map);

//     // add the created marker to the list of all markers
//     long_lat_of_cities.push(m);
    

// }

function clearmarker() {
    for(let m of long_lat_of_cities)
        m.remove();
}

function createmarker(place) {
    for (let p of cityArray)
    {
        if (p.city == place)
        {
            let m = new mapboxgl.Marker()
            .setLngLat({lng: p.longitude, lat: p.latitude})       //{lng: <lng>, lat: <lat>}
            .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(`<h3>${p.city}</h3><p>${p.longitude}${p.latitude}</p>'`))
            .addTo(map);
        
            // add the created marker to the list of all markers
            long_lat_of_cities.push(m);
        }
    }
}


// $('#discipline-selector').multiSelect({
//   afterSelect: function(values){
//     alert("Select value: "+values);
//   },
//   afterDeselect: function(values){
//     alert("Deselect value: "+values);
//   }
// });

$( "#dc-select-menu" )
  .change(function() {
    console.log("entered");
    clearmarker();
    var str = "";
    $( "#dc-select-menu option:selected" ).each(function() {
      str += $( this ).text() + " ";
      createmarker($( this ).text());
      
    });
    $( "#test" ).text( str );
  })
  .trigger( "change" );
