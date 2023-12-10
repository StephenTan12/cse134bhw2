class CurrentWeatherWidget extends HTMLElement {
    constructor() {
        super();

        this.WEATHER_API_URL = "https://api.weather.gov/gridpoints/SGX/55,22/forecast";

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
            </style>
            <p id="current-weather-conditions"></p>
        `;

        this.fetchCurrentWeatherConditions();
    }

    fetchCurrentWeatherConditions() {
        let weatherConditionElement = this.shadowRoot.getElementById("current-weather-conditions");

        setTimeout(() => {
            fetch(this.WEATHER_API_URL)
                .then(response => response.json())
                .then(data => {
                    let currentWeatherData = data.properties.periods[0];

                    let currentForecast = currentWeatherData.shortForecast;
                    let forecastIcon = "";

                    if (currentForecast === "Sunny") {
                        forecastIcon = "\u263C";
                    } else if (currentForecast === "Mostly Cloudy" || currentForecast === "Partly Sunny") {
                        forecastIcon = "🌥";
                    } else if (currentForecast === "Mostly Sunny" || currentForecast === "Partly Cloudy") {
                        forecastIcon = "🌤";
                    } else {
                        forecastIcon = "🌦";
                    }

                    let weatherConditionText = `${forecastIcon} ${currentWeatherData.shortForecast} ${currentWeatherData.temperature}°${currentWeatherData.temperatureUnit}`;
                    weatherConditionElement.textContent = weatherConditionText;
                })
                .catch(() => {
                    weatherConditionElement.textContent = "Network Connection Failed!";
                });
        }, 1000);
    }
}

customElements.define("current-weather-widget", CurrentWeatherWidget);