import { useCallback, useState } from 'react';
import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';

const WeatherBox = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [pending, setPending] = useState(false);

  const handleCityChange = useCallback((cityName) => {
    const API_KEY = '598bbe720edc468666f531299149ec6b';

    setPending(true);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
      .then(res => {
        if (res.status === 200) {
          return res.json().then(data => {
            const formattedData = {
              city: data.name,
              temp: data.main.temp,
              icon: data.weather[0].icon,
              description: data.weather[0].main
            };
            setWeatherData(formattedData);
          });
        } else {
          setWeatherData(null);
          alert('City not found. Please check the name and try again.');
        }
      })
      .catch(error => {
        console.error('Error connection with API:', error);
        setWeatherData(null);
      })
      .finally(() => {
        setPending(false);
      });
  }, []);

  return (
    <section>
      <PickCity onCityChange={handleCityChange} />
      {pending && <Loader />}
      {!pending && weatherData && (
        <WeatherSummary
          city={weatherData.city}
          temperature={weatherData.temp}
          description={weatherData.description}
          icon={weatherData.icon}
        />
      )}
    </section>
  );
};

export default WeatherBox;
