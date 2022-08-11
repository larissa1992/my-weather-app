// Current Date
let now = new Date();
let day = now.getDay();
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let currentDay = days[now.getDay()];
let month = now.getMonth();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "November",
  "December",
];
let currentMonth = months[now.getMonth()];

let currentDate = `${currentDay} ${date} ${currentMonth} ${hours}:${minutes}`;
console.log(currentDate);
let h2 = document.querySelector("h2");
h2.innerHTML = currentDate;

// Search engine display city and its weather conditions

function searchCity(city) {
  let apiKey = "35fc3221d495b343bc97b3dea0447fe8";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=35fc3221d495b343bc97b3dea0447fe8&units=${units}`;

  axios.get(apiUrl).then(displayWeatherConditions);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

searchCity("New York");

function displayWeatherConditions(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#country").innerHTML = response.data.sys.country;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png)`
  );
}

// Degrees Selectors

function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (temperatureElement.innerHTML * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function converttoCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", converttoCelsius);
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

// Current postion coordinates

let currentPositionButton = document.querySelector("#current-position");
currentPositionButton.addEventListener("click", displayCurrentLocation);

function searchLocation(position) {
  let apiKey = "35fc3221d495b343bc97b3dea0447fe8";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&APPID=35fc3221d495b343bc97b3dea0447fe8&units=${units}`;
  axios.get(apiUrl).then(displayTemp);
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayTemp(response) {
  temp = document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  cityName = document.querySelector("#city").innerHTML = response.data.name;

  countryName = document.querySelector("#country").innerHTML =
    response.data.sys.country;

  description = document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  humidity = document.querySelector("#humidity").innerHTML =
    response.data.main.humidity;

  wind = document.querySelector("#wind").innerHTML = response.data.wind.speed;
}

function getTemp(response) {
  let temp = Math.round(response.data.main.temp);
  temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(response.data.main.temp);

  let countryName = response.data.sys.country;
  countryName = document.querySelector("#country");
  countryName.innerHTML = response.data.sys.country;

  let description = response.data.weather.description;
  description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;

  let humidity = response.data.main.humidity;
  humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = response.data.wind.speed;
  wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;
}
