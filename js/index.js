
async function fetchWeather() {
    let country = document.getElementById('country-input').value;
    if (!country) {
      country ='Cairo';
    }
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=a50ed763383c45f2af5132020241206&q=${country}&days=3`);
      const data = await response.json();

      const weatherHTML = `
        <div class="card card-blur-bg w-100 text-center shadow p-5 ">
          <h1 id="city-name">${data.location.name}</h1>
          <h4 id="temperature">${data.current.temp_c}°C</h4>
          <p id="condition">${data.current.condition.text}</p>
          <p id="humidity"><i class="fa-solid fa-droplet"></i> Humidity: ${data.current.humidity}%</p>
          <p id="wind"><i class="fa-solid fa-wind"></i> Wind: ${data.current.wind_kph} km/h</p>
          <p id="uv"><i class="fa-solid fa-sun"></i> UV Index: ${data.current.uv}</p>
          <div class="forecast d-flex flex-wrap justify-content-around my-3" id="forecast">
  ${data.forecast.forecastday.map(day => `
    <div class="day shadow-lg px-5 py-3 rounded-3  col-md-6 col-lg-3 m-5">
      <h3 class="h3">${new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</h3>
      <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" class="forecast-icon w-50">
      <p>${day.day.avgtemp_c}°C</p>
      <p>${day.day.condition.text}</p>
    </div>
  `).join('')}
</div>

          </div>
        </div>
      `;

      document.getElementById('weather-container').innerHTML = weatherHTML;

      // Change background based on day/night
      const iconUrl = data.current.condition.icon;
      if (iconUrl.includes("night")) {
        document.body.style.backgroundImage = "url('images/istockphoto-809971888-2048x2048.jpg')";
      } else {
        document.body.style.backgroundImage = "url('images/istockphoto-815712236-2048x2048.jpg')";
      }
    } catch (error) {
      document.getElementById('weather-container').innerHTML = `
  <div class="vh-50 mx-auto d-flex flex-column justify-content-around align-items-center">
      <span class="loader mx-auto"></span>
      <p class="alert alert-danger">Error fetching weather data: enter a city name 
          </p>
</div>
`;
      console.error('Error fetching weather data:', error);
    }
  }


  document.getElementById('country-input').addEventListener('input', fetchWeather);
