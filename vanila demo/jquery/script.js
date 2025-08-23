import { weatherService } from "./services/weather.service.js";
import { utilService } from "./services/util.service.js";

var gWeathers = [];
var gSelectedId = null;

$(document).ready(init);

$("#search-btn").on("click", handleSearch);
$(".filter-btn").on("click", handleFilter);

$("#close-btn").on("click", closeModal);
$("#save-btn").on("click", saveWeather);
$("#delete-btn").on("click", deleteWeather);

$(document).on("click", ".action-btn", handleAction);

async function init() {
  try {
    gWeathers = await weatherService.query();
    renderWeatherList();
  } catch (error) {
    console.error("Error loading weather data: ", error);
    alert("Failed to initialize app. Please reload to try again.");
  }
}

async function handleSearch() {
  const cityName = $("#search-input").val().trim();
  if (!cityName) return;
  $("#search-input").val("");
  try {
    const weather = await weatherService.searchWeather(cityName);
    const savedWeather = await weatherService.save(weather);

    const existingIndex = gWeathers.findIndex((w) => w.id === savedWeather.id);
    if (existingIndex >= 0) {
      gWeathers[existingIndex] = savedWeather;
    } else {
      gWeathers.push(savedWeather);
    }

    renderWeatherList();
  } catch (error) {
    console.error("Error searching weather:", error.message);
    alert("Failed to search weather. Please try again.");
  }
}

async function handleFilter(ev) {
  const filter = $(ev.target).data("filter");

  $(".filter-btn").removeClass("active");
  $(ev.target).addClass("active");

  try {
    const weathers = await weatherService.query({ status: filter });
    gWeathers = weathers;
  } catch (error) {
    console.error("Error filtering weather:", error.message);
    alert("Failed to filter weather. Please try again.");
  } finally {
    renderWeatherList();
  }
}

function handleAction(ev) {
  const id = $(ev.target).data("id");
  const weather = gWeathers.find((w) => w.id === id);
  if (weather) gSelectedId = weather.id;
  else gSelectedId = null;

  if (gSelectedId) {
    $("#modal-mask").removeClass("hidden");
    $("#city-temperature").val(weather.current.temp_c);
    $("#city-name").val(weather.location.name);
  }
}

function closeModal() {
  $("#modal-mask").addClass("hidden");
}

async function saveWeather() {
  const name = $("#city-name").val().trim();
  const temperature = $("#city-temperature").val();

  if (
    !utilService.validateName(name, "city") ||
    !utilService.validateNum(temperature, "temperature")
  ) {
    alert("Please enter a valid city and temperature");
    return;
  }

  const weather = gWeathers.find((w) => w.id === gSelectedId);
  weather.location.name = name;
  weather.current.temp_c = temperature;

  try {
    const savedWeather = await weatherService.save(weather);
    const wIndex = gWeathers.findIndex((w) => w.id === savedWeather.id);
    gWeathers[wIndex] = savedWeather;
    gWeathers[gWeathers.indexOf(weather)] = savedWeather;
    closeModal();
    renderWeatherList();
  } catch (error) {
    console.log("Error saving weather item, error: ", error);
    alert("Error saving weather item, please try again");
  }
}

async function deleteWeather() {
  const weather = gWeathers.find((w) => w.id === gSelectedId);

  try {
    await weatherService.remove(weather.id);
    gWeathers = gWeathers.filter((w) => w.id !== gSelectedId);
    renderWeatherList();
    closeModal();
  } catch (error) {
    console.error("Error deleting weather item, error: ", error);
    alert("Error deleting weather item, please try again");
  }
}

function renderWeatherList() {
  const $weatherList = $(".weather-list tbody");
  $weatherList.empty();

  if (gWeathers.length === 0) {
    $("#weather-list").addClass("hidden");
    $("#no-weathers").removeClass("hidden");
    return;
  }

  $("#no-weathers").addClass("hidden");
  $("#weather-list").removeClass("hidden");

  const $frag = $(document.createDocumentFragment());

  gWeathers.forEach((weather) => {
    const $weatherItem = $(`
      <tr>
        <td>${weather.location?.name || "Unknown"}</td>
        <td>${weather.current?.temp_c || "N/A"}°C</td>
        <td>${weather.current?.condition?.text || "N/A"}</td>
        <td>
          <button class="action-btn" data-id="${weather.id}">
           &#8942;
          </button>
        </td>
      </tr>
    `);
    $frag.append($weatherItem);
  });

  $weatherList.append($frag);
}
