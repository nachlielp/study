export const utilService = {
  loadFromStorage,
  saveToStorage,
  makeId,
  getDayName,
  getMonthName,
  validateName,
  validateNum,
};

function makeId(length = 6) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return txt;
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
}

function getDayName(date, locale) {
  date = new Date(date);
  return date.toLocaleDateString(locale, { weekday: "long" });
}

function getMonthName(date) {
  const monthNames = [
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
  return monthNames[date.getMonth()];
}

function validateName(name, title) {
  if (!name || name.trim() === "") {
    alert(`Please enter a valid ${title} name`);
    return false;
  }
  return true;
}

function validateNum(num, title) {
  if (isNaN(num) || num === "") {
    alert(`Please enter a valid ${title}`);
    return false;
  }

  return true;
}
