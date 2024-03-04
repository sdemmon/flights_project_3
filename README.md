# Airport Calculator 

For our data visulaization project we were motivated to build a travel route search engine with visual aides to guide the trip selection process. With so many flights departing from each airport. this tool has the potenital to help travelers find the most direct route for travel as well as observe the possible destination arirports that a the given airport is capable of traveling to. The singifnace of this project relies on addressing the challenges each of face when travling. Travelers who hate layovers (like me!) are able to see only NON–STOP flights. We believe that it is useful to model travel in a digestibale manner without pricing information distrcating from goals. 

To accomplish this goal, we created a user-friendly, interactive webpage. The user is prompted to search any airport IATA code. If the user is unsure what the IATA code is that associated with the airport, there is a button "Airport Code Search" that links to another webpage listing the location, country, and airport code – because who even knows IATA codes for Arnavutköy, Istanbul in Turkey! After the user inserts the code, the webpage shows three visualizations including two bar graph dsiplaying "Top Ten Destinations" and "Top Airlines" as well as a map that visually displays all possible destaination airports you can fly to. With each search, the map automatically zooms into the users airport and they can zoom out to view the destination airports. Additionally, with each search the image refreshes in the backgorund to a new image.

Example: 

1. Insert JFK in the search bar
![Screenshot 2024-03-04 at 8 27 23 AM](https://github.com/sdemmon/flights_project_3/assets/141437641/5f0ed28f-ff38-4850-8378-2f6e2f0d4f42)

2. 4 functionalities appear 
![Screenshot 2024-03-04 at 8 26 55 AM](https://github.com/sdemmon/flights_project_3/assets/141437641/bb0a3535-1ace-4d4a-95ae-f0c518291eab)


We sourced this data from OpenFlights Airports Database which contains over 10,000 airports spanning the globe. It is developed to store free airport, airline,a nd route data. This is where we sourced the CSV files which we converted to JSON files in  pandas. 
![Screenshot 2024-03-04 at 8 30 36 AM](https://github.com/sdemmon/flights_project_3/assets/141437641/94057d46-3ec4-46ab-b05a-7671c7ea3b47)


In JavaScript, we began by setting up event listeners to ensure that the JavaScript code executes after the HTML content is fully loaded. Using the Leaflet library, we initialized a map and added a tile layer from OpenStreetMap to provide the map's visual background. The code also includes functionality to randomly change the background image of the webpage.
![Screenshot 2024-03-04 at 8 29 57 AM](https://github.com/sdemmon/flights_project_3/assets/141437641/f5a55130-b9e0-46ed-a50f-a4bd1ad3b5d2)

The main functionality revolves around plotting routes and airports on the map. Functions are defined to plot routes between airports and to display airport information dynamically. These functions utilize data from JSON files, which are fetched asynchronously using promises. When the user clicks a button labeled 'plotButton', the code scrolls to the map container and fetches data from the JSON files to plot routes and airports on the map.
![Screenshot 2024-03-04 at 8 51 56 AM](https://github.com/sdemmon/flights_project_3/assets/141437641/72c4547a-c0ac-430d-997b-d05f48c96a8f)


Additionally, the code generates bar graphs using the Plotly.js library to visually represent the top ten destinations from a selected airport and the top airlines operating from that airport. These bar graphs provide insights into the popularity of destinations and airlines associated with the selected airport.
![Screenshot 2024-03-04 at 8 53 01 AM](https://github.com/sdemmon/flights_project_3/assets/141437641/934bb368-29b6-47ab-ad0f-e671936ecdc5)
