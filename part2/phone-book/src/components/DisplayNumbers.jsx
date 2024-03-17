const DisplayNumbers = ({ persons, handleRemove }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          <span>{`${person.name} ${person.number} `}</span>
          <button onClick={() => handleRemove(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default DisplayNumbers;
