
const url = "./airlines.json"; // Update the path to your JSON file

const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

const dropdown = d3.select("#selDataset");

// Call setDemographicInfo() and 
function init() {

  // d3.json(url).then(function(data) {
  //   let dropDown = d3.select("#selDataset");

  //   data.names.forEach(function(name) {
  //     dropDown.append("option").text(name).property("value", name);
  //   });
    
  //   let firstValue = data.names[0];

  //   optionChanged(firstValue)
  // });
  var map = L.map('map').setView([51.505, -0.09], 13);
  // let myMap = L.map("map", {
  //   center: [15.5994, -28.6731],
  //   zoom: 3
  // });
}
//   // Add a tile layer
   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
       maxZoom: 19,
   }).addTo(myMap);
 

// Promise Pending
// const dataPromise = d3.json(samplesFilePath);
// console.log("Data Promise: ", dataPromise);

// url = "https://files.slack.com/files-pri/T05RY45JWJE-F06LZM6AU1J/airlines.json"

// //fetching JSON data 
// d3.json(samplesFilePath).then((data) => {
//     console.log(data)

// //     //d3
        
//
