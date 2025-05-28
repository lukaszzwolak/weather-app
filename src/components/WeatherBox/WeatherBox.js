import { useCallback, useState } from 'react';
import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';

const WeatherBox = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCityChange = useCallback((cityName) => {
    const API_KEY = '598bbe720edc468666f531299149ec6b';

    setLoading(true);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
      .then(res => res.json())
      .then(data => {
        console.log(data);

        if (data.cod !== 200) {
          console.error('Błąd API:', data.message);
          setWeatherData(null);
          return;
        }

        const formattedData = {
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main
        };

        setWeatherData(formattedData);
      })
      .catch(error => {
        console.error('Błąd połączenia z API:', error);
        setWeatherData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  return (
    <section>
      <PickCity onCityChange={handleCityChange} />
      {loading && <Loader />}
      {!loading && weatherData && (
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
