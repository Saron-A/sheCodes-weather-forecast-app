let searchInput = document.querySelector("#search");

let btn = document.querySelector("#search-btn");
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

window.addEventListener("load", () => {
  const defaultCity = document.querySelector("h1").textContent.trim();
  searchCity(defaultCity);
});

async function searchCity(city) {
  let apiKey = "5704c3b4443b30c3afaa70c5fodbt64b";
  if (!city) {
    city = searchInput.value.trim();
  }

  let response = await axios.get(
    `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`
  );

  let info = response.data;
  console.log(info);
  getWeather(info);
}

function getWeather(info) {
  getDailyWeather(info);
  getWeatherForecast(info);
}

function getDailyWeather(info) {
  let city = document.querySelector("h1");
  city.textContent = info.city;

  let day = document.querySelector("span.day");
  day.innerHTML = days[now.getDay()];

  let time = document.querySelector("span.time");
  time.innerHTML = `${now.getHours()}:${now.getMinutes()}`;

  let description = document.querySelector("span.description");
  description.innerHTML = info.daily[0].condition.description;

  let humidity = document.querySelector("span.humidity");
  humidity.innerHTML = `${info.daily[0].temperature.humidity}%`;

  let wind = document.querySelector("span.wind");
  wind.innerHTML = `${info.daily[0].wind.speed} km/h`;

  let temp = document.querySelector("span.temp");
  temp.innerHTML = `${Math.round(info.daily[0].temperature.day)}&degC`;
  temp.setAttribute("style", "font-size: 3rem; font-weight: 700;");

  let img = document.querySelector(".temp img");
  img.src = info.daily[0].condition.icon_url;
}

function getWeatherForecast(info) {
  let forecastContainer = document.querySelector(".weather-forecast");
  forecastContainer.innerHTML = ""; // Clear previous forecast
  for (let i = 0; i < 5; i++) {
    let day = info.daily[i];

    let dailyForecast = document.createElement("div");
    dailyForecast.classList.add("daily-forecast");

    let date = document.createElement("p");
    date.innerHTML = daysShort[now.getDay() + i];
    if (now.getDay() + i > 6) {
      date.innerHTML = daysShort[now.getDay() + i - 7];
    }
    date.classList.add("forecast");

    let img = document.createElement("img");
    img.src = day.condition.icon_url;

    let temp = document.createElement("p");
    let maxTemp = document.createElement("span");
    maxTemp.textContent = `${Math.round(day.temperature.maximum)}° `;
    maxTemp.classList.add("max");

    let minTemp = document.createElement("span");
    minTemp.textContent = `${Math.round(day.temperature.minimum)}°`;
    minTemp.classList.add("min");

    temp.appendChild(maxTemp);
    temp.appendChild(minTemp);

    dailyForecast.append(date, img, temp);
    forecastContainer.appendChild(dailyForecast);
  }
}

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchCity();
    searchInput.value = "";
    searchInput.focus();
  }
});

btn.addEventListener("click", (e) => {
  e.preventDefault();
  searchCity();
  searchInput.value = "";
  searchInput.focus();
});
