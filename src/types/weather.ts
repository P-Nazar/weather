export interface Weather {
  cod: string;
  message: number;
  cnt: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  list: any[]; 
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
  temp: number | undefined;
  speed: number;
  deg: number;
  description: string;
  cod: string;
}