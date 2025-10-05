// // Rendering functions
// function renderCurrentWeather(weather) {
//   const container = document.getElementById("current-weather");

//   container.innerHTML = `
//     <div class="weather-card">
//       <div class="weather-header">
//         <div class="location">
//           <span>📍</span>
//           <span>${weather.location}</span>
//         </div>
//       </div>
//       <div class="weather-content">
//         <div class="weather-info">
//           <div class="temperature">${weather.temperature}°</div>
//           <div class="condition">${weather.condition}</div>
//           <div class="weather-details">
//             <div class="detail-item">
//               <span>💨</span>
//               <span>${weather.wind}</span>
//             </div>
//             <div class="detail-item">
//               <span>💧</span>
//               <span>${weather.humidity}</span>
//             </div>
//           </div>
//         </div>
//         <div class="weather-icon">${weather.icon}</div>
//       </div>
//     </div>
//   `;
// }

// function renderWeeklyForecast(forecasts) {
//   const container = document.getElementById("weekly-forecast");

//   container.innerHTML = forecasts
//     .map(
//       (forecast) => `
//     <div class="forecast-card">
//       <div class="forecast-day">${forecast.day}</div>
//       <div class="forecast-icon">${forecast.icon}</div>
//       <div class="forecast-temp">${forecast.temp}°</div>
//     </div>
//   `
//     )
//     .join("");
// }

// function renderSafetyTips(tips) {
//   const container = document.getElementById("safety-tips");

//   container.innerHTML = tips
//     .map(
//       (tip) => `
//     <div class="tip-card ${tip.type}">
//       <div class="tip-title">${tip.icon} ${tip.title}</div>
//       <div class="tip-text">${tip.text}</div>
//     </div>
//   `
//     )
//     .join("");
// }

// function renderTemperatureTrends(trends) {
//   const container = document.getElementById("temperature-trends");

//   // Calculate SVG path points
//   const maxTemp = Math.max(...trends.temperatures);
//   const minTemp = Math.min(...trends.temperatures);
//   const range = maxTemp - minTemp;
//   const width = 400;
//   const height = 180;
//   const padding = 10;

//   const points = trends.temperatures
//     .map((temp, index) => {
//       const x =
//         padding +
//         (index * (width - 2 * padding)) / (trends.temperatures.length - 1);
//       const y =
//         height - padding - ((temp - minTemp) / range) * (height - 2 * padding);
//       return `${x},${y}`;
//     })
//     .join(" ");

//   const areaPath = `M${padding},${height - padding} L${points
//     .split(" ")
//     .join(" L")} L${width - padding},${height - padding} Z`;

//   container.innerHTML = `
//     <div class="trends-card">
//       <div class="trends-header">
//         <div class="trends-icon">
//           <svg width="18" height="18" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//             <path d="M16 7h6v6"></path>
//             <path d="m22 7-8.5 8.5-5-5L2 17"></path>
//           </svg>
//         </div>
//         <h3 class="trends-title">${trends.title}</h3>
//       </div>

//       <div class="chart-container">
//         <svg class="chart-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
//           <defs>
//             <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.8" />
//               <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.2" />
//             </linearGradient>
//             <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.3" />
//               <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.05" />
//             </linearGradient>
//           </defs>

//           <path d="${areaPath}" fill="url(#areaGradient)" />
//           <polyline points="${points}" fill="none" stroke="url(#lineGradient)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />

//           ${trends.temperatures
//             .map((temp, index) => {
//               const x =
//                 padding +
//                 (index * (width - 2 * padding)) /
//                   (trends.temperatures.length - 1);
//               const y =
//                 height -
//                 padding -
//                 ((temp - minTemp) / range) * (height - 2 * padding);
//               return `<circle cx="${x}" cy="${y}" r="4" fill="#fff" stroke="#3b82f6" stroke-width="2" />`;
//             })
//             .join("")}
//         </svg>

//         <div class="chart-years">
//           ${trends.years.map((year) => `<span>${year}</span>`).join("")}
//         </div>
//       </div>

//       <div class="trends-footer">
//         <p>${trends.description}</p>
//       </div>
//     </div>
//   `;
// }

