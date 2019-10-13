/*global queue*/
/*global crossfilter*/
/*global d3*/
/*global dc*/
/* global mapboxgl*/
/*global $*/


/*Displaying active pages upon click of navigation bar drop down menu*/
$(function() {
    

    $('.page').hide();
    $('#about').show();


    $(".dropdown-item").click(function(){
        // extract out the value of data-dest attribute for the
        // clicked link
        let page = $(this).data('dest');
        $('.page').hide();
        $('#' + page).show();
    })    

});  

 

/*Declaring an array to use when drawing the composite chart, 
and generating information for contents of mapbox popup markers*/
let cityArray = [
                {"country": "Argentine", "city": "Buenos Aires", "color": "Aqua", "longitude": -58.3816, "latitude": -34.6037, "latReading": "35°S"},
                {"country": "Australia", "city": "Darwin", "color": "PeachPuff", "longitude": 130.8456, "latitude": -12.4634, "latReading": "13°S"},
                {"country": "Australia", "city": "Melbourne", "color": '#FF33FF', "longitude": 144.9631, "latitude": -37.8136, "latReading": "37°S"},
                {"country": "Australia", "city": "Sydney", "color": "LightBlue", "longitude": 151.2093, "latitude": -33.8688, "latReading": "34°S"},
                {"country": "Brazil", "city": "Rio de Janerio", "color": '#00B3E6', "longitude": -43.1729, "latitude": -22.9068, "latReading": "23°S"},
                {"country": "Canada", "city": "Vancouver", "color": "Aquamarine", "longitude": -123.1207, "latitude": 49.2827, "latReading": "49°N"},
                {"country": "Cuba", "city": "Havana", "color": '#3366E6', "longitude": -82.3666, "latitude": 23.1136, "latReading": "23°N"},
                {"country": "Falkland-Islands", "city": "Port Stanley", "color": "BlueViolet", "longitude": -57.8517, "latitude": -51.6977, "latReading": "58°S"},
                {"country": "France", "city": "Paris", "color": "Brown", "longitude": 2.3522, "latitude": 48.8566, "latReading": "49°N"},
                {"country": "Germany", "city": "Berlin", "color": "#80B300", "longitude": 13.4050, "latitude": 52.5200, "latReading": "52°N"},
                {"country": "Greece", "city": "Heraklion", "color": "CadetBlue", "longitude": 25.1442, "latitude": 35.3387, "latReading": "35°N"},
                {"country": "Japan", "city": "Tokyo", "color": "Chartreuse", "longitude": 139.6503, "latitude": 35.6762, "latReading": "36°N"},
                {"country": "Kenya", "city": "Nairobi", "color": "Chocolate", "longitude": -36.8219, "latitude": -1.2921, "latReading": "1°S"},
                {"country": "Madagascar", "city": "Antananarivo", "color": "DarkGray", "longitude": -47.5079, "latitude": -18.8792, "latReading": "19°S"},
                {"country": "Mozambique", "city": "Maputo", "color": "DarkBlue", "longitude": -32.5732, "latitude": -25.9692, "latReading": "26°S"},
                {"country": "Mongolia", "city": "Ulaanbaatar", "color": "DarkCyan", "longitude": 106.9057, "latitude": 47.8864, "latReading": "48°N"},
                {"country": "New Zealand", "city": "Wellington", "color": "#CCFF1A", "longitude": 174.7762, "latitude": -41.2865, "latReading": "42°S"},
                {"country": "Panama", "city": "Panama", "color": "#FF1A66", "longitude": -80.7821, "latitude": 8.5380, "latReading": "9°N"},
                {"country": "Russia", "city": "St Petersburg", "color": "DarkKhaki", "longitude": 30.3351, "latitude": 59.9343, "latReading": "60°N"},
                {"country": "Singapore", "city": "Singapore", "color": "DarkTurquoise", "longitude": 103.8198, "latitude": 1.3521, "latReading": "1°N"},
                {"country": "South Africa", "city": "Cape Town", "color": "DimGray", "longitude": 18.4241, "latitude": -33.9249, "latReading": "34°S"},
                {"country": "Spain", "city": "Palma de Mallorca", "color": "DodgerBlue", "longitude": 2.6502, "latitude": 39.5696, "latReading": "39°N"},
                {"country": "Sri Lanka", "city": "Colombo", "color": "Gold", "longitude": 79.8612, "latitude": 6.9271, "latReading": "13°N"},
                {"country": "Thailand", "city": "Bangkok", "color": "GoldenRod", "longitude": 100.5018, "latitude": 13.7563, "latReading": "14°N"},
                {"country": "USA", "city": "Los Angeles", "color": "#CC80CC", "longitude": -118.2437, "latitude": 34.0522, "latReading": "34°N"},
                {"country": "USA", "city": "New York", "color": "LimeGreen", "longitude": -74.0060, "latitude": 40.7128, "latReading": "41°N"},
                {"country": "Vietnam", "city": "Hanoi", "color": "SandyBrown", "longitude": 105.8342, "latitude": 21.0278, "latReading": "21°N"}
            ];  


/*Creating the Composite Chart*/ 
queue()

    // Data for UV index readings are stored in a local .json file. the following calls the relative filepath to the .json file        
    .defer(d3.json, "data/uv-index-reference.json" ) // load in the json file with uv-index references
    .await(makeGraphs);


