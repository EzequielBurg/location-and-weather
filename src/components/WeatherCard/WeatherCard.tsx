import useLocationAndWeather from "../../hooks/useLocationAndWeather";
import styles from  '../../styles/WeatherCard.module.css';
import { capitalizeFirstLetter, formatTemp, WEATHER_ICON_SIZE_AND_FORMAT, WEATHER_ICON_URL } from "../../utils";

export const WeatherCard = () => {
  const { weatherData, locationDenied, fetchLocationAndWeatherData } = useLocationAndWeather();

  const weatherImgUrl = `${WEATHER_ICON_URL}/${weatherData?.weather.at(0)?.icon}${WEATHER_ICON_SIZE_AND_FORMAT}`;

  const description = capitalizeFirstLetter(weatherData?.weather.at(0)?.description ?? '');

  return (
    <section className={styles.weatherCard}>
      {!locationDenied && weatherData ? (
        <>
          <h2 className={styles.subTitle}>
            Clima agora em <i>{weatherData.name}</i>
          </h2>

          <img
            src={weatherImgUrl}
            alt="weather-icon"
          />

          <article className={styles.mainInfo}>
            <h3>{formatTemp(weatherData.main.temp)}</h3>
            <h3>{description}</h3>
          </article>

          <div className={styles.anotherInfos}>
            <article className={styles.mainInfo}>
              <p className={styles.feels}>Sensação térmica</p>
              <p className={styles.feels}>{formatTemp(weatherData.main.feels_like)}</p>
            </article>

            <article className={styles.mainInfo}>
              <p className={styles.max}>Máxima</p>
              <p className={styles.max}>{formatTemp(weatherData.main.temp_max)}</p>
            </article>

            <article className={styles.mainInfo}>
              <p className={styles.min}>Mínima</p>
              <p className={styles.min}>{formatTemp(weatherData.main.temp_min)}</p>
            </article>

            <article className={styles.mainInfo}>
              <p className={styles.humidity}>Humidade</p>
              <p className={styles.humidity}>{weatherData.main.humidity}%</p>
            </article>

          </div>
        </>
      ) : (
        <h3 style={{margin: '2rem 0'}}>Habilite a localização para visualizar as informações.</h3>
      )}

      <button
        className={styles.refreshButton}
        onClick={fetchLocationAndWeatherData}
      >
        Atualizar
      </button>
    </section>
  );
}
