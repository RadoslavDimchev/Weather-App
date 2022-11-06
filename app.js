const searchBar = document.getElementById('search-bar');
const info = document.querySelector('.info');
const additionalInfo = document.querySelector('.additional-info');
const loadingIcon = document.getElementById('loading-icon');
const weatherDiv = document.querySelector('.weather');
const invalidDiv = document.getElementById('invalid');

document.querySelector('button').addEventListener('click', processCityData);

searchBar.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    processCityData();
  }
});

async function processCityData() {
  weatherDiv.style.display = 'block';
  loadingIcon.style.display = 'block';
  invalidDiv.style.display = 'none';

  try {
    const data = await getCityData(searchBar.value);

    onValidCity();
    setImg(data.weather[0].id);
    dispalyWeather(data);

  } catch (error) {
    onInvalidCity();
  }
};

function onValidCity() {
  searchBar.className = 'search-bar-valid';
  searchBar.value = '';

  info.style.display = 'flex';
  additionalInfo.style.display = 'flex';
  loadingIcon.style.display = 'none';
}

function onInvalidCity() {
  invalidDiv.style.display = 'block';

  searchBar.className = 'search-bar-invalid';
  searchBar.value = '';

  info.style.display = 'none';
  additionalInfo.style.display = 'none';
  weatherDiv.style.display = 'none';
}

async function getCityData(city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f77938d6eb4c23e6d29e0644ea912c64&units=metric`);
  if (!response.ok) {
    throw new Error();
  }
  return await response.json();
}

function setImg(id) {
  const icon = document.getElementById('icon');

  if (id === 800) {
    icon.src = 'images/clear.svg';
  } else if (id >= 200 && id <= 232) {
    icon.src = 'images/storm.svg';
  } else if (id >= 600 && id <= 622) {
    icon.src = 'images/snow.svg';
  } else if (id >= 701 && id <= 781) {
    icon.src = 'images/haze.svg';
  } else if (id >= 801 && id <= 804) {
    icon.src = 'images/cloud.svg';
  } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
    icon.src = 'images/rain.svg';
  }
}

function dispalyWeather(data) {
  const { temp, humidity } = data.main;

  document.getElementById('city').textContent = 'Weather in ' + data.name;
  document.getElementById('temp').textContent = Math.trunc(temp) + ' °C';
  document.getElementById('description').textContent = data.weather[0].description;
  document.getElementById('wind').textContent = `Wind speed: ${data.wind.speed} km/h`;
  document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;
}