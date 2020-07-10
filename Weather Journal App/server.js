// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// start up an instance of an app
const app = express();

const bodyParser = require('body-parser')

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// set up the server
const port = 8000;

const server = app.listen(port, listening);

function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
};

// GET route
app.get('/all', sendData);

function sendData(request, response) {
    response.send(projectData);
};

// POST route
app.post('/WeatherData', addData);

function addData(request, response) {
    projectData.temperature = request.body.temperature;
    projectData.date = request.body.date;
    projectData.content = request.body.content;
    response.end();
    console.log(projectData);
};