// // Initialize app
// async function initApp() {
//   try {
//     // Get weather data (currently static, will be API call later)
//     const data = await getWeatherData();

//     // Render all sections
//     renderCurrentWeather(data.currentWeather);
//     renderWeeklyForecast(data.weeklyForecast);
//     renderSafetyTips(data.safetyTips);
//     renderTemperatureTrends(data.temperatureTrends);

//     console.log("[v0] Weather app initialized successfully");
//   } catch (error) {
//     console.error("[v0] Error initializing app:", error);
//   }
// }

// // Run app when DOM is ready
// if (document.readyState === "loading") {
//   document.addEventListener("DOMContentLoaded", initApp);
// } else {
//   initApp();
// }

// // Declare the getWeatherData function
// function getWeatherData() {
//   // Placeholder for actual API call or data retrieval logic
//   return Promise.resolve({
//     currentWeather: {
//       location: "New York",
//       temperature: 22,
//       condition: "Sunny",
//       wind: "10 km/h",
//       humidity: "50%",
//       icon: '<img src="sun-icon.png" alt="Sun">',
//     },
//     weeklyForecast: [
//       { day: "Mon", icon: '<img src="sun-icon.png" alt="Sun">', temp: 24 },
//       { day: "Tue", icon: '<img src="cloud-icon.png" alt="Cloud">', temp: 20 },
//       { day: "Wed", icon: '<img src="rain-icon.png" alt="Rain">', temp: 18 },
//       { day: "Thu", icon: '<img src="sun-icon.png" alt="Sun">', temp: 26 },
//       { day: "Fri", icon: '<img src="cloud-icon.png" alt="Cloud">', temp: 22 },
//       { day: "Sat", icon: '<img src="rain-icon.png" alt="Rain">', temp: 21 },
//       { day: "Sun", icon: '<img src="sun-icon.png" alt="Sun">', temp: 25 },
//     ],
//     safetyTips: [
//       {
//         type: "general",
//         icon: '<img src="warning-icon.png" alt="Warning">',
//         title: "Stay Safe",
//         text: "Always be cautious when outdoors.",
//       },
//       {
//         type: "umbrella",
//         icon: '<img src="umbrella-icon.png" alt="Umbrella">',
//         title: "Carry Umbrella",
//         text: "Rain is expected today.",
//       },
//     ],
//     temperatureTrends: {
//       title: "Temperature Trends",
//       temperatures: [20, 22, 25, 23, 24, 26, 27],
//       years: ["2015", "2016", "2017", "2018", "2019", "2020", "2021"],
//       description: "This chart shows temperature trends over the years.",
//     },
//   });
// }
const apiKey = "5653f0a141f166d327170dba37969327";
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const { latitude, longitude } = pos.coords;
      console.log(latitude, longitude);
      // Get location name (state/city)
      const locRes = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const locData = await locRes.json();
      const state =
        locData.address.state || locData.address.region || "Unknown";

      // Get weather data
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=en`
      );
      const data = await res.json();

      const city = data.name || state;
      const temp = Math.round(data.main.temp);
      const condition = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const wind = Math.round(data.wind.speed * 3.6); // convert m/s → km/h
      const humidity = data.main.humidity;

      // Update the card
      document.querySelector(".location").textContent = `${city}, ${state}`;
      document.querySelector(".temp").textContent = `${temp}°`;
      document.querySelector(".condition").textContent = condition;
      document.querySelector(
        ".icon"
      ).innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="icon" width="60">`;
      document.querySelector(".wind").textContent = `💨 ${wind} km/h`;
      document.querySelector(".humidity").textContent = `💧 ${humidity}%`;
    },
    (err) => {
      console.error("Error getting location:", err);
      document.querySelector(".location").textContent = "Location unavailable";
    }
  );
}

