import { useState, useEffect } from "react";
import CountrySearch from "./components/CountrySearch";
import countriesAPI from "./services/countriesAPI";
import weatherAPI from "./services/weatherAPI";

function App() {
  const [allCountries, setAllCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [countryData, setCountryData] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    countriesAPI
      .getAll()
      .then((countries) => {
        setAllCountries(countries);
      })
      .catch((error) => {
        console.error("Error fetching all countries:", error);
      });
  }, []);

  useEffect(() => {
    if (allCountries) {
      const filtered = allCountries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCountries(filtered);
      if (filtered.length === 1) {
        countriesAPI
          .getCountry(filtered[0].name.common.toLowerCase())
          .then((country) => {
            setCountryData(country);
            const [latitude, longitude] = country.capitalInfo.latlng;
            weatherAPI.getWeather(latitude, longitude).then((weather) => {
              const { temperature_2m, wind_speed_10m } = weather.data.current;
              setCountryData({
                ...country,
                temperature: temperature_2m,
                wind: wind_speed_10m,
              });
            });
          })
          .catch((error) => {
            console.error("Error fetching country data:", error);
          });
      } else {
        setCountryData(null);
      }
    }
  }, [search, allCountries]);

  const onSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const showBtnHandler = (country) => {
    setFilteredCountries(country);
    const [latitude, longitude] = country.capitalInfo.latlng;
    weatherAPI.getWeather(latitude, longitude).then((weather) => {
      const { temperature_2m, wind_speed_10m } = weather.data.current;
      setCountryData({
        ...country,
        temperature: temperature_2m,
        wind: wind_speed_10m,
      });
    });
  };

  return (
    <div>
      <span>find countries </span>
      <input type="text" placeholder="Search..." onChange={onSearchChange} />
      <CountrySearch
        countries={filteredCountries}
        countryData={countryData}
        showBtnHandler={showBtnHandler}
      />
    </div>
  );
}

export default App;
