const weatherApi = {
    key: "5898d1f46544d841eac1352fba609ade",
    baseUrl: "https://api.openweathermap.org/data/2.5/"
    // Current weather data - OpenWeatherMap
}


const userInput = document.getElementById("input-box");
userInput.addEventListener("keypress", getSearchValue);

function getSearchValue(event) {
    if (event.key === "Enter") {
        console.log('User input:', userInput.value);
        fetchWeather(userInput.value);
        autoComplete(userInput.value);

    }
}

function clickedSearch() {
    fetchWeather(userInput.value);
    autoComplete(userInput.value);
}

let modalText = document.getElementById("message");
let searchBtn = document.getElementById("search-btn");

function autoComplete(city) {
    fetch(`https://api.api-ninjas.com/v1/city?name=${city}&limit=7`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': 'lQkX1TNpDHxVEcCOdkizHg==ijMXifMjNytwpDx5'
            }
        })
        .then((response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        }))
        .then(data => {
            console.log('Autocomplete Data:', data)
        })
        .catch((error) => {
            console.log("Error:", error);
        });
}

function fetchWeather(cityName) {
    if (cityName === undefined || cityName.length === 0) {
        modalText.innerText = "Please enter a city name.";
        openPopup();

    } else {
        let url = `${weatherApi.baseUrl}weather?q=${cityName}&units=metric&appid=${weatherApi.key}`;
        // userInput.value = "";
        fetch(url)
            .then((response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw Error(response.statusText);
                }
            }))
            .then(weatherData)
            .catch((error) => {
                //If city name is NOT valid
                console.log("Error:", error);
                modalText.innerText = `City not found.`;
                openPopup();
            });
    }
}


function weatherData(data) {
    // console.log('Weather Data:', data);

    if (data) {
        document.getElementById("weather").style.visibility = "";
    }

    const city = document.querySelector(".location .city");
    city.innerHTML = `${data.name}`;

    const country = document.querySelector(".location .country");
    country.innerHTML = `${data.sys.country}`;

    const sunrise = document.querySelector(".sunrise p");
    sunrise.innerHTML = convertTimestamp(data.sys.sunrise, data.timezone);

    const sunset = document.querySelector(".sunset p");
    sunset.innerHTML = convertTimestamp(data.sys.sunset, data.timezone);

    const todaysDate = document.querySelector(".date");
    todaysDate.innerHTML = dateCalc();

    const weatherDescription = document.querySelector(".weather-description p");
    const text = data.weather[0].description;
    const upperCaseText = text[0].toUpperCase() + text.slice(1).toLowerCase();
    weatherDescription.innerHTML = `${upperCaseText}`;

    document.getElementById("weatherIcon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const tempMin = document.querySelector(".min-temp");
    const tempLowest = Math.floor(data.main.temp_min);
    tempMin.innerHTML = `${tempLowest}&#8451`;

    const tempMax = document.querySelector(".max-temp");
    const tempHighest = Math.floor(data.main.temp_max);
    tempMax.innerHTML = `${tempHighest}&#8451`;

    const feelsLike = document.querySelector(".feels-like p");
    const floorTemp = Math.floor(data.main.feels_like);
    feelsLike.innerHTML = `${floorTemp}&#8451`;

}

function dateCalc() {
    const today = new Date();
    // console.log(today);
    const weekday = today.toLocaleDateString("default", { weekday: "long" });;
    const date = today.getDate();
    const month = today.toLocaleString("default", { month: "long" });
    const year = today.getFullYear();
    return `${weekday}, ${date} ${month} ${year} `;
}


function convertTimestamp(unixTimestamp, timezone) {
    const sunSetRise = new Date((unixTimestamp * 1000 + timezone * 1000));
    const formattedTime = sunSetRise.toLocaleTimeString("en-GB", { timeZone: "UTC", hour: "2-digit", minute: "2-digit" });
    return formattedTime;
}

const sun = document.getElementById("sun");
const moon = document.getElementById("moon");

sun.classList.add("hidden");

function themeToggle() {
    const element = document.body;
    element.classList.toggle("dark-mode");

    if (moon.classList.contains("hidden")) {
        moon.classList.remove("hidden");
        sun.classList.add("hidden");
    } else {
        sun.classList.remove("hidden");
        moon.classList.add("hidden");
    }
}


const modalPopup = document.getElementById("modal");
function openPopup() {
    modalPopup.classList.add("open-popup");

}

function closePopup() {
    modalPopup.classList.remove("open-popup");
}



