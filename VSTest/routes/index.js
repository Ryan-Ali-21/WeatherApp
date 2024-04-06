var express = require('express');
var router = express.Router();

let widget1 = false;
let widget2 = false;
let widgets = [];
widgets.push(widget1);
widgets.push(widget2);



/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(widgets[0]);
  res.render('index', { title: 'Welcome', widgets:widgets});
});

router.get('/location:city', function (req, res, next) {
    let tempdata = [];
    const apiKey = '6180d9984bcf5315c583b245785da2db';
    const city = String(req.params.city); // Replace 'London' with the desired city
    console.log(city);

    // Construct the API endpoint URL
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    console.log(apiUrl);

    // Make a GET request to the OpenWeather API
        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle the JSON response data
           console.log(data);
            tempdata = data;
            res.send(data);
            
            // You can access the weather data here and do further processing
        })
        .catch(error => {
            // Handle errors
            console.error('There was a problem with the fetch operation:', error);
        });

    
});

router.get('/city:zip', function (req, res, next) {
    const apiKey = '6180d9984bcf5315c583b245785da2db';
    const city = 'London'; // Replace 'London' with the desired city
    const input = String(req.params.zip);
    console.log(input);
    // Construct the API endpoint URL
    const apiUrl = `http://api.openweathermap.org/geo/1.0/zip?zip=${input},GB&appid=${apiKey}`;
    console.log(apiUrl);
    //const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    // Make a GET request to the OpenWeather API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Handle the JSON response data
            console.log(data);
            
            res.send(data);

            // You can access the weather data here and do further processing
        })
        .catch(error => {
            // Handle errors
            console.error('There was a problem with the fetch operation:', error);
        });


});

module.exports = router;
