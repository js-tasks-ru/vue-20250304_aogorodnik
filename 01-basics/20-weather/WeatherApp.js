import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {

    const weatherData = getWeatherData()

    const weatherConditionIcons = WeatherConditionIcons

    function isNight(weatherItemCurrent) {
      return weatherItemCurrent.dt < weatherItemCurrent.sunrise || weatherItemCurrent.sunset <= weatherItemCurrent.dt
    }

    function tempCelciumRounded(tempKelvin) {
      return parseFloat(tempKelvin - 273.15).toFixed(1)
    }

    function pressureMMHG(pressureHPA) {
      return parseFloat(pressureHPA * 0.75).toFixed(0)
    }
  
    return {
      weatherData,
      weatherConditionIcons,
      isNight,
      tempCelciumRounded,
      pressureMMHG
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="weatherItem in weatherData" class="weather-card" :class="isNight(weatherItem.current) ? 'weather-card--night' : ''">
          <div v-if="weatherItem.alert !== null" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ weatherItem.alert.sender_name }}: {{ weatherItem.alert.description}}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ weatherItem.geographic_name}}
            </h2>
            <div class="weather-card__time">
              {{ weatherItem.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="weatherItem.current.weather.description">{{ weatherConditionIcons[weatherItem.current.weather.id] }}</div>
            <div class="weather-conditions__temp">{{ tempCelciumRounded(weatherItem.current.temp) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ pressureMMHG(weatherItem.current.pressure) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ weatherItem.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ weatherItem.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ weatherItem.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
