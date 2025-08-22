import { storageService } from "./async-storage.service.js";
const WEATHER_API_KEY = "fc3071372277428f92d120318252208";
const WEATHER_KEY = "weatherDB";

export const weatherService = {
  query,
  get,
  remove,
  save,
  getDefaultFilter,
  searchWeather,
};

function query(filterBy = {}) {
  return storageService.query(WEATHER_KEY).then((weatherDB) => {
    if (filterBy.status) {
      if (filterBy.status === "hot") {
        weatherDB = weatherDB.filter((weather) => weather.current.temp_c > 20);
      } else if (filterBy.status === "cold") {
        weatherDB = weatherDB.filter((weather) => weather.current.temp_c < 10);
      } else if (filterBy.status === "nice") {
        weatherDB = weatherDB.filter(
          (weather) =>
            weather.current.temp_c >= 10 && weather.current.temp_c <= 20
        );
      }
    }
    return weatherDB;
  });
}

function get(weatherId) {
  return storageService.get(WEATHER_KEY, weatherId);
}

function remove(weatherId) {
  return storageService.remove(WEATHER_KEY, weatherId);
}

function save(weather) {
  return storageService.query(WEATHER_KEY).then((weathers) => {
    const exsistingWeather = weathers.find(
      (w) =>
        w.location.lat === weather.location.lat &&
        w.location.lon === weather.location.lon
    );
    if (exsistingWeather !== undefined) {
      return storageService.put(WEATHER_KEY, {
        ...weather,
        id: exsistingWeather.id,
      });
    } else {
      return storageService.post(WEATHER_KEY, weather);
    }
  });
}

async function searchWeather(cityName) {
  const city = encodeURIComponent(cityName.trim().toLowerCase());
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}&aqi=yes`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching weather:", error);
    throw error;
  }
}

function getDefaultFilter(filterBy = { status: "all" }) {
  return { status: filterBy.status };
}
