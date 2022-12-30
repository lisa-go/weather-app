<h1 align="center"> weather-app ☀️</h1>  

#### Click [here](https://lisa-go.github.io/weather-app) for live preview.
<br>

# Made with
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
<br>

# Description
#### My first api project, built with [OpenWeatherAPI](https://openweathermap.org/)
<br>

# Features
- Search different places to get the 5 day weather forecast.
- Toggle between Celcius and Fahrenheit with the click of a button.
- Background of the page changes based on current weather.
- Hover over a forecast card to see the humidity forecast.
<br>

# Previews

### Thunderstorm
<img src="https://i.imgur.com/dFxD303.png" alt="Thunderstorm" width="700" />

### Clear
<img src="https://i.imgur.com/Q1WApbu.png" alt="Clear" width="700" />

### Rain
<img src="https://i.imgur.com/MYHYgOE.png" alt="Rain" width="700" />

### Toggle button
<img src="https://i.imgur.com/e6Oc1nQ.png" alt="Toggle button" width="150" />
<br>

# Things I learned from this Project

* How to implement a toggle switch for different temperature units.
```js
if (degSwitch.checked) {
    deg = 'metric';
}
else {
    deg = 'imperial';
}
```
* How to implement async functions for api calls
```js
async function getWeather(choice) {
    ...
    try {
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
```
* How to implement a default value for location on initial load.
```js
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
```
* How to append different icons based on weather code & change background based on weather.
```js
if (wid >= 600 && wid <= 622) {
    const img = snowPic;
    wimgc.style.background = 'url(' + img + ')';
    const bg = snowBg;
    document.body.style.background = 'url(' + bg + ')';
}
```