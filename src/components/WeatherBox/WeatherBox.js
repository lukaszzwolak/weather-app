import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback } from 'react';

const WeatherBox = () => {
  const handleCityChange = useCallback((cityName) => {
    console.log('Selected city: ', cityName);
  }, []);

  return (
    <section>
      <PickCity onCityChange={handleCityChange} />
      <WeatherSummary />
      <Loader />
    </section>
  );
};

export default WeatherBox;
