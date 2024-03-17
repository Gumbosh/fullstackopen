const DisplayNumbers = ({ persons }) => {
  return (
    <div>
      {persons.map((persons) => (
        <p key={persons.id}>
          {persons.name} {persons.number}
        </p>
      ))}
    </div>
  );
};

export default DisplayNumbers;
