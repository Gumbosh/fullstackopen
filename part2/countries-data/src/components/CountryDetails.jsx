function CountryDetails({ countryData }) {
  const {
    name: { common: name },
    capital: [capital],
    area,
    languages,
    flags: { png: flag },
  } = countryData;

  return (
    <div key={name}>
      <h1>{name}</h1>
      <div>{`capital ${capital}`}</div>
      <div>{`area ${area}`}</div>
      <h2>languages:</h2>
      <ul>
        {Object.values(languages).map((language, index) => (
          <li key={`${name}-${index}`}>{language}</li>
        ))}
      </ul>
      <img src={flag} alt={`flag of ${name}`} width={200} />
    </div>
  );
}

export default CountryDetails;
