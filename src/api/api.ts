import { Weather } from "../types/weather";

const API_URL = 'http://api.openweathermap.org/data/2.5/forecast?';

export function getWeather(query: string): Promise<Weather> {
  return fetch(`${API_URL}q=${query}&appid=7c42225f1eedf780c67e260564d7b341`)
    .then(res => res.json())

}
