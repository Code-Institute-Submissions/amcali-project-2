# The UV Index


The topic of Ultra Voilet Rays (UV Rays) or matters pertaining to it may be merely understood by many individuals. 
Most matters which cover the topic would relate to the health hazards which derive from the matter.
What actually creates UV rays may not be well understood.
Hence, this project is covering a sub topic on the UV: the UV Index.

The ultimate aim of the website is to give brief insight to the website user on the UV Index readings, and cover on one of the influences of UV Rays: the Earth's latitude.

The main aim of the website is to enable users via interaction with the present multimedia (video), map and chart to gain an understanding on a minor aspect of the UV Index (UVI).

The link to the project may be found [here.](https://amcali.github.io/project-2/)



## UX

This website is for any individual who wishes to have insight on the UV Index through some interactive mediums.
The original wireframe to the website project may be found [here](https://github.com/amcali/project-2/issues/1#issue-506329084 "Project 2 Wireframe").


The following User Story Scenarios, will walkthrough the purpose of each webpage and how it is used:
1) As a first time user, one would visit the About page, so that they may understand the purpose of the website.
2) As a first time user with minimal or no understanding about ultraviolet rays, one would view the video on the About page so to get brief insight on the UV Rays and UV Index topic.
3) As a new user who wishes to explore the menu contents at a glance, one would view the option stating "What is the UVI" to get a quick understanding of the website topic.
4) As a user who wants further understanding on the UVI, one would visit the menu page "UVI Around THe World", so to gain further understanding on what the webpage pertains to, and to explore the topic.
5) As new a user who dived into the webpage and viewed the map and chart, one would end up reading the content on the webpage, so as to understand how the map and chart work hand-in-hand.
6) As a user who wishes to understand the purpose of the website contents in a nutshell, one would visit the "Summary" webpage, so as to understand how the other webpages' contents compliment one another and have an option to access further information to another website.



## Features

The contents of the website have been divided into the following sections:

- __About__
    
    This section gives insight to what the website is about, and introduces the topic of the UV Index with a video.
    
- __What is the UV Index__
    
    This section covers an overview on the UV Index and what its measurements readings resemble.

- __UV Index Readings Around the Wold__

    27 cities had been presented with their map locations showing their latitude readings, and a composite chart illustrating each city's monthly UVI readings. This is to give the website user an opportunity to interact with the map and chart to compare different cities' latitudes versus their UVI readings.

