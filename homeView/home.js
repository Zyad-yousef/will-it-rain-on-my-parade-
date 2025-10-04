// Rendering functions
function renderCurrentWeather(weather) {
  const container = document.getElementById("current-weather");

  container.innerHTML = `
    <div class="weather-card">
      <div class="weather-header">
        <div class="location">
          <span>📍</span>
          <span>${weather.location}</span>
        </div>
      </div>
      <div class="weather-content">
        <div class="weather-info">
          <div class="temperature">${weather.temperature}°</div>
          <div class="condition">${weather.condition}</div>
          <div class="weather-details">
            <div class="detail-item">
              <span>💨</span>
              <span>${weather.wind}</span>
            </div>
            <div class="detail-item">
              <span>💧</span>
              <span>${weather.humidity}</span>
            </div>
          </div>
        </div>
        <div class="weather-icon">${weather.icon}</div>
      </div>
    </div>
  `;
}

function renderWeeklyForecast(forecasts) {
  const container = document.getElementById("weekly-forecast");

  container.innerHTML = forecasts
    .map(
      (forecast) => `
    <div class="forecast-card">
      <div class="forecast-day">${forecast.day}</div>
      <div class="forecast-icon">${forecast.icon}</div>
      <div class="forecast-temp">${forecast.temp}°</div>
    </div>
  `
    )
    .join("");
}

function renderSafetyTips(tips) {
  const container = document.getElementById("safety-tips");

  container.innerHTML = tips
    .map(
      (tip) => `
    <div class="tip-card ${tip.type}">
      <div class="tip-title">${tip.icon} ${tip.title}</div>
      <div class="tip-text">${tip.text}</div>
    </div>
  `
    )
    .join("");
}

function renderTemperatureTrends(trends) {
  const container = document.getElementById("temperature-trends");

  // Calculate SVG path points
  const maxTemp = Math.max(...trends.temperatures);
  const minTemp = Math.min(...trends.temperatures);
  const range = maxTemp - minTemp;
  const width = 400;
  const height = 180;
  const padding = 10;

  const points = trends.temperatures
    .map((temp, index) => {
      const x =
        padding +
        (index * (width - 2 * padding)) / (trends.temperatures.length - 1);
      const y =
        height - padding - ((temp - minTemp) / range) * (height - 2 * padding);
      return `${x},${y}`;
    })
    .join(" ");

  const areaPath = `M${padding},${height - padding} L${points
    .split(" ")
    .join(" L")} L${width - padding},${height - padding} Z`;

  container.innerHTML = `
    <div class="trends-card">
      <div class="trends-header">
        <div class="trends-icon">
          <svg width="18" height="18" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 7h6v6"></path>
            <path d="m22 7-8.5 8.5-5-5L2 17"></path>
          </svg>
        </div>
        <h3 class="trends-title">${trends.title}</h3>
      </div>
      
      <div class="chart-container">
        <svg class="chart-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.8" />
              <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.2" />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.3" />
              <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.05" />
            </linearGradient>
          </defs>
          
          <path d="${areaPath}" fill="url(#areaGradient)" />
          <polyline points="${points}" fill="none" stroke="url(#lineGradient)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
          
          ${trends.temperatures
            .map((temp, index) => {
              const x =
                padding +
                (index * (width - 2 * padding)) /
                  (trends.temperatures.length - 1);
              const y =
                height -
                padding -
                ((temp - minTemp) / range) * (height - 2 * padding);
              return `<circle cx="${x}" cy="${y}" r="4" fill="#fff" stroke="#3b82f6" stroke-width="2" />`;
            })
            .join("")}
        </svg>
        
        <div class="chart-years">
          ${trends.years.map((year) => `<span>${year}</span>`).join("")}
        </div>
      </div>
      
      <div class="trends-footer">
        <p>${trends.description}</p>
      </div>
    </div>
  `;
}

// Initialize app
async function initApp() {
  try {
    // Get weather data (currently static, will be API call later)
    const data = await getWeatherData();

    // Render all sections
    renderCurrentWeather(data.currentWeather);
    renderWeeklyForecast(data.weeklyForecast);
    renderSafetyTips(data.safetyTips);
    renderTemperatureTrends(data.temperatureTrends);

    console.log("[v0] Weather app initialized successfully");
  } catch (error) {
    console.error("[v0] Error initializing app:", error);
  }
}

// Run app when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

// Declare the getWeatherData function
function getWeatherData() {
  // Placeholder for actual API call or data retrieval logic
  return Promise.resolve({
    currentWeather: {
      location: "New York",
      temperature: 22,
      condition: "Sunny",
      wind: "10 km/h",
      humidity: "50%",
      icon: '<img src="sun-icon.png" alt="Sun">',
    },
    weeklyForecast: [
      { day: "Mon", icon: '<img src="sun-icon.png" alt="Sun">', temp: 24 },
      { day: "Tue", icon: '<img src="cloud-icon.png" alt="Cloud">', temp: 20 },
      { day: "Wed", icon: '<img src="rain-icon.png" alt="Rain">', temp: 18 },
      { day: "Thu", icon: '<img src="sun-icon.png" alt="Sun">', temp: 26 },
      { day: "Fri", icon: '<img src="cloud-icon.png" alt="Cloud">', temp: 22 },
      { day: "Sat", icon: '<img src="rain-icon.png" alt="Rain">', temp: 21 },
      { day: "Sun", icon: '<img src="sun-icon.png" alt="Sun">', temp: 25 },
    ],
    safetyTips: [
      {
        type: "general",
        icon: '<img src="warning-icon.png" alt="Warning">',
        title: "Stay Safe",
        text: "Always be cautious when outdoors.",
      },
      {
        type: "umbrella",
        icon: '<img src="umbrella-icon.png" alt="Umbrella">',
        title: "Carry Umbrella",
        text: "Rain is expected today.",
      },
    ],
    temperatureTrends: {
      title: "Temperature Trends",
      temperatures: [20, 22, 25, 23, 24, 26, 27],
      years: ["2015", "2016", "2017", "2018", "2019", "2020", "2021"],
      description: "This chart shows temperature trends over the years.",
    },
  });
}
