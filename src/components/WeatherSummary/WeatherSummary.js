import styles from './WeatherSummary.module.scss';

const WeatherSummary = ({ city, temperature, description, icon }) => {
  return (
    <div className={styles.weatherSummary}>
      <h2>{city}</h2>
      <p>{temperature}°C</p>
      <p>{description}</p>
      <img
        className={styles.weatherIcon}
        alt={description}
        src={`${process.env.PUBLIC_URL}/images/weather-icons/${icon}.png`}
      />
    </div>
  );
};

export default WeatherSummary;
