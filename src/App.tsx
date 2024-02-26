import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faMagnifyingGlass, faWater, faWind } from '@fortawesome/free-solid-svg-icons'
import myImage from './images/404.png';
import could from './images/cloud.png';
import sunny from './images/clear.png';
import rain from './images/rain.png';
import snow from './images/snow.png';
import mist from './images/mist.png';
import './App.css'
import { getWeather } from './api/api';
import { CityData, Weather } from './types/weather';
import './app.scss';

export function App() {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState<CityData | null>(null);
  const [valid, setValid] = useState(false);
  const [prevQuery, setPrevQuery] = useState('');

  const handleButtonClick = () => {
    setPrevQuery(query);

    getWeather(query)
    .then((rawData: Weather) => {
      const weatherData = rawData.list[0];
      
      const cityData: CityData = {
        coord: rawData.city.coord,
        country: rawData.city.country,
        id: rawData.city.id,
        name: rawData.city.name,
        population: rawData.city.population,
        sunrise: rawData.city.sunrise,
        sunset: rawData.city.sunset,
        timezone: rawData.city.timezone,
        temp: weatherData.main.temp,
        speed: weatherData.wind.speed,
        deg: weatherData.wind.deg,
        description: weatherData.weather[0].description,
        cod: rawData.cod
      };

      console.log(rawData);

      if (query.toLowerCase() === rawData.city.name.toLowerCase()) {
        setValid(true);
      } else {
        setValid(false);
      }

      setCity(cityData);
    })
      
    .catch((error) => {
      console.error('Error fetching weather data:', error);
      setCity(null);
    });
  }

  function kelvinToCelsius(kelvin: number): number {
    return Math.round(kelvin - 273.15);
  }

  let weatherImage;

  switch(city?.description.toLowerCase()) {
    case 'light rain':
      weatherImage = rain;
      break;
    case 'broken clouds':
    case 'overcast clouds':
      weatherImage = could;
      break;
    case 'clear sky':
      weatherImage = sunny;
      break;
    case 'snow':
      weatherImage = snow;
      break;
    case 'mist':
      weatherImage = mist;
      break;
    default:
      weatherImage = could;
  }

  return (
    <>
      <div 
        className="container"
        style={{ height: valid ? '600px' : '105px' }}
      >
        <div className="search-box">
          <FontAwesomeIcon icon={faLocationDot} />
          <input 
            type="text" 
            placeholder="Enter your location"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button
            onClick={handleButtonClick}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        {query.toLowerCase() !== city?.name.toLowerCase() ? (
          <div 
            className={query.toLowerCase() === city?.name.toLowerCase() ? 'not-found' : 'not-found fadeIn'}
            style={{ 
              display: query.toLowerCase() !== city?.name.toLowerCase() ? 'inline-block' : 'none' }}
          >
            <img src={myImage} alt="Not found" />
            <p>Oops! Invalid location :/</p>
          </div>
        ) : (
          ''
        )}

        {valid ? (
          <>
            <div className={query.toLowerCase() === city?.name.toLowerCase() ? 'weather-box fadeIn' : 'weather-box'}>
              <img src={weatherImage} alt="Weather" />
              <p className="temperature">{kelvinToCelsius(city?.temp)}°</p>
              <p className="description">{city?.description}</p>
            </div>
            <div className={query.toLowerCase() === city?.name.toLowerCase() ? 'weather-details fadeIn' : 'weather-details'}>
              <div className="humidity">
                <FontAwesomeIcon icon={faWater} />
                <div className="text">
                  <span>{city?.country}</span>
                  <p>Country</p>
                </div>
              </div>
              <div className="wind">
                <FontAwesomeIcon icon={faWind} />
                <div className="text">
                  <span>{city?.speed} km/h</span>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={prevQuery.toLowerCase() === city?.name.toLowerCase() ? 'weather-box fadeIn' : 'weather-box'}>
              <img src={weatherImage} alt="Weather" />
              <p className="temperature">{kelvinToCelsius(city?.temp)}°</p>
              <p className="description">{city?.description}</p>
            </div>
            <div className={prevQuery.toLowerCase() === city?.name.toLowerCase() ? 'weather-details fadeIn' : 'weather-details'}>
              <div className="humidity">
                <FontAwesomeIcon icon={faWater} />
                <div className="text">
                  <span>{city?.country}</span>
                  <p>Country</p>
                </div>
              </div>
              <div className="wind">
                <FontAwesomeIcon icon={faWind} />
                <div className="text">
                  <span>{city?.speed} km/h</span>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
