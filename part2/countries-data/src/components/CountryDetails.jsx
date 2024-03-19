function CountryDetails({ countryData }) {
  const {
    name: { common: name },
    capital: [capital],
    area,
    languages,
    flags: { png: flag },
    temperature,
    wind,
  } = countryData;

  return (
    <div key={name}>
      <h1>{name}</h1>
      <p>{`Capital: ${capital}`}</p>
      <p>{`Area: ${area}`}</p>
      <h2>languages:</h2>
      <ul>
        {Object.values(languages).map((language, index) => (
          <li key={`${name}-${index}`}>{language}</li>
        ))}
      </ul>
      <img src={flag} alt={`flag of ${name}`} width={200} />
      <h2>{`Weather in ${capital}`}</h2>
      <p>{`Temperature: ${temperature} Celcius`}</p>
      <p>{`Wind: ${wind} m/s`}</p>
    </div>
  );
}

export default CountryDetails;
