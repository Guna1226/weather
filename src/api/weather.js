// Helper module to fetch weather data. Supports two modes:
// - Google Weather API (if VITE_USE_GOOGLE=true and VITE_GOOGLE_WEATHER_API_KEY provided)
// - Open-Meteo fallback demo (no key required)


const USE_GOOGLE = (import.meta.env.VITE_USE_GOOGLE || 'false') === 'true'
const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_WEATHER_API_KEY || ''


async function fetchOpenMeteo(lat, lon) {
const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,pressure_msl,weathercode&current_weather=true&timezone=auto`;
const res = await fetch(url);
if (!res.ok) throw new Error('Open-Meteo error')
const json = await res.json();
const current = json.current_weather
return {
source: 'open-meteo',
place: `${json.timezone || ''}`,
currentTempC: current.temperature,
feelsLikeC: current.temperature,
conditions: `Weather code ${current.weathercode}`,
humidity: json.hourly?.relativehumidity_2m?.[0] ?? null,
windSpeed: current.windspeed,
pressure: json.hourly?.pressure_msl?.[0] ?? null,
uv: null,
hourly: json.hourly?.time?.map((t, i) => ({ time: t, temp: json.hourly.temperature_2m[i] })) || []
}
}


async function fetchGoogleWeather(lat, lon) {
if (!GOOGLE_KEY) throw new Error('Missing Google Weather API key')
const base = 'https://weather.googleapis.com/v1'
const url = `${base}/currentConditions:lookup?key=${GOOGLE_KEY}&location.latitude=${lat}&location.longitude=${lon}`
const res = await fetch(url)
if (!res.ok) throw new Error('Google Weather API error')
const json = await res.json()
// Map the Google response to our shape (fields may vary; consult Google docs for exact structure)
const c = json.currentObservation || json // defensive
return {
source: 'google',
place: c.displayName || `${lat},${lon}`,
currentTempC: c.temperature?.degrees ?? null,
feelsLikeC: c.temperature?.apparent ?? null,
conditions: c.weather?.summary ?? c.condition?.description ?? '—',
humidity: c.relativeHumidity ?? null,
windSpeed: c.wind?.speed?.value ?? null,
pressure: c.airPressure?.meanSeaLevelMillibars ?? null,
uv: c.uvIndex ?? null,
hourly: []
}
}


export async function getWeatherByCoords(lat, lon) {
if (USE_GOOGLE) return fetchGoogleWeather(lat, lon)
return fetchOpenMeteo(lat, lon)
}


export async function geocode(query) {
// use Open-Meteo geocoding (no key) for simplicity
const q = encodeURIComponent(query)
const url = `https://geocoding-api.open-meteo.com/v1/search?name=${q}&count=1&language=en&format=json`
const res = await fetch(url)
if (!res.ok) throw new Error('Geocoding failed')
const json = await res.json()
if (json.results && json.results.length > 0) {
    const place = json.results[0]
return { lat: place.latitude, lon: place.longitude, title: `${place.name}, ${place.country}` }
}
throw new Error('Location not found')
}