import React from 'react';

const WeatherInfo = ({ weatherData, unit, onUnitToggle,cityName }) => {
  const convertTemperature = (tempInCelsius) => {
    return unit === 'C'
      ? tempInCelsius
      : (tempInCelsius * 9/5) + 32; 
  };

  const currentTemp = convertTemperature(weatherData.current.temp);
  const feelsLike = convertTemperature(weatherData.current.feels_like);

  return (
    <div className="weather-info">
      <h3>Weather Information</h3>

      <div className="current-weather">
        <p>City Name : {cityName}</p>
        <p>Temperature: {currentTemp.toFixed(1)}°{unit}</p>
        <p>Feels Like: {feelsLike.toFixed(1)}°{unit}</p>
        <p>Humidity: {weatherData.current.humidity}%</p>
        <p>Pressure: {weatherData.current.pressure} hPa</p>
        <p>Wind Speed: {weatherData.current.wind_speed} m/s</p>
        <p>Description: {weatherData.current.weather[0].description}</p>
      </div>



      <button onClick={onUnitToggle}>Switch to °{unit === 'C' ? 'F' : 'C'}</button>
    </div>
  );
};

export default WeatherInfo;
