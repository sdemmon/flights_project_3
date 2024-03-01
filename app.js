///Document Object Model takes the input from the html page into the javascript 

document.addEventListener("DOMContentLoaded", function() {
    // initializing map
    var map = L.map('map').setView([0, 0], 2);

    // adding tile layer to map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }).addTo(map);

    // creating a marker to point to input airport 
    var sourceMarker;

    // create a function to plot marker, add polylines ro map and erase all previous markers and lines 
    function plotRoutes(routesData, airportsData, airlinesData) {
      // clear any markers and polylines that were there when the button is clicked 
      if (sourceMarker) {
        map.removeLayer(sourceMarker);
      }
      map.eachLayer(function(layer) {
        if (layer instanceof L.Polyline) {
          map.removeLayer(layer);
        }
      });

      // getting the iata code from user and converting it to uppercase 
      var airportCode = document.getElementById('airportCode').value.toUpperCase();
      //finding the input airport in the openflights airport data as it appears as airport code 
      var sourceAirport = airportsData.find(function(airport) {
        return airport.iata === airportCode;
      });
      // creating a number of routes counter by input airport 
      var numRoutes = routesData.filter(function(route) {
        return route.source_airport === airportCode;
      }).length;

      // plotting the marker for the input airport  on the map with a popup that displays the airport name and airport code  
      sourceMarker = L.marker([sourceAirport.lat, sourceAirport.lon]).addTo(map).bindPopup(sourceAirport.airport_id + ' (' + airportCode + ')');

      displayAirportInfo(sourceAirport, numRoutes);

      //gettting all  flights with the same source airport 
      routesData.forEach(function(route) {
        // if the source aiport is the same as the airport code get the destination airport 
        if (route.source_airport === airportCode) {
          var destinationAirport = airportsData.find(function(airport) {
            return airport.iata === route.destination_airport;
          });
          // get the lat and lon values for source airport and  the destination airport from opneflights airports json
          if (destinationAirport) {
            var latlngs = [
              [sourceAirport.lat, sourceAirport.lon],
              [destinationAirport.lat, destinationAirport.lon]
            ];

            // plotting the polylines from  source airport to destination lat and lon 
            L.polyline(latlngs, { color: 'red', opacity: 0.3, weight: 2 }).addTo(map);
          }
        }
      });

      // running the charts functions for display 
      buildDestinationsChart(airportCode, routesData, airportsData);
      buildAirlinesChart(airportCode, routesData, airlinesData);
    }

    // adding another event listener for the user input to the button 
    document.getElementById('plotButton').addEventListener('click', function() {
      // getting data from the JSON files 
      Promise.all([
        d3.json('routes.json'),
        d3.json('airports.json'),
        d3.json('airlines.json')
      ]).then(function([routesData, airportsData, airlinesData]) {
        plotRoutes(routesData, airportsData, airlinesData);
      }).catch(function(error) {
        console.log("Error fetching data:", error);
      });
    });

    // function to show the metadata for each airport 
    function displayAirportInfo(airportData, numRoutes) {
      var metadataDiv = document.getElementById('sample-metadata');
      // getting rid of previous information by setting everything to an empty string 
      metadataDiv.innerHTML = ''; 
      // creating variables for all the information we would like to display 
      var airportName = airportData.airport_id;
      var city = airportData.city;
      var country = airportData.country;
      var altitude = airportData.altitude;
      var timezone = airportData.tz_database_timezone;
      console.log(metadataDiv);
      /// putting all the values in an infoHTML value to be displayed in metadata div in the html 
      var infoHTML = '<p style="font-family: Arial"> Airport Name: ' + airportName + '</p>' +
        '<p style="font-family: Arial">City: ' + city + '</p>' +
        '<p style="font-family: Arial" >Country: ' + country + '</p>' +
        '<p style="font-family: Arial" >Altitude: ' + altitude + ' ft' + '</p>' +
        '<p style="font-family: Arial">Timezone: ' + timezone + '</p>' +
        '<p style="font-family: Arial" >Number of Routes: ' + numRoutes + '</p>';

      metadataDiv.innerHTML = infoHTML;
    }

    // function to make bar graph for the top ten most popular destinations 
    function buildDestinationsChart(airportCode, routesData, airportsData) {
      // counting the number of flights from source airport to destination 
      var destinations = {};
      // for each route if the source aiport is equal to the input airport 
      routesData.forEach(function(route) {
        if (route.source_airport === airportCode) {
          ///if the destination is already in the destinations variable then add one to the destination counter  
          if (destinations[route.destination_airport]) {
            destinations[route.destination_airport]++;
          } else {
            destinations[route.destination_airport] = 1;
          }
        }
      });

      //  putting the destinations in order from the largest to the smallest count by comparing two values to each other 
      var sortedDestinations = Object.keys(destinations).sort(function(a, b) {
        // if the number of routes to destination b is greater than the number of routes to destination a then it will be a positive integer else it will return a negative integer if 0 no sorting needed 
        return destinations[b] - destinations[a];
      });

      // getting the first ten values in the sorted destinations 
      var top10Destinations = sortedDestinations.slice(0, 10);

      // getting the destination information from the top 10 destinations 
      //map creates key value pairs and remembers the original order of the keys 
      var top10DestinationsInfo = top10Destinations.map(function(destination) {
        var airport = airportsData.find(function(airport) {
          // finding the airport by airport code and adding it to top destinations info 
          return airport.iata === destination;
        });
        // creating a new object that has the airport id and the number of routes calculated in the destinations variable and adding it to top destinations info 
        return {
          airport: airport.airport_id,
          routes: destinations[destination]
        };
      });
      console.log(top10DestinationsInfo);

      // creating a plotly the bar graph using the top10destinations 
      var barData = {
  
        // x will equal the destination airport info array by airport name 
        x: top10DestinationsInfo.map(function(destination) {

          return destination.airport;
        }),
        /// y will equal the number of routes calculated by destination 
        y: top10DestinationsInfo.map(function(destination) {
          return destination.routes;
        }),
        type: 'bar'
      };

      //plotly layout for bar graph 
      var barLayout = {
        title: 'Top Ten Destinations from ' + airportCode,
        xaxis: {
          title: 'Destination Airport'
        },
        yaxis: {
          title: 'Number of Routes'
        }
      };

    //plotting bar graph by number of routes to a destination from input airport 
      Plotly.react('bar1', [barData], barLayout);
    }

    // creating a function to build the most popular airlines leaving out of the selected airport 
    // same method as the bar graph by routes but using the airlines JSON with the routes JSON to get the most popular airline leaving from the input airport 
    function buildAirlinesChart(airportCode, routesData, airlinesData) {
      // creating a variable for the airlines leaving from input airport  
      var airlines = {};
      //for the airport selected pass through every route, find all flights from input airport
      routesData.forEach(function(route) {
        if (route.source_airport === airportCode) {
          /// from the flights that only have the input airport as source airport make add airline to airlineId
          var airlineId = route.airline_id; 
          //adds a counter to add 1 everytime the airline is repeated in the data 
          if (airlines[airlineId]) {
            airlines[airlineId]++;
          } else {
            airlines[airlineId] = 1;
          }
        }
      });
      //  putting the destinations in order from the largest to the smallest count by comparing two values to each other 
      var sortedAirlines = Object.keys(airlines).sort(function(a, b) {
        // if the number of routes to destination b is greater than the number of routes to destination a then it will be a positive integer else it will return a negative integer if 0 no sorting needed 
        return airlines[b] - airlines[a];
      });

      // slicing for the first fifteen airlines 
      var top15Airlines = sortedAirlines.slice(0, 15);

      // get airline name from openflights airline id and creating an info array 
      var topAirlinesInfo = top15Airlines.map(function(airlineId) {
        /// finding the airline info by matching to the airline id airlines json 
        var airline = airlinesData.find(function(airline) {
          // checking if the airlineId the airline id in json
          return airline.airline_id === parseInt(airlineId);
        });
        // creating an object with the airline name and the number of routes stored in airlines 
        return {
          // if airline name not found use the string unknown as name 
          airline: airline ? airline.name : 'Unknown',
          routes: airlines[airlineId]
        };
      });

      // creating the data for the bar graph 
      var barData = {
        // x will equal the airline name 
        x: topAirlinesInfo.map(function(airline) {
          return airline.airline;
        }),
        // y will equal the number of routes
        y: top15Airlines.map(function(airline) {
          return airline.routes;
        }),
        type: 'bar'
      };

      // plotly layout for bar graph 
      var barLayout = {
        title: 'Top Airlines from ' + airportCode,
        xaxis: {
          title: 'Airline'
        },
        yaxis: {
          title: 'Number of Flights'
        }
      };

      // using plotly to plot the bar graph for all 
      Plotly.react('bar2', [barData], barLayout);
    }
  });