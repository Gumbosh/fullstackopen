import { useEffect, useState } from "react";
import DisplayNumbers from "./components/DisplayNumbers";
import AddNewNumber from "./components/AddNewNumber";
import Search from "./components/Search";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
      setFilteredPersons(response.data);
    });
  }, []);

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPersons = [
        ...persons,
        { name: newName, number: newNumber, id: persons.length + 1 },
      ];
      setPersons(newPersons);
      setFilteredPersons(newPersons);
    }
    setSearchName("");
    setNewName("");
    setNewNumber("");
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchName(searchTerm);
    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPersons(filteredPersons);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Search value={searchName} onChange={handleSearch} />
      <h2>add a new</h2>
      <AddNewNumber
        onSubmit={handleSubmit}
        nameValue={newName}
        nameOnChange={handleNewNameChange}
        value
        numberValue={newNumber}
        numberOnChange={handleNewNumberChange}
      />
      <h2>Numbers</h2>
      <DisplayNumbers filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
