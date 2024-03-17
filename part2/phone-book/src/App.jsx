import { useEffect, useState } from "react";
import DisplayNumbers from "./components/DisplayNumbers";
import AddNewNumber from "./components/AddNewNumber";
import Search from "./components/Search";
import numbersService from "./services/numbers";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);

  useEffect(() => {
    numbersService
      .getAll()
      .then((initialNumbers) => {
        setPersons(initialNumbers);
        setFilteredPersons(initialNumbers);
      })
      .catch((error) => {
        console.error("Error fetching numbers", error);
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
      numbersService
        .create({ name: newName, number: newNumber })
        .then((newPerson) => {
          setPersons((prevPersons) => [...prevPersons, newPerson]);
          setFilteredPersons((prevFilteredPersons) => [
            ...prevFilteredPersons,
            newPerson,
          ]);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          console.error("Error creating new person", error);
        });
    }
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
        numberValue={newNumber}
        numberOnChange={handleNewNumberChange}
      />
      <h2>Numbers</h2>
      <DisplayNumbers persons={filteredPersons} />
    </div>
  );
};

export default App;
