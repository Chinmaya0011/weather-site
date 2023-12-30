// weather.js

function updateDateTime() {
  const dateTimeDisplay = document.getElementById('dateTimeDisplay');
  const now = new Date();
  const formattedDateTime = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} ${formatTime(now)}`;
  dateTimeDisplay.innerText = formattedDateTime;
}

function formatTime(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Call updateDateTime() initially when the page loads
updateDateTime();

// Update the date and time every second
setInterval(updateDateTime, 1000);

function weatherstack() {
  fetch('https://ipinfo.io/json?token=b4b335494ce328')
    .then(response => response.json())
    .then(data => {
      // Assuming you have an input element with the id "cityInput"
      const cityInput = document.getElementById('cityInput');
      const enteredCity = cityInput.value;
      cityInput.value = '';
      // Use the enteredCity value or a default value if it's empty
      const cityName = enteredCity || data.city;

      // Now you can use the 'cityName' value in your API request
      return fetch(`http://api.weatherstack.com/current?access_key=77f315971cffcab996f9471fe437605c&query=${cityName}`);
    })
    .then(response => response.json())
    .then(data => {
      // Setting content for elements based on the received data
      // const weatherIcon = document.getElementById('weatherIcon');
      // weatherIcon.src = data.current.weather_icons[0];

      // Assuming data.current.temperature contains the temperature value
      const temperatureValue = document.getElementById('temperatureValue');
      temperatureValue.innerHTML = `${data.current.temperature}<span id="degree">o</span>`;

      const cityNameElement = document.getElementById('cityName');
      const citySpan = document.querySelector('.city-name');
      const weatherState = document.getElementById('weatherState');
      const weatherCountry = document.getElementById('weatherCountry');
      const timeZone = document.getElementById('timeZone');
      const weatherDescription = document.getElementById('weatherDescription');

      cityNameElement.innerText = data.location.name;
      citySpan.innerText = data.location.name;
      weatherState.innerText = data.location.region;
      weatherCountry.innerText = data.location.country;
      timeZone.innerText = data.location.timezone_id;
      weatherDescription.innerText = data.current.weather_descriptions[0];

      const windSpeed = document.getElementById('windSpeed');
      const feelsLike = document.getElementById('feelsLike');
      const humidity = document.getElementById('humidity');
      const visibility = document.getElementById('visibility');
      const pressure = document.getElementById('pressure');

      windSpeed.innerText = data.current.wind_speed;
      feelsLike.innerText = data.current.feelslike;
      humidity.innerText = data.current.humidity;
      visibility.innerText = data.current.visibility;
      pressure.innerText = data.current.pressure;
    })
    .catch(error => console.log(error));
}
