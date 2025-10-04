// // 1. Initialize the map
// const map = L.map("map").setView([30.0444, 31.2357], 13); // Cairo as default

// // 2. Add OpenStreetMap tiles
// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   attribution: "© OpenStreetMap contributors",
// }).addTo(map);

// // 3. Click event to get lat/lng
// map.on("click", function (e) {
//   const lat = e.latlng.lat;
//   const lng = e.latlng.lng;

//   console.log(`Latitude: ${lat}, Longitude: ${lng}`);
//   alert(`Latitude: ${lat}, Longitude: ${lng}`);

//   // Add marker at clicked point
//   L.marker([lat, lng])
//     .addTo(map)
//     .bindPopup(`Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`)
//     .openPopup();
// });

// function getState(lat, lng) {
//   const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data.display_name);
//       alert("State: " + data.address.state);
//     })
//     .catch((err) => console.error(err));
// }
const map = L.map("map").setView([37.7749, -122.4194], 10);

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
  maxZoom: 18,
}).addTo(map);

// Weather API configuration
const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your OpenWeatherMap API key
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const weatherOverlay = document.getElementById("weatherOverlay");
const weatherInfo = document.getElementById("weatherInfo");
const loading = document.getElementById("loading");
const closeBtn = document.getElementById("closeBtn");

let currentMarker = null;
let weatherAnimationInterval = null;

// Map click event handler
map.on("click", async (e) => {
  const { lat, lng } = e.latlng;
  console.log("[v0] Map clicked at:", lat, lng);

  // Remove previous marker
  if (currentMarker) {
    map.removeLayer(currentMarker);
  }

  // Add new marker
  currentMarker = L.marker([lat, lng]).addTo(map);

  // Fetch weather data
  await fetchWeatherData(lat, lng);
});

// Fetch weather data from API
async function fetchWeatherData(lat, lng) {
  loading.classList.add("active");
  weatherInfo.classList.remove("active");
  clearWeatherAnimation();

  try {
    const response = await fetch(
      `${API_URL}?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    console.log("[v0] Weather data received:", data);

    displayWeatherInfo(data, lat, lng);
    startWeatherAnimation(data.weather[0].main);
  } catch (error) {
    console.error("[v0] Error fetching weather:", error);
    alert(
      "Error fetching weather data. Please check your API key and try again."
    );
  } finally {
    loading.classList.remove("active");
  }
}

// Display weather information
function displayWeatherInfo(data, lat, lng) {
  const weatherMain = data.weather[0].main;
  const weatherIcon = getWeatherIcon(weatherMain);

  document.getElementById("weatherIcon").textContent = weatherIcon;
  document.getElementById("locationName").textContent =
    data.name || "Unknown Location";
  document.getElementById("temperature").textContent = `${Math.round(
    data.main.temp
  )}°C`;
  document.getElementById("condition").textContent =
    data.weather[0].description;
  document.getElementById("humidity").textContent = `${data.main.humidity}%`;
  document.getElementById("windSpeed").textContent = `${data.wind.speed} m/s`;
  document.getElementById("coordinates").textContent = `${lat.toFixed(
    4
  )}, ${lng.toFixed(4)}`;

  weatherInfo.classList.add("active");
}

// Get weather icon based on condition
function getWeatherIcon(condition) {
  const icons = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Thunderstorm: "⛈️",
    Snow: "❄️",
    Mist: "🌫️",
    Fog: "🌫️",
    Haze: "🌫️",
  };
  return icons[condition] || "🌤️";
}

// Start weather animation based on condition
function startWeatherAnimation(condition) {
  console.log("[v0] Starting animation for:", condition);

  const animationMap = {
    Rain: createRain,
    Drizzle: createRain,
    Thunderstorm: createRain,
    Snow: createSnow,
    Clear: createWind,
    Clouds: createWind,
  };

  const animationFunction = animationMap[condition] || createWind;

  // Create initial particles
  for (let i = 0; i < 50; i++) {
    animationFunction();
  }

  // Continue creating particles
  weatherAnimationInterval = setInterval(animationFunction, 100);
}

// Create rain drop
function createRain() {
  const drop = document.createElement("div");
  drop.className = "rain";
  drop.style.left = Math.random() * 100 + "%";
  drop.style.animationDuration = Math.random() * 0.5 + 0.5 + "s";
  drop.style.opacity = Math.random() * 0.5 + 0.3;
  weatherOverlay.appendChild(drop);

  setTimeout(() => drop.remove(), 1000);
}

// Create snowflake
function createSnow() {
  const flake = document.createElement("div");
  flake.className = "snow";
  flake.style.left = Math.random() * 100 + "%";
  flake.style.animationDuration = Math.random() * 3 + 2 + "s";
  flake.style.opacity = Math.random() * 0.6 + 0.4;
  weatherOverlay.appendChild(flake);

  setTimeout(() => flake.remove(), 5000);
}

// Create wind effect
function createWind() {
  const wind = document.createElement("div");
  wind.className = "wind";
  wind.style.top = Math.random() * 100 + "%";
  wind.style.animationDuration = Math.random() * 2 + 1 + "s";
  wind.style.opacity = Math.random() * 0.3 + 0.2;
  weatherOverlay.appendChild(wind);

  setTimeout(() => wind.remove(), 3000);
}

// Clear weather animation
function clearWeatherAnimation() {
  if (weatherAnimationInterval) {
    clearInterval(weatherAnimationInterval);
    weatherAnimationInterval = null;
  }
  weatherOverlay.innerHTML = "";
}

// Close button handler
closeBtn.addEventListener("click", () => {
  weatherInfo.classList.remove("active");
  clearWeatherAnimation();
  if (currentMarker) {
    map.removeLayer(currentMarker);
    currentMarker = null;
  }
});
