import CountryList from "./CountryList";
import CountryDetails from "./CountryDetails";

function CountrySearch({ countries, countryData, showBtnHandler }) {
  if (!countries) {
    return null;
  }

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (countries.length > 1) {
    return (
      <CountryList countries={countries} showBtnHandler={showBtnHandler} />
    );
  } else if (countryData) {
    return <CountryDetails countryData={countryData} />;
  }
}

export default CountrySearch;
