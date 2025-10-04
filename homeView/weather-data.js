// Static weather data - Replace this with API calls later
const weatherData = {
  currentWeather: {
    location: "San Francisco, CA",
    temperature: 24,
    condition: "Partly Cloudy",
    icon: "☁️",
    wind: "12 km/h",
    humidity: "68%",
  },

  weeklyForecast: [
    { day: "Mon", icon: "☀️", temp: 26 },
    { day: "Tue", icon: "⛅", temp: 24 },
    { day: "Wed", icon: "🌤️", temp: 25 },
    { day: "Thu", icon: "☁️", temp: 22 },
    { day: "Fri", icon: "🌧️", temp: 20 },
    { day: "Sat", icon: "⛈️", temp: 19 },
    { day: "Sun", icon: "🌤️", temp: 23 },
  ],

  safetyTips: [
    {
      type: "red",
      icon: "🌧️",
      title: "Rain Expected",
      text: "Heavy rainfall in 2 hours. Carry an umbrella and avoid low-lying areas.",
    },
    {
      type: "yellow",
      icon: "🌤️",
      title: "UV Index: Moderate",
      text: "Apply sunscreen if outdoors for extended periods.",
    },
    {
      type: "teal",
      icon: "💧",
      title: "Stay Hydrated",
      text: "Moderate humidity levels. Drink water regularly throughout the day.",
    },
  ],

  temperatureTrends: {
    title: "September Temperature Trends",
    years: ["2020", "2021", "2022", "2023", "2024", "2025"],
    temperatures: [18, 20, 22, 24, 26, 28],
    description:
      "September is trending hotter each year. Morning activities between 7–10 AM are recommended for outdoor events.",
  },
}

// Function to simulate API call - Replace with actual fetch later
function getWeatherData() {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve(weatherData)
    }, 100)
  })
}

// Function to get location - Replace with geolocation API later
function getUserLocation() {
  return new Promise((resolve) => {
    // For now, return default location
    // Later: use navigator.geolocation.getCurrentPosition()
    resolve({ city: "San Francisco", state: "CA" })
  })
}
