import axios from "axios";

const BASE_URL = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => {
  const req = axios.get(`${BASE_URL}/all`);
  return req.then((response) => response.data);
};

const getCountry = (countryName) => {
  const req = axios.get(`${BASE_URL}/name/${countryName}`);
  return req.then((res) => res.data);
};

export default { getAll, getCountry };
