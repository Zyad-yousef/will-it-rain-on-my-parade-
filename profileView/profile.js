// Settings page functionality

// Handle navigation clicks
function handleEditProfile() {
  console.log("[v0] Edit Profile clicked");
  // TODO: Navigate to edit profile page or show modal
  alert("Edit Profile - Coming soon!");
}

function handleNotifications() {
  console.log("[v0] Notifications clicked");
  // TODO: Navigate to notifications settings
  alert("Notifications Settings - Coming soon!");
}

function handleTemperatureUnits() {
  console.log("[v0] Temperature Units clicked");
  // TODO: Show temperature unit selector (Celsius/Fahrenheit)
  const currentUnit = document.querySelector(".settings-value");
  if (currentUnit.textContent === "°C") {
    currentUnit.textContent = "°F";
  } else {
    currentUnit.textContent = "°C";
  }
}

function handleLanguage() {
  console.log("[v0] Language clicked");
  // TODO: Show language selector
  alert("Language Settings - Coming soon!");
}

function handleGeneralSettings() {
  console.log("[v0] General Settings clicked");
  // TODO: Navigate to general settings page
  alert("General Settings - Coming soon!");
}

function handleEmergencySOS() {
  console.log("[v0] Emergency SOS clicked");
  // TODO: Show emergency contacts or trigger emergency features
  alert(
    "Emergency SOS - This would show emergency contacts and weather alerts"
  );
}

function handleLogout() {
  console.log("[v0] Logout clicked");
  // TODO: Clear user session and redirect to login
  if (confirm("Are you sure you want to log out?")) {
    // Clear any stored user data
    localStorage.clear();
    // Redirect to home page
    window.location.href = "index.html";
  }
}

// Initialize settings page
document.addEventListener("DOMContentLoaded", () => {
  console.log("[v0] Settings page loaded");

  // Load user profile data (from static data for now)
  // TODO: Replace with API call when ready
  const userData = {
    name: "John Doe",
    email: "john.doe@email.com",
    temperatureUnit: "°C",
    language: "English",
  };

  // Update profile display
  document.querySelector(".profile-name").textContent = userData.name;
  document.querySelector(".profile-email").textContent = userData.email;
});
const celsiusBtn = document.getElementById("celsius");
const fahrenheitBtn = document.getElementById("fahrenheit");
const saveBtn = document.getElementById("saveBtn");

// Load saved preference
window.onload = () => {
  const unit = localStorage.getItem("temperatureUnit");
  if (unit === "F") {
    setActive(fahrenheitBtn);
  } else {
    setActive(celsiusBtn);
  }
};

// Click handlers
celsiusBtn.addEventListener("click", () => setActive(celsiusBtn));
fahrenheitBtn.addEventListener("click", () => setActive(fahrenheitBtn));

// Save preference
saveBtn.addEventListener("click", () => {
  const selectedUnit =
    document.querySelector(".option.active").id === "celsius" ? "C" : "F";
  localStorage.setItem("temperatureUnit", selectedUnit);
  alert(
    `Preference saved: ${
      selectedUnit === "C" ? "Celsius (℃)" : "Fahrenheit (℉)"
    }`
  );
});

// Helper: toggle active class
function setActive(activeEl) {
  document
    .querySelectorAll(".option")
    .forEach((el) => el.classList.remove("active"));
  activeEl.classList.add("active");
}
