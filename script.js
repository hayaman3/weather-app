const search = document.querySelector('#input-location');

function getCityName(cityName) {
  // const cityName = search.value;
  // console.log(cityName);
  if (cityName) {
    // console.log(cityName);

    // remove whitespace for the api call
    return cityName
      .replace(/(\s+$|^\s+)/g, '') // remove whitespace from begining and end of string
      .replace(/(,\s+)/g, ',') // remove any white space that follows a comma
      .replace(/(\s+,)/g, ',') // remove any white space that preceeds a comma
      .replace(/\s+/g, '+'); // replace any remaining white space with +, so it works in api call
  }
  return '';
}

// current location data
// weatherData.city = `${data.name}, ${data.sys.country}`;
// // date
// // details.date = getDateString()
// // main details data
// weatherData.temperature = `${data.main.temp}°C`;
// weatherData.mainWeather = data.weather[0].main;
// weatherData.description = data.weather[0].description;
// // auxiliary details data
// weatherData.temperatureFeel = `${data.main.feels_like}°C`;
// weatherData.cloudCover = `${data.clouds.all}%`;
// weatherData.humidity = `${data.main.humidity}%`;
// weatherData.windSpeed = `${data.wind.speed}m/s`;
const weatherIcons = {
  ThunderStorm: '<i class="fa-solid fa-cloud-bolt"></i>',
  Drizzle: '<i class="fa-solid fa-cloud-drizzle"></i>',
  Rain: '<i class="fa-solid fa-cloud-rain"></i>',
  Snow: '<i class="fa-regular fa-snowflake"></i>',
  Mist: '<i class="fa-solid fa-smog"></i>',
  Smoke: '<i class="fa-solid fa-smog"></i>',
  Haze: '<i class="fa-solid fa-smog"></i>',
  Dust: '<i class="fa-solid fa-smog"></i>',
  Fog: '<i class="fa-solid fa-smog"></i>',
  Sand: '<i class="fa-solid fa-smog"></i>',
  Ash: '<i class="fa-solid fa-smog"></i>',
  Squall: '<i class="fa-solid fa-smog"></i>',
  Tornado: '<i class="fa-solid fa-tornado"></i>',
  Clouds: '<i class="fa-solid fa-cloud"></i>',
  Clear: '<i class="fa-solid fa-sun"></i>',
};

function changeDOM(weatherData) {
  const main = document.querySelector('main');
  const currentLocation = document.querySelector('.current-location');
  const details = document.querySelector('.details');

  const locationDom = /* html */ `
    <div>Current Location</div>
    <div id="city">
      ${weatherData.city}
    </div>
  `;

  const detailsDom = /* html */ `
    <div>
      <h1 class="today">Today</h1>
      <div class="date">${weatherData.date}</div>
    </div>
    <div class="weather">
      <div class="main-details">
        <div id="temperature">${weatherData.temperature}</div>
        ${weatherIcons[weatherData.mainWeather]}
        <div>${weatherData.description}</div>
      </div>
      <div class="auxiliary-details">
        <div>
          <span>Temp feel:</span>
          <span>${weatherData.temperatureFeel}</span>
        </div>
        <div>
          <span>Humidity:</span>
          <span>${weatherData.humidity}</span>
        </div>
        <div>
          <span>Wind:</span>
          <span>${weatherData.windSpeed}</span>
        </div>
        <div>
          <span>Cloud:</span>
          <span>${weatherData.cloudCover}</span>
        </div>
      </div>
    </div>
  `;

  currentLocation.innerHTML = locationDom;
  details.innerHTML = detailsDom;
}

function getDateString() {
  const date = new Date();
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const day = days[date.getDay()];
  const month = months[date.getMonth()];

  return `${day} ${date.getDate()} ${month} ${date.getFullYear()}`;
}

function handleData(data) {
  const weatherData = {
    // current location data
    city: `${data.name}, ${data.sys.country}`,
    // date
    date: getDateString(),
    // main details data
    temperature: `${Math.round(data.main.temp)}°C`,
    mainWeather: data.weather[0].main,
    description: data.weather[0].description,
    // auxiliary details data
    temperatureFeel: `${data.main.feels_like}°C`,
    cloudCover: `${data.clouds.all}%`,
    humidity: `${data.main.humidity}%`,
    windSpeed: `${data.wind.speed}m/s`,
  };
  console.log(weatherData);
  changeDOM(weatherData);
}

function handleError(err) {
  // console.warn(err);

  alert('Cannot Find Location');
  // return new Response(JSON.stringify({ asdas: 'asd' }));
}

async function openWeatherAPIcall(cityName) {
  // const cityName = getCityName();

  const cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=20f7632ffc2c022654e4093c6947b4f4`;
  const response = await fetch(cityUrl, { mode: 'cors' }).catch(handleError);
  const data = await response.json();

  handleData(data);
}

search.addEventListener('keydown', (e) => {
  if (e.code === 'Enter') {
    const cityName = getCityName(search.value);
    openWeatherAPIcall(cityName);
    search.value = '';
  }
});

// https://source.unsplash.com/featured/?${searchedCity}
