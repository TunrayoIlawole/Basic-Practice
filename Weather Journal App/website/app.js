// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const APIKEY = 'ec9b34346a3aee661476ddc53075c02a';

// create a new date instance dynamically with javaScript 
let d = new Date();
let newDate = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();


function performAction(e){
    const postCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    const temperature = document.getElementById('temp').value;
    const url = `${baseUrl}${zip}&APPID=${APIKEY}`;
    console.log(newDate);
    retrieveData(url)
    .then(function (data){
        // Add data to POST request
        postData('http://localhost:8000/WeatherData', {temp: temp, date: newDate, content: feelings} )
        // Function which updates UI
        .then(function() {
            updateUI()
        })
    })
}


// GET request
const retrieveData = async function (url) {
    const response = await fetch(url);
    console.log(response);
    try {
        const data = await response.json()
        console.log(data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
};



// Function to make post request
const postData = async (url = '', data = {}) => {
    const postRequest = await fetch (url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await postRequest.json();
        console.log(newData);
        return postRequest;
    } catch (error) {
        console.log("error", error);
    }
};


// update user interface
const updateUI = async () => {
    const request = await fetch('http://localhost:8000/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.content;

    } catch (error) {
        console.log("error", error);
    }
}

document.getElementById('generate').addEventListener('click', performAction);