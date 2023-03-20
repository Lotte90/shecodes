function showTemp(response) {
  let temp = document.querySelector("#temperature");
  let newTemp = Math.round(response.data.main.temp);
  console.log(newTemp);
  temp.innerHTML = `${newTemp}°C`;
}

function displayCity(event) {
  event.preventDefault();
  let city = document.querySelector("#searched-city");
  let newCity = document.querySelector("#search-input");
  city.innerHTML = newCity.value;

  let apiKey = "29abbd656003db1d97265c6b14cac0ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function showCity(response) {
  let city = document.querySelector("#searched-city");
  let newCity = response;
  console.log(response);
  city.innerHTML = newCity;
}

function calcPosition(position) {
  console.log(position);
  let lat = Math.round(position.coords.latitude * 10000000) / 10000000;
  let long = Math.round(position.coords.longitude * 10000000) / 10000000;

  let apiKey = "29abbd656003db1d97265c6b14cac0ae";
  let apiUrlA = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  let apiUrlB = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid=${apiKey}`;
  axios.get(apiUrlA).then(showTemp);
  axios.get(apiUrlB).then(showCity);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(calcPosition);
}
let button = document.querySelector("#basic-addon1");
button.addEventListener("click", getCurrentPosition());

let newSearch = document.querySelector("#city-form");
newSearch.addEventListener("submit", displayCity);
