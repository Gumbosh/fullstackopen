const DisplayNumbers = ({ filteredPersons }) => {
  return (
    <div>
      {filteredPersons.map((persons) => (
        <p key={persons.id}>
          {persons.name} {persons.number}
        </p>
      ))}
    </div>
  );
};

export default DisplayNumbers;
