export interface Weather {
  cod: string;
  message: number;
  cnt: number;
  list: any[]; // Передумова, що ви опрацьовуєте список погодних даних
  city: CityData;
}

export interface CityData {
  coord: { lat: number; lon: number };
  country: string;
  id: number;
  name: string;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
  temp: number;
  speed: number;
  deg: number;
  description: string;
  cod: string;
}