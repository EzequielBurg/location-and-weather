export const WEATHER_API='https://api.openweathermap.org/data/2.5/weather'

export const WEATHER_API_LANG='pt_br'

export const WEATHER_API_UNITS='metric'

export const WEATHER_ICON_URL='https://openweathermap.org/img/wn'

export const WEATHER_ICON_SIZE_AND_FORMAT='@4x.png';

export const capitalizeFirstLetter = (value: string) =>
  value.at(0)?.toUpperCase() + value.slice(1);

export const formatTemp = (temp: number) => `${Math.round(Number(temp))} ºC`;
