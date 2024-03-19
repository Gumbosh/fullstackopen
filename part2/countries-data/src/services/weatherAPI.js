import axios from "axios";

const getWeather = (latitude, longitude) => {
  const req = axios.get(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`
  );
  return req.then((response) => response);
};

export default { getWeather };