const html = `
<div class="day">
<div
class="backdrop-blur-xl border rounded-2xl transition-all duration-500 max-w-full light:bg-white/70 dark:bg-[var(--theme-glass-bg)] border-[var(--theme-glass-border)] p-4 min-w-[100px] text-center"
>
              <div
              class="text-[var(--theme-text-primary)] text-sm mb-3 font-semibold transition-colors duration-500"
              >
                Mon
              </div>
              <div
                class="w-12 h-12 mx-auto mb-3 rounded-xl bg-[var(--theme-icon-bg)] border border-[var(--theme-icon-border)] flex items-center justify-center transition-all duration-500"
                >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-sun text-[var(--theme-text-primary)] transition-colors duration-500"
                aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.93 4.93 1.41 1.41"></path>
                  <path d="m17.66 17.66 1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.34 17.66-1.41 1.41"></path>
                  <path d="m19.07 4.93-1.41 1.41"></path>
                  </svg>
                  </div>
                  <div
                  class="text-[var(--theme-text-primary)] text-xl font-bold transition-colors duration-500"
                  >
                  24°
                  </div>
                  </div>
          </div>
          `;
const renderForecasts = function () {};

// Fetch state name using OpenStreetMap reverse geocoding

//]========================================================================================
const API_KEY = "5653f0a141f166d327170dba37969327"; // Replace with your API key
const LAT = 40.7128; // Default: New York latitude
const LON = -74.006; // Default: New York longitude

// Weather icon SVGs
const weatherIcons = {
  sun: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>`,
  cloud: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>`,
  rain: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M16 14v6"></path><path d="M8 14v6"></path><path d="M12 16v6"></path></svg>`,
  snow: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M8 15h.01"></path><path d="M8 19h.01"></path><path d="M12 17h.01"></path><path d="M12 21h.01"></path><path d="M16 15h.01"></path><path d="M16 19h.01"></path></svg>`,
  thunderstorm: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973"></path><path d="m13 12-3 5h4l-3 5"></path></svg>`,
  mist: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M16 17H7"></path><path d="M17 21H9"></path></svg>`,
};

function getWeatherIcon(condition) {
  const cond = condition.toLowerCase();
  if (cond.includes("clear")) return weatherIcons.sun;
  if (cond.includes("rain") || cond.includes("drizzle"))
    return weatherIcons.rain;
  if (cond.includes("snow")) return weatherIcons.snow;
  if (cond.includes("thunder")) return weatherIcons.thunderstorm;
  if (cond.includes("mist") || cond.includes("fog") || cond.includes("haze"))
    return weatherIcons.mist;
  return weatherIcons.cloud;
}

function getDayName(dateString) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[new Date(dateString).getDay()];
}

function createForecastCard(forecast) {
  const dayName = getDayName(forecast.dt_txt);
  const temp = Math.round(forecast.main.temp);
  const condition = forecast.weather[0].main;
  const icon = getWeatherIcon(condition);

  return `
        <div class="day">
          <div class="backdrop-blur-xl border rounded-2xl transition-all duration-500 max-w-full light:bg-white/70 dark:bg-[var(--theme-glass-bg)] border-[var(--theme-glass-border)] p-4 min-w-[100px] text-center">
            <div class="text-sm mb-3 font-semibold">${dayName}</div>
            <div class="w-12 h-12 mx-auto mb-3 flex items-center justify-center">${icon}</div>
            <div class="text-xl font-bold">${temp}°</div>
          </div>
        </div>
      `;
}

async function fetchForecast() {
  const week = document.querySelector(".week");
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error("Failed to fetch weather data");

    const data = await response.json();
    const dailyForecasts = [];
    const seenDates = new Set();

    for (const forecast of data.list) {
      const date = forecast.dt_txt.split(" ")[0];
      if (!seenDates.has(date) && dailyForecasts.length < 5) {
        seenDates.add(date);
        dailyForecasts.push(forecast);
      }
    }

    // Render each forecast card inside .week
    week.innerHTML = ""; // clear old content
    dailyForecasts.forEach((forecast) => {
      const cardHTML = createForecastCard(forecast);
      week.insertAdjacentHTML("afterbegin", cardHTML);
    });
  } catch (error) {
    week.innerHTML = `<div class="error"><strong>Error:</strong> ${error.message}</div>`;
  }
}

// Initialize
fetchForecast();
