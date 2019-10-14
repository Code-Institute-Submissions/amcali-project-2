# The UV Index


The topic of Ultra Voilet Rays (UV Rays) or matters pertaining to it may be merely understood by many individuals. 
Most matters which cover the topic would relate to the health hazards which derive from the matter.
What actually creates UV rays may not be well understood.
Hence, this project is covering a sub topic on the UV: the UV Index.
The ultimate aim of the website is to give brief insight to the website user on the UV Index readings, and cover on one of the influences of UV Rays: the earth's latitude.

The main aim of the website is to enable users via interaction with the present multimedia (video), map and chart to gain an understanding on a minor aspect of the UV Index (UVI).



## UX

*Use this section to provide insight into your UX process, focusing on who this website is for, what it is that they want to achieve and how your project is the best way to help them achieve these things.

This website is for any individual who wishes to have insight on the UV Index through some interactive mediums.
The original wireframe to the website project may be found [here](https://github.com/amcali/project-2/issues/1#issue-506329084 "Project 2 Wireframe").


The following User Story Scenarios, will walkthrough the purpose of each webpage and how it is used:
- 1. As a first time user, one would visit the About (Home) page, so that they may understand the purpose of the website.
- 2. As a first time user with minimal or no understanding about ultraviolet rays, one would view the video on the About page so to get brief insight on the UV Rays and UV Index topic.
- 3. As a new user who wishes to explore the menu contents at a glance, one would view the option stating "What is the UVI" to get a quick understanding of the website topic.
- 4. As a user who wants further understanding on the UVI, one would visit the menu page "UVI Around THe World", so to gain further understanding on what the webpage pertains to, and to explore the topic.
- 5. As new a user who dived into the webpage and viewed the map and chart, one would end up reading the content on the webpage, so as to understand how the map and chart work hand-in-hand.
- 6. As a user who wishes to understand the purpose of the website contents in a nutshell, one would visit the "Summary" webpage, so as to understand how the other webpages' contents compliment one another and have an option to access further information to another website.



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

In this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. For each, provide its name, a link to its official site and a short sentence of why it was used.

- [HTML](https://getbootstrap.com/)
    - The project uses **HTML** to create the content of the web pages.
- [CSS](https://getbootstrap.com/)
    - The project uses **CSS** to style and modify some of the webpage elements.
- [Bootstrap](https://getbootstrap.com/)
    - The project uses **Bootstrap** as the UI framework and for structuring and styling the layout of the featured elements on the website.
- [JavaScript](https://getbootstrap.com/)
    - The project uses **JavaScript** as the language to create some of the interaction and events between the features.    
- [JQuery](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation.
- [Crossfilter & DC Charts](https://dc-js.github.io/dc.js/docs/html/dc.html)
    - The project uses **JavaScript Crossfilter and DC Charts** to create the composite chart and menu selector.
- [Mapbox](https://www.mapbox.com/)
    - The project uses **Mapbox** to create the map.    



## Testing

In this section, you need to convince the assessor that you have conducted enough testing to legitimately believe that the site works well. Essentially, in this part you will want to go over all of your user stories from the UX section and ensure that they all work as intended, with the project providing an easy and straightforward way for the users to achieve their goals.

Whenever it is feasible, prefer to automate your tests, and if you've done so, provide a brief explanation of your approach, link to the test file(s) and explain how to run them.

For any scenarios that have not been automated, test the user stories manually and provide as much detail as is relevant. A particularly useful form for describing your testing process is via scenarios, such as:

1. Contact form:
    1. Go to the "Contact Us" page
    2. Try to submit the empty form and verify that an error message about the required fields appears
    3. Try to submit the form with an invalid email address and verify that a relevant error message appears
    4. Try to submit the form with all inputs valid and verify that a success message appears.

In addition, you should mention in this section how your project looks and works on different browsers and screen sizes.

You should also mention in this section any interesting bugs or problems you discovered during your testing, even if you haven't addressed them yet.

If this section grows too long, you may want to split it off into a separate file and link to it from here.

## Deployment

This section should describe the process you went through to deploy the project to a hosting platform (e.g. GitHub Pages or Heroku).

In particular, you should provide all details of the differences between the deployed version and the development version, if any, including:
- Different values for environment variables (Heroku Config Vars)?
- Different configuration files?
- Separate git branch?

In addition, if it is not obvious, you should also describe how to run your code locally.


## Credits

### Content
- The text for section Y was copied from the [Wikipedia article Z](https://en.wikipedia.org/wiki/Z)

### Media
- The photos used in this site were obtained from ...

### Acknowledgements

- I received inspiration for this project from X
