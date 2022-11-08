import "./style.scss";

const location = document.querySelector('#location');

async function getWeather(choice) {
    //* mode = weather or forecast *//
    
    try {
    let mode = choice;
    const response = 
        await fetch('https://api.openweathermap.org/data/2.5/' +
        mode +
        '?q=' +
        location.value + 
        '&APPID=24c9ca958f3c17129e987bac3597de6a' +
        '&units=imperial'); //*or metric for celcius*//

    const weatherData = await response.json();
    console.log(weatherData);
    return weatherData;
    }
    catch (error) {
        console.log(error);
    }
}

document.querySelector('#submit').addEventListener('click', function() {
    getWeather('weather').then((weatherData) => {
        try {
        document.querySelector('.w-info').textContent = weatherData.weather[0].main;
        document.querySelector('.w-infod').textContent = weatherData.weather[0].description;
        document.querySelector('.w-location').textContent = weatherData.name + ', ' + weatherData.sys.country;
        document.querySelector('.w-coord').textContent = weatherData.coord.lat + ', ' + weatherData.coord.lon;
        document.querySelector('.w-tempnow').textContent = weatherData.main.temp;
        document.querySelector('.w-tempfeel').textContent = weatherData.main.feels_like;
        document.querySelector('.w-tempmm').textContent = weatherData.main.temp_min + ' — ' + weatherData.main.temp_max;
        document.querySelector('.w-datetime').textContent = timeConverter(weatherData.dt);
        document.querySelector('.w-humidity').textContent = 'Humidity: ' + weatherData.main.humidity + '%';
  
    }
        catch {
            console.log (weatherData);
        }
    });


});

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
    return time;
  }