import React from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = React.useState();

  const params = {
    access_key: process.env.REACT_APP_API_KEY,
    query: capital,
  }

const hookWeather = () => {
  axios.get('http://api.weatherstack.com/current', {params})
  .then(response => {
    const apiResponse = response.data;
    setWeather(apiResponse);
  }).catch(error => {
    console.log(error);
  });
  };
    
React.useEffect(hookWeather, [capital]);
  
console.log(weather)

if (!weather) {
  return <p>N/A Still loading...</p>;
} else {
  return (
    <div>
      <h3>Weather in {capital}</h3>
      <b>temperature:</b> {weather.current.temperature} Celsius
      <br />
      <img src={weather.current.weather_icons} alt="Loading..." />
      <br />
      <b>wind </b> {weather.current.wind_speed} <b> direction</b> {weather.current.wind_dir}
    </div>
  );
}};

export default Weather;
