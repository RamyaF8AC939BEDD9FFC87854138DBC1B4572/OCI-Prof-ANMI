const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeather API key
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherDisplay = document.getElementById('weather-display');

searchBtn.addEventListener('click', () => {
    const cityName = cityInput.value;
    if (cityName) {
        getWeather(cityName);
    } else {
        alert('Please enter a city name');
    }
});

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === '404') {
            alert('City not found');
            return;
        }

        const weatherHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;

        weatherDisplay.innerHTML = weatherHTML;
        weatherDisplay.style.display = 'block';
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}
