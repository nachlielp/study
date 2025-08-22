import { weatherService } from "./services/weather.service.js";

var gWeathers = [];
var gSelectedId = null;

$(document).ready(function () {
  weatherService.query().then((weathers) => {
    gWeathers = weathers;
    renderWeatherList();
  });
});

$("#search-btn").on("click", async () => {
  const cityName = $("#search-input").val().trim();
  if (!cityName) return;
  $("#search-input").val("");
  try {
    const weather = await weatherService.searchWeather(cityName);
    const savedWeather = await weatherService.save(weather);
    const weatherExists = gWeathers.find((w) => w.id === savedWeather.id);
    if (!weatherExists) {
      gWeathers.push(savedWeather);
    } else {
      gWeathers[gWeathers.indexOf(weatherExists)] = savedWeather;
    }
    renderWeatherList();
  } catch (error) {
    console.error("Error searching weather:", error.message);
    return;
  }
});

$(".filter-btn").on("click", (e) => {
  const filter = $(e.target).data("filter");

  $(".filter-btn").removeClass("active");
  $(e.target).addClass("active");

  weatherService
    .query({ status: filter })
    .then((weathers) => {
      gWeathers = weathers;
    })
    .then(() => {
      renderWeatherList();
    });
});

$(document).on("click", ".action-btn", (e) => {
  const id = $(e.target).data("id");
  const weather = gWeathers.find((w) => w.id === id);
  if (weather) gSelectedId = weather.id;
  else gSelectedId = null;

  if (gSelectedId) {
    $("#modal-mask").removeClass("hidden");
    $("#city-temperature").val(weather.current.temp_c);
    $("#city-name").val(weather.location.name);
  }
});

$(document).on("click", "#close-btn", () => {
  $("#modal-mask").addClass("hidden");
});

$(document).on("click", "#save-btn", () => {
  const name = $("#city-name").val();
  const temperature = $("#city-temperature").val();
  const weather = gWeathers.find((w) => w.id === gSelectedId);
  weather.location.name = name;
  weather.current.temp_c = temperature;
  weatherService.save(weather).then((savedWeather) => {
    gWeathers[gWeathers.indexOf(weather)] = savedWeather;
    $("#modal-mask").addClass("hidden");
    renderWeatherList();
  });
});

$(document).on("click", "#delete-btn", () => {
  const weather = gWeathers.find((w) => w.id === gSelectedId);
  weatherService.remove(weather.id).then(() => {
    gWeathers = gWeathers.filter((w) => w.id !== gSelectedId);
    renderWeatherList();
    $("#modal-mask").addClass("hidden");
  });
});

function renderWeatherList() {
  if (gWeathers.length === 0) {
    $("#weather-list").addClass("hidden");
    $("#no-weathers").removeClass("hidden");
    return;
  }

  $("#no-weathers").addClass("hidden");
  $("#weather-list").removeClass("hidden");

  const $weatherList = $(".weather-list tbody");
  $weatherList.empty();

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
    $weatherList.append($weatherItem);
  });
}
