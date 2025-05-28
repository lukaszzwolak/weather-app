import { useCallback, useState } from 'react';
import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [pending, setPending] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleCityChange = useCallback((cityName) => {
    const API_KEY = '598bbe720edc468666f531299149ec6b';

    setHasError(false);
    setPending(true);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
      .then(res => {
        if (res.status === 200) {
          return res.json().then(data => {
            const formattedData = {
              city: data.name,
              temp: data.main.temp,
              icon: data.weather[0].icon,
              description: data.weather[0].main,
            };
            setWeatherData(formattedData);
          });
        } else {
          setHasError(true);
          setWeatherData(null);
        }
      })
      .catch(error => {
        console.error('Błąd połączenia z API:', error);
        setHasError(true);
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
      {hasError && <ErrorBox />}
      {!pending && weatherData && !hasError && (
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