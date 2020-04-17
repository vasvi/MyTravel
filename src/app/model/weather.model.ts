interface Temperature {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
}

interface FeelsLike {
    day: number;
    night: number;
    eve: number;
    morn: number;
}

interface WeatherMeta {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface DailyWeather {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: Temperature;
    feels_like: FeelsLike;
    pressure: number;
    humidity: number;
    wind_speed: number;
    wind_deg: number;
    weather: Array<WeatherMeta>;
    clouds: number;
    rain: number;
    uvi: number;
}

export interface WeatherDetails{
    daily: Array<DailyWeather>;
    current: DailyWeather
}

export interface WeatherOptions {
    place_id: string;
    geometry: Array<any>;
}