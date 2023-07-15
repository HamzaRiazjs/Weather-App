
let defaultCity = "Karachi";

let getWeather = () => {
  let weatherLocation = document.getElementById("weather-location");
  let city = document.getElementById("city");
  let country = document.getElementById("country");
  let temp = document.getElementById("temp");
  let weatherType = document.getElementById("weather-type");
  let humidity = document.getElementById("Humidity");
  let feelsLike = document.getElementById("feels-like");
  let clouds = document.getElementById("clouds");
  let wind = document.getElementById("wind-speed");
  let weatherImgTemp = document.getElementById("weather-img-temp");
  let error = document.getElementById("error-message");

  // Fetch weather data for the entered city or default city
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${weatherLocation.value || defaultCity}&appid=058d2c28b2708f1c89f0f169b3957901&units=metric`;
  fetch(apiUrl)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);

      // Check if the response contains an error message
      if (res.cod !== 200) {
        error.innerHTML = res.message;
        error.style.display = "block";
        return;
      }

      error.style.display = "none"; // Hide the error message if it was previously displayed

      city.innerHTML = res.name;
      country.innerHTML = res.sys.country;
      temp.innerHTML = Math.round(res.main.temp) + "°";
      weatherType.innerHTML = res.weather[0].main;
      humidity.innerHTML = res.main.humidity + "%";
      feelsLike.innerHTML = res.main.feels_like + "%";
      clouds.innerHTML = res.clouds.all + "%";
      wind.innerHTML = res.wind.speed + "km/h";
      weatherLocation.value = "";

      // Set weather image based on weather type
      if (res.weather[0].main == "Haze") {
        weatherImgTemp.src = 'images/haze.svg';
      } else if (res.weather[0].main == "Rain") {
        weatherImgTemp.src = 'images/rain.svg';
      } else if (res.weather[0].main == "Smoke") {
        weatherImgTemp.src = 'images/smoke.svg';
      } else if (res.weather[0].main == "Clear") {
        weatherImgTemp.src = 'images/clear-day.svg';
      } else if (res.weather[0].main == "Clouds") {
        weatherImgTemp.src = 'images/cloudy.svg';
      }
    })
    .catch((error) => {
      console.log(error);
      error.innerHTML = "An error occurred while fetching the weather data.";
      error.style.display = "block";
    });
}

// Call getWeather function to display weather for default city on page load
getWeather();

function handleKeyPress(event) {
  if (event.keyCode === 13) {
    getWeather();
  }
}