- __Summary__

    As the factual information and UV index readings were sourced from the [World Health Organisation (WHO)](https://www.who.int/ "World Health Organisation"), this section not only summarises what the previous section was resembling with graphical readings, but also gives the user the option to seek more information on the topic from the WHO website.



### Existing Features

The following features are found in the "UV Index Around the World" page:
- Selector Menu of Cities - This allows the user to select one or multiple cities, for which will directly link to the city marker on the map, and the UVI readings on the composite chart.
- Map - A world map will enable the user to view on displayed markers the country, city name and latitude.
- Composite Chart - This illustrates the UVI readings for each city for each month of the year.

The above three features have been designed to link to one another to allow the user to visually compare city latitude locations, and how their UVI readings differ during the year. When cities of latitudes with a variance of 5 degrees are  compared, there is a general trend of similar UVI readings. Moreover, cities with a latitude that is closer to the earth's equatorial region have higher UVI readings compared to those that are further away.


### Existing Feature Limitations
Although the features enable the users to learn about UVI trends around the world based on the latitudes of cities, there is a limit to how much the user is able to analyse from the information provided. The UVI readings on the composite chart are provided as an illustration, based on [maximal UV Index values that are calculated for the 21st of each month.](https://www.who.int/uv/intersunprogramme/activities/uv_index/en/index3.html "WHO UV Index")

Realtime UVI reading accessibility may be a consideration for allowing the user to compare the reality of the UVI reading to the illustrated values on the composite chart.

The map may be considered to be colour coded along the latitudes to give the user an easier reference to the average UVI reading for different regions on Earth.

### Features Left to Implement
The following features are to be for future:
- UVI Forecast Readings: This feature would be a means of enhancing the user's interaction options for realistic insight on UVI readings around the world.
- Developing the data revealed from the composite chart: The user would be given an option to work with interactive charts that show the data from different aspects. One of them being highest and lowest UVI readings from top three and bottom three cities respectively.

## Technologies Used

The following were used to create this project:

- [HTML](https://html.com/)
    - **HTML** is used to create the content of the web pages.
- [CSS](https://www.w3schools.com/css/)
    - **CSS** is implemented to style and modify some of the webpage elements.
- [Bootstrap](https://getbootstrap.com/)
    - **Bootstrap** is implemented as the UI framework and for structuring and styling the layout of the featured elements on the website.
- [JavaScript](https://www.javascript.com/)
    - **JavaScript** is the language to create some of the interaction and events between the features. 
- [JSON](http://www.json.org/)    
    - **JSON** is used to store the dataset created for generating the composite chart.
- [JQuery](https://jquery.com)
    - **JQuery** is used in this project to simplify DOM manipulation.
- [Crossfilter & DC Charts](https://dc-js.github.io/dc.js/docs/html/dc.html)
    - The project uses **JavaScript Crossfilter and DC Charts** to create the composite chart and menu selector.
- [Mapbox](https://www.mapbox.com/)
    - The project uses **Mapbox** to create the map.    



## Testing

Manual testing was conducted throughout the development of this project, the following types of test scenarios were conducted:

1. Navigation Drop Down Menu:
    1. Click on the Navigation menu and a drop down of the available webpages are visible for user selection: About; What is UVI; UVI Around the World; Summary.
    2. Click on each of the navigation drop down menu items, and find that only the respective webpage will appear.
    - Issues: On clicking any navigation menu item, the selected tab becomes dark-blue (Bootstrap default setting).

2. Video:
    1. Open the website link to view the "About" page appear as the homepage.
    2. Click on the youtube video link, and the video succesfully plays.

3. Anchor Links:
    1. Open either the "About" or "Summary" pages, and find the underlined hyperlinks for "Trinidad and Tobago Meterological Service" and "World Health Organisation (WHO)" open to the respective organisations' webpages in an external web browser.

4. Anchor Links:
    1. Open the "About" webpage, and find the underlined hyperlink for "Trinidad and Tobago Meterological Service" opens the organisation's website in an external web browser.
    2. Open the "Summary" webpage, and find the underlined hyperlinks for "World Health Organisation (WHO)" open to the organisation's website in an external web browser.

5. Menu Selector:
    1. Open the "UVI Around the World" page
    2. On the menu selector, the page will automatically highlight "Select all", for which the map will show all markers and the composite chart will show all graph lines of all the city names displayed in the menu selector.
    3. Try to select one country in the menu selector; the respective marker will show up on the map, and the composite chart will only display the respective UVI readings for that city.
    4. Try to select multiple cities; the respective markers will show up on the map, and the composite chart will only display the UVI readings of those cities.
    - Issues: While the "Select all" option is highlighted, the other cities can also be selected simultaneously. The result will end up showing the markers and UVI readings of the selected cities.

4. Map:
    1. Open the "UVI Around the World" webpage, and click the markers to find the marker popup box appear and display the country name, city name and latitude. Click the 'x' button to close the popup box.
    2. Open the "UVI Around the World" webpage and on the map, zoom in to view the map closer up.
    3. Open the "UVI Around the World" webpage  and on the map, zoom out to view the map in smaller size.
    4. Open the "UVI Around the World" webpage  and on the map, drag the map from any location to find that it moves. 
    - Issues - On small mobile devices, the map does and popup boxes are unable to scale accordingly. Hence, the option for the user to drag the map has been enabled to compensate for the UX matter.

5. Composite Chart:
    1. Open the "UVI Around the World" webpage and view the composite chart. Upon multiple line graphs being displayed, hover over the city stated in the legend. The city which corresponds to the graph line displayed will become bold.
    - Issues: 1. Y-axis label is truncated from the graph.
              2. On small mobile devices, the graph becomes very small in comparison to the text content displayed on the webpage.

6. Mobile Responsive:
    1. Open any of the webpages; aside from the map and composite chart (issues mentioned above), the headers and text contents, tables and videos will respond according to the size of the medium device that accesses the website.


In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

If this section grows too long, you may want to split it off into a separate file and link to it from here.

## Deployment

This project was developed on AWS Cloud9, and deployed to GitHub.
The indivdual local files are available [here](https://github.com/amcali/project-2).


## Credits

### Content
- The the sections named "What is UVI", "UVI Around The World", and "Summary", text content and data displayed in the composite chart were copied from the following pages, and avaiable document from the World Health Organisation (WHO) website:
- [UV Index: UV Measurements](https://www.who.int/uv/intersunprogramme/activities/uv_index/en/index3.html)
- [Global Solar UV Index](https://www.who.int/uv/publications/globalindex/en/)
- [Global Solar UV Index (.pdf file)](https://apps.who.int/iris/bitstream/handle/10665/42459/9241590076.pdf;jsessionid=AE8115B74FAB79A3811A1D3FEAC0652D?sequence=1)

### Dataset
The JSON file dataset were copied from the WHO website: [UV Index: UV Measurements](https://www.who.int/uv/intersunprogramme/activities/uv_index/en/index3.html) 

### Media
- The video used in the "About" section was taken from [Youtube](https://www.youtube.com/). The link to the video is available [here](https://www.youtube.com/embed/WyWZ6RZkWrg), which is from the [Trinidad and Tobago Meterological Service](https://metoffice.gov.tt).

### Acknowledgements

- I received inspiration for this project from the [World Health Organisation (WHO)](https://www.who.int).
