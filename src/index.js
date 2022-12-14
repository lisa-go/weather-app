import './style.scss';
import thermostatPic from './images/thermostat.svg';
import humidityPic from './images/humidity.svg';
import cloudPic from './images/cloud.svg';
import fogPic from './images/foggy.svg';
import clearPic from './images/clearsky.svg'
import rainPic from './images/rainy.svg';
import snowPic from './images/snowing.svg';
import thunderPic from './images/thunderstorm.svg';
import clearskyBg from './images/clear-cristofer-unsplash.jpg';
import mistBg from './images/mist-clyde-he-unsplash.jpg';
import rainBg from './images/rain-noah-silliman-unsplash.jpg';
import snowBg from './images/snow-aditya-vyas-unsplash.jpg';
import thunderBg from './images/thunder-levi-guzman-unsplash.jpg';
import cloudyBg from './images/cloudy-tengyart-unsplash.jpg';
import gitIcon from './images/github.svg';

const location = document.querySelector('#location');
const degSwitch = document.querySelector('#degSwitch');

async function getWeather(choice) {
    //* mode = weather or forecast *//
    var deg;
    try {
        if (degSwitch.checked) {
            deg = 'metric';
        }
        else {
            deg = 'imperial';
        }
        let mode = choice;

        const response =
            await fetch('https://api.openweathermap.org/data/2.5/' +
                mode +
                '?q=' +
                location.value +
                '&APPID=24c9ca958f3c17129e987bac3597de6a' +
                '&units=' +
                deg);

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
    getWeather('weather')
        .then((weatherData) => {
            try {
                showData();
            }
            catch {
                console.log(weatherData);
            }
        });
}

//* button event listener *//
document.querySelector('#submit').addEventListener('click', function () {
    getWeather('weather')
        .then((weatherData) => {
            try {
                showData();
            }
            catch {
                console.log(weatherData);
            }
        });
});

//* switch event listener *//
document.querySelector('#degSwitch').addEventListener('click', function () {
    getWeather('weather')
        .then((weatherData) => {
            try {
                showData();
            }
            catch {
                console.log(weatherData);
            }
        });
});

function getForecast() {
    getWeather('forecast').then((weatherData) => {
        const fcont = document.querySelector('#forecastContainer');

        let elements = document.getElementsByTagName('fcard');
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }

        for (let i = 0, j = 0; i < weatherData.list.length; i = i + 8, j++) {
            const fcard = document.createElement('fcard');
            fcard.classList.add('card');
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

            if (wid == 800) {
                const img = clearPic;
                fimg.style.background = 'url(' + img + ')';
            }

            if (wid >= 801 && wid <= 804) {
                const img = cloudPic;
                fimg.style.background = 'url(' + img + ')';
            }
            fimg.style.backgroundRepeat = 'no-repeat';
            fimg.style.backgroundSize = 'contain';
            fcard.appendChild(fimg);

            const fday = document.createElement('fday');
            if (j == 0) {
                fday.textContent = 'Today';
            }
            else if (j == 1) {
                fday.textContent = 'Tomorrow';
            }
            else {
                fday.textContent = daysFromToday(j);
            }
            fcard.appendChild(fday);

            const fdate = document.createElement('fdate');
            fdate.textContent = timeConverter(weatherData.list[i].dt);
            fcard.appendChild(fdate);

            const fwhem = document.createElement('fwhem');
            fwhem.textContent = weatherData.list[i].weather[0].main;
            fcard.appendChild(fwhem);

            const fwhed = document.createElement('fwhed');
            fwhed.textContent = weatherData.list[i].weather[0].description;
            fcard.appendChild(fwhed);

            var deg;
            if (degSwitch.checked) {
                deg = ' ??C';
            }
            else {
                deg = ' ??F';
            }

            const ftemp = document.createElement('ftemp');
            fcard.appendChild(ftemp);
            const tempimg = new Image();
            tempimg.src = thermostatPic;
            ftemp.appendChild(tempimg);
            const ftempn = document.createElement('ftempn');
            ftempn.textContent = Math.round(weatherData.list[i].main.temp * 10) / 10 + deg;
            ftemp.appendChild(ftempn);

            const ftempf = document.createElement('ftempm');
            ftempf.textContent = 'Feels like ' + Math.round(weatherData.list[i].main.feels_like * 10) / 10 + deg;
            fcard.appendChild(ftempf);

            const fhumid = document.createElement('fhumid');
            fcard.appendChild(fhumid);
            const fhumidp = new Image();
            fhumidp.src = humidityPic;
            fhumid.appendChild(fhumidp);
            const fhumidt = document.createElement('fhumidt');
            fhumidt.textContent = 'Humidity: ' + weatherData.list[i].main.humidity + '%';
            fhumid.appendChild(fhumidt);
        }
    });
}

function showData() {
    getWeather('weather').then((weatherData) => {
        var deg;
        if (degSwitch.checked) {
            deg = ' ??C';
        }
        else {
            deg = ' ??F';
        }

        document.querySelector('.w-info').textContent = weatherData.weather[0].main;
        document.querySelector('.w-infod').textContent = weatherData.weather[0].description;
        document.querySelector('.w-location').textContent = weatherData.name + ', ' + weatherData.sys.country;
        document.querySelector('.wtemp').textContent = Math.round(weatherData.main.temp * 10) / 10 + deg;
        document.querySelector('.w-tempfeel').textContent = 'Feels like ' + Math.round(weatherData.main.feels_like * 10) / 10 + deg;
        document.querySelector('.w-datetime').textContent = daysFromToday(0) + ' ' + timeConverter(weatherData.dt);
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

        if (wid == 800) {
            const img = clearPic;
            wimgc.style.background = 'url(' + img + ')';
            const bg = clearskyBg;
            document.body.style.background = 'url(' + bg + ')';
        }

        if (wid >= 801 && wid <= 804) {
            const img = cloudPic;
            wimgc.style.background = 'url(' + img + ')';
            const bg = cloudyBg;
            document.body.style.background = 'url(' + bg + ')';
        }
        wimgc.style.backgroundRepeat = 'no-repeat';
        wimgc.style.backgroundSize = '100%';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundAttachment = 'fixed';

        getForecast();
    });

};

const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
function daysFromToday(num) {
    const d = new Date();
    const current = d.getDay();
    let day = weekday[(current + num) % 7];
    return day;
}

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = String(a.getMinutes()).padStart(2, '0');
    var time = date + ' ' + month;
    return time;
}

const thermIcon = new Image();
thermIcon.src = thermostatPic;
document.querySelector('.w-tempnow').appendChild(thermIcon);

const humIcon = new Image();
humIcon.src = humidityPic;
document.querySelector('.w-humidity').appendChild(humIcon);

const githuba = document.createElement('a');
githuba.href = 'https://github.com/lisa-go';
githuba.classList.add('link');
document.querySelector('.header').appendChild(githuba);
const github = new Image();
github.src = gitIcon;
githuba.appendChild(github);