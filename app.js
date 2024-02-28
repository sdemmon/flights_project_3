///interact with the html 
document.addEventListener("DOMContentLoaded", function() {
    // initializing the map
    var map = L.map('map').setView([0, 0], 2);

    // adding tile layer map view
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }).addTo(map);

    // variable to create marker 
    var sourceMarker;

    // importing routes JSON
    d3.json('routes.json').then(function(routesData) {
        // importing airports JSON
        d3.json('airports.json').then(function(airportsData) {
            function plotRoutes() {
                // clear previous entires if any 
                if (sourceMarker) {
                    map.removeLayer(sourceMarker);
                }
                map.eachLayer(function(layer) {
                    if (layer instanceof L.Polyline) {
                        map.removeLayer(layer);
                    }
                });
                
                /// user input working in function 
                var airportCode = document.getElementById('airportCode').value.toUpperCase();
                var sourceAirport = airportsData.find(function(airport) {
                    return airport.iata === airportCode;
                });
            
                // if airport not in data, return airport with IATA code not found
                if (!sourceAirport) {
                    alert('Airport with IATA code ' + airportCode + ' not found!');
                    return;
                }
            
                // creating a number of routes counter 
                var numRoutes = routesData.filter(function(route) {
                    return route.source_airport === airportCode;
                }).length;
            
                // plotting the marker for the airport source 
                sourceMarker = L.marker([sourceAirport.lat, sourceAirport.lon]).addTo(map).bindPopup(sourceAirport.airport_id + ' (' + airportCode + ')');
                displayAirportInfo(sourceAirport, numRoutes);
            
                //  setting all routes from the source airport
                routesData.forEach(function(route) {
                    if (route.source_airport === airportCode) {
                        var destinationAirport = airportsData.find(function(airport) {
                            return airport.iata === route.destination_airport;
                        });
            
                        if (destinationAirport) {
                            var latlngs = [
                                [sourceAirport.lat, sourceAirport.lon],
                                [destinationAirport.lat, destinationAirport.lon]
                            ];
            
                            // creating a polyline for each route
                            L.polyline(latlngs, { color: 'red' }).addTo(map);
                        }
                    }
                });
            }
            
            document.getElementById('plotButton').addEventListener('click', plotRoutes);
        });
    });
});

function displayAirportInfo(airportData, numRoutes) {
    var metadataDiv = document.getElementById('sample-metadata');
    metadataDiv.innerHTML = ''; // Clear previous content

    var airportName = airportData.airport_id;
    var city = airportData.city;
    var country = airportData.country;
    var altitude = airportData.altitude;
    var timezone = airportData.tz_database_timezone;

    var infoHTML = '<p style="font-family: Arial"> Airport Name: ' + airportName + '</p>' +
                   '<p style="font-family: Arial">City: ' + city + '</p>' +
                   '<p style="font-family: Arial" >Country: ' + country + '</p>' +
                   '<p style="font-family: Arial" >Altitude: ' + altitude + ' ft' + '</p>' +
                   '<p style="font-family: Arial">Timezone: ' + timezone + '</p>' +
                   '<p style="font-family: Arial" >Number of Routes: ' + numRoutes + '</p>';

    metadataDiv.innerHTML = infoHTML;
}