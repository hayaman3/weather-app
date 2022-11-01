const search = document.querySelector('#input-location');

function getCityName(cityName) {
  if (cityName) {
    // remove whitespace for the api call
    return cityName
      .replace(/(\s+$|^\s+)/g, '') // remove whitespace from begining and end of string
      .replace(/(,\s+)/g, ',') // remove any white space that follows a comma
      .replace(/(\s+,)/g, ',') // remove any white space that preceeds a comma
      .replace(/\s+/g, '+'); // replace any remaining white space with +, so it works in api call
  }
  return '';
}

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

function changeDOM(weatherData, imageUrl) {
  const currentLocation = document.querySelector('.current-location');
  const date = document.querySelector('.date');
  const image = document.querySelector('.image');
  const weatherClass = document.querySelector('.weather');

  const locationDom = /* html */ `
    <div>Current Location</div>
    <div id="city">
      ${weatherData.city}
    </div>
  `;

  const detailsDom = /* html */ `
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
  `;

  currentLocation.innerHTML = locationDom;
  date.innerHTML = `${getDateString()}`;
  weatherClass.innerHTML = detailsDom;
  image.style.backgroundImage = `linear-gradient(to bottom, rgba(125, 125, 125, 0.2), rgba(0, 0, 0, 0.2)),
    url('${imageUrl}')`;
}

function handleData(data) {
  console.log(data.sys.country);
  return {
    // current location data
    city: `${data.name}, ${data.sys.country}`,
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
}

function handleError(err) {
  // console.warn(err);
  alert('Network Error');
  // return new Response(JSON.stringify({}));
}

async function fetchOpenWeatherAPI(cityName) {
  const cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=20f7632ffc2c022654e4093c6947b4f4`;
  const response = await fetch(cityUrl, { mode: 'cors' }).catch(handleError);
  const data = await response.json();

  if (response.status >= 400 && response.status < 600) {
    alert('Cannot Find Location');
    throw new Error('Bad response from server');
  }
  data.userLocationInput = cityName;
  return data;
}

async function fetchUnsplashApi(location) {
  const response = await fetch(
    `https://source.unsplash.com/featured/?${location}`,
    {
      mode: 'cors',
    }
  );
  const url = await response.url;
  return url;
}

async function ApiCalls(cityName) {
  const data = await fetchOpenWeatherAPI(cityName);
  const imageUrl = await fetchUnsplashApi(data.userLocationInput);
  const cleanedData = await handleData(data);
  await changeDOM(cleanedData, imageUrl);
}

async function handleInput(cityName) {
  const loader = document.querySelector('.lds-dual-ring');
  loader.style.display = 'block';
  const body = document.querySelector('body');

  await ApiCalls(cityName);

  body.style.opacity = '.5';
  loader.style.display = 'none';
  body.style.opacity = '1';
}

search.addEventListener('keydown', (e) => {
  if (e.code === 'Enter') {
    const cityName = getCityName(search.value);
    handleInput(cityName);
    search.value = '';
  }
});

handleInput('london');
