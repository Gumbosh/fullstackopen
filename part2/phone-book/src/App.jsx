import { useEffect, useState } from "react";
import DisplayNumbers from "./components/DisplayNumbers";
import AddNewNumber from "./components/AddNewNumber";
import Search from "./components/Search";
import numbersService from "./services/numbers";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    numbersService
      .getAll()
      .then((initialNumbers) => {
        setPersons(initialNumbers);
        setFilteredPersons(initialNumbers);
      })
      .catch((error) => {
        console.error("Error fetching numbers", error);
        alert("Error fetching numbers");
      });
  }, []);

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNotification = (message) => {
    setNotificationMessage(message);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 3000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const personToUpdate = persons.find(
          (person) => person.name === newName
        );
        const updatedPerson = { ...personToUpdate, number: newNumber };
        numbersService
          .update(personToUpdate.id, updatedPerson)
          .then(() => {
            setPersons((prevPersons) =>
              prevPersons.map((person) =>
                person.id !== personToUpdate.id ? person : updatedPerson
              )
            );
            setFilteredPersons((prevFilteredPersons) =>
              prevFilteredPersons.map((person) =>
                person.id !== personToUpdate.id ? person : updatedPerson
              )
            );
            handleNotification(`Update ${personToUpdate.name} phone number`);
          })
          .catch((error) => {
            console.error("Error updating person", error);
            alert("Error updating person");
          });
        setNewName("");
        setNewNumber("");
      } else {
        alert(`${newName} is already added to phonebook`);
      }
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
          handleNotification(`Added ${newName}`);
        })
        .catch((error) => {
          console.error("Error creating new person", error);
          alert("Error creating new person");
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

  const handleRemove = (id) => {
    const personToRemove = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personToRemove.name}?`)) {
      numbersService
        .remove(id)
        .then(() => {
          setPersons((prevPersons) =>
            prevPersons.filter((person) => person.id !== id)
          );
          setFilteredPersons((prevFilteredPersons) =>
            prevFilteredPersons.filter((person) => person.id !== id)
          );
        })
        .catch((error) => {
          console.error("Error removing person", error);
          alert("Error removing person");
        });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} />
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
      <DisplayNumbers persons={filteredPersons} handleRemove={handleRemove} />
    </div>
  );
};

export default App;