/*the following will create a parse method to convert the month from string to a standard month format, 
and call the functions that create the selector menu and composite chart. */
function makeGraphs(error, uvIndexData){ 

    // Creating a cross filter; data for UVI readings are from in .json file
    let transactionCrossFilter = crossfilter(uvIndexData);  //data from .json stored as uvIndexData

    //To convert readings for each month for compatibility of drawing chart
    let parseDate = d3.time.format("%b").parse;
    uvIndexData.forEach(function(d){
        d.month = parseDate(d.month);
    });


 show_discipline_selector(transactionCrossFilter);  //calls the selector menu function
 show_line_graphs(transactionCrossFilter);          //calls the composite chart function

 dc.renderAll();    //generates all lines on composite chart according to city

}    // end of makeGraphs function


/*creates the multiple selector menu of cities for use to choose line chart 
of city choice on composite chart to view the UV index readings from January 
to December*/
function show_discipline_selector(transactionCrossFilter){

    let city_dim = transactionCrossFilter.dimension(dc.pluck("city"));
    let group = city_dim.group();

    dc.selectMenu("#discipline-selector")
        .dimension(city_dim)
        .group(group)
        .multiple(true)
        .controlsUseVisibility(true)
        .title(kv => kv.key);       //hides number of readings per city displaying on menu selector
    
}




function show_line_graphs(transactionCrossFilter){

    /* Creating a dimension based on the 'month' property of each data point.
    This will represent the composite chart's x-axis base readings.*/
    
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

   // Dimension grouping (ie. summarising of each data point) is done by city
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



   /* Dimension grouping by city and color for purpose to draw different lines
   on composite chart*/

  let compositeChart = dc.compositeChart('#line-graph');

     let chartsOfLineCharts = [];
     for (each_city of cityArray){
     let uvOfCities = month_dim.group().reduceSum(uv_by_city(each_city.city)); //pushes the reduceSum of uv index for each city into the array, and grouped by month
     let c = dc.lineChart(compositeChart)
           .colors(each_city.color)
           .group(uvOfCities, each_city.city);

         chartsOfLineCharts.push(c);

     }


  compositeChart
    .width(700)
    .height(400)
    .margins({top: 10, right: 200, bottom: 75, left: 100})
    .renderlet(function (chart) {
        chart.selectAll("g.x text")
          .attr('dx', '-40')
          .attr('dy', '-10')
          .attr('transform', "rotate(-90)");
    })
    .dimension(month_dim)
    .group(uv_reading_per_month)
    .valueAccessor(function (d) {
        return d.value.average;
     })
    .transitionDuration(500)
    .useViewBoxResizing(true)
    .x(d3.time.scale().domain([min_month,max_month]))
    .xAxisLabel("Month")
    .yAxisLabel("UV Index")
    .legend(dc.legend().x(525).y(10).itemHeight(9).gap(5))
    .renderHorizontalGridLines(true)
    .compose(chartsOfLineCharts)
    .brushOn(false);

    //the following ensures labels on x-axis appear in "Mmm" format    
    compositeChart.xAxis()
        .tickFormat(d3.time.format("%b"));
        
    compositeChart.render();


}  //end of show_line_graphs function



// $( "#dc-select-menu" )
//   .change(function() {
//     console.log("entered");
//     clearmarker();
//     var str = "";
//     $( "#dc-select-menu option:selected" ).each(function() {
//       str += $( this ).text() + " ";
//       createmarker($( this ).text());
      
//     });
//     $( "#test" ).text( str );
//   })
//   .trigger( "change" );
  
/*Displaying the map */
mapboxgl.accessToken = 'pk.eyJ1IjoiYW1jYWxpIiwiYSI6ImNrMHl4ZXdzcDA4c3czY3BlcWttc2k3YzkifQ.apM6qnRNX442RufrpJjbyA';


// adding map from Mapbox
let map = new mapboxgl.Map({
  container: 'map', // referes to id of HTML div tag
  style: 'mapbox://styles/mapbox/streets-v9', // Mapbox URL style
  center: [0, 0], // coordinate format: [lng, lat]
  zoom: 0.3,
});


// Save all the markers into an array
// to be used for later according to drop down selection
let long_lat_of_cities = [];

for (let p of cityArray) {

    // Place a marker for each place into created array
    let m = new mapboxgl.Marker()
        .setLngLat({lng: p.longitude, lat: p.latitude})       //{lng: <lng>, lat: <lat>}
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
        .setHTML(`<h2>${p.country}:</h2><h3>${p.city}</h3><p>${p.latReading}</p>`))
        .addTo(map);

    // add the created marker to the list of all markers
    long_lat_of_cities.push(m);

}

map.setRenderWorldCopies(false);
map.dragPan.enable();


/* The following is to enable markers on the map to appear with the graph line according 
to the city selected from the select menu*/

$(document).on('change', '.dc-select-menu', function () {
    clearMarkers();
    $( ".dc-select-menu option:selected" ).each(function() {
      createmarker($( this ).text());
    });
});

function createmarker(place) {
    let selectall = false;
    if(place == "Select all")
        selectall = true;
    for (let p of cityArray) {
        if(p.city == place || selectall) {
            /* Place a marker for each place into created array based on 
            longitude and latitude called from cityArray*/
            let m = new mapboxgl.Marker()
            .setLngLat({lng: p.longitude, lat: p.latitude})       
            .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(`<h5>${p.country}:</h5><h6>${p.city}</h6><p>${p.latReading}</p>`))
            .addTo(map);
        
            // add the created marker to the list of all markers
            long_lat_of_cities.push(m);
            if(!selectall)
                return;
        }
    }
}

function clearMarkers() {
    for(let m of long_lat_of_cities) {
        m.remove();
    }
   long_lat_of_cities = [];
}


// function does not work to disable multiselect on select Menu when 'select all is highlighted'
// $(document).on('click', '.dc-select-menu', function disableMultiselect (){
//          
//         if(choice == "Select all")
//             return dc.selectMenu("#discipline-selector")
//                     .multiple(false);
// });
