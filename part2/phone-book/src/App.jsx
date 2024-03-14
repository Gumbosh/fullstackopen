import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phoneNumber: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNewPhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPersons = [
        ...persons,
        { name: newName, phoneNumber: newPhoneNumber },
      ];
      setPersons(newPersons);
    }
    setNewName("");
    setNewPhoneNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input value={newName} onChange={handleNewNameChange} />
        </div>
        <div>
          number:
          <input value={newPhoneNumber} onChange={handleNewPhoneNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((persons) => (
        <p key={persons.name}>
          {persons.name} {persons.phoneNumber}
        </p>
      ))}
    </div>
  );
};

export default App;
