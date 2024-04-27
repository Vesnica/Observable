import { ProxyAgent, setGlobalDispatcher, fetch } from "undici";

if (process.env.https_proxy) {
  const proxyAgent = new ProxyAgent({
    uri: process.env.https_proxy
  });
  setGlobalDispatcher(proxyAgent);
}

const longitude = -122.47;
const latitude = 37.80;

async function json(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
  return await response.json();
}

const station = await json(`https://api.weather.gov/points/${latitude},${longitude}`);
const forecast = await json(station.properties.forecastHourly);

process.stdout.write(JSON.stringify(forecast));