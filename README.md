# Airport Calculator Project 
![BANNER](https://media.istockphoto.com/id/599784202/vector/flags-banner.jpg?s=612x612&w=0&k=20&c=yfCUL6WSFkJD2VRyyscrNnbBL_6iLwF21K6me4BD264=)

## Purpose
Our data visualization project aims to develop a travel route search engine equipped with visual aids to facilitate the trip selection process. With the vast array of flights departing from each airport, our tool has the potential to assist travelers in finding the most direct route for their travel needs and exploring possible destination airports reachable from a given airport. The significance of this project lies in addressing the challenges travelers face, particularly those who prefer non-stop flights or seek a clear overview of available travel routes without being overwhelmed by pricing information. This project serves only as an app of historical value since the datasets have not been updated since 2014. 

## User Interface
Our user-friendly, interactive webpage prompts users to search for any airport using its IATA code. For users unsure of the IATA code associated with a specific airport, we provide a convenient "Airport Code Search" button that links to a separate webpage listing airport locations, countries, and codes. Once users input the code, the webpage displays three visualizations: two bar graphs showcasing the "Top Ten Destinations" and "Top Airlines," along with a map illustrating all possible destination airports reachable from the selected airport. With each search, the map automatically zooms into the user's airport, allowing them to zoom out to view destination airports. Additionally, the background image refreshes with each search, providing a fresh visual experience.

## The Data Set:
The OpenFlights Database is an opensource collection of world aiports, flight routes, airlines, planes, and countries. For our project we used the routes, airlines, and airports data sets. The openflights dataset sources are:

*airport database* - generated from DAFIF(Digital Aeronatical Flight Information File), OurAirports, and timezone information from EarthTools. \
*airlines database* - extraced directly from wikipedias list of airlines \
*route dataset* - up to 2014 was maintained and imported directly from airline route mapper 
\
[link to openflights](https://openflights.org/data.php)\
![Screenshot 2024-03-04 at 8 30 36 AM](https://github.com/sdemmon/flights_project_3/assets/141437641/94057d46-3ec4-46ab-b05a-7671c7ea3b47)

### Routes database 

The routes database includes 67,663 routes between 3321 airports on 548 airlines worldwide. The route dataset has not been updated since June 2014 beause of third party information ceasing to update. Therefore, this data provides only historical data. The data includes airline, airline_id, source airport, source_airport_id, destination_airport, destination_airport_id, codeshare, stops, equipment. 

### Airlines dataset:

The airlines dataset contains 5888 airlines. The dataset contains the following values airline_id, name, alias, iata, icao, callsign, country, active. 

### Airport dataset: 

The airports dataset contains over 10,000 airports spanning the globe. THe dataset contains the following values: airport_id, city, country, iata, icao, lat, lon, altitude, timezone, dst, tz_database_timezone, type, source. 

## ETL: 

The data sources are made available through a downloadable .dat file. When saving to our local computer, we changed the extension from .txt to .csv. From there we used pandas to read the csv files in JupyterNotebook. Once the files were read by pandas we created JSON files for the airline, routes and airports datasets using the pandas function to_json. After this the data was easily accessible for the project. 

## How to use: 

1. Download files. 
    - airportcodes.html
    - airlines.json
    - aiports.json
    - routes.json
    - index.html 
    - app.js
2. use the aiportcodes.html to search for the iata code of your desired airport
3. open index in a local host or in visual studio code preview
4. input any airport iata code into the box and click on the plot routes button /

or 

1. click on this guthub pages [link](https://sdemmon.github.io/flights_project_3/ )
2. use airportcodes.html to search for the iata code of your desired airport 
3. input any airport iata code into the box and click on the plot routes button


## Summary of how it works: 

Using a Document Object Model and an Event Listener, the javascript file imports the user input to the file to run the functions within the file. The Leaflet map is initialized and a tile layer is added for map legibility. From the button information, the function plot routes gets data from JSON  data files. The function plotRoutes uses JSON data to plot user airport marker on map, it also fetches the information about the user input airport for display in the airport info section. The plotRoutes function also plots polylines from input airport to all destinations. The other functions in this code are buildDestinationsChart and buildAirlinesChart which iterate through every destination and airline in the same manner and create a counter for everytime the destination and airline appear with the user inpur source airport. The counter is then organized in greatest to least order and the first ten and fifteen values are taken to represent the top destinations and airlines respectively. These functions then use plotly.js to create interactive bar charts with the results. 


## Example: 

1. Insert JFK in the search bar
![Screenshot 2024-03-04 at 8 27 23 AM](https://github.com/sdemmon/flights_project_3/assets/141437641/5f0ed28f-ff38-4850-8378-2f6e2f0d4f42)

2. 4 functionalities appear 
![Screenshot 2024-03-04 at 8 26 55 AM](https://github.com/sdemmon/flights_project_3/assets/141437641/bb0a3535-1ace-4d4a-95ae-f0c518291eab)


In JavaScript, we began by setting up event listeners to ensure that the JavaScript code executes after the HTML content is fully loaded. Using the Leaflet library, we initialized a map and added a tile layer from OpenStreetMap to provide the map's visual background. The code also includes functionality to randomly change the background image of the webpage.
![Screenshot 2024-03-04 at 8 29 57 AM](https://github.com/sdemmon/flights_project_3/assets/141437641/f5a55130-b9e0-46ed-a50f-a4bd1ad3b5d2)

The main functionality revolves around plotting routes and airports on the map. Functions are defined to plot routes between airports and to display airport information dynamically. These functions utilize data from JSON files, which are fetched asynchronously using promises. When the user clicks a button labeled 'plotButton', the code scrolls to the map container and fetches data from the JSON files to plot routes and airports on the map.
![Screenshot 2024-03-04 at 8 51 56 AM](https://github.com/sdemmon/flights_project_3/assets/141437641/72c4547a-c0ac-430d-997b-d05f48c96a8f)


Additionally, the code generates bar graphs using the Plotly.js library to visually represent the top ten destinations from a selected airport and the top airlines operating from that airport. These bar graphs provide insights into the popularity of destinations and airlines associated with the selected airport.

![Screenshot 2024-03-04 at 8 53 01 AM](https://github.com/sdemmon/flights_project_3/assets/141437641/934bb368-29b6-47ab-ad0f-e671936ecdc5)

### Sources

In the development of this project, we heavily relied on many sources. 
The data visualization belly-button-challenge and the leafly-challenge from the Columbia Data Analytics bootcamp served as major sources for the visualizations and the usage of leafly. Modules 15 and 16 of the same bootcamp also provided us with the knowledge to create the app. Once we had the idea of how we wanted to execute the visualization and after trying the methods shown to us in class we also used the following sources as information to complete the project. 
1. Gasston, P. (2013). *The modern web: Multi-device web development with HTML5, CSS3, and JavaScript.* No Starch Press. 
    - Chapter 2: Structure and Semantics 
    - Chapter 3: Device-Responsive CSS
    - Chapter 4: New Approaches to CSS Layout
    - Chapter 5: Modern JavaScript
2. W3 Schools 
    - [How to take an integer from a string in JavaScript](https://www.w3schools.com/jsref/jsref_parseint.asp)
    - [How to use parseint in JavaScript](https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_parseint)
    - [How to add an EventListener](https://www.w3schools.com/jsref/met_element_addeventlistener.asp)
3. Developer Mozilla 
    - [How does a DOM work](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
4. FreeCodeCamp 
    - [How to sort in descending in JavaScript](https://forum.freecodecamp.org/t/arr-sort-a-b-a-b-explanation/167677)
5. JavaScript Tutorial 
    - [How does a DOM work](https://www.javascripttutorial.net/javascript-dom/javascript-domcontentloaded/)
 
 ### Ethical Considerations: 

 In writing the program, we are using outdated open source datasets. This data should come with the caveat that is should not be used for any real navigational purposes. The collection of the openflights data, as far as we are concerned, does not infringe on the privacy of any indivual as all the information is public record. As far as we are able to discern these datasets are also not biased in any way as they are not objective. There might be more information about developed areas' airports as they might have less flights to the inaccessibility, but that would need further research that are not within the parameters of this project. We do not intend to sell or use this application for the distribution of flight information as it is a learning tool for us. 



### Areas to Improve
To enhance this project further, we plan to incorporate pricing information and utilize an updated data source with more recent information. Additionally, we aim to develop a price calculator feature and provide details on airport amenities, including hotels, restaurants, and shopping options. These enhancements will enrich the user experience and make the tool even more valuable for travelers. With the openflights dataset we would also be able to create another feature which would let the used know based on source airport what are the most popular aircrafts and on what route they most commonly used in. 

### Deployment Key 

https://sdemmon.github.io/flights_project_3/


# Developed by: 
\
Chantal Thomas \
Sarah Demmon \
Paola Roman