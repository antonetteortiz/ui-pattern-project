// Header
let nav = document.querySelector("nav");
let headerButton = document.querySelector(".navButton");
headerButton.classList.add("open");

// add elements to header
nav.appendChild(headerButton);

// Menu
let menu = document.querySelector("#menu");
menu.classList.add("inactive");

let menuCloseButton = document.createElement("button");
menuCloseButton.classList.add("close");
menuCloseButton.innerHTML = "x";

let menuListContainer = document.createElement("div");
menuListContainer.classList.add("menuList");

let menuItemHeader = document.createElement("li");
menuItemHeader.classList.add("menuItemHeader");
menuItemHeader.innerHTML = "Favorite Cities";

let menuItemDangriga = document.createElement("li");
menuItemDangriga.classList.add("menuItem");
menuItemDangriga.innerHTML = "Dangriga";

let menuItemNairobi = document.createElement("li");
menuItemNairobi.classList.add("menuItem");
menuItemNairobi.innerHTML = "Nairobi";

let menuItemWashingtonDC = document.createElement("li");
menuItemWashingtonDC.classList.add("menuItem");
menuItemWashingtonDC.innerHTML = "Washington DC";

let menuItemPhoenix = document.createElement("li");
menuItemPhoenix.classList.add("menuItem");
menuItemPhoenix.innerHTML = "Phoenix";

let menuItemNewYork = document.createElement("li");
menuItemNewYork.classList.add("menuItem");
menuItemNewYork.innerHTML = "New York";

menu.appendChild(menuCloseButton);
menu.appendChild(menuListContainer);
menuListContainer.appendChild(menuItemHeader);
menuListContainer.appendChild(menuItemDangriga);
menuListContainer.appendChild(menuItemNairobi);
menuListContainer.appendChild(menuItemWashingtonDC);
menuListContainer.appendChild(menuItemPhoenix);
menuListContainer.appendChild(menuItemNewYork);



// menuItemDangriga = document.querySelector("#dangriga");
menuItemDangriga.addEventListener("click", () => loading("dangriga"));
menuItemNairobi.addEventListener("click", () => loading("nairobi"));
menuItemPhoenix.addEventListener("click", () => loading("phoenix"));
menuItemWashingtonDC.addEventListener("click", () => loading("washington dc"));
menuItemNewYork.addEventListener("click", () => loading("new york"));
//Add everything to the Body
document.body.appendChild(menu);

headerButton.addEventListener("click", function (e) {
  let menu = document.querySelector("#menu");
  menu.classList.remove("inactive");
  menu.classList.add("active");
  console.log("clicked open button");
});
menuCloseButton.addEventListener("click", function (e) {
  let menu = document.querySelector("#menu");
  menu.classList.add("inactive");
  menu.classList.remove("active");
  console.log("clicked closed button");
});

//setting date and time
let dateElement = document.querySelector("#currentDate");
let timeElement = document.querySelector("#currentTime");
let currentTime = new Date();
let hours = currentTime.getHours();
let hourFormatted = hours % 12;
if (hourFormatted === 0) {
  hourFormatted = 12;
}

let minutes = currentTime.getMinutes();
let minutesFormatted = currentTime.getMinutes();
if (minutes <= 9) {
  minutesFormatted = `0${minutes}`;
}

let time = hourFormatted + ":" + minutesFormatted;
if (hours >= 12) {
  time = time + "pm";
} else {
  time = time + "am";
}

let dayIndex = currentTime.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[dayIndex];
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

let month = months[currentTime.getMonth()];
let date = currentTime.getDate();
let year = currentTime.getFullYear();

let newDate = `${day}, ${month} ${date}, ${year}`;
let newTime = `${time}`;
console.log(newDate);
console.log(newTime);

dateElement.innerHTML = newDate;
timeElement.innerHTML = newTime;

//updating City and temperature through API
function displayWeatherCondition(response) {
  console.log(response);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weatherCondition").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#temp-High").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#temp-Low").innerHTML = Math.round(
    response.data.main.temp_min
  );
}

function loading(city) {
  let apiKey = "2221df360f97a45f4cced54ea0a53002";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
  console.log(apiUrl);
  // console.log(axios);
}

function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-search-input");
  let city = cityInput.value;
  console.log(city);
  loading(city);
}

let searchForm = document.querySelector(".city-search");
searchForm.addEventListener("submit", citySearch);

//Default City
loading("Washington DC");

//Update temperature
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = 66;
  // let temperature = tempertureElement.innerHTML;
  // // console.log(temperature);
  // // tempertureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = 19;
  // let temperature = tempertureElement.innerHTML;
  // console.log(temperature);
  // tempertureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
