const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const locationButton = document.querySelector(".location-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");
const recentCitiesDropdown = document.querySelector(".recent-cities");
const dropdownContainer = document.querySelector(".dropdown");

const API_KEY = "2facd870d7a5f075de3c84e00167c1b5";

// Function to create HTML for weather cards
const createWeatherCard = (cityName, weatherItem, index) => {
  const date = new Date(weatherItem.dt_txt).toLocaleDateString();
  const tempCelsius = (weatherItem.main.temp - 273.15).toFixed(1);
  const weatherIcon = `http://openweathermap.org/img/wn/${weatherItem.weather[0].icon}.png`;

  return index === 0
    ? `<div class="details">
        <h2>${cityName} (${date})</h2>
        <h6 class="flex items-center"><img src="${weatherIcon}" alt="Weather Icon" class="w-12 h-12 mr-2">Temperature: ${tempCelsius}°C</h6>
        <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
        <h6>Humidity: ${weatherItem.main.humidity}%</h6>
      </div>`
    : `<li class="card bg-gray-600 text-white p-4 rounded-lg shadow-md flex flex-col items-center">
        <img src="${weatherIcon}" alt="Weather Icon" class="w-16 h-16 mb-2">
        <h3 class="text-lg font-semibold">${date}</h3>
        <h6>Temp: ${tempCelsius}°C</h6>
        <h6>Wind: ${weatherItem.wind.speed} M/S</h6>
        <h6>Humidity: ${weatherItem.main.humidity}%</h6>
      </li>`;
};

// Function to fetch weather details from API
const getWeatherDetails = (cityName, latitude, longitude) => {
  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

  fetch(WEATHER_API_URL)
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      const uniqueForecastDays = [];
      const fiveDaysForecast = data.list.filter(forecast => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecastDays.includes(forecastDate)) {
          uniqueForecastDays.push(forecastDate);
          return true;
        }
        return false;
      });

      currentWeatherDiv.innerHTML = "";
      weatherCardsDiv.innerHTML = "";

      fiveDaysForecast.forEach((weatherItem, index) => {
        const html = createWeatherCard(cityName, weatherItem, index);
        if (index === 0) {
          currentWeatherDiv.innerHTML = html;
        } else {
          weatherCardsDiv.innerHTML += html;
        }
      });

      updateRecentCities(cityName);
    })
    .catch(error => {
      alert(`An error occurred: ${error.message}`);
    });
};

// Function to get city coordinates from city name
const getCityCoordinates = () => {
  const cityName = cityInput.value.trim();
  if (cityName === "") {
    alert("Please enter a city name.");
    return;
  }

  const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      if (!data.length) {
        alert(`No coordinates found for ${cityName}`);
        return;
      }
      const { lat, lon, name } = data[0];
      getWeatherDetails(name, lat, lon);
    })
    .catch(() => {
      alert("An error occurred while fetching the coordinates!");
    });
};

// Function to get user coordinates
const getUserCoordinates = () => {
  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;

      fetch(API_URL)
        .then(response => response.json())
        .then(data => {
          const { name } = data[0];
          getWeatherDetails(name, latitude, longitude);
        })
        .catch(() => {
          alert("An error occurred while fetching the city name!");
        });
    },
    error => {
      if (error.code === error.PERMISSION_DENIED) {
        alert("Geolocation request denied. Please enable location permissions.");
      } else {
        alert("Geolocation request error. Please enable location permissions.");
      }
    }
  );
};

// Function to update recent cities dropdown
const updateRecentCities = (cityName) => {
  let recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];
  if (!recentCities.includes(cityName)) {
    recentCities = [cityName, ...recentCities].slice(0, 5); // Keep only the latest 5 cities
    localStorage.setItem("recentCities", JSON.stringify(recentCities));
  }
  renderRecentCities();
};

// Function to render recent cities in dropdown
const renderRecentCities = () => {
  const recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];
  recentCitiesDropdown.innerHTML = recentCities.map(city => 
    `<li class="px-4 py-2 hover:bg-gray-200 cursor-pointer" data-city="${city}">${city}</li>`
  ).join('');
  dropdownContainer.classList.toggle('hidden', recentCities.length === 0);
};

// Handle search button click
searchButton.addEventListener("click", getCityCoordinates);

// Handle location button click
locationButton.addEventListener("click", getUserCoordinates);

// Handle dropdown city click
recentCitiesDropdown.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    const cityName = event.target.getAttribute("data-city");
    cityInput.value = cityName; // Set input value to clicked city
    getCityCoordinates(); // Fetch weather for the selected city
  }
});

// Show dropdown when user types in the input
cityInput.addEventListener("focus", () => {
  renderRecentCities();
});

// Hide dropdown when clicking outside of it
document.addEventListener("click", (event) => {
  if (!dropdownContainer.contains(event.target) && !cityInput.contains(event.target)) {
    dropdownContainer.classList.add("hidden");
  }
});

// Initialize recent cities dropdown on page load
renderRecentCities();
