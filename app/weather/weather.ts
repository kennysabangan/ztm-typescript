import { fetchLocationData, LocationInfo } from "./location";

const GEOCODE_API_URL = "https://geocode.maps.co/search";
const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";

async function main(): Promise<number> {
    // pnpm run weather LOCATION
    if (process.argv.length < 3) {
        console.error("usage: weather LOCATION");
        return 1;
    }

    // get location
    const location = process.argv[2];

    // convert location to lat/lon
    let locationInfo: LocationInfo;
    try {
        locationInfo = await fetchLocationData(GEOCODE_API_URL, location);
    } catch (err) {
        console.error(err);
        return 1;
    }

    console.log(locationInfo);

    // fetch weather data

    // display weather data

    return await Promise.resolve(0);
}

main().catch((err) => console.error(err));