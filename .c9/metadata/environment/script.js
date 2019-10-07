{"changed":true,"filter":false,"title":"script.js","tooltip":"/script.js","value":"/*global queue*/\n/*global crossfilter*/\n/*global d3*/\n/*global dc*/\n/* global mapboxgl*/\n/*global axios*/\n/*global $*/\n/*Displaying the map */\nmapboxgl.accessToken = 'pk.eyJ1IjoiYW1jYWxpIiwiYSI6ImNrMHl4ZXdzcDA4c3czY3BlcWttc2k3YzkifQ.apM6qnRNX442RufrpJjbyA';\n\n// adding map from Mapbox\nlet map = new mapboxgl.Map({\n  container: 'map', // #1 HTML container id\n  style: 'mapbox://styles/mapbox/streets-v9', // style URL\n  center: [0, 0], // #2 starting position as [lng, lat]\n  zoom: 0.7,\n\n  tileLayer: {\n    // this map option disables world wrapping. by default, it is false.\n    continuousWorld: false,\n    // this option disables loading tiles outside of the world bounds.\n    noWrap: true\n  }\n });\n \n\n  //require 3 arrays. 1: contain over 20 colours; 2: contain all the cities; 3: an array to push all the colours according to each city.\n  let cityArray = [\n                   //testing the following 3 cities first before adding subsequent cities\n                   {\"city\": \"Buenos Aires\", \"color\": '#FF6633', \"longitude\": -58.3816, \"latitude\": -34.6037},\n                   {\"city\": \"Darwin\", \"color\": '#FFB399', \"longitude\": 130.8456, \"latitude\": -12.4634},\n                   {\"city\": \"Melbourne\", \"color\": '#FF33FF', \"longitude\": 144.9631, \"latitude\": -37.8136},\n\n                   // {\"city\": \"Sydney\", \"color\": '#FFFF99', \"lngLat\": [151.2093, 33.8688]},\n                   // {\"city\": \"Rio de Janeiro\", \"color\": '#00B3E6', \"lngLat\": [43.1729, 22.9068]},\n                   // {\"city\": \"Vancouver\", \"color\": '#E6B333', \"longitude\": 123.1207, \"latitude\": 49.2827},\n                   // {\"city\": \"Havana\", \"color\": '#3366E6', \"longitude\": 82.3666, \"latitude\": 23.1136},\n                   // {\"city\": \"Port Stanley\", \"color\": '#999966', \"longitude\": 57.8517, \"latitude\": 51.6977},\n                   // {\"city\": \"Paris\", \"color\": \"#99FF99\", \"longitude\": 2.3522, \"latitude\": 48.8566},\n                   // {\"city\": \"Berlin\", \"color\": \"#80B300\", \"longitude\": 13.4050, \"latitude\": 52.5200},\n                   // {\"city\": \"Heraklion\", \"color\": \"#B34D4D\", \"longitude\": 25.1442, \"latitude\": 35.3387},\n                   // {\"city\": \"Tokyo\", \"color\": \"#809900\", \"longitude\": 139.6503, \"latitude\": 35.6762},\n                   // {\"city\": \"Nairobi\", \"color\": \"#E6B3B3\", \"longitude\": 36.8219, \"latitude\": 1.2921},\n                   // {\"city\": \"Antananarivo\", \"color\": \"#6680B3\", \"longitude\": 47.5079, \"latitude\": 18.8792},\n                   // {\"city\": \"Maputo\", \"color\": \"#66991A\", \"longitude\": 32.5732, \"latitude\": 25.9692},\n                   // {\"city\": \"Ulaanbaatar\", \"color\": \"#FF99E6\", \"longitude\": 106.9057, \"latitude\": 47.8864},\n                   // {\"city\": \"Wellington\", \"color\": \"#CCFF1A\", \"longitude\": 174.7762, \"latitude\": 41.2865},\n                   // {\"city\": \"Panama\", \"color\": \"#FF1A66\", \"longitude\": 80.7821, \"latitude\": 8.5380},\n                   // {\"city\": \"St Petersbourg\", \"color\": \"#E6331A\", \"longitude\": 30.3351, \"latitude\": 59.9343},\n                   // {\"city\": \"Singapore\", \"color\": \"#33FFCC\", \"longitude\": 103.8198, \"latitude\": 1.3521},\n                   // {\"city\": \"Cape Town\", \"color\": \"#66994D\", \"longitude\": 18.4241, \"latitude\": 33.9249},\n                   // {\"city\": \"Palma de Mallorca\", \"color\": \"#B366CC\", \"longitude\": 2.6502, \"latitude\": 39.5696},\n                   // {\"city\": \"Colombo\", \"color\": \"#4D8000\", \"longitude\": 79.8612, \"latitude\": 6.9271},\n                   // {\"city\": \"Bangkok\", \"color\": \"#B33300\", \"longitude\": 13.7563, \"latitude\": 100.5018},\n                   // {\"city\": \"Los Angeles\", \"color\": \"#CC80CC\", \"longitude\": 118.2437, \"latitude\": 34.0522},\n                   // {\"city\": \"New York\", \"color\": \"#66664D\", \"longitude\": 74.0060, \"latitude\": 40.7128},\n                   // {\"city\": \"Hanoi\", \"color\": \"#991AFF\", \"longitude\": 105.8342, \"latitude\": 21.0278}\n                ];  //declaring an array to use when drawing the composite chart\n\n  //require 3 arrays. 1: contain over 20 colours; 2: contain all the cities; 3: an array to push all the colours according to each city.\n  let cityArray = [\n                   //testing the following 3 cities first before adding subsequent cities\n                   {\"city\": \"Buenos Aires\", \"color\": '#FF6633', \"longitude\": -58.3816, \"latitude\": -34.6037},\n                   {\"city\": \"Darwin\", \"color\": '#FFB399', \"longitude\": 130.8456, \"latitude\": -12.4634},\n                   {\"city\": \"Melbourne\", \"color\": '#FF33FF', \"longitude\": 144.9631, \"latitude\": -37.8136},\n\n                   // {\"city\": \"Sydney\", \"color\": '#FFFF99', \"lngLat\": [151.2093, 33.8688]},\n                   // {\"city\": \"Rio de Janeiro\", \"color\": '#00B3E6', \"lngLat\": [43.1729, 22.9068]},\n                   // {\"city\": \"Vancouver\", \"color\": '#E6B333', \"longitude\": 123.1207, \"latitude\": 49.2827},\n                   // {\"city\": \"Havana\", \"color\": '#3366E6', \"longitude\": 82.3666, \"latitude\": 23.1136},\n                   // {\"city\": \"Port Stanley\", \"color\": '#999966', \"longitude\": 57.8517, \"latitude\": 51.6977},\n                   // {\"city\": \"Paris\", \"color\": \"#99FF99\", \"longitude\": 2.3522, \"latitude\": 48.8566},\n                   // {\"city\": \"Berlin\", \"color\": \"#80B300\", \"longitude\": 13.4050, \"latitude\": 52.5200},\n                   // {\"city\": \"Heraklion\", \"color\": \"#B34D4D\", \"longitude\": 25.1442, \"latitude\": 35.3387},\n                   // {\"city\": \"Tokyo\", \"color\": \"#809900\", \"longitude\": 139.6503, \"latitude\": 35.6762},\n                   // {\"city\": \"Nairobi\", \"color\": \"#E6B3B3\", \"longitude\": 36.8219, \"latitude\": 1.2921},\n                   // {\"city\": \"Antananarivo\", \"color\": \"#6680B3\", \"longitude\": 47.5079, \"latitude\": 18.8792},\n                   // {\"city\": \"Maputo\", \"color\": \"#66991A\", \"longitude\": 32.5732, \"latitude\": 25.9692},\n                   // {\"city\": \"Ulaanbaatar\", \"color\": \"#FF99E6\", \"longitude\": 106.9057, \"latitude\": 47.8864},\n                   // {\"city\": \"Wellington\", \"color\": \"#CCFF1A\", \"longitude\": 174.7762, \"latitude\": 41.2865},\n                   // {\"city\": \"Panama\", \"color\": \"#FF1A66\", \"longitude\": 80.7821, \"latitude\": 8.5380},\n                   // {\"city\": \"St Petersbourg\", \"color\": \"#E6331A\", \"longitude\": 30.3351, \"latitude\": 59.9343},\n                   // {\"city\": \"Singapore\", \"color\": \"#33FFCC\", \"longitude\": 103.8198, \"latitude\": 1.3521},\n                   // {\"city\": \"Cape Town\", \"color\": \"#66994D\", \"longitude\": 18.4241, \"latitude\": 33.9249},\n                   // {\"city\": \"Palma de Mallorca\", \"color\": \"#B366CC\", \"longitude\": 2.6502, \"latitude\": 39.5696},\n                   // {\"city\": \"Colombo\", \"color\": \"#4D8000\", \"longitude\": 79.8612, \"latitude\": 6.9271},\n                   // {\"city\": \"Bangkok\", \"color\": \"#B33300\", \"longitude\": 13.7563, \"latitude\": 100.5018},\n                   // {\"city\": \"Los Angeles\", \"color\": \"#CC80CC\", \"longitude\": 118.2437, \"latitude\": 34.0522},\n                   // {\"city\": \"New York\", \"color\": \"#66664D\", \"longitude\": 74.0060, \"latitude\": 40.7128},\n                   // {\"city\": \"Hanoi\", \"color\": \"#991AFF\", \"longitude\": 105.8342, \"latitude\": 21.0278}\n                ];  //declaring an array to use when drawing the composite chart\n\n\nqueue()\n // file type        // the relative filepath to the .json file\n .defer(d3.json, \"data/uv-index-reference.json\" ) // load in the json file with uv-index references\n .await(makeGraphs);\n\nfunction makeGraphs(error, uvIndexData){\n\n // Step 1 - create a cross filter\n let transactionCrossFilter = crossfilter(uvIndexData);  //data from .json stored as uvIndexData\n console.log(uvIndexData);\n\n\n let parseDate = d3.time.format(\"%b\").parse;\n   uvIndexData.forEach(function(d){\n      d.month = parseDate(d.month);\n   });\n\n\n show_discipline_selector(transactionCrossFilter);\n show_line_graphs(transactionCrossFilter);\n\n\n dc.renderAll();\n\n}    // end of makeGraphs function\n\n\nfunction show_discipline_selector(transactionCrossFilter){\n\n   let city_dim = transactionCrossFilter.dimension(dc.pluck(\"city\"));\n   let group = city_dim.group();\n   dc.selectMenu(\"#discipline-selector\")\n    .dimension(city_dim)\n    .group(group)\n    .multiple(true);\n}\n\n\n<<<<<<< HEAD\n=======\n// function show_graphs_by_city(transactionCrossFilter){\n// }\n\n\n //function to allow user to select city to view data for\n// function show_discipline_selector(transactionCrossFilter){\n\n\n//    let city_dim = transactionCrossFilter.dimension(dc.pluck(\"city\"));\n//    let group = city_dim.group();\n\n//    dc.selectMenu(\"#discipline-selector\")\n//     .dim(city_dim)\n//     .group(group);\n\n\n//    let parseDate = d3.time.format(\"%b\").parse;\n//    uvIndexData.forEach(function(d){\n//       d.month = parseDate(d.month);\n//    });\n// }\n>>>>>>> ec38ed8418a021029fd627e4146a243897a650fb\n\nfunction show_line_graphs(transactionCrossFilter){\n\n    //Step 2 -\n   // Creating a dimension based on the 'month' property of each data point\n\n   let month_dim = transactionCrossFilter.dimension(dc.pluck(\"month\"));\n\n   let uv_reading_per_month = month_dim.group().reduce(\n\n     //Add a fact or data entry\n      function(p, v) {\n       p.count++;\n       p.total += v.uvIndex;\n       p.average = p.total / p.count;\n       return p;\n      },\n\n     //Remove a fact or data entry\n      function(p, v) {\n      p.count--;\n      if (p.count == 0) {\n          p.total = 0;\n          p.average = 0;\n      } else {\n          p.total -= v.uvIndex;\n          p.average = p.total / p.count;\n      }\n      return p;\n      },\n\n      //Initialise the Reducer\n      function () {\n      return { count: 0, total: 0, average: 0};\n      }\n   );\n\n\n   let min_month = month_dim.bottom(1)[0].month;\n   let max_month = month_dim.top(1)[0].month;\n\n   // STEP 3 - Do the grouping of dimension by city\n   // \"Grouping\" --> summarizing each data point\n\n    function uv_by_city(city) {\n     return function(d) {\n         if (d.city === city) {\n             return +d.uvIndex;\n         }\n         else {\n             return 0;\n         }\n     };\n    }\n\n\n\n   // STEP 4 - Do the grouping of dimension by city and color\n\n  let compositeChart = dc.compositeChart('#line-graph');\n\n     let chartsOfLineCharts = [];\n     for (each_city of cityArray){\n     let uvOfCities = month_dim.group().reduceSum(uv_by_city(each_city.city)); //pushes the reduceSum of uv index for each city into the array, and grouped by month\n     let c = dc.lineChart(compositeChart)\n           .colors(each_city.color)\n           .group(uvOfCities, each_city.city);\n\n         chartsOfLineCharts.push(c);\n\n     }\n\n    console.log(chartsOfLineCharts);\n\n\n   //STEP 5 - drawing the graph scales\n\n\n  compositeChart\n    .width(500)\n    .height(400)\n    .margins({top: 10, right: 50, bottom: 30, left: 50})\n    .dimension(month_dim)\n    .group(uv_reading_per_month)\n    .valueAccessor(function (d) {\n         return d.value.average;\n     })\n    .transitionDuration(500)\n    .x(d3.time.scale().domain([min_month,max_month]))\n    .xAxisLabel(\"Month\")\n    .yAxisLabel(\"UV Index\")\n    .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))\n    .renderHorizontalGridLines(true)\n    .compose(chartsOfLineCharts)     //    .compose(charts)\n    .brushOn(false)\n    .render();\n\n\n}  //end of show_line_graphs function\n\n\n\n\n\n/*Importing the API for today's Index readings of the cities*/\n\nconst API_URL = \"https://api.openweathermap.org/data/2.5/uvi?appid=74384801b390bc25a0a33dfef5c3d862&lat=37.75&lon=-122.37\";\nconst API_KEY = \"74384801b390bc25a0a33dfef5c3d862\";\nconst API_LAT = cityArray.latitude;\nconst API_LON = cityArray.longitude;\n\n\nfunction testAPI()\n{\n    axios.get(API_URL + \"/uvi?\" + \"appid\" + API_KEY + \"&lat=\" + API_LAT + \"&lon=\" + API_LON)\n        .then(function(response){\n            console.log(response);\n        })\n    \n}    \n    \n    $(function(){\n    $(\"#discipline-selector\").click(function(){\n        let searchTerms = $(\"#search\").val();\n    \n        axios.get(API_URL + \"/uvi?\" + \"appid\" + API_KEY + \"&lat=\" + API_LAT + \"&lon=\" + API_LON)\n        .then(function(response){\n            let uv_reading_for_today = response.data;\n            console.log(uv_reading_for_today)\n        });\n    })\n})\n\n\n\n/* example of API format\n\"https://api.openweathermap.org/data/2.5/uvi?appid=74384801b390bc25a0a33dfef5c3d862&lat=37.75&lon=-122.37\"\n*/\n/*constructing the format of the API URL end point\naxios.get(API_URL + \"/uvi?\" + \"appid\" + API_KEY + \"&lat=\" + API_LAT + \"&lon=\" + API_LON)*/\n\n\n\n\n\n\n// Save all the markers into an array\n// to be used for later according to drop down selection\nlet long_lat_of_cities = [];\n\nfor (let p of cityArray) {\n\n    // Place a marker for each place into created array\n    let m = new mapboxgl.Marker()\n    .setLngLat({lng: p.longitude, lat: p.latitude})       //{lng: <lng>, lat: <lat>}\n    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups\n    .setHTML(`<h3>${p.city}</h3><p>${p.longitude}${p.latitude}</p>'`))\n    .addTo(map);\n\n    // add the created marker to the list of all markers\n    long_lat_of_cities.push(m);\n    \n\n}\n","undoManager":{"mark":-2,"position":7,"stack":[[{"start":{"row":215,"column":0},"end":{"row":228,"column":48},"action":"remove","lines":["<<<<<<< HEAD","","=======","","","","","   // let uvOfBuenosAires = month_dim.group().reduceSum(uv_by_city('Buenos Aires'));","   // let uvofDarwin = month_dim.group().reduceSum(uv_by_city('Darwin'));","","","","",">>>>>>> ec38ed8418a021029fd627e4146a243897a650fb"],"id":4829}],[{"start":{"row":232,"column":0},"end":{"row":246,"column":48},"action":"remove","lines":["<<<<<<< HEAD","=======","   // let charts = [","   //    dc.lineChart(compositeChart)","   //        .colors('green')","   //        .group(uvOfBuenosAires, 'Buenos Aires'),","   //    dc.lineChart(compositeChart)","   //        .colors('red')","   //        .group(uvofDarwin, 'Darwin'),","","           // ];","","","",">>>>>>> ec38ed8418a021029fd627e4146a243897a650fb"],"id":4830}],[{"start":{"row":251,"column":0},"end":{"row":331,"column":48},"action":"remove","lines":["<<<<<<< HEAD","","","}  //end of show_line_graphs function","","","","=======","","    // dc.lineChart(\"#line-graph\")","    // .width(500)","    // .height(400)","    // .margins({top: 10, right: 50, bottom: 30, left: 50})","    // .dimension(month_dim)","    // .group(uv_reading_per_month)","    // .valueAccessor(function (d) {","    //      return d.value.average;","    //  })","    // .transitionDuration(500)","    // .x(d3.time.scale().domain([min_month,max_month]))","    // .xAxisLabel(\"Month\")","    // .yAxisLabel(\"UV Index\")","    // .yAxis().ticks(4);","","   // below for bar chart appears, but with wrong presentation of data","   // dc.barChart(\"#line-graph\")","   //  .width(800)","   //  .height(400)","   //  .margins({top:10, right:50, bottom:30, left:50})","   //  .dimension(month_dim)","   //  .group(uv_reading_per_month)","   //  .valueAccessor(function (d) {","   //       return d.value.average;","   //   })","   //  .transitionDuration(500)","   //  .x(d3.scale.ordinal())","   //  .xUnits(dc.units.ordinal)","   //  .elasticY(true)","   //  .xAxisLabel(\"Month\")","   //  .yAxisLabel(\"UV Index\")","   //  .yAxis().ticks(13);","","}  //end of show_line_graphs function","","","/*Displaying the map */","mapboxgl.accessToken = 'pk.eyJ1IjoiYW1jYWxpIiwiYSI6ImNrMHl4ZXdzcDA4c3czY3BlcWttc2k3YzkifQ.apM6qnRNX442RufrpJjbyA';","","// adding map from Mapbox","let map = new mapboxgl.Map({","  container: 'map', // #1 HTML container id","  style: 'mapbox://styles/mapbox/streets-v9', // style URL","  center: [0, 0], // #2 starting position as [lng, lat]","  zoom: 0.7,","","  tileLayer: {","    // this map option disables world wrapping. by default, it is false.","    continuousWorld: false,","    // this option disables loading tiles outside of the world bounds.","    noWrap: true","  }"," });","","// map.addLayer({","//   id: 'trees-point',","//   type: 'circle',","//   source: 'trees',","//   paint: {","//     'circle-radius': 3,","//     'circle-color': '#223b53',","//     'circle-stroke-color': 'white',","//     'circle-stroke-width': 1,","//     'circle-opacity': 0.5","//   }","// });","","","","","// map.addControl(new mapboxgl.FullscreenControl());",">>>>>>> ec38ed8418a021029fd627e4146a243897a650fb"],"id":4831},{"start":{"row":251,"column":0},"end":{"row":256,"column":0},"action":"insert","lines":["","","}  //end of show_line_graphs function","","",""]}],[{"start":{"row":263,"column":0},"end":{"row":279,"column":48},"action":"remove","lines":["<<<<<<< HEAD","const API_LAT = cityArray.latitude;","const API_LON = cityArray.longitude;","=======","const API_LAT = \"?&lat=\";","const API_LON = \"&lon=\";","","","","","","/* example of API format","\"https://api.openweathermap.org/data/2.5/uvi?appid=74384801b390bc25a0a33dfef5c3d862&lat=37.75&lon=-122.37\"","*/","/*constructing the format of the API URL end point","axios.get(API_URL + \"/uvi?\" + \"appid\" + API_KEY + \"&lat=\" + API_LAT + \"&lon=\" + API_LON)*/",">>>>>>> ec38ed8418a021029fd627e4146a243897a650fb"],"id":4832},{"start":{"row":263,"column":0},"end":{"row":264,"column":36},"action":"insert","lines":["const API_LAT = cityArray.latitude;","const API_LON = cityArray.longitude;"]}],[{"start":{"row":269,"column":0},"end":{"row":305,"column":48},"action":"remove","lines":["<<<<<<< HEAD","    axios.get(API_URL + \"/uvi?\" + \"appid\" + API_KEY + \"&lat=\" + API_LAT + \"&lon=\" + API_LON)","        .then(function(response){","            console.log(response);","        })","    ","}    ","    ","    $(function(){","    $(\"#discipline-selector\").click(function(){","        let searchTerms = $(\"#search\").val();","    ","        axios.get(API_URL + \"/uvi?\" + \"appid\" + API_KEY + \"&lat=\" + API_LAT + \"&lon=\" + API_LON)","        .then(function(response){","            let uv_reading_for_today = response.data;","            console.log(uv_reading_for_today)","        });","    })","})","","","","/* example of API format","\"https://api.openweathermap.org/data/2.5/uvi?appid=74384801b390bc25a0a33dfef5c3d862&lat=37.75&lon=-122.37\"","*/","/*constructing the format of the API URL end point","axios.get(API_URL + \"/uvi?\" + \"appid\" + API_KEY + \"&lat=\" + API_LAT + \"&lon=\" + API_LON)*/","=======","    axios.get(\"https://api.openweathermap.org/data/2.5/uvi?appid=74384801b390bc25a0a33dfef5c3d862&lat=37.75&lon=-122.37\")","        .then(function(response){","            console.log(response);","        })","","}","","",">>>>>>> ec38ed8418a021029fd627e4146a243897a650fb"],"id":4833},{"start":{"row":269,"column":0},"end":{"row":294,"column":90},"action":"insert","lines":["    axios.get(API_URL + \"/uvi?\" + \"appid\" + API_KEY + \"&lat=\" + API_LAT + \"&lon=\" + API_LON)","        .then(function(response){","            console.log(response);","        })","    ","}    ","    ","    $(function(){","    $(\"#discipline-selector\").click(function(){","        let searchTerms = $(\"#search\").val();","    ","        axios.get(API_URL + \"/uvi?\" + \"appid\" + API_KEY + \"&lat=\" + API_LAT + \"&lon=\" + API_LON)","        .then(function(response){","            let uv_reading_for_today = response.data;","            console.log(uv_reading_for_today)","        });","    })","})","","","","/* example of API format","\"https://api.openweathermap.org/data/2.5/uvi?appid=74384801b390bc25a0a33dfef5c3d862&lat=37.75&lon=-122.37\"","*/","/*constructing the format of the API URL end point","axios.get(API_URL + \"/uvi?\" + \"appid\" + API_KEY + \"&lat=\" + API_LAT + \"&lon=\" + API_LON)*/"]}],[{"start":{"row":299,"column":0},"end":{"row":313,"column":48},"action":"remove","lines":["<<<<<<< HEAD","=======","// for (i = 0; i < lngLat.length; i++) {","//     for (j = 0; j < lngLat.length; j++){","//     let count = 1;","//     lngLat = lngLat[i, j];","//     count++;","//     }","// }","","// console.log(lngLat);","","//Declaring an array to record positions of all cities by longitude & latitude to adhere to Mapbox standards, and to place markers on map","let lngLat = [];",">>>>>>> ec38ed8418a021029fd627e4146a243897a650fb"],"id":4834}],[{"start":{"row":311,"column":0},"end":{"row":315,"column":48},"action":"remove","lines":["<<<<<<< HEAD","    .setHTML(`<h3>${p.city}</h3><p>${p.longitude}${p.latitude}</p>'`))","=======","    .setHTML(`<h3>${p.city}</h3><p>testing this works</p>'`))",">>>>>>> ec38ed8418a021029fd627e4146a243897a650fb"],"id":4835},{"start":{"row":311,"column":0},"end":{"row":311,"column":70},"action":"insert","lines":["    .setHTML(`<h3>${p.city}</h3><p>${p.longitude}${p.latitude}</p>'`))"]}],[{"start":{"row":316,"column":0},"end":{"row":324,"column":48},"action":"remove","lines":["<<<<<<< HEAD","    ","","}","=======","","}","",">>>>>>> ec38ed8418a021029fd627e4146a243897a650fb"],"id":4836},{"start":{"row":316,"column":0},"end":{"row":318,"column":1},"action":"insert","lines":["    ","","}"]}]]},"ace":{"folds":[],"scrolltop":4225.078125,"scrollleft":0,"selection":{"start":{"row":220,"column":35},"end":{"row":220,"column":35},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":292,"state":"no_regex","mode":"ace/mode/javascript"}},"timestamp":1570454234921}