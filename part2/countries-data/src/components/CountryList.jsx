function CountryList({ countries, showBtnHandler }) {
  return (
    <div>
      {countries.map((country) => (
        <div key={country.name.common}>
          <span>{country.name.common}</span>
          <button onClick={() => showBtnHandler(country)}>show</button>
        </div>
      ))}
    </div>
  );
}
export default CountryList;
