import './style.scss';
import thermostatPic from './images/thermostat.svg';
import humidityPic from './images/humidity.svg';
import cloudPic from './images/cloud.svg';
import fogPic from './images/foggy.svg';
import moonPic from './images/moon.svg';
import pclouddayPic from './images/partly_cloudy_day.svg';
import pcloudnightPic from './images/partly_cloudy_night.svg';
import rainPic from './images/rainy.svg';
import snowPic from './images/snowing.svg';
import sunPic from './images/sunny.svg';
import thunderPic from './images/thunderstorm.svg';
import clearnightBg from './images/clear_night-adrian-unsplash.jpg';
import clearskyBg from './images/clear_sky-anders-jilden-unsplash.jpg';
import mistBg from './images/mist-clyde-he-unsplash.jpg';
import rainBg from './images/rain-noah-silliman-unsplash.jpg';
import snowBg from './images/snow-fabian-mardi-unsplash.jpg';
import thunderBg from './images/thunder-levi-guzman-unsplash.jpg';
import cloudyBg from './images/cloudy-billy-huynh-unsplash.jpg';
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


//* default location *//
if (location.value == '') {
    location.value = 'houston'
    getWeather( 'weather', document.querySelector('#location').value )
    .then((weatherData) => {
        try {
            showData();
    }
        catch {
            console.log (weatherData);
        }
    });
}


//* button event listener *//
document.querySelector('#submit').addEventListener('click', function() {
    getWeather( 'weather', document.querySelector('#location').value )
    .then((weatherData) => {
        try {
            showData();    
    }
        catch {
            console.log (weatherData);
        }
    });
});

function getForecast() {
    getWeather('forecast').then((weatherData) => {
        const fcont = document.querySelector('#forecastContainer');
        
            let elements = document.getElementsByTagName('fcard');
            while(elements.length > 0){
                elements[0].parentNode.removeChild(elements[0]);
            }

        for (let i = 0; i < weatherData.list.length; i = i + 8) {
            const fcard = document.createElement('fcard');
            fcont.appendChild(fcard);

            const fimg = document.createElement('fimg');
            let wid = weatherData.list[i].weather[0].id;
            
            if (wid >= 200 && wid <= 232) {
                const img = thunderPic;
                fimg.style.background = 'url(' + img + ')';
            }

            if (wid >= 300 && wid <= 531) {
                const img = rainPic;
                fimg.style.background = 'url(' + img + ')';
            }
            
            if (wid >= 600 && wid <= 622) {
                const img = snowPic;
                fimg.style.background = 'url(' + img + ')';
            }

            if (wid >= 701 && wid <= 781) {
                const img = fogPic;
                fimg.style.background = 'url(' + img + ')';
            }

            if (wid == 800 && timeConverter(weatherData.dt).hour > 7 && timeConverter(weatherData.dt).hour < 17) {
                const img = sunPic;
                fimg.style.background = 'url(' + img + ')';
            }
            else if (wid == 800) {
                const img = moonPic;
                fimg.style.background = 'url(' + img + ')';
            }

            if (wid == 801 && timeConverter(weatherData.dt).hour > 7 && timeConverter(weatherData.dt).hour < 17) {
                const img = pclouddayPic;
                fimg.style.background = 'url(' + img + ')';
            }
            else if (wid == 801) {
                const img = pcloudnightPic;
                fimg.style.background = 'url(' + img + ')';
            }

            if (wid >= 802 && wid <= 804) {
                const img = cloudPic;
                fimg.style.background = 'url(' + img + ')';
            }
            fimg.style.backgroundRepeat = 'no-repeat';
            fimg.style.backgroundSize = 'contain';
            fcard.appendChild(fimg)

            const fdate = document.createElement('fdate');
            fdate.textContent = timeConverter(weatherData.list[i].dt);
            fcard.appendChild(fdate);

            const ftemp = document.createElement('ftemp');
            ftemp.textContent = weatherData.list[i].main.temp + ' °F';
            fcard.appendChild(ftemp);

            const ftempmm = document.createElement('ftempmm');
            ftempmm.textContent = weatherData.list[i].main.temp_min + ' °F' + ' — ' + weatherData.list[i].main.temp_max + ' °F';
            fcard.appendChild(ftempmm);
        }
        
    });
}

