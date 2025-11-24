import '../lib/language.js';
import axios from 'axios';

async function handler(m, { conn, args }) {
  const userId = m.sender;
  const groupId = m.chat;
  
  if (!args) {
    return m.reply(global.t('weatherNoCity', userId, groupId));
  }

  try {
    const city = args.join(' ');
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=2d61a72574c11c4f36173b627f8cb177&units=metric`;

    const res = await axios.get(url);
    const data = res.data;

    const weather = global.t('weatherInfo', userId, groupId, {
      name: data.name,
      country: data.sys.country,
      temp: data.main.temp,
      feels: data.main.feels_like,
      min: data.main.temp_min,
      max: data.main.temp_max,
      humidity: data.main.humidity,
      main: data.weather.main,
      desc: data.weather.description,
      wind: data.wind.speed,
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

handler.help = ['meteo <città>'];
handler.tags = ['utility'];
handler.command = /^(meteo|weather)$/i;

export default handler;