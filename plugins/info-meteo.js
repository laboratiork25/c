import axios from 'axios';
import '../lib/language.js';

async function handler(m, { conn, args }) {
  const userId = m.sender;
  const groupId = m.chat;

  if (!args[0]) return m.reply(global.t('weatherNoCity', userId, groupId));

  try {
    const city = args.join(' ');
    const apiKey = '2d61a72574c11c4f36173b627f8cb177';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    const res = await axios.get(url);
    const data = res.data;

    const weather = global.t('weatherInfo', userId, groupId, {
      city: data.name,
      country: data.sys.country,
      temp: data.main.temp,
      feelsLike: data.main.feels_like,
      tempMin: data.main.temp_min,
      tempMax: data.main.temp_max,
      humidity: data.main.humidity,
      weatherMain: data.weather[0].main,
      weatherDesc: data.weather[0].description,
      windSpeed: data.wind.speed,
      pressure: data.main.pressure
    });

    m.reply(weather);
  } catch (e) {
    console.error(e);
    if (e.response && e.response.status === 404) {
      m.reply(global.t('weatherCityNotFound', userId, groupId));
    } else {
      m.reply(global.t('weatherError', userId, groupId));
    }
  }
}

handler.command = /^(meteo|weather)$/i;
handler.help = ['meteo <città>'];
handler.tags = ['other'];
handler.description = 'Ottieni informazioni meteo per una località';
handler.react = '🌤';
handler.limit = true;
handler.exp = 5;

export default handler;