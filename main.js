
const weatherApi = {
    key: '5898d1f46544d841eac1352fba609ade',
    baseUrl: 'https://api.openweathermap.org/data/2.5/'
    // Current weather data - OpenWeatherMap
}


const userInput = document.querySelector('.input-box');

userInput.addEventListener('keypress', getSearchValue);

function getSearchValue(event) {
    if (event.keyCode == 13) {
        fetchResults(userInput.value);
        // console.log(userInput.value);
    }
}


function fetchResults(cityName) {
    fetch(`${weatherApi.baseUrl}weather?q=${cityName}&units=metric&appid=${weatherApi.key}`)
        .then((response => {
            // Always gets a response, unless there is network error
            // It never throws an error for 4xx or 5xx response
            return response.json();
        }))
        .then(displayResults)
        .catch((error) => {
            // Only network error comes here
            console.log('Error:', error)
        });
}

function displayResults(data) {
    console.log('Weather Data:', data);

    const city = document.querySelector('.location .city');
    city.innerHTML = `${data.name}, ${data.sys.country}`

    const sunrise = document.querySelector('.sunrise p');
    sunrise.innerHTML = convertTimestamp(data.sys.sunrise, data.timezone);

    const sunset = document.querySelector('.sunset p');
    sunset.innerHTML = convertTimestamp(data.sys.sunset, data.timezone);

    const todaysDate = document.querySelector('.date');
    todaysDate.innerHTML = dateCalc();

    const weatherDescription = document.querySelector('.weather-description p');
    const text = data.weather[0].description;
    const upperCaseText = text[0].toUpperCase() + text.slice(1).toLowerCase();
    weatherDescription.innerHTML = `${upperCaseText}`;

    document.getElementById("weatherIcon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const tempMin = document.querySelector('.min-temp');
    const tempLowest = Math.floor(data.main.temp_min);
    tempMin.innerHTML = `${tempLowest}&#8451`;

    const tempMax = document.querySelector('.max-temp');
    const tempHighest = Math.floor(data.main.temp_max);
    tempMax.innerHTML = `${tempHighest}&#8451`;

    const feelsLike = document.querySelector('.feels-like p');
    const floorTemp = Math.floor(data.main.feels_like);
    feelsLike.innerHTML = `${floorTemp}&#8451`;

}

function dateCalc() {
    const today = new Date();
    // console.log(today);
    const weekday = today.toLocaleDateString('default', { weekday: 'long' });;
    const date = today.getDate();
    const month = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();
    return `${weekday}, ${date} ${month} ${year} `;
}


function convertTimestamp(unixTimestamp, timezone) {
    const sunSetRise = new Date((unixTimestamp * 1000 + timezone * 1000));
    const formattedTime = sunSetRise.toLocaleTimeString("en-US", { timeZone: 'UTC' }, { hour: '2-digit', minute: '2-digit' });
    return formattedTime;
}
