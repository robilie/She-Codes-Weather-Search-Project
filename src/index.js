function formatDate() {
  let now = new Date();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = now.getHours();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
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
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let number = now.getDate();

  let date = `${day}, ${month} ${number}, ${hours}:${minutes} `;

  let dateHeading = document.querySelector(".date-time");
  {
    dateHeading.innerHTML = date;
  }
}

formatDate();

function displayWeatherCondition(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("h1").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = `${Math.round(
    response.data.wind.speed
  )}`;
  document.querySelector(
    "#feels-like-temp"
  ).innerHTML = `Feels Like ${Math.round(response.data.main.feels_like)}°`;
  document.querySelector("#high").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°`;
  document.querySelector("#low").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°`;
  document.querySelector("h3").innerHTML = response.data.weather[0].description;

  celsius = Math.round(response.data.main.temp);
  highTemp = Math.round(response.data.main.temp_max);
  lowTemp = Math.round(response.data.main.temp_min);
  feelsLikeTemp = Math.round(response.data.main.feels_like);

  //Weather Icon Display

  let iconElement = document.querySelector("#weather-image-today");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "f3e9b7fb8cbac59f9b2f8b3d635b8d32";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function submitSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  search(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitSearch);

search("White Rock");

//Fahrenheit Change

function switchToFahrenheit(event) {
  event.preventDefault();

  document.querySelector("h1").innerHTML = `${Math.round(
    celsius * 1.8 + 32
  )}°F`;
  document.querySelector("#high").innerHTML = `${Math.round(
    highTemp * 1.8 + 32
  )}°`;
  document.querySelector("#low").innerHTML = `${Math.round(
    lowTemp * 1.8 + 32
  )}°`;
  document.querySelector(
    "#feels-like-temp"
  ).innerHTML = `Feels like ${Math.round(feelsLikeTemp * 1.8 + 32)}°`;
}

let fahrenheitTemperature = document.querySelector("#fahrenheit-link");
fahrenheitTemperature.addEventListener("click", switchToFahrenheit);

//Switch Back to Celsius Unit

function switchToCelsius(event) {
  event.preventDefault();

  document.querySelector("h1").innerHTML = `${celsius}°C`;

  document.querySelector("#high").innerHTML = `${Math.round(highTemp)}°`;
  document.querySelector("#low").innerHTML = `${Math.round(lowTemp)}°`;
  document.querySelector(
    "#feels-like-temp"
  ).innerHTML = `Feels like ${Math.round(feelsLikeTemp)}°`;
}

let celsiusTemperature = document.querySelector("#celsius-link");
celsiusTemperature.addEventListener("click", switchToCelsius);
