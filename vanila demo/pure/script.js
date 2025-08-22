import { weatherService } from "./services/weather.service.js";

var gWeathers = [];
var gSelectedId = null;

function onInit() {
  console.log("onInit");
  weatherService.query().then((weathers) => {
    gWeathers = weathers;
    renderWeatherList();
  });
}

function onSearch() {
  const cityName = renderSearchInput();
  if (!cityName) return;
  weatherService.searchWeather(cityName).then((weather) => {
    if (weather.error) {
      console.error("Error searching weather:", weather.error.message);
      return;
    }
    weatherService.save(weather).then((savedWeather) => {
      const weatherExists = gWeathers.find((w) => w.id === savedWeather.id);
      if (!weatherExists) {
        gWeathers.push(savedWeather);
      } else {
        gWeathers[gWeathers.indexOf(weatherExists)] = savedWeather;
      }
      renderWeatherList();
    });
  });
}

function onFilter(filter = "all") {
  renderFilterBtn(filter);
  weatherService
    .query({ status: filter })
    .then((weathers) => {
      gWeathers = weathers;
    })
    .then(() => {
      renderWeatherList();
    });
}

function toggleModal(id) {
  gSelectedId = id;
  renderModal();
}

function onSave() {
  const nameInputElement = document.querySelector("#city-name");
  const temperatureInputElement = document.querySelector("#city-temperature");
  const name = nameInputElement.value;
  const temperature = +temperatureInputElement.value;
  const weather = gWeathers.find((w) => w.id === gSelectedId);
  weather.location.name = name;
  weather.current.temp_c = temperature;
  weatherService.save(weather).then((savedWeather) => {
    gWeathers[gWeathers.indexOf(weather)] = savedWeather;
    renderWeatherList();
    toggleModal(null);
  });
}

function onDelete() {
  const weather = gWeathers.find((w) => w.id === gSelectedId);
  weatherService.remove(weather.id).then(() => {
    gWeathers = gWeathers.filter((w) => w.id !== gSelectedId);
    renderWeatherList();
    toggleModal(null);
  });
}

function renderWeatherList() {
  if (gWeathers.length === 0) {
    renderNoWeathers();
    return;
  }
  const noWeathersElement = document.querySelector("#no-weathers");
  if (!noWeathersElement.classList.contains("hidden")) {
    noWeathersElement.classList.add("hidden");
  }
  const weatherListElement = document.querySelector("#weather-list");
  weatherListElement.classList.remove("hidden");
  const weatherList = document.querySelector(".weather-list tbody");
  weatherList.innerHTML = "";
  gWeathers.forEach((weather) => {
    const weatherItem = document.createElement("tr");
    weatherItem.innerHTML = `
      <td>${weather.location?.name || "Unknown"}</td>
      <td>${weather.current?.temp_c || "N/A"}°C</td>
      <td>${weather.current?.condition?.text || "N/A"}</td>
      <td>
        <button class="action-btn" onclick="toggleModal('${weather.id}')">
          <span class="action-btn-icon">&#8942;</span>
        </button>
      </td>
    `;
    weatherList.appendChild(weatherItem);
  });
}

function renderNoWeathers() {
  const weatherListElement = document.querySelector("#weather-list");
  if (!weatherListElement.classList.contains("hidden")) {
    weatherListElement.classList.add("hidden");
  }
  const noWeathersElement = document.querySelector("#no-weathers");
  noWeathersElement.classList.remove("hidden");
}

function renderSearchInput() {
  const searchInputElement = document.querySelector(".search-input");
  const cityName = searchInputElement.value;
  searchInputElement.value = "";
  return cityName;
}

function renderFilterBtn(filter) {
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach((btn) => {
    if (btn.id !== filter + "-btn") {
      btn.classList.remove("active");
    } else {
      btn.classList.add("active");
    }
  });
}

function renderModal() {
  const weather = gWeathers.find((w) => w.id === gSelectedId);
  const maskElement = document.querySelector("#modal-mask");
  if (gSelectedId) {
    maskElement.classList.remove("hidden");
    const nameInputElement = document.querySelector("#city-name");
    const temperatureInputElement = document.querySelector("#city-temperature");
    nameInputElement.value = weather.location.name;
    temperatureInputElement.value = weather.current.temp_c;
  } else {
    if (!maskElement.classList.contains("hidden")) {
      maskElement.classList.add("hidden");
    }
  }
}

window.onInit = onInit;
window.onSearch = onSearch;
window.onFilter = onFilter;
window.toggleModal = toggleModal;
window.onSave = onSave;
window.onDelete = onDelete;
