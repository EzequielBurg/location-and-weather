import { useCallback, useEffect, useState } from 'react';
import { WEATHER_API, WEATHER_API_LANG, WEATHER_API_UNITS } from '../utils';

type LocationData = {
	latitude: number;
	longitude: number;
};

type WeatherData = {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  },
  weather: [
    {
      description: string;
      icon: string;
    }
  ]
};

const useLocationAndWeather = () => {
	const [locationData, setLocationData] = useState<LocationData>();
  const [weatherData, setWeatherData] = useState<WeatherData>();
	const [locationDenied, setLocationDenied] = useState<boolean>();

	const successCallback = (position: GeolocationPosition) => {
		setLocationDenied(false);

		const {latitude, longitude} = position.coords;

		setLocationData({
			latitude,
			longitude,
    });
	};

	const errorCallback = () => setLocationDenied(true);

	const accessLocationAPI = useCallback(() => {
		navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
	}, []);

	const fetchWeatherData = useCallback(() => {
		if (locationData?.latitude && locationData.longitude)
			fetch(
        `
        ${WEATHER_API}?lat=${locationData.latitude}&lon=${locationData.longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&lang=${WEATHER_API_LANG}&units=${WEATHER_API_UNITS}
      `,
			{method: 'GET'})
				.then(res => res.json())
				.then(res => setWeatherData(res));
	}, [locationData?.latitude, locationData?.longitude]);

	const fetchLocationAndWeatherData = useCallback(() => {
		accessLocationAPI();
		fetchWeatherData();
	}, [accessLocationAPI, fetchWeatherData]);

	useEffect(() => {
		fetchLocationAndWeatherData();
	}, [fetchLocationAndWeatherData]);

	return { weatherData, fetchLocationAndWeatherData, locationDenied };
};

export default useLocationAndWeather;