function showData(){
    getWeather( 'weather' ).then((weatherData) => {
        
        document.querySelector('.w-info').textContent = weatherData.weather[0].main;
        document.querySelector('.w-infod').textContent = weatherData.weather[0].description;
        document.querySelector('.w-location').textContent = weatherData.name + ', ' + weatherData.sys.country;       
        document.querySelector('.wtemp').textContent = weatherData.main.temp + ' °F';
        document.querySelector('.w-tempfeel').textContent = weatherData.main.feels_like + ' °F';
        document.querySelector('.w-tempmm').textContent = weatherData.main.temp_min  + ' °F' + ' — ' + weatherData.main.temp_max + ' °F';
        document.querySelector('.w-datetime').textContent = timeConverter(weatherData.dt);
        document.querySelector('.whumid').textContent = 'Humidity: ' + weatherData.main.humidity + '%';
            
  
        const wimgc = document.querySelector('.w-img');
        let wid = weatherData.weather[0].id;
            if (wid >= 200 && wid <= 232) {
                const img = thunderPic;
                wimgc.style.background = 'url(' + img + ')';
                const bg = thunderBg;
                document.body.style.background = 'url(' + bg + ')';
            }

            if (wid >= 300 && wid <= 531) {
                const img = rainPic;
                wimgc.style.background = 'url(' + img + ')';
                const bg = rainBg;
                document.body.style.background = 'url(' + bg + ')';
            }
            
            if (wid >= 600 && wid <= 622) {
                const img = snowPic;
                wimgc.style.background = 'url(' + img + ')';
                const bg = snowBg;
                document.body.style.background = 'url(' + bg + ')';
            }

            if (wid >= 701 && wid <= 781) {
                const img = fogPic;
                wimgc.style.background = 'url(' + img + ')';
                const bg = mistBg;
                document.body.style.background = 'url(' + bg + ')';
            }

            if (wid == 800 && timeConverter(weatherData.dt).hour > 7 && timeConverter(weatherData.dt).hour < 17) {
                const img = sunPic;
                wimgc.style.background = 'url(' + img + ')';
                const bg = clearskyBg;
                document.body.style.background = 'url(' + bg + ')';
            }
            else if (wid == 800) {
                const img = moonPic;
                wimgc.style.background = 'url(' + img + ')';
                const bg = clearnightBg;
                document.body.style.background = 'url(' + bg + ')';
            }

            if (wid == 801 && timeConverter(weatherData.dt).hour > 7 && timeConverter(weatherData.dt).hour < 17) {
                const img = pclouddayPic;
                wimgc.style.background = 'url(' + img + ')';
                const bg = clearskyBg;
                document.body.style.background = 'url(' + bg + ')';
            }
            else if (wid == 801) {
                const img = pcloudnightPic;
                wimgc.style.background = 'url(' + img + ')';
                const bg = clearnightBg;
                document.body.style.background = 'url(' + bg + ')';
            }

            if (wid >= 802 && wid <= 804) {
                const img = cloudPic;
                wimgc.style.background = 'url(' + img + ')';
                const bg = cloudyBg;
                document.body.style.background = 'url(' + bg + ')';
            }
            wimgc.style.backgroundRepeat = 'no-repeat';
            wimgc.style.backgroundSize = '100%';
            document.body.style.backgroundSize = 'cover';

            getForecast();
    });

};

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

  const thermIcon = new Image();
  thermIcon.src = thermostatPic;
  document.querySelector('.w-tempnow').appendChild(thermIcon);

  const humIcon = new Image();
  humIcon.src = humidityPic;
  document.querySelector('.w-humidity').appendChild(humIcon);